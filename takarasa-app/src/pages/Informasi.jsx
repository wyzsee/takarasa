import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Navbar from "@/components/ui/Navbar";
import logo from "@/assets/img/logo.png";
import FotoLayananJBI from "@/assets/img/Information-1.png";
import FotoEvent from "@/assets/img/Information-2.png";
import FotoKomunitas from "@/assets/img/Information-3.png";

export default function InformationPage() {
    const [userName, setUserName] = useState("");

    const informationData = [
        {
            id: 1,
            title: "Layanan Juru Bahasa Isyarat",
            description: "Temukan juru bahasa isyarat profesional untuk berbagai kebutuhan Anda, kapan pun dan di mana pun.",
            image: FotoLayananJBI,
            link: "/layanan-jbi",
        },
        {
            id: 2,
            title: "Event dan Kegiatan",
            description: "Ikuti berbagai acara menarik yang kami selenggarakan untuk memperluas pengetahuan dan jaringan Anda.",
            image: FotoEvent,
            link: "/event-kegiatan",
        },
        {
            id: 3,
            title: "Komunitas Teman Tuli",
            description: "Bergabunglah dengan komunitas yang ramah dan suportif untuk berbagi pengalaman dan cerita.",
            image: FotoKomunitas,
            link: "/komunitas",
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
        <div className="bg-[#eae8f7] max-w-md min-h-screen font-jakarta flex flex-col mx-auto relative">
            {/* Background SVG, z-index diatur agar di paling belakang */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-brand-primary rounded-full"></div>
                <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#F8EBC6] rounded-full"></div>
            </div>

            <main className="flex-grow w-full px-6 pb-24 overflow-y-auto">
                <div className="flex justify-between items-center w-full mb-6">
                    <h1 className="text-xl font-semibold text-grey-100">
                        Halo, {userName}!
                    </h1>
                    <div className="w-16 h-16">
                        <img src={logo} alt="Logo Takarasa" className="w-full h-full object-contain" />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {informationData.map((info) => (
                        <Link to={info.link} key={info.id} className="block group">
                            <div className="flex flex-col items-start gap-3 p-4 bg-grey-10 backdrop-blur-sm rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                                <img
                                    className="self-stretch w-full h-40 object-cover rounded-lg"
                                    alt={info.title}
                                    src={info.image}
                                />
                                <h2 className="text-lg font-bold text-gray-900">
                                    {info.title}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {info.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Navbar />
        </div>
    );
}