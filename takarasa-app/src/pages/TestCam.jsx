import React, { useRef, useState } from "react";
import axios from "axios";

export default function GestureCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [message, setMessage] = useState("");

  // Mulai kamera
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      })
      .catch(err => alert("Error akses kamera: " + err.message));
  };

  // Ambil snapshot dan kirim ke backend
  const captureAndSend = async () => {
    if (!streaming) return alert("Kamera belum aktif!");

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      alert("Video belum siap, coba lagi sebentar");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    // Ambil data URL base64 PNG
    const imageData = canvas.toDataURL("image/png");

    try {
      const res = await axios.post("http://localhost:8000/api/gesture-detection", {
        image: imageData,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Gagal kirim gambar ke server");
    }
  };

  return (
    
    <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center overflow-hidden px-6">
      <button onClick={startCamera}>Buka Kamera</button>
      <video ref={videoRef} autoPlay playsInline style={{ width: 382, height: 579, marginTop: 10 }} />
      <br />
      <button onClick={captureAndSend} disabled={!streaming}>Kirim Snapshot ke Server</button>
      <p>{message}</p>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
