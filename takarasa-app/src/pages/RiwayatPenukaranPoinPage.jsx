import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePicture from "@/assets/img/profile_picture.jpg";
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
            <div className="relative max-w-md min-h-screen items-center mx-auto font-jakarta flex flex-col">
                <div className="relative w-full flex flex-col items-center mx-auto overflow-hidden px-6">
                    <header className="relative flex items-center justify-center p-4 w-full">
                        <Link to="/penukaran-poin" className="left-0 absolute">
                            <CaretLeft size={24} />
                        </Link>

                        <h1 className="w-full text-center text-xl font-semibold">
                            Riwayat Penukaran Poin
                        </h1>
                    </header>

                    <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4">
                        <div className="flex flex-col justify-center items-center gap-3 mb-6">
                            <div className="h-16 w-16 rounded-full">
                                <img
                                    src={ProfilePicture}
                                    alt="Profile Picture"
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                            </div>
                            <h1 className="text-base font-bold text-grey-100">
                                {userName}
                            </h1>
                            <div className="flex justify-center py-2 px-3 items-center gap-1 w-28 h-8 bg-brand-accent rounded-full text-white">
                                <CoinVertical size={16} weight="fill" />
                                <p className="text-xs font-bold">200 Poin</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-brand-primary w-full flex-grow overflow-y-auto rounded-t-2xl py-4 px-6">
                    <Tabs defaultValue="penggunaan" className="w-full j">
                        <TabsList>
                            <TabsTrigger value="penggunaan">
                                Penggunaan Poin
                            </TabsTrigger>
                            <TabsTrigger value="perolehan">
                                Perolehan Poin
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="penggunaan">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="w-full mb-3 bg-grey-10 flex p-4 gap-3 items-center rounded-2xl"
                                >
                                    <div className="bg-brand-primary50 w-24 h-24  rounded-2xl flex justify-center items-center">
                                        <svg
                                            width="52"
                                            height="46"
                                            viewBox="0 0 52 46"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M6.73828 42.0754V12.8247L10.3191 15.5245V44.7752L6.73828 42.0754Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M6.73762 12.8247L0 14.518L3.58087 17.2177L10.3185 15.5245L6.73762 12.8247Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M0 14.5179V9.98291L3.58086 12.6827V17.2177L0 14.5179Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M0 9.98296L12.2503 6.9043L15.8312 9.60406L3.58086 12.6827L0 9.98296Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12.25 6.9043V40.69L15.8309 43.3898V9.60406L12.25 6.9043Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12.251 40.69L6.73828 42.0754L10.3191 44.7752L15.8318 43.3898L12.251 40.69Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M33.8111 35.8158C31.0156 36.5183 28.5655 36.4084 26.4609 35.4861L30.0418 38.1859C32.1463 39.1082 34.5964 39.2181 37.392 38.5155L33.8111 35.8158Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M26.4605 35.4862C25.8292 35.2004 25.2388 34.854 24.6895 34.447L28.2703 37.1467C28.8197 37.5538 29.4101 37.9002 30.0414 38.1859L26.4605 35.4862Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M24.6898 34.447C23.4079 33.4972 22.3492 32.2173 21.5137 30.6072L25.0945 33.307C25.9301 34.9171 26.9888 36.197 28.2707 37.1467L24.6898 34.447Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M21.5128 30.6072C20.3506 28.269 19.7695 25.3615 19.7695 21.8846L23.3504 24.5844C23.3504 28.0612 23.9315 30.9688 25.0937 33.307L21.5128 30.6072Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M19.7695 21.8846C19.7695 18.3776 20.3506 15.178 21.5128 12.2858L25.0937 14.9856C23.9315 17.8777 23.3504 21.0773 23.3504 24.5844L19.7695 21.8846Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M21.5137 12.2858C22.7073 9.38581 24.3407 6.94969 26.4138 4.97748L29.9947 7.67724C27.9215 9.64945 26.2882 12.0856 25.0945 14.9856L21.5137 12.2858Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M26.4141 4.97743C28.5186 2.99733 30.9686 1.656 33.7642 0.95343L37.3451 3.65319C34.5495 4.35576 32.0995 5.69709 29.9949 7.67719L26.4141 4.97743Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M33.7637 0.953458C36.5592 0.250901 38.9936 0.364711 41.0667 1.29491L44.6476 3.99467C42.5745 3.06447 40.1401 2.95066 37.3445 3.65322L33.7637 0.953458Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M41.0664 1.29492C41.6978 1.57161 42.2867 1.91202 42.8333 2.31614L46.4141 5.0159C45.8676 4.61178 45.2786 4.27137 44.6473 3.99468L41.0664 1.29492Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M42.834 2.31616C44.1093 3.25912 45.1537 4.54898 45.9673 6.18574L49.5481 8.8855C48.7346 7.24874 47.6901 5.95888 46.4148 5.01592L42.834 2.31616Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M45.9668 6.18573C47.1604 8.48578 47.7572 11.3743 47.7572 14.8511L51.3381 17.5509C51.3381 14.074 50.7413 11.1855 49.5477 8.88549L45.9668 6.18573Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M47.757 14.8511C47.757 18.3279 47.1759 21.5275 46.0137 24.4499L49.5945 27.1497C50.7568 24.2273 51.3379 21.0277 51.3379 17.5508L47.757 14.8511Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M46.0134 24.4499C44.8512 27.342 43.2178 29.7933 41.1133 31.8036L44.6941 34.5034C46.7987 32.493 48.4321 30.0418 49.5942 27.1497L46.0134 24.4499Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M41.1136 31.8036C39.0405 33.7758 36.6061 35.1132 33.8105 35.8158L37.3914 38.5155C40.1869 37.813 42.6213 36.4755 44.6944 34.5034L41.1136 31.8036Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M33.8105 30.918C35.5381 30.4838 37.0301 29.5949 38.2866 28.2512L41.8674 30.9509C40.611 32.2946 39.119 33.1836 37.3914 33.6177L33.8105 30.918Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M38.2871 28.2512C39.5436 26.9075 40.5172 25.2116 41.2083 23.1635L44.7892 25.8632C44.0981 27.9113 43.1244 29.6072 41.868 30.9509L38.2871 28.2512Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M41.209 23.1634C41.9 21.1153 42.2456 18.8063 42.2456 16.2365L45.8264 18.9362C45.8264 21.5061 45.4809 23.8151 44.7898 25.8632L41.209 23.1634Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M42.2456 16.2365C42.2456 13.6667 41.9 11.5314 41.209 9.83057L44.7898 12.5303C45.4809 14.2311 45.8264 16.3664 45.8264 18.9362L42.2456 16.2365Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M41.2077 9.83056C40.641 8.43591 39.8843 7.37359 38.9375 6.64368L42.5184 9.34344C43.4652 10.0734 44.2219 11.1357 44.7886 12.5303L41.2077 9.83056Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M38.9381 6.64368C38.7303 6.48346 38.5133 6.33925 38.2871 6.21106L41.868 8.91082C42.0941 9.03901 42.3111 9.18322 42.519 9.34345L38.9381 6.64368Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M38.2868 6.21105C37.0304 5.4989 35.5227 5.36384 33.7637 5.8059L37.3445 8.50566C39.1036 8.0636 40.6113 8.19866 41.8677 8.91081L38.2868 6.21105Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M33.7632 5.80591C32.0356 6.24009 30.5436 7.12901 29.2871 8.47269L32.868 11.1725C34.1244 9.82878 35.6164 8.93985 37.3441 8.50567L33.7632 5.80591Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M29.2884 8.47272C28.032 9.8164 27.0582 11.5124 26.3672 13.5605L29.9481 16.2603C30.6391 14.2121 31.6129 12.5162 32.8692 11.1725L29.2884 8.47272Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M26.3667 13.5605C25.6756 15.6086 25.3301 17.9176 25.3301 20.4874L28.9109 23.1872C28.9109 20.6174 29.2565 18.3084 29.9475 16.2602L26.3667 13.5605Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M25.3301 20.4874C25.3301 23.027 25.6756 25.1623 26.3667 26.8933L29.9475 29.5931C29.2565 27.8621 28.9109 25.7268 28.9109 23.1871L25.3301 20.4874Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M26.3672 26.8934C26.9339 28.288 27.6906 29.3503 28.6374 30.0802L32.2183 32.78C31.2715 32.05 30.5147 30.9878 29.9481 29.5931L26.3672 26.8934Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M28.6367 30.0802C28.8446 30.2404 29.0615 30.3846 29.2877 30.5128L32.8686 33.2126C32.6424 33.0844 32.4254 32.9402 32.2176 32.78L28.6367 30.0802Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M29.2871 30.5128C30.575 31.2171 32.0827 31.3522 33.8103 30.918L37.3912 33.6178C35.6636 34.0519 34.1559 33.9168 32.868 33.2126L29.2871 30.5128Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                d="M6.73762 42.0754V12.8247L0 14.5179V9.98294L12.2503 6.90427V40.69L6.73762 42.0754ZM33.8108 35.8158C31.0152 36.5183 28.5652 36.4085 26.4606 35.4862C24.3561 34.5336 22.707 32.9073 21.5134 30.6072C20.3512 28.269 19.7701 25.3614 19.7701 21.8846C19.7701 18.3776 20.3512 15.178 21.5134 12.2858C22.707 9.38579 24.3404 6.94967 26.4135 4.97745C28.5181 2.99735 30.9681 1.65603 33.7637 0.953458C36.5592 0.250901 38.9936 0.364711 41.0667 1.29491C43.1713 2.21721 44.8046 3.84748 45.9669 6.18571C47.1605 8.48576 47.7573 11.3742 47.7573 14.8511C47.7573 18.3279 47.1762 21.5275 46.0139 24.4499C44.8518 27.342 43.2184 29.7933 41.1138 31.8036C39.0408 33.7758 36.6064 35.1132 33.8108 35.8158ZM33.8108 30.918C35.5384 30.4838 37.0304 29.5949 38.2869 28.2512C39.5433 26.9075 40.517 25.2116 41.2081 23.1634C41.8991 21.1153 42.2446 18.8063 42.2446 16.2365C42.2446 13.6667 41.8991 11.5313 41.2081 9.83056C40.517 8.12977 39.5433 6.92322 38.2869 6.21105C37.0304 5.4989 35.5227 5.36384 33.7637 5.80591C32.0361 6.24009 30.5441 7.12902 29.2876 8.47269C28.0312 9.81637 27.0575 11.5123 26.3664 13.5605C25.6754 15.6086 25.3298 17.9176 25.3298 20.4874C25.3298 23.027 25.6754 25.1623 26.3664 26.8934C27.0575 28.5941 28.0312 29.8006 29.2876 30.5128C30.5755 31.2171 32.0832 31.3521 33.8108 30.918Z"
                                                fill="#ADA8D5"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col w-auto">
                                        <h1 className="text-base text-left text-grey-100 font-bold">
                                            -10 poin
                                        </h1>
                                        <p className="text-xs text-grey-100">
                                            Lorem ipsum dolor sit amet
                                            consectetur.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                        <TabsContent value="perolehan">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="w-full mb-3 bg-grey-10 flex p-4 gap-3 items-center rounded-2xl"
                                >
                                    <div className="bg-brand-primary50 w-24 h-24  rounded-2xl flex justify-center items-center">
                                        <svg
                                            width="52"
                                            height="46"
                                            viewBox="0 0 52 46"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M6.73828 42.0754V12.8247L10.3191 15.5245V44.7752L6.73828 42.0754Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M6.73762 12.8247L0 14.518L3.58087 17.2177L10.3185 15.5245L6.73762 12.8247Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M0 14.5179V9.98291L3.58086 12.6827V17.2177L0 14.5179Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M0 9.98296L12.2503 6.9043L15.8312 9.60406L3.58086 12.6827L0 9.98296Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12.25 6.9043V40.69L15.8309 43.3898V9.60406L12.25 6.9043Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12.251 40.69L6.73828 42.0754L10.3191 44.7752L15.8318 43.3898L12.251 40.69Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M33.8111 35.8158C31.0156 36.5183 28.5655 36.4084 26.4609 35.4861L30.0418 38.1859C32.1463 39.1082 34.5964 39.2181 37.392 38.5155L33.8111 35.8158Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M26.4605 35.4862C25.8292 35.2004 25.2388 34.854 24.6895 34.447L28.2703 37.1467C28.8197 37.5538 29.4101 37.9002 30.0414 38.1859L26.4605 35.4862Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M24.6898 34.447C23.4079 33.4972 22.3492 32.2173 21.5137 30.6072L25.0945 33.307C25.9301 34.9171 26.9888 36.197 28.2707 37.1467L24.6898 34.447Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M21.5128 30.6072C20.3506 28.269 19.7695 25.3615 19.7695 21.8846L23.3504 24.5844C23.3504 28.0612 23.9315 30.9688 25.0937 33.307L21.5128 30.6072Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M19.7695 21.8846C19.7695 18.3776 20.3506 15.178 21.5128 12.2858L25.0937 14.9856C23.9315 17.8777 23.3504 21.0773 23.3504 24.5844L19.7695 21.8846Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M21.5137 12.2858C22.7073 9.38581 24.3407 6.94969 26.4138 4.97748L29.9947 7.67724C27.9215 9.64945 26.2882 12.0856 25.0945 14.9856L21.5137 12.2858Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M26.4141 4.97743C28.5186 2.99733 30.9686 1.656 33.7642 0.95343L37.3451 3.65319C34.5495 4.35576 32.0995 5.69709 29.9949 7.67719L26.4141 4.97743Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M33.7637 0.953458C36.5592 0.250901 38.9936 0.364711 41.0667 1.29491L44.6476 3.99467C42.5745 3.06447 40.1401 2.95066 37.3445 3.65322L33.7637 0.953458Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M41.0664 1.29492C41.6978 1.57161 42.2867 1.91202 42.8333 2.31614L46.4141 5.0159C45.8676 4.61178 45.2786 4.27137 44.6473 3.99468L41.0664 1.29492Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M42.834 2.31616C44.1093 3.25912 45.1537 4.54898 45.9673 6.18574L49.5481 8.8855C48.7346 7.24874 47.6901 5.95888 46.4148 5.01592L42.834 2.31616Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M45.9668 6.18573C47.1604 8.48578 47.7572 11.3743 47.7572 14.8511L51.3381 17.5509C51.3381 14.074 50.7413 11.1855 49.5477 8.88549L45.9668 6.18573Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M47.757 14.8511C47.757 18.3279 47.1759 21.5275 46.0137 24.4499L49.5945 27.1497C50.7568 24.2273 51.3379 21.0277 51.3379 17.5508L47.757 14.8511Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M46.0134 24.4499C44.8512 27.342 43.2178 29.7933 41.1133 31.8036L44.6941 34.5034C46.7987 32.493 48.4321 30.0418 49.5942 27.1497L46.0134 24.4499Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M41.1136 31.8036C39.0405 33.7758 36.6061 35.1132 33.8105 35.8158L37.3914 38.5155C40.1869 37.813 42.6213 36.4755 44.6944 34.5034L41.1136 31.8036Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M33.8105 30.918C35.5381 30.4838 37.0301 29.5949 38.2866 28.2512L41.8674 30.9509C40.611 32.2946 39.119 33.1836 37.3914 33.6177L33.8105 30.918Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M38.2871 28.2512C39.5436 26.9075 40.5172 25.2116 41.2083 23.1635L44.7892 25.8632C44.0981 27.9113 43.1244 29.6072 41.868 30.9509L38.2871 28.2512Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M41.209 23.1634C41.9 21.1153 42.2456 18.8063 42.2456 16.2365L45.8264 18.9362C45.8264 21.5061 45.4809 23.8151 44.7898 25.8632L41.209 23.1634Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M42.2456 16.2365C42.2456 13.6667 41.9 11.5314 41.209 9.83057L44.7898 12.5303C45.4809 14.2311 45.8264 16.3664 45.8264 18.9362L42.2456 16.2365Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M41.2077 9.83056C40.641 8.43591 39.8843 7.37359 38.9375 6.64368L42.5184 9.34344C43.4652 10.0734 44.2219 11.1357 44.7886 12.5303L41.2077 9.83056Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M38.9381 6.64368C38.7303 6.48346 38.5133 6.33925 38.2871 6.21106L41.868 8.91082C42.0941 9.03901 42.3111 9.18322 42.519 9.34345L38.9381 6.64368Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M38.2868 6.21105C37.0304 5.4989 35.5227 5.36384 33.7637 5.8059L37.3445 8.50566C39.1036 8.0636 40.6113 8.19866 41.8677 8.91081L38.2868 6.21105Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M33.7632 5.80591C32.0356 6.24009 30.5436 7.12901 29.2871 8.47269L32.868 11.1725C34.1244 9.82878 35.6164 8.93985 37.3441 8.50567L33.7632 5.80591Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M29.2884 8.47272C28.032 9.8164 27.0582 11.5124 26.3672 13.5605L29.9481 16.2603C30.6391 14.2121 31.6129 12.5162 32.8692 11.1725L29.2884 8.47272Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M26.3667 13.5605C25.6756 15.6086 25.3301 17.9176 25.3301 20.4874L28.9109 23.1872C28.9109 20.6174 29.2565 18.3084 29.9475 16.2602L26.3667 13.5605Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M25.3301 20.4874C25.3301 23.027 25.6756 25.1623 26.3667 26.8933L29.9475 29.5931C29.2565 27.8621 28.9109 25.7268 28.9109 23.1871L25.3301 20.4874Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M26.3672 26.8934C26.9339 28.288 27.6906 29.3503 28.6374 30.0802L32.2183 32.78C31.2715 32.05 30.5147 30.9878 29.9481 29.5931L26.3672 26.8934Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M28.6367 30.0802C28.8446 30.2404 29.0615 30.3846 29.2877 30.5128L32.8686 33.2126C32.6424 33.0844 32.4254 32.9402 32.2176 32.78L28.6367 30.0802Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M29.2871 30.5128C30.575 31.2171 32.0827 31.3522 33.8103 30.918L37.3912 33.6178C35.6636 34.0519 34.1559 33.9168 32.868 33.2126L29.2871 30.5128Z"
                                                fill="#6580E1"
                                                fill-opacity="0.74"
                                            />
                                            <path
                                                d="M6.73762 42.0754V12.8247L0 14.5179V9.98294L12.2503 6.90427V40.69L6.73762 42.0754ZM33.8108 35.8158C31.0152 36.5183 28.5652 36.4085 26.4606 35.4862C24.3561 34.5336 22.707 32.9073 21.5134 30.6072C20.3512 28.269 19.7701 25.3614 19.7701 21.8846C19.7701 18.3776 20.3512 15.178 21.5134 12.2858C22.707 9.38579 24.3404 6.94967 26.4135 4.97745C28.5181 2.99735 30.9681 1.65603 33.7637 0.953458C36.5592 0.250901 38.9936 0.364711 41.0667 1.29491C43.1713 2.21721 44.8046 3.84748 45.9669 6.18571C47.1605 8.48576 47.7573 11.3742 47.7573 14.8511C47.7573 18.3279 47.1762 21.5275 46.0139 24.4499C44.8518 27.342 43.2184 29.7933 41.1138 31.8036C39.0408 33.7758 36.6064 35.1132 33.8108 35.8158ZM33.8108 30.918C35.5384 30.4838 37.0304 29.5949 38.2869 28.2512C39.5433 26.9075 40.517 25.2116 41.2081 23.1634C41.8991 21.1153 42.2446 18.8063 42.2446 16.2365C42.2446 13.6667 41.8991 11.5313 41.2081 9.83056C40.517 8.12977 39.5433 6.92322 38.2869 6.21105C37.0304 5.4989 35.5227 5.36384 33.7637 5.80591C32.0361 6.24009 30.5441 7.12902 29.2876 8.47269C28.0312 9.81637 27.0575 11.5123 26.3664 13.5605C25.6754 15.6086 25.3298 17.9176 25.3298 20.4874C25.3298 23.027 25.6754 25.1623 26.3664 26.8934C27.0575 28.5941 28.0312 29.8006 29.2876 30.5128C30.5755 31.2171 32.0832 31.3521 33.8108 30.918Z"
                                                fill="#ADA8D5"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col w-auto">
                                        <h1 className="text-base text-left text-grey-100 font-bold">
                                            +10 poin
                                        </h1>
                                        <p className="text-xs text-grey-100">
                                            Lorem ipsum dolor sit amet
                                            consectetur.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
