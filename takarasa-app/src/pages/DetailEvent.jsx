import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft, Calendar, MapPin } from "@phosphor-icons/react";
import FotoGathering from "@/assets/img/gathering.png";
import { list } from "postcss";

export default function InformationPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    const informationData = [
        {
            id: 1,
            title: "Gathering Teman Tuli",
            description: "Acara perkumpulan komunitas teman teman tuli banjarmasin dan sekitarnya.",
            // --- DATA YANG DIPERBAIKI ---
            tanggal: "26 Januari 2026", // Data tanggal terpisah
            lokasi: "Gedung Sate", // Data lokasi terpisah (typo diperbaiki)
            // --------------------------
            image: FotoGathering,
            penyelenggara: "Diselenggarakan oleh Teman Tuli Banjarmasin",
        },
        // Anda bisa menambahkan data event lain di sini dengan struktur yang sama
    ];

    useEffect(() => {
        async function getUser() {
            try {
                const res = await api.get("/user");
                setUserName(res.data.name.split(' ')[0]);
            } catch (err) {
                console.error("Gagal mengambil data user:", err);
                setUserName("Pengguna");
            }
        }
        getUser();
    }, []);

    return (
        <div className="bg-[#fffff] max-w-md min-h-screen font-jakarta flex flex-col mx-auto relative">
            {/* ... sisa kode tidak berubah ... */}
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
                    Gathering Event
                </h1>
            </header>

            {/* ... sisa kode tidak berubah ... */}
            <main className="flex-grow w-full px-6 pb-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {informationData.map((info) => (
                        <Link to={info.link} key={info.id} className="block group">
                            <div className="flex flex-col items-start gap-4 p-4 backdrop-blur-sm rounded-2xl">
                                <img
                                    className="self-stretch w-full h-56 object-cover rounded-lg"
                                    alt={info.title}
                                    src={info.image}
                                />
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-xl font-bold text-grey-90">
                                        {info.title}
                                    </h2>
                                    <div className="flex bg-grey-50 w-full h-0.5"></div>
                                    <div className="flex flex-col gap-3">
                                        <h2 className="text-xl font-bold text-grey-90">
                                            Deskripsi Kegiatan
                                        </h2>
                                        <p className="text-base text-grey-90">
                                            {info.description}
                                        </p>
                                    </div>
                                    <div className="flex bg-grey-50 w-full h-0.5"></div>
                                    <div className="flex flex-col gap-3">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            Lokasi dan Pelaksanaan
                                        </h2>
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Calendar size={20} />
                                            <span className="text-base">{info.tanggal}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <MapPin size={20} />
                                            <span className="text-base">{info.lokasi}</span>
                                        </div>
                                    </div>
                                    <div className="flex bg-grey-50 w-full h-0.5"></div>
                                    <div className="flex flex-col gap-3">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            Penyelenggara
                                        </h2>
                                        <p className="text-base text-gray-700">
                                            {info.penyelenggara}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <footer className="w-full max-w-md p-6">
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[px:54] bg-grey-100 text-white hover:bg-grey-80 py-3 text-base font-semibold rounded-full"
                >
                    Daftar Sekarang
                </Button>
            </footer>
        </div>
    );
}