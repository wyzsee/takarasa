import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import logo from "@/assets/img/logo.png";
import animasiHome from "@/assets/img/def_pose.png";
import bookHome from "@/assets/img/book dashboard icon.png";
// Hapus import eventPhoto karena akan diambil dari API
// import eventPhoto from "@/assets/img/event photo.jpg";
import { Clock, MapPinLine } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false); // Tetap untuk tombol terjemahan jika diperlukan
    const navigate = useNavigate();

    // State untuk data acara di bagian Informasi
    const [featuredEvent, setFeaturedEvent] = useState(null);
    const [eventLoading, setEventLoading] = useState(true);
    const [eventError, setEventError] = useState(null);

    // useEffect untuk mengambil data user
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

    // useEffect untuk mengambil data acara
    useEffect(() => {
        async function fetchFeaturedEvent() {
            setEventLoading(true);
            try {
                const response = await api.get('/acara');
                // Ambil acara pertama dari gathering, jika tidak ada, ambil dari workshop
                const gathering = response.data.gathering || [];
                const workshop = response.data.workshop || [];
                
                if (gathering.length > 0) {
                    setFeaturedEvent(gathering[0]);
                } else if (workshop.length > 0) {
                    setFeaturedEvent(workshop[0]);
                } else {
                    setFeaturedEvent(null); // Tidak ada acara
                }
                setEventError(null);
            } catch (err) {
                console.error("Gagal mengambil data acara:", err);
                setEventError("Gagal memuat informasi acara.");
            } finally {
                setEventLoading(false);
            }
        }

        fetchFeaturedEvent();
    }, []); 

    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center justify-center mx-auto overflow-hidden px-6">
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

                <div className="container flex flex-col items-center mx-auto gap-4 mb-24">
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-xl font-semibold text-grey-100">
                            Halo, {userName}!
                        </h1>
                        <div className="w-16 h-16">
                            <img src={logo} alt="Logo Takarasa" />
                        </div>
                    </div>


                    <div className="flex flex-col bg-brand-primary w-full h-full p-4 rounded-2xl gap-3">
                        <h1 className="text-xl font-semibold text-grey-10 text-center">
                            Terjemahan
                        </h1>
                        <div className="flex justify-between">
                            <p className="w-[70%] text-base font-medium text-grey-10">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Deserunt nostrum neque animi
                                harum accusamus. Accusantium temporibus hic.
                            </p>
                            <div className="">
                                <img src={animasiHome} alt="" />
                            </div>
                        </div>
                        <div className="flex max-w-full gap-2">
                            <Button
                                asChild
                                type="submit"
                                className="w-1/2 h-12 bg-grey-100 text-xs text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                                disabled={loading}
                            >
                                <Link to="/terjemahan-isyarat">
                                    {loading
                                        ? "Memproses..."
                                        : "Bahasa Isyarat ke Tulisan"}
                                </Link>
                            </Button>
                            <Button
                                type="submit"
                                className="w-1/2 h-12 bg-grey-100 text-xs text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                                disabled={loading}
                                onClick={() => navigate("/text-to-sign")}
                            >
                                {loading ? "Memproses..." : "Tulisan ke Bahasa Isyarat"}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col w-full bg-grey-10 p-4 rounded-2xl gap-3">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="text-xl text-grey-100 font-semibold text-left">
                                Progress Belajar
                            </h1>
                            <div>
                                <a
                                    href=""
                                    className="text-xs text-right underline text-brand-primary"
                                >
                                    Lihat Selengkapnya
                                </a>
                            </div>
                        </div>
                        <div className="flex relative justify-between items-center">
                            <p className="w-[70%] text-base font-medium text-grey-100">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Alias pariatur reiciendis
                                temporibus nulla illo.
                            </p>
                            <svg
                                width="179"
                                height="153"
                                viewBox="0 0 179 153"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute -right-8 -top-9  z-0"
                            >
                                <g filter="url(#filter0_f_155_1705)">
                                    <circle
                                        cx="93"
                                        cy="93"
                                        r="48"
                                        fill="#D4D0F2"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_f_155_1705"
                                        x="0"
                                        y="0"
                                        width="186"
                                        height="186"
                                        filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB"
                                    >
                                        <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation="22.5"
                                            result="effect1_foregroundBlur_155_1705"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                            <div className="pr-8 z-10">
                                <img src={bookHome} alt="" />
                            </div>
                        </div>
                    </div>

                    {/* --- KARTU INFORMASI (DIMODIFIKASI) --- */}
                    <div className="flex flex-col w-full bg-grey-10 p-4 rounded-2xl gap-3 relative overflow-hidden">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="text-xl text-grey-100 font-semibold text-left">
                                Informasi
                            </h1>
                            <div>
                                <Link to="/informasi" className="text-xs text-right underline text-brand-primary">
                                    Lihat Selengkapnya
                                </Link>
                            </div>
                        </div>

                        {eventLoading ? (
                            <p className="text-center text-grey-100">Memuat informasi...</p>
                        ) : eventError ? (
                            <p className="text-center text-red-500">{eventError}</p>
                        ) : featuredEvent ? (
                            // Wrapper Link untuk membuat seluruh card bisa diklik
                            <Link to={featuredEvent.link_detail} className="flex flex-col gap-3">
                                <div className="w-full h-[157px]">
                                    <img
                                        src={featuredEvent.image_path}
                                        className="w-full h-full object-cover object-center rounded-lg"
                                        alt={featuredEvent.title}
                                    />
                                </div>
                                <p className="text-base font-medium text-grey-100">
                                    {featuredEvent.title}
                                </p>
                                <div className="flex gap-3">
                                    {/* Pastikan backend Anda menyediakan field 'time' dan 'location' */}
                                    <div className="flex items-center text-grey-50 gap-1">
                                        <Clock size={14} />
                                        <p className="text-xs font-normal">{featuredEvent.time || "Segera"}</p>
                                    </div>
                                    <div className="flex items-center text-grey-50 gap-1">
                                        <MapPinLine size={14} />
                                        <p className="text-xs font-normal">{featuredEvent.location || "Online"}</p>
                                    </div>
                                </div>
                                <div className="flex relative justify-between items-center">
                                    <p className="w-[70%] text-xs font-normal text-grey-100">
                                        {/* Memotong deskripsi jika terlalu panjang */}
                                        {featuredEvent.description.length > 80
                                            ? `${featuredEvent.description.substring(0, 80)}...`
                                            : featuredEvent.description
                                        }
                                    </p>
                                    {/* Tombol ini sekarang ada di dalam Link wrapper, 
                                        jadi secara teknis tidak perlu logic navigasi lagi,
                                        tapi kita tetap biarkan sebagai bagian dari desain */}
                                    <div className="w-1/2 flex justify-end">
                                        <Button
                                            asChild
                                            className="h-12 bg-grey-100 text-xs text-white rounded-full py-3 px-6 font-semibold ease-in-out duration-300 hover:bg-grey-80 z-10"
                                        >
                                            <span>Selengkapnya</span>
                                        </Button>
                                    </div>
                                    <svg width="199" height="189" viewBox="0 0 199 189" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -z-1 -right-5 -bottom-5">
                                        {/* ... SVG background ... */}
                                    </svg>
                                </div>
                            </Link>
                        ) : (
                            <p className="text-center text-grey-100">Tidak ada informasi acara saat ini.</p>
                        )}
                    </div>

                </div>
                <Navbar />
            </div>
        </>
    );
}
