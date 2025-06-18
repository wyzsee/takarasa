import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft, MapPinLine } from "@phosphor-icons/react";
import FotoBambang from "@/assets/img/Bambang.jpg";
import { list } from "postcss";

export default function InformationPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    const informationData = [
        {
            id: 1,
            title: "Bambang Susanto S.Sos., M.Cs",
            description: "Ahli bahasa isyarat, inklusi disabilitas, dan teknologi aksesibel.",
            pengalaman: [
                "Pengalaman lebih dari 10 tahun sebagai juru bahasa isyarat.",
                "Pakar dalam teknologi aksesibel untuk disabilitas.",
                "Pendidikan S.Sos. dan M.Cs di bidang komunikasi inklusif.",],
            image: FotoBambang,
            harga: [
                { jenis: "Daring", tarif: 180000 },
                { jenis: "Luring", tarif: 200000 },
            ]
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
                            <div className="flex flex-col items-start gap-4 p-4 backdrop-blur-sm rounded-2xl">
                                <img
                                    className="self-stretch w-full h-56 object-cover rounded-lg"
                                    alt={info.title}
                                    src={info.image}
                                />
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-lg font-bold text-grey-90">
                                        {info.title}
                                    </h2>
                                    <p className="text-sm text-grey-90">
                                        {info.description}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h2 className="font-semibold text-lg text-gray-700">Pengalaman Profesional</h2>
                                    <ul className="list-disc list-inside text-gray-600">
                                        {info.pengalaman.map((item, index) => (
                                            <li key={index}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <h2 className="font-semibold text-lg text-gray-700">
                                        Harga Jasa
                                    </h2>
                                    <div className="flex flex-row gap-3">
                                        {info.harga.map((h, index) => (
                                            <div key={index} className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-2 rounded-lg">
                                                {/* Tampilkan jenis dan format tarif menjadi format Rupiah.toLocaleString sangat bagus untuk format mata uang.*/}
                                                {h.jenis}: {h.tarif.toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    minimumFractionDigits: 0
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="div">

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
                    Pilih Juru Bahasa
                </Button>
            </footer>
        </div>
    );
}