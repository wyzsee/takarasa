import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft, MapPinLine } from "@phosphor-icons/react";

// Hapus import gambar statis karena semua dari backend
// import FotoGathering from "@/assets/img/gathering.png";
// import FotoWorkshop from "@/assets/img/workshop.jpg";

// Ganti nama komponen agar lebih sesuai
export default function EventKegiatanPage() {
    const navigate = useNavigate();
    
    // 1. State untuk menampung data acara yang sudah dikelompokkan
    const [acara, setAcara] = useState({
        gathering: [],
        workshop: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Hapus data statis 'gatheringData' dan 'workshopData'
    // const gatheringData = [ ... ]; // Hapus
    // const workshopData = [ ... ]; // Hapus

    // 3. useEffect untuk mengambil data dari API
    useEffect(() => {
        async function fetchAcara() {
            setIsLoading(true);
            try {
                // Cukup satu panggilan API ke endpoint /acara
                const response = await api.get('/acara');
                
                // Set state dengan data yang sudah dikelompokkan oleh Laravel
                setAcara({
                    gathering: response.data.gathering || [],
                    workshop: response.data.workshop || []
                });
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil data acara:", err);
                setError("Gagal memuat data acara. Coba lagi nanti.");
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchAcara();
    }, []); // Dependency array kosong agar hanya berjalan sekali

    // Fungsi untuk merender setiap item acara agar tidak duplikat kode
    const renderAcaraCard = (item) => (
        <Link
            key={item.id}
            to={item.link_detail} // 5. Gunakan link_detail dari database
            className="flex-shrink-0 flex flex-col w-[293px] h-auto bg-[#C9C2E8] rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl p-3"
        >
            <img
                src={`http://localhost:8000${item.image_path}`} // 5. Gunakan image_path dari database
                alt={item.title}
                className="w-full h-36 object-cover rounded-xl" // Sesuaikan tinggi gambar jika perlu
            />
            <div className="pt-3 flex flex-col flex-grow">
                <h3 className="text-md font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-700 flex-grow">{item.description}</p>
                <p className="text-xs text-gray-600 flex items-center mt-2">
                    <MapPinLine size={16} className="mr-1" />
                    {item.organizer} {/* 5. Gunakan organizer dari database */}
                </p>
            </div>
        </Link>
    );

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
                    Event dan Kegiatan
                </h1>
            </header>

            <main className="flex-grow w-full px-6 pb-24 overflow-y-auto">
                {isLoading ? (
                    <p className="text-center text-gray-500">Memuat acara...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        <section className="mb-8">
                            <h1 className="text-lg font-semibold text-gray-800 mb-4">Gathering Event</h1>
                            <div className="flex overflow-x-auto space-x-4 pl-2 pr-2 pb-4">
                                {acara.gathering.length > 0 ? (
                                    acara.gathering.map(renderAcaraCard)
                                ) : (
                                    <p className="text-sm text-gray-500">Belum ada acara gathering.</p>
                                )}
                            </div>
                        </section>

                        <section className="mb-8">
                            <h1 className="text-lg font-semibold text-gray-800 mb-4">Workshop</h1>
                            <div className="flex overflow-x-auto space-x-4 pl-2 pr-2 pb-4">
                                {acara.workshop.length > 0 ? (
                                    acara.workshop.map(renderAcaraCard)
                                ) : (
                                    <p className="text-sm text-gray-500">Belum ada acara workshop.</p>
                                )}
                            </div>
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}