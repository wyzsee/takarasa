import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import logo from "@/assets/img/logo.png";
import ProfilePicture from "@/assets/img/profile_picture.jpg";
import { CaretRight, CoinVertical } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import api from "../api";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
const defaultProfilePic = "/src/assets/img/ppdefault.jpg";

export default function Dashboard() {
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
            } finally {
                setLoading(false); // Set loading ke false setelah selesai (baik sukses maupun gagal)
            }
        }
        fetchUser();
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
                            Halo, {user.name ? user.name : "..."}!
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
                            {user.name ? user.name : "..."}
                        </h1>
                        <Link to="/penukaran-poin">
                            <div className="flex justify-center items-center gap-1 w-28 h-8 bg-brand-accent rounded-full text-white">
                                <CoinVertical size={16} weight="fill" />
                                <p className="text-xs font-bold">200 Poin</p>
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
                            <div className="rounded-md w-full">
                                <div className="flex flex-col py-2 px-3 gap-[2px] bg-brand-primary rounded-t-md">
                                    <div className="flex justify-between w-full">
                                        <p className="text-xs font-normal text-grey-100">
                                            Progress
                                        </p>
                                        <p className="text-xs font-normal text-grey-100">
                                            20%
                                        </p>
                                    </div>
                                    <div>
                                        <Progress value={20} />
                                    </div>
                                </div>
                                <div className="flex justify-between py-2 px-3 gap-[2px] bg-grey-10 border border-brand-primary rounded-b-md">
                                    <svg
                                        width="28"
                                        height="31"
                                        viewBox="0 0 28 31"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M0 18.8108L1.56996 6.55805L2.93193 6.18604L1.36197 18.4388L0 18.8108Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M1.57031 6.55806L4.03329 6.20063L5.39526 5.82861L2.93228 6.18605L1.57031 6.55806Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M4.0332 6.20063L9.65625 17.4095L11.0182 17.0375L5.39517 5.82861L4.0332 6.20063Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M9.65512 17.4096L7.58398 17.7102L8.94596 17.3382L11.0171 17.0376L9.65512 17.4096Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M7.58513 17.71L6.4082 15.2983L7.77017 14.9263L8.9471 17.338L7.58513 17.71Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6.40728 15.2983L2.37695 15.8832L3.73892 15.5112L7.76925 14.9263L6.40728 15.2983Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.3771 15.8832L2.05664 18.5123L3.41861 18.1403L3.73907 15.5112L2.3771 15.8832Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.05714 18.5124L0 18.8109L1.36197 18.4389L3.41912 18.1404L2.05714 18.5124Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.59766 13.9145L5.53643 13.488L6.89841 13.116L3.95963 13.5425L2.59766 13.9145Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.53549 13.4881L2.79102 7.89814L4.15299 7.52612L6.89746 13.1161L5.53549 13.4881Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.79102 7.89816L3.32279 7.82099L4.68477 7.44897L4.15299 7.52615L2.79102 7.89816Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M3.32374 7.82099L2.59766 13.9146L3.95963 13.5426L4.68571 7.44897L3.32374 7.82099Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M0 18.8109L1.56996 6.55812L4.03294 6.20068L9.65598 17.4096L7.58485 17.7101L6.40792 15.2984L2.3776 15.8833L2.05714 18.5123L0 18.8109ZM2.59695 13.9146L5.53573 13.4881L2.79126 7.89812L3.32304 7.82095L2.59695 13.9146Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M11.7969 11.2817L15.603 0L16.965 0.325759L13.1588 11.6074L11.7969 11.2817Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.6035 0L19.7826 1.52752C20.4392 1.76751 20.9539 2.10307 21.3267 2.53419C21.7118 2.95846 21.9486 3.45325 22.0369 4.01854C22.1376 4.57699 22.0755 5.18936 21.8507 5.85566C21.677 6.37053 21.3893 6.8097 20.9876 7.17319C20.5982 7.52982 20.0879 7.75724 19.4567 7.85541L20.8187 8.18117C21.4499 8.083 21.9601 7.85558 22.3496 7.49895C22.7513 7.13546 23.039 6.69628 23.2127 6.18142C23.4375 5.51512 23.4995 4.90275 23.3989 4.3443C23.3106 3.77901 23.0738 3.28422 22.6887 2.85995C22.3159 2.42883 21.8012 2.09327 21.1446 1.85328L16.9655 0.325759L15.6035 0Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.457 7.85539L19.7789 6.90137L21.1409 7.22713L20.819 8.18115L19.457 7.85539Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.7787 6.90137C20.1952 7.29175 20.4926 7.6953 20.6709 8.11204C20.8493 8.52878 20.9314 8.95005 20.9173 9.37583C20.9033 9.80162 20.8247 10.2265 20.6816 10.6505C20.3172 11.7307 19.7161 12.4636 18.8784 12.8492C18.218 13.1522 17.4669 13.2042 16.625 13.0054L17.987 13.3311C18.8289 13.53 19.58 13.4779 20.2404 13.175C21.0781 12.7894 21.6792 12.0565 22.0436 10.9763C22.1867 10.5523 22.2652 10.1274 22.2793 9.70159C22.2934 9.27581 22.2113 8.85454 22.0329 8.4378C21.8546 8.02106 21.5572 7.6175 21.1407 7.22713L19.7787 6.90137Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.6244 13.0054C16.4139 12.9557 16.1978 12.8903 15.976 12.8093L11.7969 11.2817L13.1588 11.6075L17.3379 13.135C17.5598 13.2161 17.7759 13.2815 17.9864 13.3312L16.6244 13.0054Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M14.2207 10.126L16.7761 11.06C16.8513 11.0875 16.9253 11.1103 16.9981 11.1285L18.3601 11.4543C18.2873 11.4361 18.2133 11.4133 18.138 11.3858L15.5827 10.4517L14.2207 10.126Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.9969 11.1287C17.3789 11.2242 17.727 11.1911 18.041 11.0297C18.4271 10.8306 18.7036 10.4837 18.8705 9.98902C19.0374 9.49434 19.03 9.04369 18.8482 8.63704C18.6753 8.23364 18.3538 7.946 17.8835 7.77411L15.3281 6.84009L16.6901 7.16585L19.2455 8.09987C19.7157 8.27176 20.0373 8.5594 20.2102 8.9628C20.3919 9.36944 20.3994 9.8201 20.2325 10.3148C20.0656 10.8095 19.7891 11.1563 19.403 11.3554C19.0889 11.5169 18.7409 11.5499 18.3588 11.4545L16.9969 11.1287Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.3293 6.84009L14.2207 10.1262L15.5827 10.4519L16.6913 7.16585L15.3293 6.84009Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.9375 5.03809L18.3997 5.93806C18.4593 5.95985 18.5181 5.97784 18.5759 5.99202L19.9379 6.31778C19.88 6.3036 19.8213 6.28561 19.7617 6.26382L17.2995 5.36385L15.9375 5.03809Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M18.5749 5.99192C18.8786 6.06636 19.158 6.03587 19.413 5.90045C19.72 5.72914 19.9399 5.44663 20.0727 5.05291C20.2055 4.65918 20.2002 4.30568 20.0567 3.99241C19.9132 3.67914 19.6552 3.45439 19.2825 3.31818L16.8203 2.41821L18.1823 2.74397L20.6445 3.64394C21.0171 3.78015 21.2752 4.0049 21.4187 4.31817C21.5622 4.63144 21.5675 4.98494 21.4347 5.37867C21.3018 5.77239 21.0819 6.0549 20.775 6.22621C20.52 6.36163 20.2406 6.39212 19.9369 6.31767L18.5749 5.99192Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.8213 2.41821L15.9375 5.03798L17.2995 5.36374L18.1833 2.74397L16.8213 2.41821Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M11.7969 11.2817L15.603 0L19.7821 1.52752C20.4387 1.76751 20.9534 2.10307 21.3263 2.53419C21.7114 2.95846 21.9481 3.45325 22.0365 4.01854C22.1371 4.57699 22.075 5.18936 21.8502 5.85566C21.6765 6.37053 21.3888 6.8097 20.9871 7.17319C20.5977 7.52982 20.0874 7.75724 19.4563 7.85541L19.7781 6.90139C20.1946 7.29177 20.492 7.69533 20.6704 8.11207C20.8487 8.52881 20.9308 8.95008 20.9168 9.37586C20.9027 9.80165 20.8241 10.2265 20.6811 10.6506C20.3166 11.7308 19.7155 12.4636 18.8778 12.8492C18.0523 13.2279 17.0851 13.2146 15.976 12.8092L11.7969 11.2817ZM14.22 10.1261L16.7754 11.0601C17.2456 11.232 17.6677 11.2218 18.0415 11.0296C18.4276 10.8305 18.7041 10.4836 18.871 9.98896C19.0379 9.49428 19.0305 9.04362 18.8487 8.63697C18.6758 8.23357 18.3543 7.94593 17.884 7.77404L15.3286 6.84002L14.22 10.1261ZM15.9366 5.03798L18.3988 5.93795C18.7715 6.07416 19.1096 6.06166 19.4131 5.90045C19.7201 5.72914 19.94 5.44663 20.0728 5.0529C20.2057 4.65918 20.2004 4.30568 20.0569 3.99241C19.9134 3.67914 19.6553 3.45439 19.2827 3.31818L16.8204 2.41821L15.9366 5.03798Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.8472 30.1257C19.5056 30.0448 19.1738 29.9247 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C21.7609 18.0051 22.0748 18.0416 22.3731 18.1102L23.7351 18.436C23.4367 18.3674 23.1229 18.3309 22.7936 18.3265C22.1439 18.3137 21.4596 18.4675 20.7407 18.7879C20.0218 19.1083 19.4017 19.547 18.8803 20.1041C18.3559 20.6513 17.945 21.2823 17.6476 21.9971C17.3561 22.6981 17.1944 23.4532 17.1624 24.2624C17.1364 25.0578 17.2518 25.863 17.5086 26.6779C17.7654 27.4928 18.1279 28.1878 18.5962 28.763C19.0644 29.3381 19.6036 29.7808 20.2138 30.0911C20.5358 30.2504 20.8676 30.3705 21.2092 30.4514L19.8472 30.1257Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M22.373 18.1101C22.6714 18.1787 22.9542 18.2794 23.2215 18.4122C23.753 18.668 24.1862 19.018 24.5209 19.4623L25.8829 19.7881C25.5481 19.3438 25.115 18.9938 24.5835 18.738C24.3162 18.6052 24.0333 18.5045 23.735 18.4359L22.373 18.1101Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.5206 19.4624L23.1406 21.0347L24.5026 21.3605L25.8825 19.7882L24.5206 19.4624Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M23.1419 21.0348C22.7799 20.5691 22.3185 20.2597 21.7578 20.1064L23.1198 20.4322C23.6805 20.5854 24.1418 20.8949 24.5038 21.3606L23.1419 21.0348Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.7562 20.1063C21.7224 20.0965 21.6884 20.0875 21.6543 20.0793L23.0163 20.4051C23.0504 20.4133 23.0843 20.4223 23.1182 20.432L21.7562 20.1063Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.6552 20.0795C21.121 19.9515 20.5541 20.0211 19.9543 20.2884C19.3253 20.5688 18.8192 20.9791 18.436 21.5193C18.0619 22.0556 17.8297 22.6685 17.7396 23.3581C17.6585 24.0437 17.7386 24.7694 17.9799 25.5352C18.2213 26.3011 18.5635 26.9156 19.0067 27.3787C19.4198 27.7921 19.8877 28.0626 20.4103 28.1902L21.7722 28.516C21.2497 28.3883 20.7818 28.1178 20.3687 27.7044C19.9255 27.2413 19.5832 26.6268 19.3419 25.861C19.1005 25.0952 19.0204 24.3695 19.1016 23.6839C19.1917 22.9943 19.4238 22.3813 19.798 21.8451C20.1812 21.3048 20.6872 20.8945 21.3163 20.6142C21.916 20.3469 22.483 20.2773 23.0171 20.4053L21.6552 20.0795Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.4102 28.1902C20.4556 28.2013 20.5015 28.2113 20.5477 28.2202L21.9097 28.546C21.8634 28.5371 21.8176 28.527 21.7721 28.5159L20.4102 28.1902Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5469 28.2201C21.1342 28.3278 21.7424 28.2415 22.3715 27.9612C23.0095 27.6768 23.4975 27.2578 23.8354 26.7041C24.1702 26.1406 24.3454 25.5419 24.3608 24.908L25.7228 25.2337C25.7073 25.8676 25.5322 26.4663 25.1974 27.0299C24.8595 27.5836 24.3715 28.0026 23.7335 28.2869C23.1044 28.5673 22.4962 28.6536 21.9088 28.5458L20.5469 28.2201Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.3613 24.908L26.2704 25.0145L27.6323 25.3403L25.7233 25.2337L24.3613 24.908Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M26.2712 25.0146C26.2644 25.6111 26.1329 26.2184 25.8768 26.8364C25.6176 27.4446 25.2421 28.0094 24.7506 28.5308C24.268 29.0482 23.6672 29.4671 22.9483 29.7875C22.2294 30.1079 21.5196 30.2618 20.8188 30.2495C20.4867 30.2416 20.163 30.2004 19.8477 30.1257L21.2096 30.4514C21.525 30.5261 21.8487 30.5674 22.1807 30.5752C22.8815 30.5876 23.5914 30.4336 24.3103 30.1132C25.0292 29.7929 25.6299 29.374 26.1125 28.8566C26.6041 28.3352 26.9795 27.7703 27.2388 27.1621C27.4949 26.5441 27.6263 25.9368 27.6331 25.3404L26.2712 25.0146Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            d="M22.9479 29.7875C22.229 30.1078 21.5191 30.2618 20.8184 30.2494C20.1265 30.2331 19.471 30.0717 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C22.0903 18.0095 22.6869 18.1467 23.2215 18.4123C23.7531 18.6681 24.1862 19.0182 24.521 19.4624L23.141 21.0348C22.779 20.569 22.3177 20.2596 21.757 20.1064C21.1932 19.9433 20.5923 20.004 19.9542 20.2883C19.3252 20.5687 18.8191 20.979 18.436 21.5192C18.0618 22.0555 17.8297 22.6684 17.7395 23.358C17.6584 24.0436 17.7385 24.7693 17.9798 25.5351C18.2212 26.301 18.5635 26.9155 19.0066 27.3786C19.4557 27.8279 19.9694 28.1084 20.5478 28.2202C21.1351 28.3279 21.7433 28.2416 22.3724 27.9613C23.0104 27.6769 23.4984 27.2579 23.8363 26.7042C24.1711 26.1407 24.3462 25.5419 24.3617 24.908L26.2707 25.0146C26.264 25.6111 26.1325 26.2183 25.8764 26.8363C25.6172 27.4445 25.2417 28.0094 24.7501 28.5308C24.2676 29.0482 23.6668 29.4671 22.9479 29.7875Z"
                                            fill="#FFB367"
                                        />
                                    </svg>
                                    <div>
                                        <p className="text-center font-medium text-base">
                                            Alfabet
                                        </p>
                                    </div>
                                    <div className="mr-4"></div>
                                </div>
                            </div>
                            <div className="rounded-md w-full">
                                <div className="flex flex-col py-2 px-3 gap-[2px] bg-brand-primary rounded-t-md">
                                    <div className="flex justify-between w-full">
                                        <p className="text-xs font-normal text-grey-100">
                                            Progress
                                        </p>
                                        <p className="text-xs font-normal text-grey-100">
                                            20%
                                        </p>
                                    </div>
                                    <div>
                                        <Progress value={20} />
                                    </div>
                                </div>
                                <div className="flex justify-between py-2 px-3 gap-[2px] bg-grey-10 border border-brand-primary rounded-b-md">
                                    <svg
                                        width="28"
                                        height="31"
                                        viewBox="0 0 28 31"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M0 18.8108L1.56996 6.55805L2.93193 6.18604L1.36197 18.4388L0 18.8108Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M1.57031 6.55806L4.03329 6.20063L5.39526 5.82861L2.93228 6.18605L1.57031 6.55806Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M4.0332 6.20063L9.65625 17.4095L11.0182 17.0375L5.39517 5.82861L4.0332 6.20063Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M9.65512 17.4096L7.58398 17.7102L8.94596 17.3382L11.0171 17.0376L9.65512 17.4096Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M7.58513 17.71L6.4082 15.2983L7.77017 14.9263L8.9471 17.338L7.58513 17.71Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6.40728 15.2983L2.37695 15.8832L3.73892 15.5112L7.76925 14.9263L6.40728 15.2983Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.3771 15.8832L2.05664 18.5123L3.41861 18.1403L3.73907 15.5112L2.3771 15.8832Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.05714 18.5124L0 18.8109L1.36197 18.4389L3.41912 18.1404L2.05714 18.5124Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.59766 13.9145L5.53643 13.488L6.89841 13.116L3.95963 13.5425L2.59766 13.9145Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.53549 13.4881L2.79102 7.89814L4.15299 7.52612L6.89746 13.1161L5.53549 13.4881Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.79102 7.89816L3.32279 7.82099L4.68477 7.44897L4.15299 7.52615L2.79102 7.89816Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M3.32374 7.82099L2.59766 13.9146L3.95963 13.5426L4.68571 7.44897L3.32374 7.82099Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M0 18.8109L1.56996 6.55812L4.03294 6.20068L9.65598 17.4096L7.58485 17.7101L6.40792 15.2984L2.3776 15.8833L2.05714 18.5123L0 18.8109ZM2.59695 13.9146L5.53573 13.4881L2.79126 7.89812L3.32304 7.82095L2.59695 13.9146Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M11.7969 11.2817L15.603 0L16.965 0.325759L13.1588 11.6074L11.7969 11.2817Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.6035 0L19.7826 1.52752C20.4392 1.76751 20.9539 2.10307 21.3267 2.53419C21.7118 2.95846 21.9486 3.45325 22.0369 4.01854C22.1376 4.57699 22.0755 5.18936 21.8507 5.85566C21.677 6.37053 21.3893 6.8097 20.9876 7.17319C20.5982 7.52982 20.0879 7.75724 19.4567 7.85541L20.8187 8.18117C21.4499 8.083 21.9601 7.85558 22.3496 7.49895C22.7513 7.13546 23.039 6.69628 23.2127 6.18142C23.4375 5.51512 23.4995 4.90275 23.3989 4.3443C23.3106 3.77901 23.0738 3.28422 22.6887 2.85995C22.3159 2.42883 21.8012 2.09327 21.1446 1.85328L16.9655 0.325759L15.6035 0Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.457 7.85539L19.7789 6.90137L21.1409 7.22713L20.819 8.18115L19.457 7.85539Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.7787 6.90137C20.1952 7.29175 20.4926 7.6953 20.6709 8.11204C20.8493 8.52878 20.9314 8.95005 20.9173 9.37583C20.9033 9.80162 20.8247 10.2265 20.6816 10.6505C20.3172 11.7307 19.7161 12.4636 18.8784 12.8492C18.218 13.1522 17.4669 13.2042 16.625 13.0054L17.987 13.3311C18.8289 13.53 19.58 13.4779 20.2404 13.175C21.0781 12.7894 21.6792 12.0565 22.0436 10.9763C22.1867 10.5523 22.2652 10.1274 22.2793 9.70159C22.2934 9.27581 22.2113 8.85454 22.0329 8.4378C21.8546 8.02106 21.5572 7.6175 21.1407 7.22713L19.7787 6.90137Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.6244 13.0054C16.4139 12.9557 16.1978 12.8903 15.976 12.8093L11.7969 11.2817L13.1588 11.6075L17.3379 13.135C17.5598 13.2161 17.7759 13.2815 17.9864 13.3312L16.6244 13.0054Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M14.2207 10.126L16.7761 11.06C16.8513 11.0875 16.9253 11.1103 16.9981 11.1285L18.3601 11.4543C18.2873 11.4361 18.2133 11.4133 18.138 11.3858L15.5827 10.4517L14.2207 10.126Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.9969 11.1287C17.3789 11.2242 17.727 11.1911 18.041 11.0297C18.4271 10.8306 18.7036 10.4837 18.8705 9.98902C19.0374 9.49434 19.03 9.04369 18.8482 8.63704C18.6753 8.23364 18.3538 7.946 17.8835 7.77411L15.3281 6.84009L16.6901 7.16585L19.2455 8.09987C19.7157 8.27176 20.0373 8.5594 20.2102 8.9628C20.3919 9.36944 20.3994 9.8201 20.2325 10.3148C20.0656 10.8095 19.7891 11.1563 19.403 11.3554C19.0889 11.5169 18.7409 11.5499 18.3588 11.4545L16.9969 11.1287Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.3293 6.84009L14.2207 10.1262L15.5827 10.4519L16.6913 7.16585L15.3293 6.84009Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.9375 5.03809L18.3997 5.93806C18.4593 5.95985 18.5181 5.97784 18.5759 5.99202L19.9379 6.31778C19.88 6.3036 19.8213 6.28561 19.7617 6.26382L17.2995 5.36385L15.9375 5.03809Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M18.5749 5.99192C18.8786 6.06636 19.158 6.03587 19.413 5.90045C19.72 5.72914 19.9399 5.44663 20.0727 5.05291C20.2055 4.65918 20.2002 4.30568 20.0567 3.99241C19.9132 3.67914 19.6552 3.45439 19.2825 3.31818L16.8203 2.41821L18.1823 2.74397L20.6445 3.64394C21.0171 3.78015 21.2752 4.0049 21.4187 4.31817C21.5622 4.63144 21.5675 4.98494 21.4347 5.37867C21.3018 5.77239 21.0819 6.0549 20.775 6.22621C20.52 6.36163 20.2406 6.39212 19.9369 6.31767L18.5749 5.99192Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.8213 2.41821L15.9375 5.03798L17.2995 5.36374L18.1833 2.74397L16.8213 2.41821Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M11.7969 11.2817L15.603 0L19.7821 1.52752C20.4387 1.76751 20.9534 2.10307 21.3263 2.53419C21.7114 2.95846 21.9481 3.45325 22.0365 4.01854C22.1371 4.57699 22.075 5.18936 21.8502 5.85566C21.6765 6.37053 21.3888 6.8097 20.9871 7.17319C20.5977 7.52982 20.0874 7.75724 19.4563 7.85541L19.7781 6.90139C20.1946 7.29177 20.492 7.69533 20.6704 8.11207C20.8487 8.52881 20.9308 8.95008 20.9168 9.37586C20.9027 9.80165 20.8241 10.2265 20.6811 10.6506C20.3166 11.7308 19.7155 12.4636 18.8778 12.8492C18.0523 13.2279 17.0851 13.2146 15.976 12.8092L11.7969 11.2817ZM14.22 10.1261L16.7754 11.0601C17.2456 11.232 17.6677 11.2218 18.0415 11.0296C18.4276 10.8305 18.7041 10.4836 18.871 9.98896C19.0379 9.49428 19.0305 9.04362 18.8487 8.63697C18.6758 8.23357 18.3543 7.94593 17.884 7.77404L15.3286 6.84002L14.22 10.1261ZM15.9366 5.03798L18.3988 5.93795C18.7715 6.07416 19.1096 6.06166 19.4131 5.90045C19.7201 5.72914 19.94 5.44663 20.0728 5.0529C20.2057 4.65918 20.2004 4.30568 20.0569 3.99241C19.9134 3.67914 19.6553 3.45439 19.2827 3.31818L16.8204 2.41821L15.9366 5.03798Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.8472 30.1257C19.5056 30.0448 19.1738 29.9247 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C21.7609 18.0051 22.0748 18.0416 22.3731 18.1102L23.7351 18.436C23.4367 18.3674 23.1229 18.3309 22.7936 18.3265C22.1439 18.3137 21.4596 18.4675 20.7407 18.7879C20.0218 19.1083 19.4017 19.547 18.8803 20.1041C18.3559 20.6513 17.945 21.2823 17.6476 21.9971C17.3561 22.6981 17.1944 23.4532 17.1624 24.2624C17.1364 25.0578 17.2518 25.863 17.5086 26.6779C17.7654 27.4928 18.1279 28.1878 18.5962 28.763C19.0644 29.3381 19.6036 29.7808 20.2138 30.0911C20.5358 30.2504 20.8676 30.3705 21.2092 30.4514L19.8472 30.1257Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M22.373 18.1101C22.6714 18.1787 22.9542 18.2794 23.2215 18.4122C23.753 18.668 24.1862 19.018 24.5209 19.4623L25.8829 19.7881C25.5481 19.3438 25.115 18.9938 24.5835 18.738C24.3162 18.6052 24.0333 18.5045 23.735 18.4359L22.373 18.1101Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.5206 19.4624L23.1406 21.0347L24.5026 21.3605L25.8825 19.7882L24.5206 19.4624Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M23.1419 21.0348C22.7799 20.5691 22.3185 20.2597 21.7578 20.1064L23.1198 20.4322C23.6805 20.5854 24.1418 20.8949 24.5038 21.3606L23.1419 21.0348Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.7562 20.1063C21.7224 20.0965 21.6884 20.0875 21.6543 20.0793L23.0163 20.4051C23.0504 20.4133 23.0843 20.4223 23.1182 20.432L21.7562 20.1063Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.6552 20.0795C21.121 19.9515 20.5541 20.0211 19.9543 20.2884C19.3253 20.5688 18.8192 20.9791 18.436 21.5193C18.0619 22.0556 17.8297 22.6685 17.7396 23.3581C17.6585 24.0437 17.7386 24.7694 17.9799 25.5352C18.2213 26.3011 18.5635 26.9156 19.0067 27.3787C19.4198 27.7921 19.8877 28.0626 20.4103 28.1902L21.7722 28.516C21.2497 28.3883 20.7818 28.1178 20.3687 27.7044C19.9255 27.2413 19.5832 26.6268 19.3419 25.861C19.1005 25.0952 19.0204 24.3695 19.1016 23.6839C19.1917 22.9943 19.4238 22.3813 19.798 21.8451C20.1812 21.3048 20.6872 20.8945 21.3163 20.6142C21.916 20.3469 22.483 20.2773 23.0171 20.4053L21.6552 20.0795Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.4102 28.1902C20.4556 28.2013 20.5015 28.2113 20.5477 28.2202L21.9097 28.546C21.8634 28.5371 21.8176 28.527 21.7721 28.5159L20.4102 28.1902Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5469 28.2201C21.1342 28.3278 21.7424 28.2415 22.3715 27.9612C23.0095 27.6768 23.4975 27.2578 23.8354 26.7041C24.1702 26.1406 24.3454 25.5419 24.3608 24.908L25.7228 25.2337C25.7073 25.8676 25.5322 26.4663 25.1974 27.0299C24.8595 27.5836 24.3715 28.0026 23.7335 28.2869C23.1044 28.5673 22.4962 28.6536 21.9088 28.5458L20.5469 28.2201Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.3613 24.908L26.2704 25.0145L27.6323 25.3403L25.7233 25.2337L24.3613 24.908Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M26.2712 25.0146C26.2644 25.6111 26.1329 26.2184 25.8768 26.8364C25.6176 27.4446 25.2421 28.0094 24.7506 28.5308C24.268 29.0482 23.6672 29.4671 22.9483 29.7875C22.2294 30.1079 21.5196 30.2618 20.8188 30.2495C20.4867 30.2416 20.163 30.2004 19.8477 30.1257L21.2096 30.4514C21.525 30.5261 21.8487 30.5674 22.1807 30.5752C22.8815 30.5876 23.5914 30.4336 24.3103 30.1132C25.0292 29.7929 25.6299 29.374 26.1125 28.8566C26.6041 28.3352 26.9795 27.7703 27.2388 27.1621C27.4949 26.5441 27.6263 25.9368 27.6331 25.3404L26.2712 25.0146Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            d="M22.9479 29.7875C22.229 30.1078 21.5191 30.2618 20.8184 30.2494C20.1265 30.2331 19.471 30.0717 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C22.0903 18.0095 22.6869 18.1467 23.2215 18.4123C23.7531 18.6681 24.1862 19.0182 24.521 19.4624L23.141 21.0348C22.779 20.569 22.3177 20.2596 21.757 20.1064C21.1932 19.9433 20.5923 20.004 19.9542 20.2883C19.3252 20.5687 18.8191 20.979 18.436 21.5192C18.0618 22.0555 17.8297 22.6684 17.7395 23.358C17.6584 24.0436 17.7385 24.7693 17.9798 25.5351C18.2212 26.301 18.5635 26.9155 19.0066 27.3786C19.4557 27.8279 19.9694 28.1084 20.5478 28.2202C21.1351 28.3279 21.7433 28.2416 22.3724 27.9613C23.0104 27.6769 23.4984 27.2579 23.8363 26.7042C24.1711 26.1407 24.3462 25.5419 24.3617 24.908L26.2707 25.0146C26.264 25.6111 26.1325 26.2183 25.8764 26.8363C25.6172 27.4445 25.2417 28.0094 24.7501 28.5308C24.2676 29.0482 23.6668 29.4671 22.9479 29.7875Z"
                                            fill="#FFB367"
                                        />
                                    </svg>
                                    <div>
                                        <p className="text-center font-medium text-base">
                                            Alfabet
                                        </p>
                                    </div>
                                    <div className="mr-4"></div>
                                </div>
                            </div>
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
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Aliquid, eaque temporibus? tenetur eveniet?
                        </p>
                        <div className="flex justify-center items-center gap-3">
                            <div className="rounded-md w-full">
                                <div className="flex flex-col py-2 px-3 gap-[2px] bg-grey-20 rounded-t-md">
                                    <div className="flex justify-between w-full">
                                        <p></p>
                                        <p className="text-xs font-bold text-grey-50">
                                            0/100
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-between py-2 px-3 gap-[2px] bg-grey-10 border border-grey-20 rounded-b-md">
                                    <svg
                                        width="28"
                                        height="31"
                                        viewBox="0 0 28 31"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M0 18.8108L1.56996 6.55805L2.93193 6.18604L1.36197 18.4388L0 18.8108Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M1.57031 6.55806L4.03329 6.20063L5.39526 5.82861L2.93228 6.18605L1.57031 6.55806Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M4.0332 6.20063L9.65625 17.4095L11.0182 17.0375L5.39517 5.82861L4.0332 6.20063Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M9.65512 17.4096L7.58398 17.7102L8.94596 17.3382L11.0171 17.0376L9.65512 17.4096Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M7.58513 17.71L6.4082 15.2983L7.77017 14.9263L8.9471 17.338L7.58513 17.71Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6.40728 15.2983L2.37695 15.8832L3.73892 15.5112L7.76925 14.9263L6.40728 15.2983Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.3771 15.8832L2.05664 18.5123L3.41861 18.1403L3.73907 15.5112L2.3771 15.8832Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.05714 18.5124L0 18.8109L1.36197 18.4389L3.41912 18.1404L2.05714 18.5124Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.59766 13.9145L5.53643 13.488L6.89841 13.116L3.95963 13.5425L2.59766 13.9145Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.53549 13.4881L2.79102 7.89814L4.15299 7.52612L6.89746 13.1161L5.53549 13.4881Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.79102 7.89816L3.32279 7.82099L4.68477 7.44897L4.15299 7.52615L2.79102 7.89816Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M3.32374 7.82099L2.59766 13.9146L3.95963 13.5426L4.68571 7.44897L3.32374 7.82099Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M0 18.8109L1.56996 6.55812L4.03294 6.20068L9.65598 17.4096L7.58485 17.7101L6.40792 15.2984L2.3776 15.8833L2.05714 18.5123L0 18.8109ZM2.59695 13.9146L5.53573 13.4881L2.79126 7.89812L3.32304 7.82095L2.59695 13.9146Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M11.7969 11.2817L15.603 0L16.965 0.325759L13.1588 11.6074L11.7969 11.2817Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.6035 0L19.7826 1.52752C20.4392 1.76751 20.9539 2.10307 21.3267 2.53419C21.7118 2.95846 21.9486 3.45325 22.0369 4.01854C22.1376 4.57699 22.0755 5.18936 21.8507 5.85566C21.677 6.37053 21.3893 6.8097 20.9876 7.17319C20.5982 7.52982 20.0879 7.75724 19.4567 7.85541L20.8187 8.18117C21.4499 8.083 21.9601 7.85558 22.3496 7.49895C22.7513 7.13546 23.039 6.69628 23.2127 6.18142C23.4375 5.51512 23.4995 4.90275 23.3989 4.3443C23.3106 3.77901 23.0738 3.28422 22.6887 2.85995C22.3159 2.42883 21.8012 2.09327 21.1446 1.85328L16.9655 0.325759L15.6035 0Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.457 7.85539L19.7789 6.90137L21.1409 7.22713L20.819 8.18115L19.457 7.85539Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.7787 6.90137C20.1952 7.29175 20.4926 7.6953 20.6709 8.11204C20.8493 8.52878 20.9314 8.95005 20.9173 9.37583C20.9033 9.80162 20.8247 10.2265 20.6816 10.6505C20.3172 11.7307 19.7161 12.4636 18.8784 12.8492C18.218 13.1522 17.4669 13.2042 16.625 13.0054L17.987 13.3311C18.8289 13.53 19.58 13.4779 20.2404 13.175C21.0781 12.7894 21.6792 12.0565 22.0436 10.9763C22.1867 10.5523 22.2652 10.1274 22.2793 9.70159C22.2934 9.27581 22.2113 8.85454 22.0329 8.4378C21.8546 8.02106 21.5572 7.6175 21.1407 7.22713L19.7787 6.90137Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.6244 13.0054C16.4139 12.9557 16.1978 12.8903 15.976 12.8093L11.7969 11.2817L13.1588 11.6075L17.3379 13.135C17.5598 13.2161 17.7759 13.2815 17.9864 13.3312L16.6244 13.0054Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M14.2207 10.126L16.7761 11.06C16.8513 11.0875 16.9253 11.1103 16.9981 11.1285L18.3601 11.4543C18.2873 11.4361 18.2133 11.4133 18.138 11.3858L15.5827 10.4517L14.2207 10.126Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.9969 11.1287C17.3789 11.2242 17.727 11.1911 18.041 11.0297C18.4271 10.8306 18.7036 10.4837 18.8705 9.98902C19.0374 9.49434 19.03 9.04369 18.8482 8.63704C18.6753 8.23364 18.3538 7.946 17.8835 7.77411L15.3281 6.84009L16.6901 7.16585L19.2455 8.09987C19.7157 8.27176 20.0373 8.5594 20.2102 8.9628C20.3919 9.36944 20.3994 9.8201 20.2325 10.3148C20.0656 10.8095 19.7891 11.1563 19.403 11.3554C19.0889 11.5169 18.7409 11.5499 18.3588 11.4545L16.9969 11.1287Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.3293 6.84009L14.2207 10.1262L15.5827 10.4519L16.6913 7.16585L15.3293 6.84009Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.9375 5.03809L18.3997 5.93806C18.4593 5.95985 18.5181 5.97784 18.5759 5.99202L19.9379 6.31778C19.88 6.3036 19.8213 6.28561 19.7617 6.26382L17.2995 5.36385L15.9375 5.03809Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M18.5749 5.99192C18.8786 6.06636 19.158 6.03587 19.413 5.90045C19.72 5.72914 19.9399 5.44663 20.0727 5.05291C20.2055 4.65918 20.2002 4.30568 20.0567 3.99241C19.9132 3.67914 19.6552 3.45439 19.2825 3.31818L16.8203 2.41821L18.1823 2.74397L20.6445 3.64394C21.0171 3.78015 21.2752 4.0049 21.4187 4.31817C21.5622 4.63144 21.5675 4.98494 21.4347 5.37867C21.3018 5.77239 21.0819 6.0549 20.775 6.22621C20.52 6.36163 20.2406 6.39212 19.9369 6.31767L18.5749 5.99192Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.8213 2.41821L15.9375 5.03798L17.2995 5.36374L18.1833 2.74397L16.8213 2.41821Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M11.7969 11.2817L15.603 0L19.7821 1.52752C20.4387 1.76751 20.9534 2.10307 21.3263 2.53419C21.7114 2.95846 21.9481 3.45325 22.0365 4.01854C22.1371 4.57699 22.075 5.18936 21.8502 5.85566C21.6765 6.37053 21.3888 6.8097 20.9871 7.17319C20.5977 7.52982 20.0874 7.75724 19.4563 7.85541L19.7781 6.90139C20.1946 7.29177 20.492 7.69533 20.6704 8.11207C20.8487 8.52881 20.9308 8.95008 20.9168 9.37586C20.9027 9.80165 20.8241 10.2265 20.6811 10.6506C20.3166 11.7308 19.7155 12.4636 18.8778 12.8492C18.0523 13.2279 17.0851 13.2146 15.976 12.8092L11.7969 11.2817ZM14.22 10.1261L16.7754 11.0601C17.2456 11.232 17.6677 11.2218 18.0415 11.0296C18.4276 10.8305 18.7041 10.4836 18.871 9.98896C19.0379 9.49428 19.0305 9.04362 18.8487 8.63697C18.6758 8.23357 18.3543 7.94593 17.884 7.77404L15.3286 6.84002L14.22 10.1261ZM15.9366 5.03798L18.3988 5.93795C18.7715 6.07416 19.1096 6.06166 19.4131 5.90045C19.7201 5.72914 19.94 5.44663 20.0728 5.0529C20.2057 4.65918 20.2004 4.30568 20.0569 3.99241C19.9134 3.67914 19.6553 3.45439 19.2827 3.31818L16.8204 2.41821L15.9366 5.03798Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.8472 30.1257C19.5056 30.0448 19.1738 29.9247 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C21.7609 18.0051 22.0748 18.0416 22.3731 18.1102L23.7351 18.436C23.4367 18.3674 23.1229 18.3309 22.7936 18.3265C22.1439 18.3137 21.4596 18.4675 20.7407 18.7879C20.0218 19.1083 19.4017 19.547 18.8803 20.1041C18.3559 20.6513 17.945 21.2823 17.6476 21.9971C17.3561 22.6981 17.1944 23.4532 17.1624 24.2624C17.1364 25.0578 17.2518 25.863 17.5086 26.6779C17.7654 27.4928 18.1279 28.1878 18.5962 28.763C19.0644 29.3381 19.6036 29.7808 20.2138 30.0911C20.5358 30.2504 20.8676 30.3705 21.2092 30.4514L19.8472 30.1257Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M22.373 18.1101C22.6714 18.1787 22.9542 18.2794 23.2215 18.4122C23.753 18.668 24.1862 19.018 24.5209 19.4623L25.8829 19.7881C25.5481 19.3438 25.115 18.9938 24.5835 18.738C24.3162 18.6052 24.0333 18.5045 23.735 18.4359L22.373 18.1101Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.5206 19.4624L23.1406 21.0347L24.5026 21.3605L25.8825 19.7882L24.5206 19.4624Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M23.1419 21.0348C22.7799 20.5691 22.3185 20.2597 21.7578 20.1064L23.1198 20.4322C23.6805 20.5854 24.1418 20.8949 24.5038 21.3606L23.1419 21.0348Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.7562 20.1063C21.7224 20.0965 21.6884 20.0875 21.6543 20.0793L23.0163 20.4051C23.0504 20.4133 23.0843 20.4223 23.1182 20.432L21.7562 20.1063Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.6552 20.0795C21.121 19.9515 20.5541 20.0211 19.9543 20.2884C19.3253 20.5688 18.8192 20.9791 18.436 21.5193C18.0619 22.0556 17.8297 22.6685 17.7396 23.3581C17.6585 24.0437 17.7386 24.7694 17.9799 25.5352C18.2213 26.3011 18.5635 26.9156 19.0067 27.3787C19.4198 27.7921 19.8877 28.0626 20.4103 28.1902L21.7722 28.516C21.2497 28.3883 20.7818 28.1178 20.3687 27.7044C19.9255 27.2413 19.5832 26.6268 19.3419 25.861C19.1005 25.0952 19.0204 24.3695 19.1016 23.6839C19.1917 22.9943 19.4238 22.3813 19.798 21.8451C20.1812 21.3048 20.6872 20.8945 21.3163 20.6142C21.916 20.3469 22.483 20.2773 23.0171 20.4053L21.6552 20.0795Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.4102 28.1902C20.4556 28.2013 20.5015 28.2113 20.5477 28.2202L21.9097 28.546C21.8634 28.5371 21.8176 28.527 21.7721 28.5159L20.4102 28.1902Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5469 28.2201C21.1342 28.3278 21.7424 28.2415 22.3715 27.9612C23.0095 27.6768 23.4975 27.2578 23.8354 26.7041C24.1702 26.1406 24.3454 25.5419 24.3608 24.908L25.7228 25.2337C25.7073 25.8676 25.5322 26.4663 25.1974 27.0299C24.8595 27.5836 24.3715 28.0026 23.7335 28.2869C23.1044 28.5673 22.4962 28.6536 21.9088 28.5458L20.5469 28.2201Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.3613 24.908L26.2704 25.0145L27.6323 25.3403L25.7233 25.2337L24.3613 24.908Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M26.2712 25.0146C26.2644 25.6111 26.1329 26.2184 25.8768 26.8364C25.6176 27.4446 25.2421 28.0094 24.7506 28.5308C24.268 29.0482 23.6672 29.4671 22.9483 29.7875C22.2294 30.1079 21.5196 30.2618 20.8188 30.2495C20.4867 30.2416 20.163 30.2004 19.8477 30.1257L21.2096 30.4514C21.525 30.5261 21.8487 30.5674 22.1807 30.5752C22.8815 30.5876 23.5914 30.4336 24.3103 30.1132C25.0292 29.7929 25.6299 29.374 26.1125 28.8566C26.6041 28.3352 26.9795 27.7703 27.2388 27.1621C27.4949 26.5441 27.6263 25.9368 27.6331 25.3404L26.2712 25.0146Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            d="M22.9479 29.7875C22.229 30.1078 21.5191 30.2618 20.8184 30.2494C20.1265 30.2331 19.471 30.0717 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C22.0903 18.0095 22.6869 18.1467 23.2215 18.4123C23.7531 18.6681 24.1862 19.0182 24.521 19.4624L23.141 21.0348C22.779 20.569 22.3177 20.2596 21.757 20.1064C21.1932 19.9433 20.5923 20.004 19.9542 20.2883C19.3252 20.5687 18.8191 20.979 18.436 21.5192C18.0618 22.0555 17.8297 22.6684 17.7395 23.358C17.6584 24.0436 17.7385 24.7693 17.9798 25.5351C18.2212 26.301 18.5635 26.9155 19.0066 27.3786C19.4557 27.8279 19.9694 28.1084 20.5478 28.2202C21.1351 28.3279 21.7433 28.2416 22.3724 27.9613C23.0104 27.6769 23.4984 27.2579 23.8363 26.7042C24.1711 26.1407 24.3462 25.5419 24.3617 24.908L26.2707 25.0146C26.264 25.6111 26.1325 26.2183 25.8764 26.8363C25.6172 27.4445 25.2417 28.0094 24.7501 28.5308C24.2676 29.0482 23.6668 29.4671 22.9479 29.7875Z"
                                            fill="#FFB367"
                                        />
                                    </svg>
                                    <div>
                                        <p className="text-center font-medium text-base">
                                            Alfabet
                                        </p>
                                    </div>
                                    <div className="mr-4"></div>
                                </div>
                            </div>
                            <div className="rounded-md w-full">
                                <div className="flex flex-col py-2 px-3 gap-[2px] bg-grey-20 rounded-t-md">
                                    <div className="flex justify-between w-full">
                                        <p></p>
                                        <p className="text-xs font-bold text-grey-50">
                                            0/100
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-between py-2 px-3 gap-[2px] bg-grey-10 border border-grey-20 rounded-b-md">
                                    <svg
                                        width="28"
                                        height="31"
                                        viewBox="0 0 28 31"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M0 18.8108L1.56996 6.55805L2.93193 6.18604L1.36197 18.4388L0 18.8108Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M1.57031 6.55806L4.03329 6.20063L5.39526 5.82861L2.93228 6.18605L1.57031 6.55806Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M4.0332 6.20063L9.65625 17.4095L11.0182 17.0375L5.39517 5.82861L4.0332 6.20063Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M9.65512 17.4096L7.58398 17.7102L8.94596 17.3382L11.0171 17.0376L9.65512 17.4096Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M7.58513 17.71L6.4082 15.2983L7.77017 14.9263L8.9471 17.338L7.58513 17.71Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6.40728 15.2983L2.37695 15.8832L3.73892 15.5112L7.76925 14.9263L6.40728 15.2983Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.3771 15.8832L2.05664 18.5123L3.41861 18.1403L3.73907 15.5112L2.3771 15.8832Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.05714 18.5124L0 18.8109L1.36197 18.4389L3.41912 18.1404L2.05714 18.5124Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.59766 13.9145L5.53643 13.488L6.89841 13.116L3.95963 13.5425L2.59766 13.9145Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.53549 13.4881L2.79102 7.89814L4.15299 7.52612L6.89746 13.1161L5.53549 13.4881Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.79102 7.89816L3.32279 7.82099L4.68477 7.44897L4.15299 7.52615L2.79102 7.89816Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M3.32374 7.82099L2.59766 13.9146L3.95963 13.5426L4.68571 7.44897L3.32374 7.82099Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M0 18.8109L1.56996 6.55812L4.03294 6.20068L9.65598 17.4096L7.58485 17.7101L6.40792 15.2984L2.3776 15.8833L2.05714 18.5123L0 18.8109ZM2.59695 13.9146L5.53573 13.4881L2.79126 7.89812L3.32304 7.82095L2.59695 13.9146Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M11.7969 11.2817L15.603 0L16.965 0.325759L13.1588 11.6074L11.7969 11.2817Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.6035 0L19.7826 1.52752C20.4392 1.76751 20.9539 2.10307 21.3267 2.53419C21.7118 2.95846 21.9486 3.45325 22.0369 4.01854C22.1376 4.57699 22.0755 5.18936 21.8507 5.85566C21.677 6.37053 21.3893 6.8097 20.9876 7.17319C20.5982 7.52982 20.0879 7.75724 19.4567 7.85541L20.8187 8.18117C21.4499 8.083 21.9601 7.85558 22.3496 7.49895C22.7513 7.13546 23.039 6.69628 23.2127 6.18142C23.4375 5.51512 23.4995 4.90275 23.3989 4.3443C23.3106 3.77901 23.0738 3.28422 22.6887 2.85995C22.3159 2.42883 21.8012 2.09327 21.1446 1.85328L16.9655 0.325759L15.6035 0Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.457 7.85539L19.7789 6.90137L21.1409 7.22713L20.819 8.18115L19.457 7.85539Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.7787 6.90137C20.1952 7.29175 20.4926 7.6953 20.6709 8.11204C20.8493 8.52878 20.9314 8.95005 20.9173 9.37583C20.9033 9.80162 20.8247 10.2265 20.6816 10.6505C20.3172 11.7307 19.7161 12.4636 18.8784 12.8492C18.218 13.1522 17.4669 13.2042 16.625 13.0054L17.987 13.3311C18.8289 13.53 19.58 13.4779 20.2404 13.175C21.0781 12.7894 21.6792 12.0565 22.0436 10.9763C22.1867 10.5523 22.2652 10.1274 22.2793 9.70159C22.2934 9.27581 22.2113 8.85454 22.0329 8.4378C21.8546 8.02106 21.5572 7.6175 21.1407 7.22713L19.7787 6.90137Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.6244 13.0054C16.4139 12.9557 16.1978 12.8903 15.976 12.8093L11.7969 11.2817L13.1588 11.6075L17.3379 13.135C17.5598 13.2161 17.7759 13.2815 17.9864 13.3312L16.6244 13.0054Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M14.2207 10.126L16.7761 11.06C16.8513 11.0875 16.9253 11.1103 16.9981 11.1285L18.3601 11.4543C18.2873 11.4361 18.2133 11.4133 18.138 11.3858L15.5827 10.4517L14.2207 10.126Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.9969 11.1287C17.3789 11.2242 17.727 11.1911 18.041 11.0297C18.4271 10.8306 18.7036 10.4837 18.8705 9.98902C19.0374 9.49434 19.03 9.04369 18.8482 8.63704C18.6753 8.23364 18.3538 7.946 17.8835 7.77411L15.3281 6.84009L16.6901 7.16585L19.2455 8.09987C19.7157 8.27176 20.0373 8.5594 20.2102 8.9628C20.3919 9.36944 20.3994 9.8201 20.2325 10.3148C20.0656 10.8095 19.7891 11.1563 19.403 11.3554C19.0889 11.5169 18.7409 11.5499 18.3588 11.4545L16.9969 11.1287Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.3293 6.84009L14.2207 10.1262L15.5827 10.4519L16.6913 7.16585L15.3293 6.84009Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.9375 5.03809L18.3997 5.93806C18.4593 5.95985 18.5181 5.97784 18.5759 5.99202L19.9379 6.31778C19.88 6.3036 19.8213 6.28561 19.7617 6.26382L17.2995 5.36385L15.9375 5.03809Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M18.5749 5.99192C18.8786 6.06636 19.158 6.03587 19.413 5.90045C19.72 5.72914 19.9399 5.44663 20.0727 5.05291C20.2055 4.65918 20.2002 4.30568 20.0567 3.99241C19.9132 3.67914 19.6552 3.45439 19.2825 3.31818L16.8203 2.41821L18.1823 2.74397L20.6445 3.64394C21.0171 3.78015 21.2752 4.0049 21.4187 4.31817C21.5622 4.63144 21.5675 4.98494 21.4347 5.37867C21.3018 5.77239 21.0819 6.0549 20.775 6.22621C20.52 6.36163 20.2406 6.39212 19.9369 6.31767L18.5749 5.99192Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.8213 2.41821L15.9375 5.03798L17.2995 5.36374L18.1833 2.74397L16.8213 2.41821Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M11.7969 11.2817L15.603 0L19.7821 1.52752C20.4387 1.76751 20.9534 2.10307 21.3263 2.53419C21.7114 2.95846 21.9481 3.45325 22.0365 4.01854C22.1371 4.57699 22.075 5.18936 21.8502 5.85566C21.6765 6.37053 21.3888 6.8097 20.9871 7.17319C20.5977 7.52982 20.0874 7.75724 19.4563 7.85541L19.7781 6.90139C20.1946 7.29177 20.492 7.69533 20.6704 8.11207C20.8487 8.52881 20.9308 8.95008 20.9168 9.37586C20.9027 9.80165 20.8241 10.2265 20.6811 10.6506C20.3166 11.7308 19.7155 12.4636 18.8778 12.8492C18.0523 13.2279 17.0851 13.2146 15.976 12.8092L11.7969 11.2817ZM14.22 10.1261L16.7754 11.0601C17.2456 11.232 17.6677 11.2218 18.0415 11.0296C18.4276 10.8305 18.7041 10.4836 18.871 9.98896C19.0379 9.49428 19.0305 9.04362 18.8487 8.63697C18.6758 8.23357 18.3543 7.94593 17.884 7.77404L15.3286 6.84002L14.22 10.1261ZM15.9366 5.03798L18.3988 5.93795C18.7715 6.07416 19.1096 6.06166 19.4131 5.90045C19.7201 5.72914 19.94 5.44663 20.0728 5.0529C20.2057 4.65918 20.2004 4.30568 20.0569 3.99241C19.9134 3.67914 19.6553 3.45439 19.2827 3.31818L16.8204 2.41821L15.9366 5.03798Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.8472 30.1257C19.5056 30.0448 19.1738 29.9247 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C21.7609 18.0051 22.0748 18.0416 22.3731 18.1102L23.7351 18.436C23.4367 18.3674 23.1229 18.3309 22.7936 18.3265C22.1439 18.3137 21.4596 18.4675 20.7407 18.7879C20.0218 19.1083 19.4017 19.547 18.8803 20.1041C18.3559 20.6513 17.945 21.2823 17.6476 21.9971C17.3561 22.6981 17.1944 23.4532 17.1624 24.2624C17.1364 25.0578 17.2518 25.863 17.5086 26.6779C17.7654 27.4928 18.1279 28.1878 18.5962 28.763C19.0644 29.3381 19.6036 29.7808 20.2138 30.0911C20.5358 30.2504 20.8676 30.3705 21.2092 30.4514L19.8472 30.1257Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M22.373 18.1101C22.6714 18.1787 22.9542 18.2794 23.2215 18.4122C23.753 18.668 24.1862 19.018 24.5209 19.4623L25.8829 19.7881C25.5481 19.3438 25.115 18.9938 24.5835 18.738C24.3162 18.6052 24.0333 18.5045 23.735 18.4359L22.373 18.1101Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.5206 19.4624L23.1406 21.0347L24.5026 21.3605L25.8825 19.7882L24.5206 19.4624Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M23.1419 21.0348C22.7799 20.5691 22.3185 20.2597 21.7578 20.1064L23.1198 20.4322C23.6805 20.5854 24.1418 20.8949 24.5038 21.3606L23.1419 21.0348Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.7562 20.1063C21.7224 20.0965 21.6884 20.0875 21.6543 20.0793L23.0163 20.4051C23.0504 20.4133 23.0843 20.4223 23.1182 20.432L21.7562 20.1063Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.6552 20.0795C21.121 19.9515 20.5541 20.0211 19.9543 20.2884C19.3253 20.5688 18.8192 20.9791 18.436 21.5193C18.0619 22.0556 17.8297 22.6685 17.7396 23.3581C17.6585 24.0437 17.7386 24.7694 17.9799 25.5352C18.2213 26.3011 18.5635 26.9156 19.0067 27.3787C19.4198 27.7921 19.8877 28.0626 20.4103 28.1902L21.7722 28.516C21.2497 28.3883 20.7818 28.1178 20.3687 27.7044C19.9255 27.2413 19.5832 26.6268 19.3419 25.861C19.1005 25.0952 19.0204 24.3695 19.1016 23.6839C19.1917 22.9943 19.4238 22.3813 19.798 21.8451C20.1812 21.3048 20.6872 20.8945 21.3163 20.6142C21.916 20.3469 22.483 20.2773 23.0171 20.4053L21.6552 20.0795Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.4102 28.1902C20.4556 28.2013 20.5015 28.2113 20.5477 28.2202L21.9097 28.546C21.8634 28.5371 21.8176 28.527 21.7721 28.5159L20.4102 28.1902Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5469 28.2201C21.1342 28.3278 21.7424 28.2415 22.3715 27.9612C23.0095 27.6768 23.4975 27.2578 23.8354 26.7041C24.1702 26.1406 24.3454 25.5419 24.3608 24.908L25.7228 25.2337C25.7073 25.8676 25.5322 26.4663 25.1974 27.0299C24.8595 27.5836 24.3715 28.0026 23.7335 28.2869C23.1044 28.5673 22.4962 28.6536 21.9088 28.5458L20.5469 28.2201Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.3613 24.908L26.2704 25.0145L27.6323 25.3403L25.7233 25.2337L24.3613 24.908Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M26.2712 25.0146C26.2644 25.6111 26.1329 26.2184 25.8768 26.8364C25.6176 27.4446 25.2421 28.0094 24.7506 28.5308C24.268 29.0482 23.6672 29.4671 22.9483 29.7875C22.2294 30.1079 21.5196 30.2618 20.8188 30.2495C20.4867 30.2416 20.163 30.2004 19.8477 30.1257L21.2096 30.4514C21.525 30.5261 21.8487 30.5674 22.1807 30.5752C22.8815 30.5876 23.5914 30.4336 24.3103 30.1132C25.0292 29.7929 25.6299 29.374 26.1125 28.8566C26.6041 28.3352 26.9795 27.7703 27.2388 27.1621C27.4949 26.5441 27.6263 25.9368 27.6331 25.3404L26.2712 25.0146Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            d="M22.9479 29.7875C22.229 30.1078 21.5191 30.2618 20.8184 30.2494C20.1265 30.2331 19.471 30.0717 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C22.0903 18.0095 22.6869 18.1467 23.2215 18.4123C23.7531 18.6681 24.1862 19.0182 24.521 19.4624L23.141 21.0348C22.779 20.569 22.3177 20.2596 21.757 20.1064C21.1932 19.9433 20.5923 20.004 19.9542 20.2883C19.3252 20.5687 18.8191 20.979 18.436 21.5192C18.0618 22.0555 17.8297 22.6684 17.7395 23.358C17.6584 24.0436 17.7385 24.7693 17.9798 25.5351C18.2212 26.301 18.5635 26.9155 19.0066 27.3786C19.4557 27.8279 19.9694 28.1084 20.5478 28.2202C21.1351 28.3279 21.7433 28.2416 22.3724 27.9613C23.0104 27.6769 23.4984 27.2579 23.8363 26.7042C24.1711 26.1407 24.3462 25.5419 24.3617 24.908L26.2707 25.0146C26.264 25.6111 26.1325 26.2183 25.8764 26.8363C25.6172 27.4445 25.2417 28.0094 24.7501 28.5308C24.2676 29.0482 23.6668 29.4671 22.9479 29.7875Z"
                                            fill="#FFB367"
                                        />
                                    </svg>
                                    <div>
                                        <p className="text-center font-medium text-base">
                                            Alfabet
                                        </p>
                                    </div>
                                    <div className="mr-4"></div>
                                </div>
                            </div>
                            <div className="rounded-md w-full">
                                <div className="flex flex-col py-2 px-3 gap-[2px] bg-grey-20 rounded-t-md">
                                    <div className="flex justify-between w-full">
                                        <p></p>
                                        <p className="text-xs font-bold text-grey-50">
                                            0/100
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-between py-2 px-3 gap-[2px] bg-grey-10 border border-grey-20 rounded-b-md">
                                    <svg
                                        width="28"
                                        height="31"
                                        viewBox="0 0 28 31"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M0 18.8108L1.56996 6.55805L2.93193 6.18604L1.36197 18.4388L0 18.8108Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M1.57031 6.55806L4.03329 6.20063L5.39526 5.82861L2.93228 6.18605L1.57031 6.55806Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M4.0332 6.20063L9.65625 17.4095L11.0182 17.0375L5.39517 5.82861L4.0332 6.20063Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M9.65512 17.4096L7.58398 17.7102L8.94596 17.3382L11.0171 17.0376L9.65512 17.4096Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M7.58513 17.71L6.4082 15.2983L7.77017 14.9263L8.9471 17.338L7.58513 17.71Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6.40728 15.2983L2.37695 15.8832L3.73892 15.5112L7.76925 14.9263L6.40728 15.2983Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.3771 15.8832L2.05664 18.5123L3.41861 18.1403L3.73907 15.5112L2.3771 15.8832Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.05714 18.5124L0 18.8109L1.36197 18.4389L3.41912 18.1404L2.05714 18.5124Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.59766 13.9145L5.53643 13.488L6.89841 13.116L3.95963 13.5425L2.59766 13.9145Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.53549 13.4881L2.79102 7.89814L4.15299 7.52612L6.89746 13.1161L5.53549 13.4881Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.79102 7.89816L3.32279 7.82099L4.68477 7.44897L4.15299 7.52615L2.79102 7.89816Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M3.32374 7.82099L2.59766 13.9146L3.95963 13.5426L4.68571 7.44897L3.32374 7.82099Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M0 18.8109L1.56996 6.55812L4.03294 6.20068L9.65598 17.4096L7.58485 17.7101L6.40792 15.2984L2.3776 15.8833L2.05714 18.5123L0 18.8109ZM2.59695 13.9146L5.53573 13.4881L2.79126 7.89812L3.32304 7.82095L2.59695 13.9146Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M11.7969 11.2817L15.603 0L16.965 0.325759L13.1588 11.6074L11.7969 11.2817Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.6035 0L19.7826 1.52752C20.4392 1.76751 20.9539 2.10307 21.3267 2.53419C21.7118 2.95846 21.9486 3.45325 22.0369 4.01854C22.1376 4.57699 22.0755 5.18936 21.8507 5.85566C21.677 6.37053 21.3893 6.8097 20.9876 7.17319C20.5982 7.52982 20.0879 7.75724 19.4567 7.85541L20.8187 8.18117C21.4499 8.083 21.9601 7.85558 22.3496 7.49895C22.7513 7.13546 23.039 6.69628 23.2127 6.18142C23.4375 5.51512 23.4995 4.90275 23.3989 4.3443C23.3106 3.77901 23.0738 3.28422 22.6887 2.85995C22.3159 2.42883 21.8012 2.09327 21.1446 1.85328L16.9655 0.325759L15.6035 0Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.457 7.85539L19.7789 6.90137L21.1409 7.22713L20.819 8.18115L19.457 7.85539Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.7787 6.90137C20.1952 7.29175 20.4926 7.6953 20.6709 8.11204C20.8493 8.52878 20.9314 8.95005 20.9173 9.37583C20.9033 9.80162 20.8247 10.2265 20.6816 10.6505C20.3172 11.7307 19.7161 12.4636 18.8784 12.8492C18.218 13.1522 17.4669 13.2042 16.625 13.0054L17.987 13.3311C18.8289 13.53 19.58 13.4779 20.2404 13.175C21.0781 12.7894 21.6792 12.0565 22.0436 10.9763C22.1867 10.5523 22.2652 10.1274 22.2793 9.70159C22.2934 9.27581 22.2113 8.85454 22.0329 8.4378C21.8546 8.02106 21.5572 7.6175 21.1407 7.22713L19.7787 6.90137Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.6244 13.0054C16.4139 12.9557 16.1978 12.8903 15.976 12.8093L11.7969 11.2817L13.1588 11.6075L17.3379 13.135C17.5598 13.2161 17.7759 13.2815 17.9864 13.3312L16.6244 13.0054Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M14.2207 10.126L16.7761 11.06C16.8513 11.0875 16.9253 11.1103 16.9981 11.1285L18.3601 11.4543C18.2873 11.4361 18.2133 11.4133 18.138 11.3858L15.5827 10.4517L14.2207 10.126Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.9969 11.1287C17.3789 11.2242 17.727 11.1911 18.041 11.0297C18.4271 10.8306 18.7036 10.4837 18.8705 9.98902C19.0374 9.49434 19.03 9.04369 18.8482 8.63704C18.6753 8.23364 18.3538 7.946 17.8835 7.77411L15.3281 6.84009L16.6901 7.16585L19.2455 8.09987C19.7157 8.27176 20.0373 8.5594 20.2102 8.9628C20.3919 9.36944 20.3994 9.8201 20.2325 10.3148C20.0656 10.8095 19.7891 11.1563 19.403 11.3554C19.0889 11.5169 18.7409 11.5499 18.3588 11.4545L16.9969 11.1287Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.3293 6.84009L14.2207 10.1262L15.5827 10.4519L16.6913 7.16585L15.3293 6.84009Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.9375 5.03809L18.3997 5.93806C18.4593 5.95985 18.5181 5.97784 18.5759 5.99202L19.9379 6.31778C19.88 6.3036 19.8213 6.28561 19.7617 6.26382L17.2995 5.36385L15.9375 5.03809Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M18.5749 5.99192C18.8786 6.06636 19.158 6.03587 19.413 5.90045C19.72 5.72914 19.9399 5.44663 20.0727 5.05291C20.2055 4.65918 20.2002 4.30568 20.0567 3.99241C19.9132 3.67914 19.6552 3.45439 19.2825 3.31818L16.8203 2.41821L18.1823 2.74397L20.6445 3.64394C21.0171 3.78015 21.2752 4.0049 21.4187 4.31817C21.5622 4.63144 21.5675 4.98494 21.4347 5.37867C21.3018 5.77239 21.0819 6.0549 20.775 6.22621C20.52 6.36163 20.2406 6.39212 19.9369 6.31767L18.5749 5.99192Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.8213 2.41821L15.9375 5.03798L17.2995 5.36374L18.1833 2.74397L16.8213 2.41821Z"
                                            fill="#6580E1"
                                            fill-opacity="0.741176"
                                        />
                                        <path
                                            d="M11.7969 11.2817L15.603 0L19.7821 1.52752C20.4387 1.76751 20.9534 2.10307 21.3263 2.53419C21.7114 2.95846 21.9481 3.45325 22.0365 4.01854C22.1371 4.57699 22.075 5.18936 21.8502 5.85566C21.6765 6.37053 21.3888 6.8097 20.9871 7.17319C20.5977 7.52982 20.0874 7.75724 19.4563 7.85541L19.7781 6.90139C20.1946 7.29177 20.492 7.69533 20.6704 8.11207C20.8487 8.52881 20.9308 8.95008 20.9168 9.37586C20.9027 9.80165 20.8241 10.2265 20.6811 10.6506C20.3166 11.7308 19.7155 12.4636 18.8778 12.8492C18.0523 13.2279 17.0851 13.2146 15.976 12.8092L11.7969 11.2817ZM14.22 10.1261L16.7754 11.0601C17.2456 11.232 17.6677 11.2218 18.0415 11.0296C18.4276 10.8305 18.7041 10.4836 18.871 9.98896C19.0379 9.49428 19.0305 9.04362 18.8487 8.63697C18.6758 8.23357 18.3543 7.94593 17.884 7.77404L15.3286 6.84002L14.22 10.1261ZM15.9366 5.03798L18.3988 5.93795C18.7715 6.07416 19.1096 6.06166 19.4131 5.90045C19.7201 5.72914 19.94 5.44663 20.0728 5.0529C20.2057 4.65918 20.2004 4.30568 20.0569 3.99241C19.9134 3.67914 19.6553 3.45439 19.2827 3.31818L16.8204 2.41821L15.9366 5.03798Z"
                                            fill="#ADA8D5"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.8472 30.1257C19.5056 30.0448 19.1738 29.9247 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C21.7609 18.0051 22.0748 18.0416 22.3731 18.1102L23.7351 18.436C23.4367 18.3674 23.1229 18.3309 22.7936 18.3265C22.1439 18.3137 21.4596 18.4675 20.7407 18.7879C20.0218 19.1083 19.4017 19.547 18.8803 20.1041C18.3559 20.6513 17.945 21.2823 17.6476 21.9971C17.3561 22.6981 17.1944 23.4532 17.1624 24.2624C17.1364 25.0578 17.2518 25.863 17.5086 26.6779C17.7654 27.4928 18.1279 28.1878 18.5962 28.763C19.0644 29.3381 19.6036 29.7808 20.2138 30.0911C20.5358 30.2504 20.8676 30.3705 21.2092 30.4514L19.8472 30.1257Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M22.373 18.1101C22.6714 18.1787 22.9542 18.2794 23.2215 18.4122C23.753 18.668 24.1862 19.018 24.5209 19.4623L25.8829 19.7881C25.5481 19.3438 25.115 18.9938 24.5835 18.738C24.3162 18.6052 24.0333 18.5045 23.735 18.4359L22.373 18.1101Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.5206 19.4624L23.1406 21.0347L24.5026 21.3605L25.8825 19.7882L24.5206 19.4624Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M23.1419 21.0348C22.7799 20.5691 22.3185 20.2597 21.7578 20.1064L23.1198 20.4322C23.6805 20.5854 24.1418 20.8949 24.5038 21.3606L23.1419 21.0348Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.7562 20.1063C21.7224 20.0965 21.6884 20.0875 21.6543 20.0793L23.0163 20.4051C23.0504 20.4133 23.0843 20.4223 23.1182 20.432L21.7562 20.1063Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.6552 20.0795C21.121 19.9515 20.5541 20.0211 19.9543 20.2884C19.3253 20.5688 18.8192 20.9791 18.436 21.5193C18.0619 22.0556 17.8297 22.6685 17.7396 23.3581C17.6585 24.0437 17.7386 24.7694 17.9799 25.5352C18.2213 26.3011 18.5635 26.9156 19.0067 27.3787C19.4198 27.7921 19.8877 28.0626 20.4103 28.1902L21.7722 28.516C21.2497 28.3883 20.7818 28.1178 20.3687 27.7044C19.9255 27.2413 19.5832 26.6268 19.3419 25.861C19.1005 25.0952 19.0204 24.3695 19.1016 23.6839C19.1917 22.9943 19.4238 22.3813 19.798 21.8451C20.1812 21.3048 20.6872 20.8945 21.3163 20.6142C21.916 20.3469 22.483 20.2773 23.0171 20.4053L21.6552 20.0795Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.4102 28.1902C20.4556 28.2013 20.5015 28.2113 20.5477 28.2202L21.9097 28.546C21.8634 28.5371 21.8176 28.527 21.7721 28.5159L20.4102 28.1902Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5469 28.2201C21.1342 28.3278 21.7424 28.2415 22.3715 27.9612C23.0095 27.6768 23.4975 27.2578 23.8354 26.7041C24.1702 26.1406 24.3454 25.5419 24.3608 24.908L25.7228 25.2337C25.7073 25.8676 25.5322 26.4663 25.1974 27.0299C24.8595 27.5836 24.3715 28.0026 23.7335 28.2869C23.1044 28.5673 22.4962 28.6536 21.9088 28.5458L20.5469 28.2201Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M24.3613 24.908L26.2704 25.0145L27.6323 25.3403L25.7233 25.2337L24.3613 24.908Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M26.2712 25.0146C26.2644 25.6111 26.1329 26.2184 25.8768 26.8364C25.6176 27.4446 25.2421 28.0094 24.7506 28.5308C24.268 29.0482 23.6672 29.4671 22.9483 29.7875C22.2294 30.1079 21.5196 30.2618 20.8188 30.2495C20.4867 30.2416 20.163 30.2004 19.8477 30.1257L21.2096 30.4514C21.525 30.5261 21.8487 30.5674 22.1807 30.5752C22.8815 30.5876 23.5914 30.4336 24.3103 30.1132C25.0292 29.7929 25.6299 29.374 26.1125 28.8566C26.6041 28.3352 26.9795 27.7703 27.2388 27.1621C27.4949 26.5441 27.6263 25.9368 27.6331 25.3404L26.2712 25.0146Z"
                                            fill="#C08E36"
                                        />
                                        <path
                                            d="M22.9479 29.7875C22.229 30.1078 21.5191 30.2618 20.8184 30.2494C20.1265 30.2331 19.471 30.0717 18.8518 29.7654C18.2416 29.455 17.7024 29.0124 17.2342 28.4372C16.766 27.862 16.4035 27.167 16.1466 26.3521C15.8898 25.5373 15.7744 24.7321 15.8005 23.9367C15.8324 23.1274 15.9941 22.3723 16.2856 21.6714C16.583 20.9566 16.9939 20.3255 17.5184 19.7783C18.0397 19.2213 18.6598 18.7825 19.3787 18.4621C20.0976 18.1418 20.7819 17.9879 21.4316 18.0007C22.0903 18.0095 22.6869 18.1467 23.2215 18.4123C23.7531 18.6681 24.1862 19.0182 24.521 19.4624L23.141 21.0348C22.779 20.569 22.3177 20.2596 21.757 20.1064C21.1932 19.9433 20.5923 20.004 19.9542 20.2883C19.3252 20.5687 18.8191 20.979 18.436 21.5192C18.0618 22.0555 17.8297 22.6684 17.7395 23.358C17.6584 24.0436 17.7385 24.7693 17.9798 25.5351C18.2212 26.301 18.5635 26.9155 19.0066 27.3786C19.4557 27.8279 19.9694 28.1084 20.5478 28.2202C21.1351 28.3279 21.7433 28.2416 22.3724 27.9613C23.0104 27.6769 23.4984 27.2579 23.8363 26.7042C24.1711 26.1407 24.3462 25.5419 24.3617 24.908L26.2707 25.0146C26.264 25.6111 26.1325 26.2183 25.8764 26.8363C25.6172 27.4445 25.2417 28.0094 24.7501 28.5308C24.2676 29.0482 23.6668 29.4671 22.9479 29.7875Z"
                                            fill="#FFB367"
                                        />
                                    </svg>
                                    <div>
                                        <p className="text-center font-medium text-base">
                                            Alfabet
                                        </p>
                                    </div>
                                    <div className="mr-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Navbar />
            </div>
        </>
    );
}
