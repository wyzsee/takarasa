import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import logo from "@/assets/img/logo.png";
import animasiHome from "@/assets/img/animasi home.png";
import bookHome from "@/assets/img/book dashboard icon.png";
import eventPhoto from "@/assets/img/event photo.jpg";
import { Clock, MapPinLine } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center overflow-hidden px-6">
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
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deserunt nostrum neque animi harum accusamus. Accusantium
                temporibus hic.
              </p>
              <div className="">
                <img src={animasiHome} alt="" />
              </div>
            </div>
            <div className="flex max-w-full gap-2">
              <Button
                type="submit"
                className="w-1/2 h-12 bg-grey-100 text-xs text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Bahasa Isyarat ke Tulisan"}
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

          <Link to="/test-cam">Ke Test Cam</Link>

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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                pariatur reiciendis temporibus nulla illo.
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
                  <circle cx="93" cy="93" r="48" fill="#D4D0F2" />
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
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
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

          <div className="flex flex-col w-full bg-grey-10 p-4 rounded-2xl gap-3 relative overflow-hidden">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl text-grey-100 font-semibold text-left">
                Informasi
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
            <div className="w-[350px] h-[157px]">
              <img
                src={eventPhoto}
                className="w-full h-full object-cover object-bottom rounded-lg"
                alt=""
              />
            </div>
            <p className="text-base font-medium text-grey-100">Nama Event</p>

            <div className="flex gap-3">
              <div className="flex items-center text-grey-50 gap-1">
                <Clock size={14} />
                <p className="text-xs font-normal">12:00</p>
              </div>
              <div className="flex items-center text-grey-50 gap-1">
                <MapPinLine size={14} />
                <p className="text-xs font-normal">Kota Lama</p>
              </div>
            </div>

            <div className="flex relative justify-between items-center">
              <p className="w-[70%] text-xs font-normal text-grey-100">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit...
              </p>
              <Button
                type="submit"
                className="w-1/2 h-12 bg-grey-100 text-xs text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80 z-10"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Selengkapnya"}
              </Button>
              <svg
                width="199"
                height="189"
                viewBox="0 0 199 189"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -z-1 -right-5 -bottom-5"
              >
                <g filter="url(#filter0_f_155_1852)">
                  <circle cx="149" cy="149" r="50" fill="#FFB367" />
                </g>
                <defs>
                  <filter
                    id="filter0_f_155_1852"
                    x="0"
                    y="0"
                    width="298"
                    height="298"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="49.5"
                      result="effect1_foregroundBlur_155_1852"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
}
