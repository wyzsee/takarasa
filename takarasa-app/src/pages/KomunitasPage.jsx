import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft } from "@phosphor-icons/react";
import LogoInstagram from "@/assets/img/instagram_logo.png"; 


export default function LayananJBIPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const komunitasData = [
        {
            id: 1,
            username: 'teman_tuli',
            description: 'Komunitas sosial untuk edukasi mahasiswa dan masyarakat mengenai budaya Tuli dan bahasa isyarat.',
            link: 'https://www.instagram.com/teman_tuli',
        },
        {
            id: 2,
            username: 'fantasituli',
            description: 'Fantasi Tuli berdaya yang bergerak di bidang seni dan kreativitas. Kolaborasi bidang seni antara teman Tuli & Dengar.',
            link: 'https://www.instagram.com/fantasituli',
        },
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

                <h1 className="text-xl w-full my-3 text-center font-semibold text-gray-800">
                    Komunitas Teman Tuli
                </h1>
            </header>

            <main className="flex-grow w-full px-6 sm:px-6 pb-6 overflow-y-auto">
                <div className="w-full space-y-4 mt-4">
                    {komunitasData.map((komunitas) => (
                        <a
                            key={komunitas.id}
                            href={komunitas.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                flex items-center p-4 space-x-4
                                bg-[#C9C2E8] rounded-2xl 
                                transition-transform duration-300 hover:scale-105 hover:shadow-lg
                            "
                        >
                            {/* 3. Ikon diganti dengan tag <img> */}
                            <div className="bg-white p-2 rounded-xl shadow-md flex-shrink-0">
                                <img
                                    src={LogoInstagram}
                                    alt="Logo Instagram"
                                    className="w-12 h-12 object-contain"
                                />
                            </div>

                            {/* Kolom Kanan: Teks */}
                            <div className="flex flex-col text-white flex-grow">
                                <h2 className="font-bold text-lg">{komunitas.username}</h2>
                                <p className="text-sm mt-1">{komunitas.description}</p>
                                <span className="text-sm font-semibold underline mt-auto pt-2">
                                    Kunjungi
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </main>
        </div>
    )
}