import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CaretLeft } from "@phosphor-icons/react";
import {
    ArrowLeft,
    LoaderCircle,
    AlertTriangle,
    FileVideo,
} from "lucide-react";

export function HasilIsyaratPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const videoFile = location.state?.videoFile;

    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    // State baru untuk menandai apakah proses sudah pernah dijalankan
    const [hasProcessed, setHasProcessed] = useState(false);

    useEffect(() => {
        // 1. Guard Clause: Jangan lakukan apa-apa jika tidak ada file ATAU sudah pernah diproses
        if (!videoFile || hasProcessed) {
            if (!videoFile) {
                // Jika tidak ada file, langsung set error (tanpa alert)
                setError(
                    "Tidak ada video yang dipilih untuk diproses. Silakan kembali."
                );
                setIsLoading(false);
            }
            return;
        }

        const processVideo = async () => {
            // Tandai bahwa proses akan dimulai
            setHasProcessed(true);
            setIsLoading(true);
            setError("");

            const formData = new FormData();
            formData.append("video", videoFile);

            try {
                const response = await axios.post(
                    "http://localhost:8000/api/upload-video-sign",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                setResult(response.data.text);
            } catch (err) {
                console.error("Gagal memproses video:", err);
                setError(
                    "Terjadi kesalahan saat menghubungi server. Silakan coba lagi."
                );
            } finally {
                setIsLoading(false);
            }
        };

        processVideo();
    }, [videoFile, hasProcessed, navigate]);

    // Fungsi untuk render konten utama berdasarkan state
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center text-center gap-4 font-jakarta">
                    <LoaderCircle className="w-16 h-16 animate-spin text-brand-primary" />
                    <h2 className="text-xl font-semibold">
                        Sedang Menganalisis Video...
                    </h2>
                </div>
            );
        }

        if (error) {
            return (
                <Card className="w-full max-w-sm bg-yellow-50 border-yellow-200 font-jakarta">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                        <AlertTriangle className="w-12 h-12 text-yellow-500" />
                        <h2 className="text-lg font-semibold text-yellow-800">
                            Oops!
                        </h2>
                        <p className="text-yellow-700">{error}</p>
                    </CardContent>
                </Card>
            );
        }

        if (result) {
            return (
                <Card className="w-[360px] max-w-md h-full bg-brand-primary font-jakarta">
                    <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                        <h2 className="text-xl font-semibold text-grey-10">
                            Terjemahan
                        </h2>
                        <p className="text-5xl font-bold text-grey-10 capitalize">
                            {result}
                        </p>
                    </CardContent>
                </Card>
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col mx-auto max-w-md justify-center items-center h-screen bg-white text-grey-100 font-jakarta">
            <header className="relative flex items-center p-4 w-full">
                    <CaretLeft size={24} onClick={() => navigate(-1)} className="h-6 w-6 left-10 absolute" />

                <h1 className="w-full text-center text-xl font-semibold">
                    Bahasa Isyarat ke Tulisan
                </h1>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center py-8 text-center">
                {renderContent()}
            </main>

            {/* Tampilkan tombol aksi hanya jika proses sudah selesai */}
            {!isLoading && (
                <footer className="w-full max-w-sm p-4 flex flex-col sm:flex-row gap-4 mb-8 justify-center font-jakarta">
                    <Button
                        className="w-full py-6 text-base rounded-full"
                        onClick={() => navigate("/terjemahan-isyarat")}
                    >
                        Terjemahkan Lagi
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full py-6 text-base text-brand-primary rounded-full"
                        onClick={() => navigate("/dashboard")}
                    >
                        Kembali ke Beranda
                    </Button>
                </footer>
            )}
        </div>
    );
}
