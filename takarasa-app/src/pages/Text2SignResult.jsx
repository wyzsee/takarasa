import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import logo from "@/assets/img/logo.png";
import animasiHome from "@/assets/img/animasi home.png";
import placeholder from "@/assets/img/placeholder.png";
import errorImage from "@/assets/img/word_not_found.png";
import { CaretLeft, PaperPlaneRight, ArrowClockwise, ArrowsClockwise } from "@phosphor-icons/react";
import { useEffect, useState, useRef } from "react";
import api from "../api";
import { Link, useLocation } from "react-router-dom";

export default function Text2SignResult() {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const initialVideoURLs = location.state?.videoURLs;
  const initialSearch = location.state?.lastSearch;
  // const [currentVideoURL, setCurrentVideoURL] = useState(videoURL);
  const [currentVideoURLs, setCurrentVideoURLs] = useState(initialVideoURLs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastSearch, setLastSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const videoRefs = useRef([]);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const handleSearch = async () => {
    if (query.trim() === '') return;

    setLoading(true);
    try {
      const words = query.trim().split(' ');
      const videoURLs = [];

      for (const word of words){
        const res = await api.get('/search', { params: { q: word } });
        if (res.data?.file_url) {
          videoURLs.push(res.data?.file_url);
        } else {
          videoURLs.push(null);
        }
      }
      
      if (videoURLs.some(url => url)) {
        setLastSearch(query);
        setQuery('');
        setCurrentVideoURLs(videoURLs.filter(url => url));
        setCurrentIndex(0);
      } else {
        setLastSearch(`"${query}" tidak ditemukan.`);
        setQuery('');
        setCurrentVideoURLs([]);
      }
    } catch (err) {
      console.error(err);
      setLastSearch(`"${query}" tidak ditemukan.`);
      setQuery('');
      setCurrentVideoURLs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnd = () => {
    if (currentIndex < currentVideoURLs.length - 1){
      setCurrentIndex((prev) => prev + 1);
    } else if (isLoop && currentVideoURLs.length > 0){
      setCurrentIndex(0);
    }
  }

  const handleReplay = () => {
    if (videoRefs.current){
      videoRefs.current.currentTime = 0;
      videoRefs.current.play();
    }
    if (currentVideoURLs.length > 0) {
      setCurrentIndex(0);
    }
  };

  const handleSpeed = () => {
    if (currentVideoURLs.length > 0) {
      setCurrentIndex(0);
    }
    setPlaybackRate((prevRate) => {
      if (prevRate === 1.0) return 1.5;
      if (prevRate === 1.5) return 0.5;
      return 1.0
    })
  }

  useEffect(() => {
  if (currentVideoURLs.length > 0 && videoRefs.current) {
    videoRefs.current.playbackRate = playbackRate;
    videoRefs.current.play();
    }
  }, [playbackRate, currentVideoURLs, currentIndex]);


  const handleLoop = () => {
    if (videoRefs.current) {
      if (videoRefs.current.paused){
        videoRefs.current.play();
      }
      setIsLoop((prev) => !prev);
    }
    if (currentVideoURLs.length > 0) {
      setCurrentIndex(0);
    }
  };

  return (
    <>
      <div className="relative max-w-md min-h-screen mx-auto font-jakarta flex flex-col bg-grey-10 items-center overflow-hidden px-6">
        <div className="container flex flex-col items-center mx-auto gap-4">
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
            <div className="flex w-full flex-col h-[816px] items-center justify-between">
              <div className="flex flex-col w-full gap-2">
                <div className="flex w-full justify-between">
                    <p className="text-brand-primary">Kanan</p>
                    <p className="text-brand-primary">Kiri</p>
                </div>
                <div className="flex relative w-full flex-col p-4 rounded-2xl items-center justify-between h-[680px] bg-brand-primary">
                    <img 
                      src={placeholder}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-0" alt="" />
                    {currentVideoURLs.length > 0 ? (
                      <video
                          ref={videoRefs}
                          src={currentVideoURLs.length > 0 ? currentVideoURLs[currentIndex] : ''}
                          muted
                          playsInline
                          onEnded={handleEnd}
                          loop={isLoop && currentVideoURLs.length === 1}
                          preload="auto"
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-0"
                      ></video>
                    ) : (
                      <img 
                      src={errorImage}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-0" alt="" />
                    )}
                    {lastSearch && (
                      <p className="text-grey-10 z-10">"{lastSearch}"</p>
                    )}
                    <div className="flex w-full justify-between z-10">
                        <div 
                        onClick={handleReplay}
                        className="flex justify-evenly items-center h-[48px] w-[48px] rounded-[99px] bg-grey-10">
                            <ArrowClockwise size={24} className="text-brand-primary" weight="fill" />
                        </div>
                        <div 
                        onClick={handleLoop}
                        className="flex justify-evenly items-center h-[48px] w-[48px] rounded-[99px] bg-grey-10">
                            <ArrowsClockwise size={24} className={isLoop? "text-brand-primary" : "text-grey-20"} weight="fill" />
                        </div>
                        <div 
                        onClick={handleSpeed}
                        className="flex justify-evenly items-center h-[48px] w-[48px] rounded-[99px] bg-grey-10">
                            <p className="text-brand-primary">{playbackRate}x</p>
                        </div>
                    </div>
                </div>
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
