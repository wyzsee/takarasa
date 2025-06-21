import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft, Calendar, MapPin } from "@phosphor-icons/react";

// Ganti nama komponen agar lebih deskriptif
export default function DetailAcaraPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // 1. Ambil ID dari URL

    // 2. State untuk menampung detail acara, loading, dan error
    const [acaraDetail, setAcaraDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Hapus data statis 'informationData'
    // const informationData = [ ... ]; // HAPUS

    // 4. useEffect untuk mengambil data detail acara dari API
    useEffect(() => {
        if (!id) return;

        async function fetchDetailAcara() {
            setIsLoading(true);
            try {
                const response = await api.get(`/acara/${id}`);
                setAcaraDetail(response.data);
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil detail data acara:", err);
                setError("Data acara tidak ditemukan.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchDetailAcara();
    }, [id]); // Jalankan ulang jika 'id' berubah

    // Fungsi untuk memformat tanggal agar lebih mudah dibaca
    const formatTanggal = (tanggal) => {
        if (!tanggal) return "Tanggal belum ditentukan";
        return new Date(tanggal).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }) + ' WIB';
    };

    // 5. Conditional rendering
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Memuat data...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    if (!acaraDetail) {
        return <div className="flex justify-center items-center h-screen">Data tidak tersedia.</div>;
    }

    return (
        <div className="bg-white max-w-md min-h-screen font-jakarta flex flex-col mx-auto relative">
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#E0DDF8] rounded-full"></div>
                <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#F8EBC6] rounded-full"></div>
            </div>

            <header className="relative flex items-center mx-2 p-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="absolute">
                    <CaretLeft size={24} className="h-6 w-6" />
                </Button>
                <h1 className="text-xl w-full my-3 text-center font-semibold text-gray-800">
                    Detail Acara
                </h1>
            </header>

            <main className="flex-grow w-full px-6 pb-4 overflow-y-auto">
                {/* 6. Tampilkan data dari state 'acaraDetail' */}
                <div className="flex flex-col items-start gap-4 p-4 backdrop-blur-sm rounded-2xl">
                    <img
                        className="self-stretch w-full h-56 object-cover rounded-lg"
                        alt={acaraDetail.title}
                        src={`http://localhost:8000${acaraDetail.image_path}`} // Sesuaikan URL backend
                    />
                    <div className="flex flex-col gap-3 w-full">
                        <h2 className="text-xl font-bold text-gray-800">
                            {acaraDetail.title}
                        </h2>
                        <div className="flex bg-gray-200 w-full h-px"></div>
                        
                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Deskripsi Kegiatan
                            </h2>
                            <p className="text-base text-gray-700">
                                {acaraDetail.description}
                            </p>
                        </div>
                        
                        <div className="flex bg-gray-200 w-full h-px"></div>
                        
                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Lokasi dan Pelaksanaan
                            </h2>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Calendar size={20} />
                                <span className="text-base">{formatTanggal(acaraDetail.event_date)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <MapPin size={20} />
                                <span className="text-base">{acaraDetail.location || 'Lokasi belum ditentukan'}</span>
                            </div>
                        </div>
                        
                        <div className="flex bg-gray-200 w-full h-px"></div>
                        
                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Penyelenggara
                            </h2>
                            <p className="text-base text-gray-700">
                                {acaraDetail.organizer}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full max-w-md p-6 bg-white sticky bottom-0 border-t">
                {/* 7. Buat tombol menjadi link ke halaman pendaftaran */}
                <Link to={`/daftar-acara/${acaraDetail.id}`}>
                    <Button
                        type="button"
                        className="w-full h-[54px] bg-gray-800 text-white hover:bg-gray-700 py-3 text-base font-semibold rounded-full"
                    >
                        Daftar Sekarang
                    </Button>
                </Link>
            </footer>
        </div>
    );
}