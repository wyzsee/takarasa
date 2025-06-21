import Navbar from "@/components/ui/Navbar";
import React, { useEffect, useState, useRef } from "react";
import {
    CaretRight,
    CoinVertical,
    Headset,
    UserGear,
    ShieldCheck,
    SignOut,
    LockKey,
} from "@phosphor-icons/react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const defaultProfilePic = "/src/assets/img/ppdefault.jpg";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true); // Mulai dengan true

    const [imagePreview, setImagePreview] = useState(defaultProfilePic);
    

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get("/user");
                setUser(res.data);
                if (res.data.foto_profil) {
                    setImagePreview(
                        `http://localhost:8000/storage/${res.data.foto_profil}`
                    );
                }
            } catch (err) {
                console.error("Gagal ambil user:", err);
                // Jika gagal (misal: token tidak valid), mungkin lempar ke login
                // navigate('/login');
            } finally {
                setLoading(false); // Set loading ke false setelah selesai (baik sukses maupun gagal)
            }
        }
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            localStorage.removeItem("auth_token");
            delete api.defaults.headers.common["Authorization"];
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Gagal logout:", err);
        }
    };
    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6">
                {/* Background SVG */}
                <div className="absolute inset-0 -z-20 pointer-events-none">
                    {/* ... kode SVG Anda ... */}
                </div>

                <div className="container flex flex-col items-center justify-center mx-auto gap-8 mt-16 mb-24 h-full">
                    <div className="relative w-full bg-brand-primary flex gap-4 items-center justify-between p-4 rounded-2xl">
                        <div className="h-[100px] w-[100px] rounded-full flex-shrink-0">
                            <img
                                src={imagePreview}
                                alt="Profile Picture"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="flex gap-2 flex-grow">
                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    {user.name ? user.name : "..."}
                                </h1>
                                <p className="text-xs text-slate-200">
                                    {user.email ? user.email : "..."}
                                </p>
                            </div>
                            <div className="absolute right-8 flex flex-col justify-center items-center gap-1 rounded-full text-white">
                                <CoinVertical
                                    size={16}
                                    weight="fill"
                                    className="text-brand-accent"
                                />
                                <p className="text-xs font-bold">200 Poin</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <h1 className="font-semibold text-xl text-grey-100 ">
                            Tentang Akun
                        </h1>
                        <Link to="/atur-profile">
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <UserGear size={24} />
                                    <p className="text-grey-100 text-sm">
                                        Atur Profil
                                    </p>
                                </div>
                                <CaretRight size={24} />
                            </div>
                        </Link>
                        <div className="border-b border-grey-100 w-full"></div>
                        <Link to="/hubungi-admin">
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <Headset size={24} />
                                    <p className="text-grey-100 text-sm">
                                        Hubungi Admin Taka
                                    </p>
                                </div>
                                <CaretRight size={24} />
                            </div>
                        </Link>
                        <div className="border-b border-grey-100 w-full"></div>
                        <h1 className="font-semibold text-xl text-grey-100 ">
                            Lainnya
                        </h1>
                        <Link to="/">
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <ShieldCheck size={24} />
                                    <p className="text-grey-100 text-sm">
                                        Ketentuan Layanan
                                    </p>
                                </div>
                                <CaretRight size={24} />
                            </div>
                        </Link>
                        <div className="border-b border-grey-100 w-full"></div>
                        <Link to="/">
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <LockKey size={24} />
                                    <p className="text-grey-100 text-sm">
                                        Kebijakan & Privasi
                                    </p>
                                </div>
                                <CaretRight size={24} />
                            </div>
                        </Link>
                        <div className="border-b border-grey-100 w-full"></div>
                        <Link onClick={handleLogout}>
                            <div className="flex justify-between text-error">
                                <div className="flex gap-4 items-center">
                                    <SignOut size={24} />
                                    <p className="text-sm">Keluar</p>
                                </div>
                            </div>
                        </Link>
                        <div className="border-b border-grey-100 w-full"></div>
                    </div>
                </div>
                <Navbar />
            </div>
        </>
    );
}