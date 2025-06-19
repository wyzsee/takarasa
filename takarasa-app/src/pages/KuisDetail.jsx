import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import Icon from "@/assets/img/kuis/alfabet.svg";
import Cover from "@/assets/img/kuis/cover_1.png";
import { CaretLeft, CoinVertical } from "@phosphor-icons/react";
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
      <div className="relative max-w-md min-h-screen font-jakarta flex flex-col bg-grey-10 items-center overflow-hidden px-6">
        <div className="container flex flex-col items-center mx-auto gap-4">
          <div className="flex relative items-center w-full h-16">
            <div className="left-0 absolute">
              <Link to="/kuis">
                <CaretLeft size={32} />
              </Link>
            </div>
            <h1 className="text-xl mx-auto font-semibold text-grey-100">
              Kuis Alfabet
            </h1>
            <div className="right-0 absolute">
              <p className="text-xl text-brand-primary">5 Soal</p>
            </div>
          </div>
          <div className="flex w-full flex-col h-[816px] items-center justify-between">
            <div className="flex relative w-full flex-col p-4 rounded-2xl items-center justify-between h-[680px] bg-brand-primary">
              <img
                src={Cover}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-0" alt="" />
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-4">
              <Button
                asChild
                type="submit"
                className="w-full h-14 bg-grey-100 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                disabled={loading}
              >
                <Link to="/kuis/alfabet/1">
                  {loading
                    ? "Memulai..."
                    : "Mulai"}
                </Link>
              </Button>
              <div
                className="w-full h-14 bg-grey-10 outline outline-2 outline-offset-[-2px]  outline-brand-primary text-lg text-brand-primary rounded-full py-3 font-semibold flex items-center justify-evenly"
                disabled={loading}
              >
                <Link to="/kuis/alfabet">
                  {loading
                    ? "Memproses..."
                    : "Ulangi Kuis"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
