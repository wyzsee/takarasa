import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { VideoOff } from "lucide-react";
import { CaretLeft } from "@phosphor-icons/react";

export function KameraPage() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const intervalRef = useRef(null);
    const streamRef = useRef(null); // <-- Ref baru untuk menyimpan object stream

    const [prediction, setPrediction] = useState("");
    const [cameraError, setCameraError] = useState(null);

    const VIDEO_WIDTH = 382;
    const VIDEO_HEIGHT = 579;

    // Fungsi untuk mengirim frame (tidak berubah)
    const sendFrameForDetection = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
        const frameData = canvasRef.current.toDataURL("image/jpeg");

        axios
            .post("http://localhost:8000/api/detect-sign", { image: frameData })
            .then((response) => {
                const newWord = response.data.word;
                if (newWord) {
                    setPrediction(newWord);
                }
            })
            .catch((error) => {
                console.error("API Error:", error.message);
                if (intervalRef.current) clearInterval(intervalRef.current);
            });
    };

    // useEffect utama untuk mengelola kamera dan interval
    useEffect(() => {
        const enableCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: VIDEO_WIDTH },
                        height: { ideal: VIDEO_HEIGHT },
                        facingMode: "user",
                    },
                });
                // Simpan stream ke dalam ref agar bisa diakses saat cleanup
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        // Mulai interval HANYA setelah kamera benar-benar siap
                        intervalRef.current = setInterval(
                            sendFrameForDetection,
                            1000
                        );
                    };
                }
            } catch (err) {
                console.error("Camera access error:", err);
                setCameraError(
                    "Gagal mengakses kamera. Pastikan izin sudah diberikan."
                );
            }
        };

        enableCamera();

        // Fungsi Cleanup yang sekarang lebih robust
        return () => {
            console.log("Cleanup function is running...");
            // Hentikan timer
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                console.log("Interval cleared.");
            }
            // Matikan stream kamera menggunakan ref yang stabil
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
                console.log("Camera stream stopped.");
            }
        };
    }, []); // <-- Array dependensi kosong, memastikan ini berjalan sekali saat mount dan cleanup sekali saat unmount

    // ... (kode UI Anda tidak berubah, sudah bagus)
    if (cameraError) {
        return (
            <div className="flex flex-col h-screen text-white items-center justify-center text-center gap-4 p-4">
                <VideoOff className="w-16 h-16 text-red-500" />
                <h2 className="text-xl font-semibold">Error Kamera</h2>
                <p className="text-slate-400 max-w-xs">{cameraError}</p>
                <Button onClick={() => window.location.reload()}>
                    Coba Lagi
                </Button>
            </div>
        );
    }

    return (
        <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6">
            <header className="relative flex items-center justify-center p-4 w-full">
                <Link to="/terjemahan-isyarat" className="left-0 absolute">
                    <CaretLeft size={24} />
                </Link>

                <h1 className="w-full text-center text-xl font-semibold">
                    Bahasa Isyarat ke Tulisan
                </h1>
            </header>

            <main className="flex items-center justify-center overflow-hidden mt-20">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-[382px] h-[579px] object-cover rounded-xl scale-x-[-1]"
                ></video>
                <canvas
                    ref={canvasRef}
                    width="{VIDEO_WIDTH}"
                    height="{VIDEO_HEIGHT}"
                    className="hidden"
                ></canvas>
            </main>

            <footer className="bottom-0 left-0 right-0 p-4">
                <div className="min-h-[80px] rounded-lg p-4 flex items-center justify-center text-center">
                    <p className="text-3xl font-bold capitalize tracking-wider">
                        {prediction || "..."}
                    </p>
                </div>
            </footer>
        </div>
    );
}
