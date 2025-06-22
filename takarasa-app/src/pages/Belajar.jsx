import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import logo from "@/assets/img/logo.png";
import ProfilePicture from "@/assets/img/profile_picture.jpg";
import { CaretRight, CoinVertical } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import api from "../api";
import { useParams, Link, useLocation, Outlet, useNavigate } from "react-router-dom";
const defaultProfilePic = "/src/assets/img/ppdefault.jpg";

export default function Dashboard() {
    const [user, setUser] = useState({});
    const [point, setPoint] = useState(0);
    const [loading, setLoading] = useState(true); // Mulai dengan true untuk loading state
    const [imagePreview, setImagePreview] = useState(defaultProfilePic);
    const [learnModules, setLearnModules] = useState([]);
    const [quizModules, setQuizModules] = useState([]);
    const [quizLimit, setQuizLimit] = useState(3);

    useEffect(() => {
        async function fetchData() {
            setLoading(true); // Selalu set loading true di awal fetch
            try {
                // 1. Ambil data user terlebih dahulu
                const userRes = await api.get("/user");
                const currentUser = userRes.data;
                setUser(currentUser);

                if (currentUser.foto_profil) {
                    setImagePreview(
                        `http://localhost:8000/storage/${currentUser.foto_profil}`
                    );
                }

                // 2. SETELAH user didapat, gunakan ID-nya untuk mengambil poin
                if (currentUser && currentUser.id) {
                    const pointRes = await api.get(`/${currentUser.id}/poin`);
                    setPoint(pointRes.data.total_points || 0);
                }

                const learnModulesRes = await api.get('/belajar-bahasa-isyarat');
                const modulesWithProgress = await Promise.all(
                    learnModulesRes.data.map(async (module) => {
                        let progress = 0;
                        if (currentUser && currentUser.id && module.id) {
                            try {
                                const progressRes = await api.get(`/progress/${currentUser.id}/${module.id}`);
                                progress = progressRes.data;
                            } catch (progressErr) {
                                console.warn(`Gagal ambil progress untuk modul ID ${module.id}:`, progressErr);
                            }
                        }
                        return { ...module, progress };
                    })
                );
                setLearnModules(modulesWithProgress);

                const quizModulesRes = await api.get('/kuis');
                setQuizModules(quizModulesRes.data);

            } catch (err) {
                console.error("Gagal mengambil data dashboard:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

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

                {/* Backsvg */}
                <svg
                    className="absolute -top-10 -z-10"
                    width="430"
                    height="306"
                    viewBox="0 0 430 306"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 0H430V227.622C258.122 332.698 164.357 331.553 0 227.622V0Z"
                        fill="url(#paint0_linear_192_3935)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_192_3935"
                            x1="215"
                            y1="0"
                            x2="215"
                            y2="322.755"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#E9E5F5" />
                            <stop offset="1" stop-color="#ADA8D5" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="container flex flex-col items-center mx-auto gap-4 mb-24 h-full">
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-xl font-semibold text-grey-100">
                            Halo, {loading ? "..." : user.name}!
                        </h1>
                        <div className="w-16 h-16">
                            <img src={logo} alt="Logo Takarasa" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2 mb-6">
                        <div className="h-[100px] w-[100px] rounded-full">
                            <img
                                src={imagePreview
                                }
                                alt="Profile Picture"
                                className="w-24 h-24 object-cover rounded-full"
                            />
                        </div>
                        <h1 className="text-xs font-bold text-grey-100">
                            {loading ? "..." : user.name}
                        </h1>
                        <Link to={user.id ? `/${user.id}/penukaran-poin` : '#'}>
                            <div className="flex justify-center items-center gap-1 w-28 h-8 bg-brand-accent rounded-full text-white">
                                <CoinVertical size={16} weight="fill" />
                                <p className="text-xs font-bold">{point} Poin</p>
                                <CaretRight size={16} />
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col w-full bg-grey-10 p-4 rounded-2xl gap-3">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="text-xl text-grey-100 font-semibold text-left">
                                Belajar Bahasa Isyarat
                            </h1>
                            <div>
                                <Link
                                    to="/belajar-bahasa-isyarat"
                                    className="text-xs text-right underline text-brand-primary"
                                >
                                    Lihat Selengkapnya
                                </Link>
                            </div>
                        </div>
                        <div className="flex relative justify-between items-center gap-3">
                            {learnModules.length > 0 ? (
                                learnModules.map((module) => (
                                    <div className="rounded-md w-full">
                                        <div className="flex flex-col py-2 px-3 gap-[2px] bg-brand-primary rounded-t-md">
                                            <div className="flex justify-between w-full">
                                                <p className="text-xs font-normal text-grey-100">
                                                    Progress
                                                </p>
                                                <p className="text-xs font-normal text-grey-100">
                                                    {module.progress}%
                                                </p>
                                            </div>
                                            <div>
                                                <Progress value={module.progress} />
                                            </div>
                                        </div>
                                        <div className="flex justify-between py-2 px-3 gap-2 bg-grey-10 border border-brand-primary items-center rounded-b-md">
                                            <img
                                                src={module.icon}
                                                className="w-8 h-8"
                                                alt="" />
                                            <div>
                                                <p className="text-center font-medium text-base">
                                                    {module.name}
                                                </p>
                                            </div>
                                            <div className="mr-4"></div>
                                        </div>
                                    </div>

                                ))
                            ) : (
                                <p>Tidak ada modul belajar bahasa isyarat tersedia.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col w-full bg-grey-10 p-4 rounded-2xl gap-3">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="text-xl text-grey-100 font-semibold text-left">
                                Bermain Bersama Taka
                            </h1>
                            <div>
                                <Link
                                    to="/kuis"
                                    className="text-xs text-right underline text-brand-primary"
                                >
                                    Lihat Selengkapnya
                                </Link>
                            </div>
                        </div>
                        <p className="text-base text-grey-100">
                            Bermain bersama Taka dan dapatkan poin untuk berbagai voucher menarik!
                        </p>
                        <div className="flex justify-center items-center gap-3">
                            {quizModules.length > 0 ? (
                                quizModules.slice(0, quizLimit).map((module) => (
                                    <div className="rounded-md w-full">
                                        <div className="flex flex-col py-2 px-3 gap-[2px] bg-grey-20 rounded-t-md">
                                            <div className="flex justify-between w-full">
                                                <p></p>
                                                <p className="text-xs font-bold text-grey-50">
                                                    {module.score}/100
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-between py-2 px-3 gap-[2px] bg-grey-10 border border-grey-20 rounded-b-md">
                                            <img 
                                            src={module.icon}
                                            className="w-8 h-8" alt="" />
                                            <div>
                                                <p className="text-center font-medium text-base">
                                                    {module.title}
                                                </p>
                                            </div>
                                            <div className="mr-4"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Tidak ada kuis tersedia.</p>
                            )}
                        </div>
                    </div>
                </div>
                <Navbar />
            </div>
        </>
    );
}
