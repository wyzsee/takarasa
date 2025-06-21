import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; // Pastikan api.js sudah dikonfigurasi dengan benar
import { Button } from "@/components/ui/button";
import { CaretLeft } from "@phosphor-icons/react";
import FotoBambang from "@/assets/img/Bambang.jpg";

// Hapus import gambar statis karena akan diambil dari database
// import FotoZuriri from "@/assets/img/zuriri.jpg";
// import FotoBambang from "@/assets/img/Bambang.jpg";

export default function InformationPage() {
    const navigate = useNavigate();

    // 1. State untuk data dari API, loading, dan error
    const [userName, setUserName] = useState("");
    const [jbiData, setJbiData] = useState([]); // State untuk menampung data JBI
    const [isLoading, setIsLoading] = useState(true); // State untuk status loading
    const [error, setError] = useState(null); // State untuk menampung pesan error

    // 2. Hapus array informationData yang statis
    // const informationData = [ ... ]; // <-- HAPUS BAGIAN INI

    // 3. useEffect untuk mengambil data user dan JBI dari API
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true); // Mulai loading
            try {

                // Ambil data Juru Bahasa Isyarat dari endpoint Laravel
                const jbiRes = await api.get("/interpreters"); // Sesuaikan dengan endpoint Anda
                setJbiData(jbiRes.data);
                setError(null); // Bersihkan error jika berhasil
            } catch (err) {
                console.error("Gagal mengambil data:", err);
                setError("Tidak dapat memuat data. Silakan coba lagi nanti.");
                setUserName("Pengguna"); // Set nama default jika gagal
            } finally {
                setIsLoading(false); // Selesai loading, baik berhasil maupun gagal
            }
        }
        fetchData();
    }, []); // Dependency array kosong agar hanya berjalan sekali saat komponen dimuat

    // 4. Tampilan kondisional berdasarkan status loading dan error
    const renderContent = () => {
        if (isLoading) {
            return <p className="text-center text-gray-500">Memuat data...</p>;
        }

        if (error) {
            return <p className="text-center text-red-500">{error}</p>;
        }

        return (
            <div className="flex flex-col gap-4">
                {jbiData.map((jbiRes) => (
                    // 5. Sesuaikan properti dengan nama kolom dari database
                    <Link to={jbiRes.link_detail} key={jbiRes.id} className="block group">
                        <div className="flex flex-col items-start gap-3 p-4 bg-[#ada8d5] backdrop-blur-sm rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                            <img
                                className="self-stretch w-full h-40 object-cover rounded-lg"
                                // 6. URL gambar dari backend
                                alt={jbiRes.name}
                                src={FotoBambang} // <-- PENTING!
                            />
                            <h2 className="text-xl font-bold text-grey-10">
                                {jbiRes.name}
                            </h2>
                            <p className="text-base text-grey-20">
                                {jbiRes.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-[#fffff] max-w-md min-h-screen font-jakarta flex flex-col mx-auto relative">
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
                    Layanan Juru Bahasa Isyarat
                </h1>
            </header>

            <main className="flex-grow w-full px-6 pb-4 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
}