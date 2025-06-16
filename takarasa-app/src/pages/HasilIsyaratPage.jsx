import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LoaderCircle } from 'lucide-react';

export function HasilIsyaratPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoFile = location.state?.videoFile;

  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!videoFile) {
      alert("Tidak ada video yang dipilih.");
      navigate('/terjemahan-isyarat'); // Kembali jika tidak ada file
      return;
    }

    const processVideo = async () => {
      const formData = new FormData();
      formData.append('video', videoFile);

      try {
        // Anda perlu membuat endpoint baru di Laravel untuk ini
        const response = await axios.post('http://localhost:8000/api/upload-video-sign', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResult(response.data.text);
      } catch (err) {
        console.error("Gagal memproses video:", err);
        setResult("Terjadi kesalahan saat memproses video.");
      } finally {
        setIsLoading(false);
      }
    };

    processVideo();
  }, [videoFile, navigate]);

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="flex items-center p-4 border-b bg-white">
        <Button variant="ghost" size="icon" onClick={() => navigate('/terjemahan-isyarat')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold mx-auto">Hasil Terjemahan</h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center gap-6">
        {isLoading ? (
          <>
            <LoaderCircle className="w-16 h-16 animate-spin text-purple-600" />
            <h2 className="text-xl font-semibold">Sedang memproses video...</h2>
            <p className="text-slate-500">Mohon tunggu sebentar.</p>
          </>
        ) : (
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Teks yang Diterjemahkan:</h2>
            <p className="text-2xl text-purple-700 font-bold">{result}</p>
          </div>
        )}
      </main>
    </div>
  );
}