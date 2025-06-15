import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
  });

  const [resendCooldown, setResendCooldown] = useState(60);
  const [resending, setResending] = useState(false);
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleResendOTP = async () => {
    setResending(true);
    try {
      await api.post("/resend-otp", { email: form.email });
      alert("Kode OTP telah dikirim ulang ke email Anda.");
      setResendCooldown(60); // reset waktu
    } catch (err) {
      console.error("🔥 RESEND OTP ERROR:", err);
      alert("Gagal mengirim ulang OTP. Coba lagi nanti.");
    } finally {
      setResending(false);
    }
  };

  const [loading, setLoading] = useState(false);

  // Redirect ke register kalau email tidak ada di state
  useEffect(() => {
    if (!location.state?.email) {
      navigate("/register");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (form.otp.length !== 4) {
      alert("OTP harus 4 digit");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/verify-otp", {
        email: form.email,
        otp: form.otp,
      });

      alert(res.data.message);

      // Redirect ke login
      navigate("/login");
    } catch (err) {
      console.error("🔥 OTP VERIFY ERROR:", err);
      alert(
        err.response?.data?.message ||
          "Gagal verifikasi OTP, silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen font-jakarta flex flex-col items-center justify-center overflow-hidden px-6">
      <form
        onSubmit={handleVerify}
        className="z-10 w-full min-h-full max-w-md mt-16 px-2 flex flex-col flex-grow justify-between"
      >
        {/* SVG Blob Background */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] opacity-50 blur-3xl z-0"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="1" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="1" />
            </radialGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>

          <path
            fill="url(#grad)"
            filter="url(#blur)"
            d="M87.5,-67.5C111.1,-38.3,116.4,-7,110.9,23.1C105.3,53.2,89,82.8,62.4,99.4C35.7,116,0.7,119.6,-31.7,119.1C-64,118.6,-94,113.1,-113.5,91.1C-133,69.2,-142.1,30.6,-139.1,-6.7C-136.1,-44,-121,-80.3,-95.3,-109.1C-69.6,-137.9,-34.8,-159.3,-2.2,-156.8C30.4,-154.2,60.7,-127,87.5,-67.5Z"
            transform="translate(200 200)"
          />
        </svg>
        {/* Konten Atas */}
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-center">Verifikasi OTP</h2>
          <p className="text-center text-gray-500 text-sm">
            Lorem ipsum dolor sit amet consectetur. Ut ornare neque ornare
            dignissim lectus hendrerit enim sed vestibulum.
          </p>

          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={form.otp}
              onChange={(val) => setForm((prev) => ({ ...prev, otp: val }))}
              autoFocus
            >
              <InputOTPGroup className="flex justify-center gap-x-4 mt-4">
                {[0, 1, 2, 3].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-14 h-14 text-xl rounded-lg border border-gray-300 flex items-center justify-center"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendCooldown > 0 || resending}
              className="text-sm text-brand-primary hover:underline disabled:opacity-50"
            >
              {resending
                ? "Mengirim ulang..."
                : resendCooldown > 0
                ? `Kirim ulang OTP (${resendCooldown}s)`
                : "Kirim ulang OTP"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-grey-100 text-white py-3 mb-8 rounded-full hover:bg-grey-70 disabled:opacity-60"
        >
          {loading ? "Memeriksa..." : "Verifikasi"}
        </button>
      </form>
    </div>
  );
}
