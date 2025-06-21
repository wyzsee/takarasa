import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // 1. Import useParams
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft } from "@phosphor-icons/react";
import FotoBambang from "@/assets/img/Bambang.jpg";

// Hapus import gambar statis
// import FotoBambang from "@/assets/img/Bambang.jpg";

export default function DetailJBIPage() { // Ubah nama komponen agar sesuai
    const navigate = useNavigate();
    const { id } = useParams(); // 1. Ambil 'id' dari parameter URL

    // 2. State untuk menampung detail JBI, loading, dan error
    const [jbiDetail, setJbiDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Hapus data statis 'informationData'
    // const informationData = [ ... ]; // <-- HAPUS

    // 4. useEffect untuk mengambil data detail JBI dari API
    useEffect(() => {
        // Jangan jalankan fetch jika tidak ada ID
        if (!id) return;

        async function fetchDetailJBI() {
            setIsLoading(true);
            try {
                const response = await api.get(`/interpreters/${id}`);
                setJbiDetail(response.data);
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil detail data JBI:", err);
                setError("Data juru bahasa isyarat tidak ditemukan.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchDetailJBI();
    }, [id]); // Jalankan ulang useEffect jika 'id' berubah

    // 5. Conditional rendering untuk menampilkan loading, error, atau konten
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Memuat data...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    if (!jbiDetail) {
        return <div className="flex justify-center items-center h-screen">Data tidak tersedia.</div>;
    }

    return (
        <div className="bg-white max-w-md min-h-screen font-jakarta flex flex-col mx-auto relative">
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#E0DDF8] rounded-full"></div>
                <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#F8EBC6] rounded-full"></div>
            </div>

            <header className="relative flex items-center mx-2 p-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="absolute"
                >
                    <CaretLeft size={24} className="h-6 w-6" />
                </Button>
                <h1 className="text-xl w-full my-3 text-center font-semibold text-grey-100">
                    Detail Juru Bahasa Isyarat
                </h1>
            </header>

            <main className="flex-grow w-full px-6 pb-4 overflow-y-auto">
                {/* 6. Tampilkan data dari state 'jbiDetail' */}
                <div className="flex flex-col items-start gap-4 p-4 backdrop-blur-sm rounded-2xl">
                    <img
                        className="self-stretch w-full h-56 object-cover rounded-lg"
                        alt={jbiDetail.name}
                        src={FotoBambang} // Sesuaikan URL backend
                    />
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold text-gray-800">
                            {jbiDetail.name}
                        </h2>
                        <p className="text-base text-gray-700">
                            {jbiDetail.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <h2 className="font-semibold text-xl text-gray-800">Pengalaman Profesional</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {jbiDetail.experiences.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="font-semibold text-xl text-gray-800">
                            Harga Jasa
                        </h2>
                        <div className="flex flex-row gap-3">
                            {/* Cek apakah 'rates' ada dan merupakan array */}
                            {Array.isArray(jbiDetail.rates) ? (
                                jbiDetail.rates.map((h, index) => (
                                    <div key={index} className="bg-indigo-100 text-indigo-800 text-base font-semibold px-4 py-2 rounded-lg">
                                        {h.jenis}: {h.tarif.toLocaleString('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0
                                        })}
                                    </div>
                                ))
                            ) : (
                                // Tampilkan harga dari kolom terpisah jika 'rates' bukan array
                                <>
                                    <div className="bg-indigo-100 text-indigo-800 text-base font-semibold px-4 py-2 rounded-lg">
                                        Daring: {jbiDetail.rate_online.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                                    </div>
                                    <div className="bg-indigo-100 text-indigo-800 text-base font-semibold px-4 py-2 rounded-lg">
                                        Luring: {jbiDetail.rate_offline.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full max-w-md p-6 bg-white sticky bottom-0">
                <Link to={`/pesan-jbi/${id}`}>
                    <Button
                        type="button"
                        className="w-full h-[54px] bg-gray-800 text-white hover:bg-gray-700 py-3 text-base font-semibold rounded-full"
                    >
                        Pesan Juru Bahasa Isyarat
                    </Button>
                </Link>
            </footer>
        </div>
    );
}