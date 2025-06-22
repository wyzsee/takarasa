import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { CaretLeft, ArrowClockwise, ArrowsClockwise } from "@phosphor-icons/react";
import api from "../api";
import { useParams, Link } from "react-router-dom";

export default function DetailBelajarBahasaIsyaratPage() {
    const { id } = useParams();
    const [user, setUser] = useState("");
    const [content, setContent] = useState(null);
    const [lesson, setLesson] = useState(null);
    const videoRef = useRef(null);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [isLoop, setIsLoop] = useState(false);
    const [loading, setLoading] = useState(true);
    const [watched, setWatched] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [lessonLoading, setLessonLoading] = useState(true);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await api.get("/user");
                setUser(res.data);
                console.log(res.data)
            } catch (err) {
                console.error("Gagal ambil user:", err);
            }
        }
        getUser();
    }, []);

    useEffect(() => {
        async function getContent() {
            setLoading(true);
            try {
                const res = await api.get(`/konten-belajar-bahasa-isyarat/${id}`);
                setContent(res.data);
                console.log("Isi content:", res.data);
            } catch (err) {
                console.error("Gagal ambil pelajaran:", err);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            getContent();
        } else {
            setLoading(false);
        }
    }, [id]);


    // ⏮️ Replay video
    const handleReplay = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    // ⏩ Change playback speed: 1x → 1.5x → 0.5x → 1x...
    const handleSpeed = () => {
        setPlaybackRate((prevRate) => {
            if (prevRate === 1.0) return 1.5;
            if (prevRate === 1.5) return 0.5;
            return 1.0;
        });
    };

    // 🔁 Toggle loop
    const handleLoop = () => {
        setIsLoop((prev) => !prev);
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play();
        }
    };

    // 🎯 Apply speed + loop settings every time they change
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
            videoRef.current.loop = isLoop;
        }
    }, [playbackRate, isLoop]);

    
    useEffect(() => {
        const checkWatched = async () => {
            if (!user?.id || !content?.id || !content?.learn_id) return;

            try {
                const res = await api.get(`/watched/${user.id}/${content.learn_id}/${content.id}`);
                setIsWatched(res.data.watched);
            } catch (err) {
                console.error("Error checking watched status:", err);
            }
        };
        
        checkWatched();
    }, [user, content]);

    const handleMarkAsWatched = async () => {
        try {
            await api.post('/watched', {
                user_id: user.id,
                learn_id: content.learn_id,
                learn_material_id: content.id,
            });
            setIsWatched(true);
        } catch (err) {
            console.error("Gagal menandai sudah ditonton:", err);
        }
    };
    
        if (loading) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-xl font-semibold">Memuat detail pelajaran...</p>
                </div>
            );
        }


    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto justify-between overflow-hidden px-6">
                {/* Background SVG dengan posisi absolute */}
                <div className="absolute inset-0 -z-20 pointer-events-none">
                    <video
                        ref={videoRef}
                        src={content.media}
                        autoPlay
                        muted
                    />
                </div>

                <header className="relative flex items-center justify-center p-12 w-full">
                    <Link
                        to={`/detail-belajar-bahasa-isyarat/${content.learn_id}`}
                        className="left-0 absolute text-grey-10"
                    >
                        <CaretLeft size={32} />
                    </Link>

                    <h1 className="w-full text-center text-xl font-semibold text-grey-10">
                        "{content.sign}"
                    </h1>

                </header>
                <div className="flex w-full flex-col gap-4 py-12">
                    <div className="flex w-full justify-between z-10">
                        <div
                            onClick={handleReplay}
                            className="flex justify-evenly items-center h-[64px] w-[64px] rounded-[99px] bg-grey-10">
                            <ArrowClockwise size={32} className="text-brand-primary" weight="fill" />
                        </div>
                        <div
                            onClick={handleLoop}
                            className="flex justify-evenly items-center h-[64px] w-[64px] rounded-[99px] bg-grey-10">
                            <ArrowsClockwise size={32} className={isLoop ? "text-brand-primary" : "text-grey-20"} weight="fill" />
                        </div>
                        <div
                            onClick={handleSpeed}
                            className="flex justify-evenly items-center h-[64px] w-[64px] rounded-[99px] bg-grey-10">
                            <p className="text-brand-primary">{playbackRate}x</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleMarkAsWatched}
                        disabled={isWatched}
                        className={`w-full h-14 text-lg text-white rounded-full py-3 font-semibold flex items-center justify-evenly ${isWatched ? "bg-grey-30" : "bg-grey-100"}`}
                    >
                        <Link to={``}>
                            {isWatched ? "✅ Sudah Ditonton" : "Tandai Sudah Ditonton"}
                        </Link>
                    </Button>

                </div>
            </div>
        </>
    );
}
