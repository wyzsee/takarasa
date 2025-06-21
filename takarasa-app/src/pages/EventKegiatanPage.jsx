import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft, MapPinLine } from "@phosphor-icons/react";
import FotoGathering from "@/assets/img/gathering.png";
import FotoWorkshop from "@/assets/img/workshop.jpg";

export default function LayananJBIPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const gatheringData = [
        {
            id: 1,
            title: "Gathering Teman Tuli",
            description: "Acara perkumpulan komunitas teman teman tuli banjarmasin",
            image: FotoGathering,
            penyelenggara: "Diselenggarakan oleh Teman Tuli Banjarmasin",
            link: "/detail-event",
        },
        {
            id: 2,
            title: "Gathering Teman Tuli Jabo",
            description: "Acara perkumpulan komunitas teman teman tuli Jabodetabek.",
            image: FotoGathering,
            penyelenggara: "Diselenggarakan oleh Teman Tuli Jabodetabek.",
            link: "/GatheringEvent-1",
        },
    ];

    const workshopData = [
        {
            id: 1,
            title: "Workshop Belajar Bahasa Isyarat",
            description: "Belajar bahasa isyarat bersama teman teman tuli maupun teman dengar.",
            image: FotoWorkshop,
            penyelenggara: "Diselenggarakan oleh Ikatan Peduli Tuli",
            link: "/detail-workshop",
        },
        {
            id: 2,
            title: "Seminar Nasional Teman Tuli",
            description: "Acara perkumpulan komunitas teman teman tuli banjarmasin",
            image: FotoWorkshop,
            penyelenggara: "Diselenggarakan oleh Teman Tuli Banjar",
            link: "/Eventworkshop-1",
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

                <h1 className="text-xl w-full my-3 text-center font-semibold text-grey-100">
                    Event dan Kegiatan
                </h1>
            </header>

            <main className="flex-grow w-full px-6 pb-24 overflow-y-auto">
                <section className="mb-8">
                    <h1 className="text-lg font-semibold text-grey-100 mb-4">Gathering Event</h1>
                    <div className="flex overflow-x-auto space-x-4 pl-2 pr-2 pb-4">
                        {gatheringData.map((item) => (
                            <Link
                                key={item.id}
                                to={item.link}
                                className="flex-shrink-0 flex flex-col w-[293px] h-auto bg-[#C9C2E8] rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl p-3"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-[50%] object-cover rounded-xl"
                                />
                                <div className="pt-3 flex flex-col flex-grow">
                                    <h3 className="text-md font-semibold text-grey-90 mb-1">{item.title}</h3>
                                    <p className="text-xs text-grey-90 flex-grow">{item.description}</p>
                                    <p className="text-xs text-grey-90 flex items-center flex-grow ">
                                        <MapPinLine size={16} className="mr-1" />
                                        {item.penyelenggara}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h1 className="text-lg font-semibold text-grey-100 mb-4">Workshop</h1>
                    <div className="flex overflow-x-auto space-x-4 pl-2 pr-2 pb-4">
                        {workshopData.map((item) => (
                            <Link
                                key={item.id}
                                to={item.link}
                                className="flex-shrink-0 flex flex-col w-[293px] h-auto bg-[#C9C2E8] rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl p-3"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-[50%] object-cover rounded-xl"
                                />
                                <div className="pt-3 flex flex-col flex-grow">
                                    <h3 className="text-md font-semibold text-grey-90 mb-1">{item.title}</h3>
                                    <p className="text-xs text-grey-90 flex-grow">{item.description}</p>
                                    <p className="text-xs text-grey-90 flex items-center flex-grow ">
                                        <MapPinLine size={16} className="mr-1" />
                                        {item.penyelenggara}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}