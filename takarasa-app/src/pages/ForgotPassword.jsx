import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "../api";
import {
    EnvelopeSimple,
    Eye,
    EyeSlash,
    Lock,
    CaretLeft,
} from "@phosphor-icons/react";
// iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await api.post("/forgot-password", { email });
            navigate("/verify-otp-password", {
                state: { email, flow: "reset" },
            });
        } catch (err) {
            setError(err.response?.data?.message || "Email tidak ditemukan.");
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
                <Link to="/login" className="left-0 absolute">
                    <CaretLeft size={24} />
                </Link>

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
                        {error && (
                            <p className="text-error text-sm">{error}</p>
                        )}
                    </div>
                </div>

                {/* Konten bawah (tombol & link) */}
                <div className="mt-auto space-y-4 pb-8">
                    <Button
                        type="submit"
                        className="w-full bg-grey-100 text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                        disabled={loading}
                    >
                        {loading ? "Mengirim..." : "Selanjutnya"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
