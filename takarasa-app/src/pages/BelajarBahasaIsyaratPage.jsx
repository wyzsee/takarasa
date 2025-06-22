import { Button } from "@/components/ui/button";
import { CaretLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState("");
    const [learns, setLearns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progressData, setProgressData] = useState({});

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const userRes = await api.get("/user");
                setUser(userRes.data);
                const fetchedUser = userRes.data;

                const learnsRes = await api.get("/belajar-bahasa-isyarat");
                setLearns(learnsRes.data);
                const fetchedLearns = learnsRes.data;

                if (fetchedUser && fetchedLearns.length > 0) {
                    const newProgressData = {};
                    for (const learn of fetchedLearns) {
                        try {
                            const progressRes = await api.get(`/progress/${fetchedUser.id}/${learn.id}`);
                            newProgressData[learn.id] = progressRes.data;
                        } catch (progressErr) {
                            console.error(`Gagal ambil progress untuk learn ID ${learn.id}:`, progressErr);
                            newProgressData[learn.id] = 0; 
                        }
                    }
                    setProgressData(newProgressData);
                }

            } catch (err) {
                console.error("Gagal ambil data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6 justify-center">
                <p>Loading data...</p>
            </div>
        );
    }

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

                <header className="relative flex items-center justify-center p-4 w-full">
                    <Link to="/belajar" className="left-0 absolute">
                        <CaretLeft
                            size={24}
                        />
                    </Link>

                    <h1 className="w-full text-center text-xl font-semibold">
                        Belajar Bahasa Isyarat
                    </h1>
                </header>

                <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="flex flex-wrap relative justify-evenly w-full items-center gap-3">
                        {learns.map((learn, id) => (
                            <div className="rounded-xl" key={learn.id}>
                                <div className="flex flex-col p-4 gap-1 w-44 bg-brand-primary rounded-xl">
                                    <div className="flex flex-col gap-2 justify-between items-center w-full">
                                        <img src={learn.icon} alt="" />
                                        <div className="flex flex-col gap-1 items-center">
                                            <p className="text-base font-bold text-white">
                                                {learn.name}
                                            </p>
                                            <p className="text-xs font-normal text-grey-10">
                                                {learn.total_material} Kata
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-1 w-full">
                                            <div className="flex w-full justify-between">
                                                <p className="text-xs font-normal text-grey-10">
                                                    Progress
                                                </p>
                                                <p className="text-xs font-normal text-grey-10">
                                                    {progressData[learn.id] !== undefined ? `${progressData[learn.id]}%` : "Loading..."}
                                                </p>
                                            </div>
                                            <Progress value={progressData[learn.id] || 0} />
                                        </div>
                                        <Button
                                            asChild
                                            type="submit"
                                            className="w-full h-12 bg-grey-100 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                                            disabled={loading}
                                        >
                                            <Link to={`/detail-belajar-bahasa-isyarat/${learn.id}`}>
                                                {loading
                                                    ? "Memproses..."
                                                    : "Lihat"}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
