import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "../api";
import { EnvelopeSimple, Eye, EyeSlash, Lock } from "@phosphor-icons/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/login", { email, password });
      const token = res.data.data.token;

      localStorage.setItem("auth_token", token);
      alert("Login sukses!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(
        "Login gagal: " +
          (err.response?.data?.message || err.message || "Terjadi kesalahan")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Fitur login dengan Google belum tersedia");
  };

  return (
    <div className="relative min-h-screen font-jakarta flex flex-col items-center justify-center overflow-hidden px-6">
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

      <h1 className="text-center text-2xl font-semibold text-grey-100 mt-10">
        Masuk
      </h1>

      <form
        onSubmit={handleLogin}
        className="z-10 w-full min-h-full max-w-md mt-16 px-2 flex flex-col flex-grow justify-between"
      >
        {/* Konten atas */}
        <div>
          <h1 className="text-center text-3xl font-semibold text-grey-100 px-2 mb-12">
            Selamat Datang Kembali!
          </h1>

          {/* Email Input */}
          <div className="relative mb-4">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-grey-100">
              <EnvelopeSimple size={20} weight="regular" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 border-grey-50 rounded-lg active:ring-brand-primary"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Lock
              size={20}
              weight="regular"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-100"
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-10 border-grey-50 rounded-lg active:ring-brand-primary"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-100 hover:text-grey-70"
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
            >
              {showPassword ? (
                <Eye size={20} />
              ) : (
                <EyeSlash size={20} />
              )}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-left mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-grey-50 hover:text-grey-100"
            >
              Lupa Kata Sandi?
            </Link>
          </div>
        </div>

        {/* Konten bawah (tombol & link) */}
        <div className="mt-auto space-y-4 pb-8">
          <Button
            type="submit"
            className="w-full bg-grey-100 text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </Button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="group w-full border-2 border-brand-primary rounded-full py-3 flex items-center justify-center gap-2 text-brand-primary font-semibold ease-in-out duration-300 hover:bg-brand-primary"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              viewBox="0 0 533.5 544.3"
            >
              <path
                fill="#4285f4"
                d="M533.5 278.4c0-17.7-1.6-35-4.6-51.6H272v97.7h146.9c-6.4 34.2-25 63.2-53.3 82.7v68.5h85.9c50.3-46.3 81-114.6 81-197.3z"
              />
              <path
                fill="#34a853"
                d="M272 544.3c71.7 0 132-23.8 176-64.8l-85.9-68.5c-23.9 16-54.4 25.4-90.1 25.4-69.3 0-128-46.8-149-109.6H34.2v68.8C78.7 486.7 169.8 544.3 272 544.3z"
              />
              <path
                fill="#fbbc04"
                d="M123 326.8c-10.8-32.5-10.8-67.4 0-99.9V158H34.2c-34.5 69-34.5 151.9 0 220.9L123 326.8z"
              />
              <path
                fill="#ea4335"
                d="M272 107.7c37.6-.6 73.9 13 101.7 37.3l76.2-76.2C405.1 24 341.3-.2 272 0 169.8 0 78.7 57.6 34.2 158l88.8 68.9c21-62.8 79.7-109.6 149-109.6z"
              />
            </svg>
            <span className="group-hover:text-white transition-colors duration-400 cursor-pointer">
              Masuk dengan Google
            </span>
          </button>

          <p className="text-center text-sm text-grey-50">
            Belum memiliki akun?{" "}
            <Link
              to="/register"
              className="underline text-grey-50 hover:text-grey-100"
            >
              Daftar
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
