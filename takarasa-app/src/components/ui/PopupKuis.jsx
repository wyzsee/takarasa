// src/components/QuizResultPopup.jsx
import React, { useState } from "react";
import { CoinVertical } from "@phosphor-icons/react";
import ScoreBadge from "@/assets/img/kuis/score_badge.png";
import { Link } from "react-router-dom";

export default function PopupKuis({ score, totalQuestions, onClose, onRestartQuiz, onGoHome }) {
    const percentage = (score / totalQuestions) * 100;
    const [loading, setLoading] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-jakarta">
            <div className="relative flex flex-col w-full bg-grey-10 rounded-2xl shadow-xl p-6 first-line:max-w-sm text-center overflow-hidden">
                <div className="absolute top-0 right-0 opacity-25">
                    <img src={ScoreBadge} />
                    <div className="absolute flex flex-col justify-evenly top-0 right-0 w-24 h-24">
                        <p className="mx-auto text-4xl text-success font-bold">{percentage}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-grey-100 mb-4">Kuis Alfabet</h2>
                <div className="flex flex-col gap-2 mb-6 mx-auto">
                    <p className="text-lg text-grey-100">
                        Benar <span className="font-bold">{score}</span> / <span className="font-bold">{totalQuestions}</span>
                    </p>
                    <div className="flex flex-grow-0 items-center px-3 py-2 gap-2 text-grey-10 bg-brand-accent rounded-full">
                        <CoinVertical size={16} />
                        <p className="text-xs">+16 Poin</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onRestartQuiz}
                        className="w-full h-14 bg-grey-10 text-brand-primary text-lg rounded-full font-semibold outline outline-2 outline-brand-primary outline-offset-[-2px] hover:bg-brand-secondary"
                    >
                        <Link to="/kuis/alfabet">
                            {loading
                                ? "Menyimpan..."
                                : "Ulangi Kuis"}
                        </Link>
                    </button>
                    <button
                        onClick={onGoHome}
                        className="w-full h-14 bg-grey-10 text-brand-primary text-lg rounded-full font-semibold outline outline-2 outline-brand-primary outline-offset-[-2px] hover:bg-brand-secondary"
                    >
                        Kembali ke Daftar Kuis
                    </button>
                </div>
            </div>
        </div>
    );
}