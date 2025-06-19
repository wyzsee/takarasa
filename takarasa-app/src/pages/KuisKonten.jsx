import { Button } from "@/components/ui/button";
import PopupKuis from "@/components/ui/PopupKuis";
import RadioButton from "@/components/ui/RadioButton";
import Cover from "@/assets/img/kuis/cover_1.png";
import { X, CaretLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [showQuizPopup, setShowQuizPopup] = useState(false);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        console.log("Selected:", event.target.value);
    };

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
                <div className="container h-full flex flex-col items-center mx-auto gap-4">
                    <div className="flex relative items-center w-full h-16">
                        <div className="left-0 absolute">
                            <Link to="/kuis/alfabet">
                                <X size={32} />
                                {/* <CaretLeft size={32} /> */}
                            </Link>
                        </div>
                        <h1 className="text-xl mx-auto font-semibold text-grey-100">
                            Kuis Alfabet
                        </h1>
                        <div className="right-0 absolute">
                            <p className="text-xl text-brand-primary">1/5</p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col h-[820px] items-center justify-between">
                        <div className="h-[520px] w-full relative rounded-2xl overflow-hidden">
                            <img className="w-full absolute left-0 top-[-48px] object-cover rounded-2xl" src={Cover} />
                        </div>
                        <p className="text-xl text-center text-grey-100">
                            Isyarat apakah ini?
                        </p>
                        <div className="w-full flex flex-col justify-start items-center gap-4">
                            <div className="w-full grid grid-cols-2 gap-4">
                                <RadioButton
                                    name="opsiKuis"
                                    value="1"
                                    label="Huruf A"
                                    checked={selectedOption === "1"}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <RadioButton
                                    name="opsiKuis"
                                    value="2"
                                    label="Huruf B"
                                    checked={selectedOption === "2"}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <RadioButton
                                    name="opsiKuis"
                                    value="3"
                                    label="Huruf C"
                                    checked={selectedOption === "3"}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <RadioButton
                                    name="opsiKuis"
                                    value="4"
                                    label="Huruf D"
                                    checked={selectedOption === "4"}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <Button
                                asChild
                                type="submit"
                                className={`w-full h-14 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-30
                                ${selectedOption === "" ?
                                    "bg-grey-30" : "bg-error"
                                }`}
                                disabled={loading || selectedOption === ""}
                            >
                                <Link to="/kuis/alfabet/1">
                                    {loading
                                        ? "Menyimpan..."
                                        : "Selanjutnya"}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {showQuizPopup && (
                <PopupKuis
                    score="10"
                    totalQuestions="20"
                    onClose={() => setShowQuizPopup(false)}
                />
            )}
        </>
    );
}
