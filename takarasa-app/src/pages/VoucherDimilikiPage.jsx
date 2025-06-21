import { Button } from "@/components/ui/button";
import { CaretLeft, CoinVertical, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
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
                    <Link to="/penukaran-poin" className="left-0 absolute">
                        <CaretLeft size={24} />
                    </Link>

                    <h1 className="w-full text-center text-xl font-semibold">
                        Voucher Dimiliki
                    </h1>
                </header>

                <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    

                    <div className="flex flex-col w-full gap-4">
                         {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="flex w-full justify-evenly bg-grey-10 p-4 rounded-2xl border-2 border-dashed border-brand-primary gap-3">
                            <div className="flex justify-center items-center bg-brand-primary50 w-24 h-24 rounded-xl">
                                <svg
                                    width="74"
                                    height="54"
                                    viewBox="0 0 74 54"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6.73828 41.5754V12.3247L10.3191 15.0245V44.2752L6.73828 41.5754Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6.73762 12.3247L0 14.018L3.58087 16.7177L10.3185 15.0245L6.73762 12.3247Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0 14.0179V9.48291L3.58086 12.1827V16.7177L0 14.0179Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0 9.48296L12.2503 6.4043L15.8312 9.10406L3.58086 12.1827L0 9.48296Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12.25 6.4043V40.19L15.8309 42.8898V9.10406L12.25 6.4043Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12.251 40.19L6.73828 41.5754L10.3191 44.2752L15.8318 42.8898L12.251 40.19Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M33.8111 35.3158C31.0156 36.0183 28.5655 35.9084 26.4609 34.9861L30.0418 37.6859C32.1463 38.6082 34.5964 38.7181 37.392 38.0155L33.8111 35.3158Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M26.4605 34.9862C25.8292 34.7004 25.2388 34.354 24.6895 33.947L28.2703 36.6467C28.8197 37.0538 29.4101 37.4002 30.0414 37.6859L26.4605 34.9862Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M24.6898 33.947C23.4079 32.9972 22.3492 31.7173 21.5137 30.1072L25.0945 32.807C25.9301 34.4171 26.9888 35.697 28.2707 36.6467L24.6898 33.947Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M21.5128 30.1072C20.3506 27.769 19.7695 24.8615 19.7695 21.3846L23.3504 24.0844C23.3504 27.5612 23.9315 30.4688 25.0937 32.807L21.5128 30.1072Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M19.7695 21.3846C19.7695 17.8776 20.3506 14.678 21.5128 11.7858L25.0937 14.4856C23.9315 17.3777 23.3504 20.5773 23.3504 24.0844L19.7695 21.3846Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M21.5137 11.7858C22.7073 8.88581 24.3407 6.44969 26.4138 4.47748L29.9947 7.17724C27.9215 9.14945 26.2882 11.5856 25.0945 14.4856L21.5137 11.7858Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M26.4141 4.47743C28.5186 2.49733 30.9686 1.156 33.7642 0.45343L37.3451 3.15319C34.5495 3.85576 32.0995 5.19709 29.9949 7.17719L26.4141 4.47743Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M33.7637 0.453458C36.5592 -0.249099 38.9936 -0.135289 41.0667 0.794912L44.6476 3.49467C42.5745 2.56447 40.1401 2.45066 37.3445 3.15322L33.7637 0.453458Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M41.0664 0.794922C41.6978 1.07161 42.2867 1.41202 42.8333 1.81614L46.4141 4.5159C45.8676 4.11178 45.2786 3.77137 44.6473 3.49468L41.0664 0.794922Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M42.834 1.81616C44.1093 2.75912 45.1537 4.04898 45.9673 5.68574L49.5481 8.3855C48.7346 6.74874 47.6901 5.45888 46.4148 4.51592L42.834 1.81616Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M45.9668 5.68573C47.1604 7.98578 47.7572 10.8743 47.7572 14.3511L51.3381 17.0509C51.3381 13.574 50.7413 10.6855 49.5477 8.38549L45.9668 5.68573Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M47.757 14.3511C47.757 17.8279 47.1759 21.0275 46.0137 23.9499L49.5945 26.6497C50.7568 23.7273 51.3379 20.5277 51.3379 17.0508L47.757 14.3511Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M46.0134 23.9499C44.8512 26.842 43.2178 29.2933 41.1133 31.3036L44.6941 34.0034C46.7987 31.993 48.4321 29.5418 49.5942 26.6497L46.0134 23.9499Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M41.1136 31.3036C39.0405 33.2758 36.6061 34.6132 33.8105 35.3158L37.3914 38.0155C40.1869 37.313 42.6213 35.9755 44.6944 34.0034L41.1136 31.3036Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M33.8105 30.418C35.5381 29.9838 37.0301 29.0949 38.2866 27.7512L41.8674 30.4509C40.611 31.7946 39.119 32.6836 37.3914 33.1177L33.8105 30.418Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M38.2871 27.7512C39.5436 26.4075 40.5172 24.7116 41.2083 22.6635L44.7892 25.3632C44.0981 27.4113 43.1244 29.1072 41.868 30.4509L38.2871 27.7512Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M41.209 22.6634C41.9 20.6153 42.2456 18.3063 42.2456 15.7365L45.8264 18.4362C45.8264 21.0061 45.4809 23.3151 44.7898 25.3632L41.209 22.6634Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M42.2456 15.7365C42.2456 13.1667 41.9 11.0314 41.209 9.33057L44.7898 12.0303C45.4809 13.7311 45.8264 15.8664 45.8264 18.4362L42.2456 15.7365Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M41.2077 9.33056C40.641 7.93591 39.8843 6.87359 38.9375 6.14368L42.5184 8.84344C43.4652 9.57335 44.2219 10.6357 44.7886 12.0303L41.2077 9.33056Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M38.9381 6.14368C38.7303 5.98346 38.5133 5.83925 38.2871 5.71106L41.868 8.41082C42.0941 8.53901 42.3111 8.68322 42.519 8.84345L38.9381 6.14368Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M38.2868 5.71105C37.0304 4.9989 35.5227 4.86384 33.7637 5.3059L37.3445 8.00566C39.1036 7.5636 40.6113 7.69866 41.8677 8.41081L38.2868 5.71105Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M33.7632 5.30591C32.0356 5.74009 30.5436 6.62901 29.2871 7.97269L32.868 10.6725C34.1244 9.32878 35.6164 8.43985 37.3441 8.00567L33.7632 5.30591Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M29.2884 7.97272C28.032 9.3164 27.0582 11.0124 26.3672 13.0605L29.9481 15.7603C30.6391 13.7121 31.6129 12.0162 32.8692 10.6725L29.2884 7.97272Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M26.3667 13.0605C25.6756 15.1086 25.3301 17.4176 25.3301 19.9874L28.9109 22.6872C28.9109 20.1174 29.2565 17.8084 29.9475 15.7602L26.3667 13.0605Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M25.3301 19.9874C25.3301 22.527 25.6756 24.6623 26.3667 26.3933L29.9475 29.0931C29.2565 27.3621 28.9109 25.2268 28.9109 22.6871L25.3301 19.9874Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M26.3672 26.3934C26.9339 27.788 27.6906 28.8503 28.6374 29.5802L32.2183 32.28C31.2715 31.55 30.5147 30.4878 29.9481 29.0931L26.3672 26.3934Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M28.6367 29.5802C28.8446 29.7404 29.0615 29.8846 29.2877 30.0128L32.8686 32.7126C32.6424 32.5844 32.4254 32.4402 32.2176 32.28L28.6367 29.5802Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M29.2871 30.0128C30.575 30.7171 32.0827 30.8522 33.8103 30.418L37.3912 33.1178C35.6636 33.5519 34.1559 33.4168 32.868 32.7126L29.2871 30.0128Z"
                                        fill="#6580E1"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        d="M6.73762 41.5754V12.3247L0 14.0179V9.48294L12.2503 6.40427V40.19L6.73762 41.5754ZM33.8108 35.3158C31.0152 36.0183 28.5652 35.9085 26.4606 34.9862C24.3561 34.0336 22.707 32.4073 21.5134 30.1072C20.3512 27.769 19.7701 24.8614 19.7701 21.3846C19.7701 17.8776 20.3512 14.678 21.5134 11.7858C22.707 8.88579 24.3404 6.44967 26.4135 4.47745C28.5181 2.49735 30.9681 1.15603 33.7637 0.453458C36.5592 -0.249099 38.9936 -0.135289 41.0667 0.794912C43.1713 1.71721 44.8046 3.34748 45.9669 5.68571C47.1605 7.98576 47.7573 10.8742 47.7573 14.3511C47.7573 17.8279 47.1762 21.0275 46.0139 23.9499C44.8518 26.842 43.2184 29.2933 41.1138 31.3036C39.0408 33.2758 36.6064 34.6132 33.8108 35.3158ZM33.8108 30.418C35.5384 29.9838 37.0304 29.0949 38.2869 27.7512C39.5433 26.4075 40.517 24.7116 41.2081 22.6634C41.8991 20.6153 42.2446 18.3063 42.2446 15.7365C42.2446 13.1667 41.8991 11.0313 41.2081 9.33056C40.517 7.62977 39.5433 6.42322 38.2869 5.71105C37.0304 4.9989 35.5227 4.86384 33.7637 5.30591C32.0361 5.74009 30.5441 6.62902 29.2876 7.97269C28.0312 9.31637 27.0575 11.0123 26.3664 13.0605C25.6754 15.1086 25.3298 17.4176 25.3298 19.9874C25.3298 22.527 25.6754 24.6623 26.3664 26.3934C27.0575 28.0941 28.0312 29.3006 29.2876 30.0128C30.5755 30.7171 32.0832 30.8521 33.8108 30.418Z"
                                        fill="#ADA8D5"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M48.9204 46.2437L66.0783 31.3375L68.9845 35.0057L51.8266 49.9119L48.9204 46.2437Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M66.0796 31.3381L68.8063 31.3341L71.7124 35.0023L68.9858 35.0063L66.0796 31.3381Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M68.8068 31.3332L51.6489 46.2394L54.5551 49.9076L71.713 35.0014L68.8068 31.3332Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M51.648 46.2399L48.9214 46.2439L51.8276 49.9121L54.5542 49.9081L51.648 46.2399Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M53.3801 38.907C52.5866 38.9082 51.9196 38.7361 51.3789 38.3906L54.2851 42.0588C54.8258 42.4043 55.4928 42.5764 56.2863 42.5752L53.3801 38.907Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M51.378 38.3905C51.1095 38.2111 50.8793 38.0034 50.6875 37.7673L53.5937 41.4356C53.7855 41.6716 54.0157 41.8794 54.2842 42.0587L51.378 38.3905Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M50.689 37.7667C50.4971 37.5306 50.3437 37.2662 50.2285 36.9734L53.1347 40.6416C53.2498 40.9344 53.4033 41.1988 53.5952 41.4349L50.689 37.7667Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M50.2279 36.9734C50.0121 36.3878 50.0018 35.7353 50.1973 35.0159L53.1035 38.6842C52.908 39.4035 52.9182 40.056 53.1341 40.6416L50.2279 36.9734Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M50.1977 35.016C50.3931 34.2966 50.758 33.6436 51.2923 33.0569L54.1985 36.7251C53.6642 37.3118 53.2993 37.9648 53.1039 38.6842L50.1977 35.016Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M51.2918 33.0569C51.8441 32.4568 52.4848 31.9832 53.2136 31.6359L56.1198 35.3041C55.3909 35.6514 54.7503 36.125 54.198 36.7251L51.2918 33.0569Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M53.2141 31.6362C53.943 31.2889 54.7041 31.1147 55.4976 31.1135L58.4038 34.7817C57.6103 34.7829 56.8492 34.9571 56.1203 35.3044L53.2141 31.6362Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M55.4982 31.1139C56.2916 31.1127 56.9587 31.2848 57.4993 31.6303L60.4055 35.2985C59.8649 34.9531 59.1978 34.7809 58.4043 34.7821L55.4982 31.1139Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M57.498 31.6297C57.7684 31.8024 57.9977 32.0068 58.1859 32.2429L61.0921 35.9111C60.9039 35.675 60.6746 35.4706 60.4042 35.2979L57.498 31.6297Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M58.1875 32.2432C58.3757 32.4793 58.5229 32.747 58.629 33.0465L61.5352 36.7147C61.4291 36.4152 61.2819 36.1475 61.0937 35.9114L58.1875 32.2432Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M58.6289 33.0466C58.8448 33.6322 58.855 34.2847 58.6595 35.004L61.5657 38.6722C61.7612 37.9529 61.751 37.3004 61.5351 36.7148L58.6289 33.0466Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M58.6595 35.0042C58.4641 35.7235 58.0992 36.3766 57.5649 36.9633L60.4711 40.6315C61.0054 40.0448 61.3703 39.3917 61.5657 38.6724L58.6595 35.0042Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M57.5645 36.9625C57.0301 37.5492 56.3967 38.0228 55.6642 38.3834L58.5704 42.0517C59.3029 41.6911 59.9363 41.2174 60.4706 40.6307L57.5645 36.9625Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M55.6636 38.3841C54.9348 38.7315 54.1736 38.9057 53.3801 38.9068L56.2863 42.5751C57.0798 42.5739 57.8409 42.3997 58.5698 42.0524L55.6636 38.3841Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M53.8746 37.0881C54.3218 37.0874 54.7312 36.987 55.1029 36.7867L58.0091 40.4549C57.6374 40.6552 57.228 40.7557 56.7808 40.7563L53.8746 37.0881Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M55.1012 36.7862C55.4873 36.5859 55.8103 36.3258 56.0703 36.0058L58.9765 39.674C58.7165 39.994 58.3935 40.2541 58.0074 40.4545L55.1012 36.7862Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M56.0733 36.007C56.3333 35.687 56.5103 35.3539 56.6044 35.0075L59.5106 38.6757C59.4165 39.0221 59.2395 39.3552 58.9795 39.6752L56.0733 36.007Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M56.6035 35.007C56.7012 34.6473 56.7051 34.3144 56.6152 34.0082L59.5214 37.6765C59.6113 37.9826 59.6074 38.3155 59.5097 38.6752L56.6035 35.007Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M56.6138 34.008C56.5638 33.8227 56.4816 33.6576 56.3672 33.5128L59.2734 37.181C59.3878 37.3259 59.47 37.4909 59.52 37.6762L56.6138 34.008Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M56.3674 33.5123C56.2846 33.4073 56.1849 33.313 56.0684 33.2293L58.9746 36.8975C59.0911 36.9813 59.1908 37.0756 59.2736 37.1805L56.3674 33.5123Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M56.0674 33.2294C55.8043 33.0301 55.4491 32.9307 55.0019 32.9314L57.9081 36.5996C58.3553 36.599 58.7105 36.6983 58.9736 36.8977L56.0674 33.2294Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M55.0033 32.9318C54.5705 32.9324 54.1611 33.0329 53.775 33.2332L56.6812 36.9014C57.0672 36.7011 57.4767 36.6006 57.9095 36.6L55.0033 32.9318Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M53.7761 33.2327C53.39 33.433 53.0598 33.6932 52.7854 34.0132L55.6916 37.6814C55.966 37.3614 56.2962 37.1013 56.6823 36.9009L53.7761 33.2327Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M52.7841 34.0139C52.5277 34.3205 52.3507 34.6537 52.253 35.0134L55.1592 38.6816C55.2569 38.3219 55.4339 37.9888 55.6903 37.6821L52.7841 34.0139Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M52.2539 35.0132C52.1598 35.3596 52.1559 35.6925 52.2422 36.012L55.1483 39.6802C55.0621 39.3607 55.066 39.0278 55.1601 38.6815L52.2539 35.0132Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M52.2422 36.0118C52.2986 36.1907 52.3827 36.3507 52.4945 36.4919L55.4007 40.1602C55.2889 40.0189 55.2048 39.8589 55.1484 39.68L52.2422 36.0118Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M52.4941 36.4918C52.582 36.6028 52.687 36.7021 52.8091 36.7898L55.7153 40.458C55.5932 40.3703 55.4882 40.271 55.4003 40.16L52.4941 36.4918Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M52.8086 36.7898C53.0861 36.9891 53.4413 37.0885 53.8741 37.0878L56.7803 40.7561C56.3475 40.7567 55.9923 40.6574 55.7148 40.458L52.8086 36.7898Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M62.1224 46.4644C61.329 46.4655 60.6547 46.2934 60.0996 45.948L63.0058 49.6162C63.5609 49.9616 64.2352 50.1337 65.0286 50.1326L62.1224 46.4644Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M60.0992 45.9483C59.8307 45.7689 59.6023 45.5612 59.4141 45.3251L62.3203 48.9934C62.5085 49.2294 62.7368 49.4372 63.0054 49.6165L60.0992 45.9483Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M59.413 45.3245C59.2248 45.0884 59.0767 44.8239 58.9688 44.5311L61.8749 48.1993C61.9829 48.4922 62.1309 48.7566 62.3192 48.9927L59.413 45.3245Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M58.9701 44.5311C58.7542 43.9455 58.744 43.293 58.9395 42.5737L61.8456 46.2419C61.6502 46.9613 61.6604 47.6137 61.8763 48.1993L58.9701 44.5311Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M58.9379 42.5737C59.1333 41.8544 59.4982 41.2014 60.0325 40.6146L62.9387 44.2828C62.4044 44.8696 62.0395 45.5226 61.8441 46.242L58.9379 42.5737Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M60.0334 40.6149C60.5714 40.0149 61.2047 39.5412 61.9336 39.1939L64.8398 42.8621C64.1109 43.2094 63.4775 43.6831 62.9396 44.2831L60.0334 40.6149Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M61.9334 39.1933C62.6767 38.846 63.4451 38.6717 64.2386 38.6706L67.1448 42.3388C66.3513 42.34 65.5829 42.5142 64.8396 42.8615L61.9334 39.1933Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M64.2384 38.6704C65.0318 38.6692 65.6989 38.8413 66.2396 39.1868L69.1458 42.855C68.6051 42.5096 67.938 42.3375 67.1446 42.3386L64.2384 38.6704Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M66.2383 39.1874C66.5086 39.3602 66.7379 39.5646 66.9261 39.8007L69.8323 43.4689C69.6441 43.2328 69.4148 43.0284 69.1445 42.8557L66.2383 39.1874Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M66.9277 39.8009C67.116 40.037 67.2631 40.3048 67.3692 40.6042L70.2754 44.2724C70.1693 43.973 70.0221 43.7052 69.8339 43.4691L66.9277 39.8009Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M67.3691 40.6043C67.585 41.1899 67.5952 41.8424 67.3998 42.5618L70.306 46.23C70.5014 45.5106 70.4912 44.8582 70.2753 44.2725L67.3691 40.6043Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M67.3997 42.5619C67.2043 43.2813 66.8394 43.9343 66.3051 44.521L69.2113 48.1892C69.7456 47.6025 70.1105 46.9495 70.3059 46.2301L67.3997 42.5619Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M66.3047 44.5202C65.7703 45.1069 65.137 45.5806 64.4045 45.9412L67.3107 49.6094C68.0432 49.2488 68.6765 48.7752 69.2109 48.1884L66.3047 44.5202Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M64.4058 45.9419C63.6769 46.2892 62.9158 46.4634 62.1223 46.4646L65.0285 50.1328C65.822 50.1316 66.5831 49.9574 67.312 49.6101L64.4058 45.9419Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M62.6148 44.6458C63.062 44.6451 63.4715 44.5446 63.8431 44.3444L66.7493 48.0126C66.3777 48.2129 65.9682 48.3133 65.521 48.314L62.6148 44.6458Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M63.8428 44.3442C64.2145 44.144 64.5303 43.8838 64.7903 43.5639L67.6965 47.2321C67.4365 47.552 67.1207 47.8122 66.749 48.0125L63.8428 44.3442Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M64.7907 43.564C65.0651 43.244 65.2493 42.9109 65.3434 42.5645L68.2496 46.2327C68.1555 46.5791 67.9712 46.9122 67.6969 47.2322L64.7907 43.564Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M65.3439 42.5643C65.4416 42.2046 65.4383 41.8718 65.334 41.5656L68.2402 45.2338C68.3445 45.54 68.3478 45.8729 68.2501 46.2325L65.3439 42.5643Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M65.3348 41.5662C65.283 41.3745 65.1994 41.2045 65.084 41.056L67.9902 44.7243C68.1056 44.8727 68.1892 45.0428 68.2409 45.2344L65.3348 41.5662Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M65.0838 41.0551C65.0069 40.9561 64.9158 40.8668 64.8105 40.787L67.7167 44.4553C67.822 44.535 67.9131 44.6244 67.99 44.7233L65.0838 41.0551Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M64.8096 40.7871C64.5465 40.5878 64.1913 40.4884 63.7441 40.4891L66.6503 44.1573C67.0975 44.1566 67.4527 44.256 67.7158 44.4553L64.8096 40.7871Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M63.7435 40.4894C63.3107 40.4901 62.9013 40.5905 62.5152 40.7909L65.4214 44.4591C65.8075 44.2588 66.2169 44.1583 66.6497 44.1577L63.7435 40.4894Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M62.5164 40.7905C62.1302 40.9908 61.8 41.2509 61.5256 41.5709L64.4318 45.2391C64.7062 44.9191 65.0364 44.659 65.4225 44.4587L62.5164 40.7905Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M61.5243 41.5716C61.268 41.8783 61.0909 42.2115 60.9932 42.5711L63.8994 46.2394C63.9971 45.8797 64.1742 45.5465 64.4305 45.2399L61.5243 41.5716Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M60.9941 42.571C60.9 42.9174 60.8961 43.2503 60.9824 43.5697L63.8886 47.2379C63.8023 46.9185 63.8062 46.5856 63.9003 46.2392L60.9941 42.571Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M60.9824 43.5695C61.0388 43.7484 61.1229 43.9085 61.2347 44.0497L64.1409 47.7179C64.0291 47.5767 63.945 47.4166 63.8886 47.2377L60.9824 43.5695Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M61.2344 44.0495C61.3223 44.1605 61.4272 44.2598 61.5494 44.3475L64.4556 48.0157C64.3334 47.928 64.2284 47.8287 64.1406 47.7177L61.2344 44.0495Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M61.5508 44.3475C61.8283 44.5468 62.1835 44.6462 62.6163 44.6455L65.5224 48.3137C65.0897 48.3144 64.7345 48.215 64.457 48.0157L61.5508 44.3475Z"
                                        fill="#C08E36"
                                        fill-opacity="0.74"
                                    />
                                    <path
                                        d="M48.9208 46.2435L66.0788 31.3372L68.8054 31.3332L51.6475 46.2394L48.9208 46.2435ZM53.38 38.9063C52.5866 38.9074 51.9195 38.7353 51.3789 38.3899C50.8418 38.0311 50.4581 37.559 50.2279 36.9734C50.012 36.3878 50.0018 35.7353 50.1972 35.0159C50.3927 34.2965 50.7575 33.6435 51.2919 33.0568C51.8442 32.4568 52.4848 31.9831 53.2137 31.6358C53.9426 31.2885 54.7037 31.1143 55.4972 31.1131C56.2906 31.1119 56.9577 31.2841 57.4984 31.6295C58.0391 31.9749 58.4155 32.4471 58.6277 33.046C58.8436 33.6316 58.8538 34.2841 58.6584 35.0035C58.4629 35.7228 58.0981 36.3759 57.5637 36.9626C57.0294 37.5493 56.396 38.0229 55.6635 38.3836C54.9347 38.7309 54.1735 38.9051 53.38 38.9063ZM53.874 37.0878C54.3213 37.0872 54.7307 36.9867 55.1024 36.7864C55.4885 36.5861 55.8115 36.326 56.0715 36.006C56.3315 35.686 56.5085 35.3529 56.6026 35.0065C56.7003 34.6468 56.7042 34.3139 56.6143 34.0077C56.5281 33.6883 56.3462 33.4289 56.0687 33.2295C55.8056 33.0302 55.4504 32.9308 55.0032 32.9315C54.5704 32.9321 54.1609 33.0326 53.7748 33.2329C53.3888 33.4332 53.0585 33.6934 52.7841 34.0134C52.5278 34.32 52.3507 34.6532 52.253 35.0129C52.1589 35.3593 52.155 35.6922 52.2413 36.0116C52.3419 36.3311 52.531 36.5905 52.8086 36.7898C53.0861 36.9891 53.4413 37.0885 53.874 37.0878ZM62.1208 46.4637C61.3274 46.4649 60.6531 46.2928 60.098 45.9474C59.5609 45.5886 59.1845 45.1165 58.9687 44.5308C58.7528 43.9452 58.7426 43.2928 58.938 42.5734C59.1335 41.854 59.4983 41.201 60.0327 40.6143C60.5706 40.0143 61.204 39.5406 61.9329 39.1933C62.6762 38.846 63.4445 38.6717 64.238 38.6706C65.0314 38.6694 65.6985 38.8415 66.2392 39.187C66.7798 39.5324 67.1563 40.0046 67.3685 40.6035C67.5844 41.1891 67.5946 41.8416 67.3992 42.561C67.2037 43.2803 66.8389 43.9333 66.3045 44.5201C65.7702 45.1068 65.1368 45.5804 64.4043 45.941C63.6754 46.2884 62.9143 46.4626 62.1208 46.4637ZM62.6148 44.6453C63.062 44.6447 63.4715 44.5442 63.8432 44.3439C64.2148 44.1436 64.5307 43.8835 64.7906 43.5635C65.065 43.2435 65.2493 42.9104 65.3434 42.564C65.4411 42.2043 65.4378 41.8714 65.3335 41.5653C65.2472 41.2458 65.0725 40.9864 64.8095 40.787C64.5464 40.5877 64.1912 40.4883 63.744 40.489C63.3112 40.4896 62.9018 40.5901 62.5156 40.7904C62.1295 40.9907 61.7993 41.2509 61.5249 41.5709C61.2685 41.8775 61.0915 42.2107 60.9938 42.5704C60.8997 42.9168 60.8958 43.2496 60.982 43.5691C61.0827 43.8886 61.2718 44.1479 61.5494 44.3473C61.8269 44.5466 62.182 44.646 62.6148 44.6453Z"
                                        fill="#FFB367"
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col justify-evenly">
                                <div className="flex flex-col gap-0.5">
                                    <h1 className="font-bold text-base">
                                        Voucher Potongan Harga 10%
                                    </h1>
                                    <p className="text-xs text-grey-100">
                                        Lorem ipsum dolor sit amet consectetur.
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <Link
                                            to="/detail-voucher"
                                            className="text-xs text-right font-bold underline text-grey-100"
                                        >
                                            Selengkapnya
                                        </Link>
                                    </div>
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
