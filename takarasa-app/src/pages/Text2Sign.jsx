import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import logo from "@/assets/img/logo.png";
import animasiHome from "@/assets/img/animasi home.png";
import bookHome from "@/assets/img/book dashboard icon.png";
import mic from "@/assets/img/text2sign-mic.svg";
import { CaretLeft, PaperPlaneRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Text2Sign() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSearch = async () => {
    if (query.trim() === '') return;

    setLoading(true);
    try {
      const words = query.trim().split(' ');
      const videoURLs = [];

      for (const word of words) {
      try {
        const res = await api.get('/search', { params: { q: word } });
        if (res.data?.file_url) {
          videoURLs.push(res.data?.file_url);
        } else {
          videoURLs.push(null);
          console.warn(`Word not found: ${word}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
      navigate('/text-to-sign/result', {state: {videoURLs, lastSearch: query}});
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <>
      <div className="relative max-w-md min-h-screen font-jakarta flex flex-col bg-grey-10 items-center overflow-hidden px-6">
        <div className="container flex flex-col items-center mx-auto gap-4 overflow-hidden">
            <div className="flex relative justify-center items-center w-full h-16">
                <h1 className="text-xl font-semibold text-grey-100">
                Teks Ke Bahasa Isyarat
                </h1>
                <div className="left-0 absolute">
                    <Link to="/dashboard">
                        <CaretLeft size={32} />
                    </Link>
                </div>
            </div>
            <div className="flex h-full flex-col items-center gap-60 overflow-hidden">
                <div className="flex flex-col gap-2">
                    <p className="w-full">
                        Terjemahan ini bikin komunikasi jadi lebih mudah dan gak bikin siapapun ketinggalan. Cukup ketik kalimat apa saja, terus Taka bakal ubah jadi bahasa isyarat. Cocok banget buat belajar, ngobrol, atau bikin konten kreatif yang lebih luas dan inklusif.
                    </p>
                    <img
                    src={mic}
                    className="w-full h-full object-cover object-bottom rounded-lg"
                    alt=""
                    />
                </div>
                <div className="w-96 inline-flex justify-start items-center gap-2.5">
                    <div className="flex-1 h-12 p-2.5 rounded-[99px] outline outline-2 outline-offset-[-2px] outline-grey-30 flex justify-start items-center gap-2">
                        <input
                            className="flex-1 text-base text-grey-100 outline-none bg-grey-10"
                            placeholder="Cari kata"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="w-12 h-12 rounded-[99px] outline outline-2 outline-offset-[-2px] outline-brand-primary flex justify-center items-center gap-2">
                        <PaperPlaneRight size={32} className="text-brand-primary" weight="fill" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
