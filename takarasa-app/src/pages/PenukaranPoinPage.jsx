import { Button } from "@/components/ui/button";
import PopupRedeem from "@/components/ui/PopupRedeem";
import ProfilePicture from "@/assets/img/profile_picture.jpg";
import Voucher from "@/assets/img/voucher/10.png";
import { CaretLeft, CoinVertical, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { useParams, Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
const defaultProfilePic = "/src/assets/img/ppdefault.jpg";

export default function Dashboard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [vouchers, setVouchers] = useState([]);
    const [loadingVouchers, setLoadingVouchers] = useState(false);
    const [totalPoints, setTotalPoints] = useState(0);
    const [voucherError, setVoucherError] = useState(null);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [redeemPopup, setRedeemPopup] = useState(false);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [loading, setLoading] = useState(false);
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
            } finally {
                setLoading(false); // Set loading ke false setelah selesai (baik sukses maupun gagal)
            }
        }
      
        async function getVouchers() {
            try {
                setLoadingVouchers(true);
                setVoucherError(null);
                const res = await api.get("/vouchers");
                setVouchers(res.data);
            } catch (err) {
                console.error("Gagal ambil voucher:", err);
                setVoucherError("gagal memuat voucher.");
            } finally {
                setLoadingVouchers(false);
            }
        }
        fetchUser();
        getVouchers();
    }, []);

    useEffect(() => {
        async function getPoints() {
            try {
                const res = await api.get(`/${id}/poin`);
                setTotalPoints(res.data.total_points);
            } catch (err) {
                console.log("Gagal mengambil poin.")
            }
        }
        getPoints();
    }, [id]);

    const handleClosePopup = () => {
        setRedeemPopup(false);
    }

    const handleOpenPopup = (voucher) => {
        setSelectedVoucher(voucher);
        setRedeemPopup(true);
    }

    const handleRedeemVoucher = async () => {
        console.log({totalPoints});
        if (totalPoints < selectedVoucher.point_cost){
            console.log('Poin tidak mencukupi.')
            return;
        } else {
            setIsRedeeming(true);
            try {
                const res = await api.post(`/voucher/${selectedVoucher.id}/redeem`);
                console.log('Voucher berhasil diredeem');
            } catch (err){
                console.log('Gagal redeem');
            }
        }
    }

    if (loadingVouchers) {
        <p className="font-jakarta text-center min-h-screen text-xl font-bold text-brand-primary flex items-center justify-center">Memuat voucher...</p>
    }

    if (voucherError)
        <p className="font-jakarta text-center min-h-screen text-xl font-bold text-error flex items-center justify-center">{voucherError}</p>

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
                        <CaretLeft size={24} />
                    </Link>

                    <h1 className="w-full text-center text-xl font-semibold">
                        Penukaran Poin
                    </h1>
                </header>

                <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="flex justify-between w-full bg-brand-primary rounded-2xl p-4">
                        <div className="flex gap-3">
                            <div className="h-[64px] w-[64px] rounded-full">
                                <img
                                    src={
                                        imagePreview
                                    }
                                    alt="Profile Picture"
                                    className=" w-16 h-16 object-cover rounded-full"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-base font-semibold text-grey-10">
                                    {user.name ? user.name : "..."}!
                                </h1>
                                <div className="flex justify-center items-center gap-1 w-28 h-8 bg-brand-accent rounded-full text-white">
                                    <CoinVertical size={16} weight="fill" />
                                    <p className="text-xs font-bold">
                                        {totalPoints} Poin
                                    </p>
                                    <CaretRight size={16} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link
                                to={`/${userData.id}/riwayat-penukaran-poin`}
                                className="text-xs text-right underline text-grey-10"
                            >
                                Riwayat
                            </Link>
                        </div>
                    </div>

                    <div className="flex w-full justify-between">
                        <h1 className="font-semibold text-xl">Voucher</h1>
                        <div>
                            <Link
                                to={`/${userData.id}/voucher-dimiliki`}
                                className="text-xs text-right underline text-brand-primary"
                            >
                                Dimiliki
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-4">
                        {vouchers.map((voucher, index) => (
                            <div key={voucher.id} className="flex w-full justify-evenly bg-grey-10 p-4 rounded-2xl border-2 border-dashed border-brand-primary gap-3">
                                <div className="flex justify-center items-center bg-brand-primary50 w-24 h-24 rounded-xl flex-shrink-0">
                                    <img src={Voucher} alt="" />
                                </div>
                                <div className="flex flex-col justify-between items-center flex-grow">
                                    <div className="flex flex-col gap-0.5">
                                        <h1 className="font-bold text-base w-56">
                                            {voucher.name}
                                        </h1>
                                        <p className="text-xs text-grey-100 w-56 whitespace-nowrap overflow-hidden text-ellipsis">
                                            {voucher.description}
                                        </p>
                                        <p className="font-bold text-xs text-grey-100">
                                            {voucher.point_cost} poin
                                        </p>
                                    </div>
                                    <div className="flex justify-between w-56">
                                        <div>
                                            <Link
                                                to={`/voucher/${voucher.id}/tukar`}
                                                className="text-xs text-right font-bold underline text-grey-100"
                                            >
                                                Selengkapnya
                                            </Link>
                                        </div>
                                        <Button
                                            asChild
                                            type="submit"
                                            className="w-[120px] h-8 bg-brand-primary text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                                            disabled={loading}
                                        >
                                            <Link 
                                            onClick={() => handleOpenPopup(voucher)}>
                                                {loading ? "Memproses..." : "Tukar"}

                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
