import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ArrowLeft, VideoOff } from 'lucide-react';

export function KameraPage() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const intervalRef = useRef(null);
    const streamRef = useRef(null); // <-- Ref baru untuk menyimpan object stream

    const [prediction, setPrediction] = useState('');
    const [cameraError, setCameraError] = useState(null);

    // Fungsi untuk mengirim frame (tidak berubah)
    const sendFrameForDetection = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const frameData = canvasRef.current.toDataURL('image/jpeg');

        axios.post('http://localhost:8000/api/detect-sign', { image: frameData })
            .then(response => {
                const newWord = response.data.word;
                if (newWord) {
                    setPrediction(newWord);
                }
            })
            .catch(error => {
                console.error("API Error:", error.message);
                if(intervalRef.current) clearInterval(intervalRef.current);
            });
    };

    // useEffect utama untuk mengelola kamera dan interval
    useEffect(() => {
        const enableCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                // Simpan stream ke dalam ref agar bisa diakses saat cleanup
                streamRef.current = stream; 
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        // Mulai interval HANYA setelah kamera benar-benar siap
                        intervalRef.current = setInterval(sendFrameForDetection, 1000);
                    };
                }
            } catch (err) {
                console.error("Camera access error:", err);
                setCameraError("Gagal mengakses kamera. Pastikan izin sudah diberikan.");
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
                streamRef.current.getTracks().forEach(track => track.stop());
                console.log("Camera stream stopped.");
            }
        };
    }, []); // <-- Array dependensi kosong, memastikan ini berjalan sekali saat mount dan cleanup sekali saat unmount

    // ... (kode UI Anda tidak berubah, sudah bagus)
    if (cameraError) {
        return (
             <div className="flex flex-col h-screen bg-black text-white items-center justify-center text-center gap-4 p-4">
                <VideoOff className="w-16 h-16 text-red-500" />
                <h2 className="text-xl font-semibold">Error Kamera</h2>
                <p className="text-slate-400 max-w-xs">{cameraError}</p>
                <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-screen bg-black text-white relative">
            <header className="absolute top-0 left-0 z-20 p-4">
                <Button variant="secondary" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
            </header>
            
            <main className="flex-grow flex items-center justify-center overflow-hidden">
                <video ref={videoRef} autoPlay playsInline muted className="h-full w-auto"></video>
                <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>
            </main>

            <footer className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="min-h-[80px] bg-black/50 backdrop-blur-md rounded-lg p-4 flex items-center justify-center text-center">
                    <p className="text-3xl font-bold capitalize tracking-wider">{prediction || "..."}</p>
                </div>
            </footer>
        </div>
    );
}
