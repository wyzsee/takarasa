import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import api from "../api";
import { useParams, Link } from "react-router-dom";

export default function DetailBelajarBahasaIsyaratPage() {
    const { id } = useParams();
    const [user, setUser] = useState("");
    const [lessonDetails, setLessonDetails] = useState(null);
    const [lessonContents, setLessonContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            let fetchedUser = null; 
            try {
                const userRes = await api.get("/user");
                setUser(userRes.data);
                fetchedUser = userRes.data;

                const lessonDetailsRes = await api.get(`/belajar-bahasa-isyarat/${id}`);
                setLessonDetails(lessonDetailsRes.data);

                const lessonContentsRes = await api.get(`/materi-belajar-bahasa-isyarat/${id}`);
                setLessonContents(lessonContentsRes.data);

                if (fetchedUser && fetchedUser.id && id) {
                    try {
                        const progressRes = await api.get(`/progress/${fetchedUser.id}/${id}`);
                        setProgress(progressRes.data);
                    } catch (progressErr) {
                        console.error(`Gagal ambil progress untuk learn ID ${id}:`, progressErr);
                        setProgress(0);
                    }
                }

            } catch (err) {
                console.error('Gagal ambil data pelajaran:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Memuat detail pelajaran...</p>
            </div>
        );
    }

    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6">

                <header className="relative flex items-center justify-center p-4 w-full">
                    <Link
                        to="/belajar-bahasa-isyarat"
                        className="left-0 absolute"
                    >
                        <CaretLeft size={24} />
                    </Link>
                    {lessonDetails?.name && (
                        <h1 className="w-full text-center text-xl font-semibold">
                            {lessonDetails.name}
                        </h1>

                    )}
                </header>

                <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="flex flex-wrap relative justify-between w-full items-center gap-3">
                        <div className="rounded-xl w-full">
                            <div className="flex flex-col p-4 gap-1 w-full bg-brand-primary rounded-xl">
                                <div className="flex flex-col gap-2 justify-between items-center w-full">
                                    {lessonDetails?.icon && (
                                        <img src={lessonDetails.icon} alt="" />
                                    )}
                                    <div className="flex flex-col justify-center items-center gap-1 w-full">
                                        <div className="flex w-full justify-between">
                                            <p className="text-xs font-normal text-grey-10">
                                                Progress
                                            </p>
                                            <p className="text-xs font-normal text-grey-10">
                                                {progress}%
                                            </p>
                                        </div>
                                        <Progress value={progress} />
                                    </div>
                                </div>
                            </div>

                            {lessonContents.map((content, index) => (
                                <div key={content.id} className="flex flex-col justify-center items-center w-full mt-4 gap-4">
                                    <div className="w-full flex justify-between items-center">
                                        <h1 className="text-base font-medium text-grey-100">
                                            {content.sign}
                                        </h1>
                                        <Link to={`/konten-belajar-bahasa-isyarat/${content.id}`}>
                                            <CaretRight size={24} />
                                        </Link>
                                    </div>
                                    <div className="border border-b-brand-primary w-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
