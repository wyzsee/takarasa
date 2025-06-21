import Navbar from "@/components/ui/Navbar";
import ProfilePicture from "@/assets/img/profile_picture.jpg";
import {
    CaretRight,
    CoinVertical,
    Headset,
    UserGear,
    ShieldCheck,
    SignOut,
    LockKey,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                const res = await api.get("/user");
                setUserName(res.data.name);
                setUserEmail(res.data.email);
            } catch (err) {
                console.error("Gagal ambil user:", err);
            }
        }
        getUser();
    }, []);

    // Handle Logout
    const handleLogout = async () => {
        try {
            await api.post("/logout");
            // Delete Token
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
                {/* Background SVG dengan posisi absolute */}
                <div className="absolute inset-0 -z-20 pointer-events-none">
                    <svg
                        className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-50 blur-3xl -z-2 w-full h-full"
                        viewBox="0 0 430 932"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_f_137_1732)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M424.711 126.905C489.916 205.217 500.285 304.525 524.707 403.46C556.243 531.211 658.369 668.721 585.509 778.294C512.033 888.795 346.298 880.05 213.918 870.854C105.121 863.297 14.2704 803.345 -68.9274 732.833C-149.906 664.201 -227.016 586.69 -244.838 482.047C-263.767 370.911 -225.731 261.782 -165.374 166.564C-95.0554 55.6312 -14.9785 -78.5064 116.068 -87.3139C245.963 -96.044 341.407 26.8579 424.711 126.905Z"
                                fill="#E0DDF8"
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_f_137_1732"
                                x="-449.728"
                                y="-287.754"
                                width="1260.91"
                                height="1363.62"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                />
                                <feGaussianBlur
                                    stdDeviation="100"
                                    result="effect1_foregroundBlur_137_1732"
                                />
                            </filter>
                        </defs>
                    </svg>
                    <svg
                        className="absolute top-3/4 left-1/2 -translate-x-1/2 opacity-50 blur-3xl -z-1 w-full h-full"
                        viewBox="0 0 430 623"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_f_137_1733)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M214.418 218.871C264.313 241.879 331.888 196.258 350.723 243.536C369.397 290.411 509.156 319.61 482.199 357.363C457.829 391.493 409.723 398.929 365.033 408.789C320.995 418.504 275.686 431.592 230.995 412.783C182.889 392.537 140.421 353.768 125.989 308.186C112.29 264.917 97.2446 159.831 117.648 122.993C137.294 87.5237 135.521 78.1528 176.731 64.0471C221.737 48.6426 167.07 197.037 214.418 218.871Z"
                                fill="#F8EBC6"
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_f_137_1733"
                                x="-92.3262"
                                y="-137.072"
                                width="777.965"
                                height="759.419"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                />
                                <feGaussianBlur
                                    stdDeviation="100"
                                    result="effect1_foregroundBlur_137_1733"
                                />
                            </filter>
                        </defs>
                    </svg>
                </div>

                <div className="container flex flex-col items-center mx-auto gap-8 mt-16 mb-24 h-full">
                    <div className="w-full bg-gradient-to-t from-[#ADA8D5]  t0-[#5A586F] flex gap-3 items-center p-4 rounded-2xl">
                        <div className="h-[100px] w-[100px] rounded-full">
                            <img
                                src={ProfilePicture}
                                alt="Profile Picture"
                                className="w-24 h-24 object-cover rounded-full"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl font-bold text-grey-10">
                                {userName}
                            </h1>
                            <p className="text-xs text-grey-10">{userEmail}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1 w-28 h-8 rounded-full text-white">
                            <CoinVertical
                                className="text-warning"
                                size={16}
                                weight="fill"
                            />
                            <p className="text-xs font-bold">200 Poin</p>
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
