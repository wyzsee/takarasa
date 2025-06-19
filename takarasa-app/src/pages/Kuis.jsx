import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import logo from "@/assets/img/logo.png";
import Icon from "@/assets/img/kuis/alfabet.svg";
import { CaretLeft, CoinVertical } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await api.get("/user");
                setUserName(res.data.name);
            } catch (err) {
                console.error("Gagal ambil user:", err);
            }
        }
        getUser();
    }, []);

    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6 bg-grey-10">

                <header className="relative flex items-center justify-center p-4 w-full">
                    <Link to="/belajar" className="left-0 absolute">       
                        <CaretLeft
                            size={24}
                        />     
                    </Link>

                    <h1 className="w-full text-center text-xl font-semibold">
                        Bermain Bersama Taka
                    </h1>
                </header>

                <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="grid grid-cols-2 gap-4 rounded-xl">
                        <div className="flex flex-col w-44 p-4 gap-2 bg-brand-primary rounded-xl">
                                <div className="flex flex-col last:gap-2 justify-between items-center w-full">
                                    <div className="py-4 gap-2 flex flex-col items-center">
                                        <img src={Icon} alt="" />
                                        <div className="flex flex-col gap-2 items-center">
                                            <p className="text-base font-bold text-white">
                                                Kuis Alfabet
                                            </p>
                                            <p className="text-xs font-normal text-grey-10">
                                                26 Huruf
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-1 w-full">
                                            <div className="flex w-full justify-between">
                                                <p className="text-xs font-normal text-grey-10">
                                                    Nilai
                                                </p>
                                                <p className="text-xs font-normal text-grey-10">
                                                    0/100
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            asChild
                                            type="submit"
                                            className="w-full h-12 bg-grey-100 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                                            disabled={loading}
                                        >
                                            <Link to="/kuis/alfabet">
                                                {loading
                                                    ? "Memproses..."
                                                    : "Mulai"}
                                            </Link>
                                        </Button>
                                </div>
                        </div>
                        <div className="flex flex-col w-44 p-4 gap-2 bg-brand-primary rounded-xl">
                                <div className="flex flex-col last:gap-2 justify-between items-center w-full">
                                    <div className="py-4 gap-2 flex flex-col items-center">
                                        <img src={Icon} alt="" />
                                        <div className="flex flex-col gap-2 items-center">
                                            <p className="text-base font-bold text-white">
                                                Kuis Alfabet
                                            </p>
                                            <p className="text-xs font-normal text-grey-10">
                                                26 Huruf
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-1 w-full">
                                            <div className="flex w-full justify-between">
                                                <p className="text-xs font-normal text-grey-10">
                                                    Nilai
                                                </p>
                                                <p className="text-xs font-normal text-grey-10">
                                                    0/100
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            asChild
                                            type="submit"
                                            className="w-full h-12 bg-grey-100 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                                            disabled={loading}
                                        >
                                            <Link to="/kuis/alfabet">
                                                {loading
                                                    ? "Memproses..."
                                                    : "Mulai"}
                                            </Link>
                                        </Button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
