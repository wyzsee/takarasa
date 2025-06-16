import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CaretLeft, MapPinLine } from "@phosphor-icons/react";

export default function IsyaratKeTulisanPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleUseCamera = () => {
        // Arahkan ke halaman implementasi kamera live
        navigate("/terjemahan-isyarat/kamera");
    };

    const handleChooseVideo = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Video dipilih:", file.name);
            // Kirim file untuk diproses di halaman hasil
            navigate("/terjemahan-isyarat/hasil", {
                state: { videoFile: file },
            });
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white text-gray-800 font-jakarta">
            <header className="flex items-center p-4">
                <CaretLeft
                    size={22}
                    onClick={() => navigate(-1)}
                    className="cursor-pointer"
                />{" "}{" "}
                <h1 className="text-xl font-semibold mx-auto text-center">
                    Bahasa Isyarat ke Tulisan
                </h1>
                <div className="w-8"></div>{" "}
                {/* Spacer untuk menyeimbangkan judul */}
            </header>

            <main className="flex-grow flex flex-col items-center justify-between py-8 gap-6">
                <p className="max-w-xs text-grey-100 text-base font-regular">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto et, temporibus nemo distinctio sunt laborum
                    veniam illo quod iusto delectus?
                </p>
                <div
                    className="relative w-48 h-48 flex items-center justify-center"
                    onClick={handleUseCamera}
                >
                    <svg
                        className="absolute"
                        width="430"
                        height="447"
                        viewBox="0 0 430 447"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_f_155_3729)">
                            <circle
                                cx="215.5"
                                cy="223.5"
                                r="124.5"
                                fill="#D4D0F2"
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_f_155_3729"
                                x="-8"
                                y="0"
                                width="447"
                                height="447"
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
                                    stdDeviation="49.5"
                                    result="effect1_foregroundBlur_155_3729"
                                />
                            </filter>
                        </defs>
                    </svg>
                    <svg
                        className="z-10"
                        width="139"
                        height="131"
                        viewBox="0 0 139 131"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M92.3535 34.2634L84.2989 21.2814C83.8674 20.5863 83.283 19.9904 82.5975 19.5466C81.912 19.1028 81.1466 18.8248 80.3691 18.7371L42.5484 14.4973C41.7709 14.4106 41.0055 14.5171 40.32 14.8072C39.8812 14.9929 39.4839 15.2501 39.1416 15.5681L54.4433 1.1001C54.7856 0.782072 55.1829 0.524824 55.6217 0.339149C56.3072 0.0490305 57.0726 -0.0573976 57.8501 0.0292949L95.6708 4.26908C96.4483 4.35671 97.2137 4.63474 97.8992 5.07855C98.5847 5.52236 99.1691 6.11825 99.6006 6.81339L107.655 19.7953L92.3535 34.2634Z"
                            fill="#6580E1"
                            fill-opacity="0.74"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M39.1413 15.5681C38.9487 15.747 38.7736 15.9452 38.6183 16.1606L30.5576 27.336L45.8593 12.8679L53.92 1.69254C54.0753 1.47711 54.2504 1.27899 54.443 1.1001L39.1413 15.5681Z"
                            fill="#7A7698"
                            fill-opacity="0.53"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M30.5582 27.336L14.183 25.5003C10.4216 25.0786 6.81408 26.1685 4.1543 28.5301L19.456 14.062C22.1158 11.7005 25.7233 10.6106 29.4847 11.0322L45.8599 12.8679L30.5582 27.336Z"
                            fill="#6580E1"
                            fill-opacity="0.74"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.15428 28.5301C4.10108 28.5773 4.04835 28.625 3.99609 28.673L19.2978 14.205C19.3501 14.1569 19.4028 14.1092 19.456 14.062L4.15428 28.5301Z"
                            fill="#7A7698"
                            fill-opacity="0.53"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.99586 28.6731C1.43508 31.0294 0 34.407 0 38.0932V104.28C0 108.041 1.49425 111.816 4.15404 114.774C6.81382 117.732 10.4213 119.631 14.1828 120.052L108.735 130.652C112.496 131.073 116.104 129.984 118.764 127.622L134.065 113.154C131.406 115.516 127.798 116.605 124.036 116.184L29.4845 105.584C25.723 105.162 22.1155 103.264 19.4557 100.306C16.796 97.3483 15.3017 93.5727 15.3017 89.8115V23.6252C15.3017 19.9389 16.7368 16.5614 19.2976 14.2051L3.99586 28.6731Z"
                            fill="#7A7698"
                            fill-opacity="0.53"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M118.764 127.622C118.817 127.575 118.87 127.527 118.922 127.479L134.224 113.011C134.171 113.059 134.119 113.107 134.065 113.154L118.764 127.622Z"
                            fill="#7A7698"
                            fill-opacity="0.53"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M118.922 127.479C121.483 125.123 122.917 121.745 122.917 118.059V51.8725C122.917 48.111 121.423 44.336 118.764 41.3781C116.104 38.4202 112.496 36.5215 108.735 36.0998L92.3535 34.2635L107.655 19.7954L124.036 21.6318C127.798 22.0534 131.406 23.9522 134.065 26.9101C136.725 29.868 138.219 33.643 138.219 37.4045V103.591C138.219 107.277 136.784 110.655 134.224 113.011L118.922 127.479Z"
                            fill="#6580E1"
                            fill-opacity="0.74"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M76.9615 92.0189C74.905 93.9767 72.3989 95.4339 69.6 96.2795C65.7126 97.454 61.4351 97.3957 57.3084 96.1123C53.1816 94.8287 49.3909 92.3776 46.4156 89.0688C43.4404 85.76 41.4142 81.7422 40.5933 77.5234C39.7725 73.3047 40.1938 69.0744 41.804 65.3675C42.7701 63.1434 44.1382 61.1677 45.8338 59.5227L61.1355 45.0547C59.4399 46.6996 58.0718 48.6753 57.1057 50.8994C55.4955 54.6063 55.0742 58.8366 55.895 63.0553C56.7159 67.2742 58.7421 71.292 61.7173 74.6008C64.6926 77.9096 68.4833 80.3607 72.6101 81.6442C76.7368 82.9276 81.0143 82.9859 84.9017 81.8115C87.7006 80.9659 90.2067 79.5086 92.2632 77.5509L76.9615 92.0189Z"
                            fill="#6580E1"
                            fill-opacity="0.74"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M45.834 59.5228C46.9644 58.4262 48.2403 57.4765 49.6397 56.6983C53.1382 54.7529 57.2513 53.9663 61.459 54.438C67.1013 55.0705 72.5124 57.9184 76.5021 62.3554C80.4918 66.7924 82.7331 72.4547 82.7331 78.097C82.7331 82.3047 81.4854 86.2779 79.1478 89.5144C78.4933 90.4206 77.7615 91.2576 76.9617 92.019L92.2634 77.5509C93.0632 76.7896 93.795 75.9525 94.4495 75.0463C96.7871 71.8099 98.0348 67.8366 98.0348 63.629C98.0348 57.9867 95.7935 52.3243 91.8038 47.8874C87.8141 43.4504 82.403 40.6025 76.7607 39.9699C72.553 39.4983 68.4399 40.2849 64.9414 42.2303C63.542 43.0085 62.2661 43.9581 61.1357 45.0547L45.834 59.5228Z"
                            fill="#7A7698"
                            fill-opacity="0.53"
                        />
                        <path
                            d="M108.735 35.6317L92.3535 33.7953L84.2988 20.8134C83.8674 20.1182 83.283 19.5224 82.5975 19.0785C81.912 18.6347 81.1466 18.3567 80.3691 18.2691L42.5483 14.0293C41.7708 13.9426 41.0054 14.049 40.3199 14.3391C39.6344 14.6293 39.05 15.0941 38.6186 15.6925L30.5579 26.8679L14.1828 25.0322C10.4213 24.6106 6.81382 25.7005 4.15404 28.062C1.49425 30.4236 0 33.8636 0 37.6251V103.811C0 107.573 1.49425 111.348 4.15404 114.306C6.81382 117.264 10.4213 119.162 14.1828 119.584L108.735 130.184C112.496 130.605 116.104 129.516 118.764 127.154C121.423 124.793 122.917 121.352 122.917 117.591V51.4044C122.917 47.6429 121.423 43.8679 118.764 40.91C116.104 37.9521 112.496 36.0533 108.735 35.6317ZM82.7329 77.629C82.7329 81.8366 81.4852 85.8099 79.1476 89.0463C76.8099 92.2828 73.4873 94.6371 69.6 95.8115C65.7126 96.986 61.4351 96.9277 57.3084 95.6443C53.1815 94.3607 49.3909 91.9096 46.4156 88.6008C43.4403 85.292 41.4142 81.2742 40.5933 77.0554C39.7725 72.8367 40.1937 68.6064 41.8039 64.8995C43.4141 61.1927 46.1409 58.1758 49.6394 56.2303C53.138 54.2849 57.2511 53.4982 61.4587 53.9699C67.101 54.6024 72.5121 57.4504 76.5018 61.8874C80.4915 66.3243 82.7329 71.9867 82.7329 77.629Z"
                            fill="#ADA8D5"
                        />
                    </svg>
                </div>
                <p className="max-w-xs text-grey-100 text-base font-regular">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto et, temporibus nemo distinctio sunt laborum
                    veniam illo quod iusto delectus?
                </p>
                <div className="w-full max-w-xs flex flex-col gap-4 mt-4">
                    <Button
                        className="w-full py-6 text-base rounded-full"
                        onClick={handleUseCamera}
                    >
                        Gunakan Kamera
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full py-6 text-base text-brand-primary rounded-full"
                        onClick={handleChooseVideo}
                    >
                        Pilih Video di Galeri
                    </Button>
                </div>
            </main>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="video/*"
                className="hidden"
            />
        </div>
    );
}
