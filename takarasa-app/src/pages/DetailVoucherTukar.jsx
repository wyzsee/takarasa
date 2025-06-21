import { Button } from "@/components/ui/button";
import PopupRedeem from "@/components/ui/PopupRedeem";
import ProfilePicture from "@/assets/img/profile_picture.jpg";
import Voucher from "@/assets/img/voucher/10.png";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { CaretLeft, CoinVertical, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { useParams, Link } from "react-router-dom";

export default function Dashboard() {
    const { id } = useParams();
    const [userData, setUserData] = useState("");
    const [voucher, setVoucher] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPoints, setTotalPoints] = useState(0);
    const [redeemPopup, setRedeemPopup] = useState(false);
    const [loadingVoucher, setLoadingVoucher] = useState(true);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [errorVoucher, setErrorVoucher] = useState(null);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await api.get("/user");
                setUserData(res.data);
                console.log("User data fetched:", res.data.name);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        }
        getUser();
    }, []);

    useEffect(() => {
        async function getPoints() {
            try {
                const res = await api.get(`/${userData.id}/poin`);
                setTotalPoints(res.data.total_points);
            } catch (err) {
                console.log("Gagal mengambil poin.")
            }
        }
        getPoints();
    },);

    useEffect(() => {
        console.log("Attempting to fetch voucher for ID:", id);
        async function getVoucherDetails() {
            try {
                setLoadingVoucher(true);
                setErrorVoucher(null);
                const res = await api.get(`/voucher/${id}/tukar`);
                setVoucher(res.data);
            } catch (err) {
                console.error("Failed to fetch voucher:", err);
                setErrorVoucher("Maaf, voucher tidak dapat dimuat atau tidak ditemukan.");
            } finally {
                setLoadingVoucher(false);
            }
        }
        getVoucherDetails();
    }, [id]);

    const handleClosePopup = () => {
        setRedeemPopup(false);
    }

    const handleOpenPopup = (voucher) => {
        setSelectedVoucher(voucher);
        setRedeemPopup(true);
    }

    const handleRedeemVoucher = async () => {
        console.log({ totalPoints });
        if (totalPoints < selectedVoucher.point_cost) {
            console.log('Poin tidak mencukupi.')
            return;
        } else {
            setIsRedeeming(true);
            try {
                const res = await api.post(`/voucher/${selectedVoucher.id}/redeem`);
                console.log('Voucher berhasil diredeem');
            } catch (err) {
                console.log('Gagal redeem');
            }
        }
    }

    if (loadingVoucher) {
        return (
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6 justify-center">
                <p className="text-xl font-bold text-brand-primary">Memuat detail voucher...</p>
            </div>
        );
    }

    if (errorVoucher) {
        return (
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6 justify-center text-center">
                <p className="text-xl font-bold text-red-500 mb-4">{errorVoucher}</p>
                <Link to="/voucher-dimiliki" className="text-brand-primary underline">Kembali ke Daftar Voucher</Link>
            </div>
        );
    }

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return format(new Date(dateString), 'dd MMMM yyyy', { locale: idLocale });
        } catch (err) {
            console.error("Error formatting date", err);
        }
    };

    const formattedActiveFrom = formatDateForDisplay(voucher.active_from);
    const formattedActiveUntil = formatDateForDisplay(voucher.active_until);

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
                    <Link to={`/${userData.id}/penukaran-poin`} className="left-0 absolute">
                        <CaretLeft size={24} />
                    </Link>

                    <h1 className="w-full text-center text-xl font-semibold">
                        Detail Voucher
                    </h1>
                </header>
                <div className="container w-full justify-between flex-grow flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="flex flex-col w-full gap-4">
                        <div className="flex w-full justify-evenly bg-grey-10 p-4 rounded-2xl border-2 border-dashed border-brand-primary gap-3">
                            <div className="flex justify-center items-center bg-brand-primary50 w-24 h-24 rounded-xl flex-shrink-0">
                                <img src={Voucher} alt="" />
                            </div>
                            <div className="flex flex-col justify-center flex-grow">
                                <div className="flex flex-col gap-0.5">
                                    <h1 className="font-bold text-base w-56">
                                        {voucher.name}
                                    </h1>
                                    <p className="text-xs text-grey-100 w-56 whitespace-nowrap overflow-hidden text-ellipsi">
                                        {voucher.description}
                                    </p>
                                    <p className="font-bold text-xs text-grey-100 w-56">
                                        {voucher.point_cost} poin
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <h1 className="font-semibold text-xl text-grey-100 ">
                                Deskripsi
                            </h1>
                            <p className="text-grey-100 text-base">
                                {voucher.description}
                            </p>
                            <h1 className="font-semibold text-xl text-grey-100 ">
                                Masa Berlaku
                            </h1>
                            <p className="text-grey-100 text-base">
                                {formattedActiveFrom} - {formattedActiveUntil}
                            </p>
                        </div>
                    </div>
                    <Button
                        asChild
                        type="submit"
                        className="bottom-0 h-14 w-full p-[10px] bg-grey-100 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                        disabled={loading}
                    >
                        <Link
                            onClick={() => handleOpenPopup(voucher)}>
                            {loading ? "Memproses..." : "Tukar"}</Link>
                    </Button>
                </div>
            </div>
            {redeemPopup && (
                <PopupRedeem
                    cost={selectedVoucher.point_cost}
                    name={selectedVoucher.name}
                    my_points={totalPoints}
                    onProceed={handleRedeemVoucher}
                    onClose={handleClosePopup}
                    isRedeeming={isRedeeming}
                />
            )}
        </>
    );
}
