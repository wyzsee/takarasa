import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft, MapPinLine } from "@phosphor-icons/react";
import FotoZuriri from "@/assets/img/zuriri.jpg";
import FotoBambang from "@/assets/img/Bambang.jpg";

export default function InformationPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const informationData = [
        {
            id: 1,
            title: "Bambang Susanto S.Sos., M.Cs",
            description: "Ahli bahasa isyarat, inklusi disabilitas, dan teknologi aksesibel.",
            image: FotoBambang,
            link: "/detail-jbi",
        },
        {
            id: 2,
            title: "Zuriri Roriri S.Sos., M.Cs",
            description: "Pakar bahasa isyarat, edukator inklusi, dan inovator teknologi disabilitas.",
            image: FotoZuriri,
            link: "/layanan-jbi-2",
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
                    Layanan Juru Bahasa Isyarat
                </h1>
            </header>

            {/* ... sisa kode tidak berubah ... */}
            <main className="flex-grow w-full px-6 pb-4 overflow-y-auto">

                <div className="flex flex-col gap-4">
                    {informationData.map((info) => (
                        <Link to={info.link} key={info.id} className="block group">
                            <div className="flex flex-col items-start gap-3 p-4 bg-[#ada8d5] backdrop-blur-sm rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                                <img
                                    className="self-stretch w-full h-40 object-cover rounded-lg"
                                    alt={info.title}
                                    src={info.image}
                                />
                                <h2 className="text-lg font-bold text-grey-10">
                                    {info.title}
                                </h2>
                                <p className="text-sm text-grey-20">
                                    {info.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}