import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, LoaderCircle, AlertTriangle, FileVideo } from 'lucide-react';

export function HasilIsyaratPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoFile = location.state?.videoFile;

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // State baru untuk menandai apakah proses sudah pernah dijalankan
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    // 1. Guard Clause: Jangan lakukan apa-apa jika tidak ada file ATAU sudah pernah diproses
    if (!videoFile || hasProcessed) {
      if (!videoFile) {
        // Jika tidak ada file, langsung set error (tanpa alert)
        setError("Tidak ada video yang dipilih untuk diproses. Silakan kembali.");
        setIsLoading(false);
      }
      return;
    }

    const processVideo = async () => {
      // Tandai bahwa proses akan dimulai
      setHasProcessed(true);
      setIsLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('video', videoFile);

      try {
        const response = await axios.post('http://localhost:8000/api/upload-video-sign', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setResult(response.data.text);
      } catch (err) {
        console.error("Gagal memproses video:", err);
        setError("Terjadi kesalahan saat menghubungi server. Silakan coba lagi.");
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
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <LoaderCircle className="w-16 h-16 animate-spin text-purple-600" />
          <h2 className="text-xl font-semibold">Sedang Menganalisis Video...</h2>
        </div>
      );
    }

    if (error) {
      return (
        <Card className="w-full max-w-sm bg-yellow-50 border-yellow-200">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <AlertTriangle className="w-12 h-12 text-yellow-500" />
            <h2 className="text-lg font-semibold text-yellow-800">Oops!</h2>
            <p className="text-yellow-700">{error}</p>
          </CardContent>
        </Card>
      );
    }

    if (result) {
      return (
        <Card className="w-full max-w-sm bg-white shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center gap-4">
            <h2 className="text-lg font-medium text-slate-600">Teks yang Diterjemahkan:</h2>
            <p className="text-5xl font-bold text-purple-700 capitalize">{result}</p>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="flex items-center p-4 border-b bg-white">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold mx-auto">Hasil Terjemahan</h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        {renderContent()}
      </main>
      
      {/* Tampilkan tombol aksi hanya jika proses sudah selesai */}
      {!isLoading && (
        <footer className="p-4 bg-slate-50 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/terjemahan-isyarat')}>Terjemahkan Video Lain</Button>
          <Button className="w-full sm:w-auto" onClick={() => navigate('/dashboard')}>Kembali ke Beranda</Button>
        </footer>
      )}
    </div>
  );
}