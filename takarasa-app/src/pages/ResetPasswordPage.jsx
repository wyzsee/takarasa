import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "../api";
import { EnvelopeSimple, Eye, Lock, EyeSlash } from "@phosphor-icons/react";
// iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Ambil email dan otp yang sudah divalidasi dari halaman sebelumnya
    const email = location.state?.email;
    const otp = location.state?.otp;

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () =>
        setShowConfirmPassword(!showConfirmPassword);

    // Jika pengguna masuk ke halaman ini tanpa email/otp, tendang kembali
    useEffect(() => {
        if (!email || !otp) {
            navigate("/login");
        }
    }, [email, otp, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setError("Konfirmasi password tidak cocok.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await api.post("/reset-password", {
                email,
                otp,
                password,
                password_confirmation: passwordConfirmation,
            });
            alert("Password berhasil direset! Silakan login.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen font-jakarta flex flex-col items-center justify-center overflow-hidden px-6">
            {/* SVG Blob Background */}
            <svg
                className="absolute top-80 left-1/2 -translate-x-1/2 w-[300px] h-[300px] opacity-50 blur-3xl z-0"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="1" />
                        <stop
                            offset="100%"
                            stopColor="#7C3AED"
                            stopOpacity="1"
                        />
                    </radialGradient>
                    <filter
                        id="blur"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                    >
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

            <header className="relative flex items-center justify-center p-4 w-full">
                <h1 className="w-full text-center text-xl font-semibold">
                    Lupa Password
                </h1>
            </header>

            <form
                onSubmit={handleSubmit}
                className="z-10 w-full min-h-full max-w-md mt-16 px-2 flex flex-col flex-grow justify-between"
            >
                {/* Konten atas */}
                <div>
                    <p className="text-base text-center text-grey-100 font-medium mb-6">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Obcaecati veritatis eius voluptates quasi tempore
                        illo.
                    </p>
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
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Kata Sandi"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pl-10 pr-10 border-grey-50 rounded-xl active:ring-brand-primary"
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-100 hover:text-grey-70"
                            aria-label={
                                showPassword
                                    ? "Sembunyikan password"
                                    : "Tampilkan password"
                            }
                        >
                            {showPassword ? (
                                <Eye size={20} weight="regular" />
                            ) : (
                                <EyeSlash size={20} />
                            )}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative mb-4">
                        <Label htmlFor="confirm_password" className="sr-only">
                            Konfirmasi Kata Sandi
                        </Label>
                        <Lock
                            size={20}
                            weight="regular"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-100"
                        />
                        <Input
                            id="confirm_password"
                            name="confirm_password" // <-- tambahkan ini juga
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Konfirmasi Kata Sandi"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                            required
                            className="pl-10 pr-10 border-grey-50 rounded-xl active:ring-brand-primary"
                        />
                        <button
                            type="button"
                            onClick={toggleShowConfirmPassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-100 hover:text-grey-70"
                            aria-label={
                                showConfirmPassword
                                    ? "Sembunyikan password"
                                    : "Tampilkan password"
                            }
                        >
                            {showConfirmPassword ? (
                                <Eye size={20} />
                            ) : (
                                <EyeSlash size={20} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Konten bawah (tombol & link) */}
                <div className="mt-auto space-y-4 pb-8">
                    <Button
                        type="submit"
                        className="w-full bg-grey-100 text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                        disabled={loading}
                    >
                        {loading ? "Mengirim..." : "Reset Password"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
