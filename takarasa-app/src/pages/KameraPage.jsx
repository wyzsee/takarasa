// src/pages/KameraPage.jsx

import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ArrowLeft, VideoOff } from 'lucide-react';

export function KameraPage() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const intervalRef = useRef(null); // Ref untuk menyimpan ID interval

    const [prediction, setPrediction] = useState('');
    const [cameraError, setCameraError] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    // Fungsi untuk mengirim satu frame, didefinisikan di sini
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
                // Hentikan pengiriman jika ada error API agar tidak spam
                if(intervalRef.current) clearInterval(intervalRef.current);
            });
    };

    // useEffect 1: HANYA untuk setup kamera
    useEffect(() => {
        const enableCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsCameraReady(true); // Tandai kamera sudah siap
                }
            } catch (err) {
                console.error("Camera access error:", err);
                setCameraError("Gagal mengakses kamera. Pastikan izin sudah diberikan dan refresh halaman.");
            }
        };

        enableCamera();

        // Fungsi Cleanup: Berjalan saat halaman ditutup
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []); // <-- Array dependensi kosong, hanya berjalan sekali

    // useEffect 2: HANYA untuk memulai & menghentikan interval deteksi
    useEffect(() => {
        if (isCameraReady) {
            // Mulai interval jika kamera sudah siap
            intervalRef.current = setInterval(sendFrameForDetection, 1000); // Kirim setiap 1 detik
        }
        
        // Fungsi cleanup akan dijalankan jika komponen unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isCameraReady]); // <-- Bergantung pada status `isCameraReady`

    // Tampilan UI
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