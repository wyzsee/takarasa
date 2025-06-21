import { Button } from "@/components/ui/button";
import Cover from "@/assets/img/kuis/cover_1.png";
import Icon from "@/assets/img/kuis/alfabet.svg";
import { CaretLeft, CoinVertical } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { useParams, Link } from "react-router-dom";

export default function Dashboard() {
  const { slug } = useParams();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await api.get("/user");
        setUserId(userRes.data.id);
        const quizRes = await api.get(`/kuis/${slug}`);
        setQuiz(quizRes.data);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      }
    }
    fetchData();
  }, [slug]);

  if (!quiz) {
    return <p className="text-center my-auto text-xl font-bold text-brand-primary">Memuat kuis...</p>;
  }

  return (
    <>
      <div className="relative max-w-md min-h-screen font-jakarta flex flex-col bg-grey-10 items-center overflow-hidden px-6">
        <div className="container flex flex-col items-center mx-auto gap-4">
          <header className="flex relative items-center w-full h-16">
            <div className="left-0 absolute">
              <Link to="/kuis">
                <CaretLeft size={32} />
              </Link>
            </div>
            <h1 className="text-xl mx-auto font-semibold text-grey-100">
              Kuis {quiz.title}
            </h1>
          </header>
          <div className="flex w-full flex-col h-[820px] items-center justify-between">
            <div className="flex relative w-full flex-col p-4 rounded-2xl items-center justify-between h-[520px] bg-brand-primary">
              <img
                src={quiz.icon}
                className="absolute top-0 left-0 w-full h-full object-contain rounded-2xl z-0" alt="" />
            </div>
            <p className="text-xl text-grey-100">{quiz.total_quest} Soal</p>
            <div className="w-full flex flex-col justify-start items-center gap-4">
              <Button
                asChild
                type="submit"
                className="w-full h-14 bg-grey-100 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                disabled={loading}
              >
                <Link to={`/kuis/${quiz.slug}/1`}>
                  {loading
                    ? "Memulai..."
                    : "Mulai"}
                </Link>
              </Button>
              <div
                className="w-full h-14 bg-grey-10 outline outline-2 outline-offset-[-2px]  outline-brand-primary text-lg text-brand-primary rounded-full py-3 font-semibold flex items-center justify-evenly"
                disabled={loading}
              >
                <Link to={`/kuis/${quiz.slug}/1`}>
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
