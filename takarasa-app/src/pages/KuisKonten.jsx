import { Button } from "@/components/ui/button";
import PopupKuis from "@/components/ui/PopupKuis";
import RadioButton from "@/components/ui/RadioButton";
import Cover from "@/assets/img/kuis/cover_1.png";
import { X, CaretLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
    const { id, slug } = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [question, setQuestion] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [showQuizPopup, setShowQuizPopup] = useState(false);
    const [quizResult, setQuizResult] = useState(null);
    const [quiz, setQuiz] = useState(false);
    const [answers, setAnswers] = useState([]);

    const isLastQuestion = parseInt(id) === totalQuestions;

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        console.log("Selected:", event.target.value);
    };

    useEffect(() => {
        setSelectedOption("");
    }, [id]);

    useEffect(() => {
        async function fetchQuestion() {
            try {
                const userRes = await api.get("/user");
                setUserId(userRes.data.id);

                const quizData = await api.get(`/kuis/${slug}`);
                setQuiz(quizData.data);

                const quizRes = await api.get(`/kuis/${slug}/questions`);
                const questions = quizRes.data;

                setTotalQuestions(questions.length);
                setQuestion(questions[parseInt(id) - 1]);
            } catch (err) {
                console.error("Gagal ambil data:", err);
            }
        }
        fetchQuestion();
    }, [id, slug]);

    const handleOptionSelect = (questionId, selectedOption) => {
        const parsedOption = parseInt(selectedOption);

        setAnswers(prevAnswers => {
            const updatedAnswers = (() => {
                const exist = prevAnswers.find(a => a.question_id === questionId);
                if (exist) {
                    return prevAnswers.map(a =>
                        a.question_id === questionId ? { ...a, selected_option: parsedOption } : a
                    );
                } else {
                    return [...prevAnswers, { question_id: questionId, selected_option: parsedOption }];
                }
            })();
            console.log("📝 Updated answers array:", updatedAnswers);
            return updatedAnswers;
        });
    };

    const submitQuiz = async () => {
        console.log("Submitting quiz with:", {
            user_id: userId,
            quiz_id: quiz.id,
            answers: answers,
        });
        try {
            const res = await api.post(`/kuis/${slug}/submit`, {
                user_id: userId,
                quiz_id: quiz.id,
                answers: answers,
            });
            const { score, correct, wrong, status, points_awarded } = res.data;

            setQuizResult({ score, correct, wrong, status, points_awarded });
            setShowQuizPopup(true);
        } catch (err) {
            console.error("Gagal submit jawaban", err)
        }
    }

    const nextPage = () => {
        if (parseInt(id) === totalQuestions) {
            submitQuiz();
        } else {
            navigate(`/kuis/${slug}/${parseInt(id) + 1}`);
        }
    }

    if (!question) return <p className="font-jakarta text-center min-h-screen text-xl font-bold text-brand-primary">Memuat pertanyaan...</p>;

    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col bg-grey-10 items-center overflow-hidden px-6">
                <div className="container h-full flex flex-col items-center mx-auto gap-4">
                    <div className="flex relative items-center w-full h-16">
                        <div className="left-0 absolute">
                            <Link to={`/kuis/${slug}`}>
                                <X size={32} />
                                {/* <CaretLeft size={32} /> */}
                            </Link>
                        </div>
                        <h1 className="text-xl mx-auto font-semibold text-grey-100">
                            Kuis {quiz.title}
                        </h1>
                        <div className="right-0 absolute">
                            <p className="text-xl text-brand-primary">{id}/{totalQuestions}</p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col h-[820px] items-center justify-between">
                        <div className="h-[520px] w-full relative rounded-2xl overflow-hidden">
                            <img className="w-full absolute left-0 top-[-48px] object-cover rounded-2xl" src={question?.media_url} />
                        </div>
                        <p className="text-xl text-center text-grey-100">
                            {question?.question}
                        </p>
                        <div className="w-full flex flex-col justify-start items-center gap-4">
                            <div className="w-full grid grid-cols-2 gap-4">
                                <RadioButton
                                    name="opsiKuis"
                                    value="1"
                                    optionLetter="A"
                                    label={question?.option_1}
                                    checked={selectedOption === "1"}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        handleOptionSelect(question.id, parseInt(e.target.value));
                                    }}
                                    disabled={loading}
                                />
                                <RadioButton
                                    name="opsiKuis"
                                    value="2"
                                    optionLetter="B"
                                    label={question?.option_2}
                                    checked={selectedOption === "2"}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        handleOptionSelect(question.id, parseInt(e.target.value));
                                    }}
                                    disabled={loading}
                                />
                                <RadioButton
                                    name="opsiKuis"
                                    value="3"
                                    optionLetter="C"
                                    label={question?.option_3}
                                    checked={selectedOption === "3"}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        handleOptionSelect(question.id, parseInt(e.target.value));
                                    }}
                                    disabled={loading}
                                />
                                <RadioButton
                                    name="opsiKuis"
                                    value="4"
                                    optionLetter="D"
                                    label={question?.option_4}
                                    checked={selectedOption === "4"}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        handleOptionSelect(question.id, parseInt(e.target.value));
                                    }}
                                    disabled={loading}
                                />
                            </div>
                            <Button
                                type="button"
                                className={`w-full h-14 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-30
                                ${selectedOption === "" ? "bg-grey-30" : "bg-error"}`}
                                disabled={loading || selectedOption === ""}
                                onClick={nextPage}
                            >
                                {loading ? "Menyimpan..." : isLastQuestion ? "Selesai" : "Selanjutnya"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {showQuizPopup && (
                <PopupKuis
                    score={quizResult?.score}
                    correct={quizResult?.correct}
                    point={quizResult?.points_awarded}
                    name={quiz.title}
                    totalQuestions={answers.length}
                    onRestartQuiz={() => navigate(`/kuis/${slug}`)}
                    onGoBack={() => navigate("/kuis")}
                />
            )}
        </>
    );
}
