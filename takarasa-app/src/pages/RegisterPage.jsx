import { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/DatePicker";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProvinsiDropdown from "@/components/ui/TempatTinggal";
import {
  EnvelopeSimple,
  Lock,
  User,
  House,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
// iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    tipe_pengguna: "",
    jenis_kelamin: "",
    tanggal_lahir: null,
    alamat: "",
    no_telepon: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setForm({ ...form, [name]: value }); // radio pakai value langsung
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formattedDate = form.tanggal_lahir
      ? format(form.tanggal_lahir, "yyyy-MM-dd")
      : null;

    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirm_password,
      jenis_kelamin: form.jenis_kelamin,
      tipe_pengguna: form.tipe_pengguna,
      tanggal_lahir: formattedDate,
      alamat: form.alamat,
      no_telepon: form.no_telepon,
    };

    try {
      const res = await api.post("/register", data); // Kirim data ke API backend
      iziToast.success({
                title: "Registrasi Berhasil",
                message: "Silahkan check email untuk OTP.",
                position: "topCenter",
                color: "#7C3AED",
                titleColor: "#ffffff",
                messageColor: "#ffffff"
            });

      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      console.error("🔥 REGISTER ERROR:", err);
      const errors = err.response?.data?.data; // ini objek error dari Laravel
      let message = "";
      if (errors) {
        for (const key in errors) {
          message += `${key}: ${errors[key].join(", ")}\n`;
        }
      } else {
        message = err.response?.data?.message || err.message;
      }
      iziToast.error({
                title: "Gagal Daftar",
                message:
                    err.response?.data?.message ||
                    err.message ||
                    "Terjadi kesalahan",
                position: "topCenter",
                color: "#FF4D64",
                titleColor: "#ffffff",
                messageColor: "#ffffff" 
            });
    }
  };

  const handleGoogleLogin = () => {
    alert("Fitur login dengan Google belum tersedia");
  };

  return (
    <div className="relative min-h-screen font-jakarta flex flex-col items-center justify-center overflow-hidden px-6">
      {/* SVG Blob Background */}
      <svg
        className="absolute -top-16 left-3/4 -translate-x-1/2 w-[200px] h-[300px] opacity-50 blur-3xl z-0"
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
        Daftar
      </h1>

      <form
        onSubmit={handleRegister}
        className="p-8 rounded w-full min-h-full max-w-md px-2 flex flex-col flex-grow justify-between space-y-4 z-10"
      >
        {/* Konten Atas */}
        <div className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-grey-100">
              <EnvelopeSimple size={20} weight="regular" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="pl-10 border-grey-50 rounded-xl"
            />
          </div>

          {/* Nama */}
          <div className="relative">
            <Label htmlFor="name" className="sr-only">
              Nama
            </Label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-grey-100">
              <User size={20} weight="regular" />
            </div>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange}
              required
              className="pl-10 border-grey-50 rounded-xl"
            />
          </div>

          {/* Tipe Pengguna - Radio Button */}
          <div className="flex justify-center items-center gap-x-6 my-2">
            <label className="gap-x-2 flex items-center">
              <input
                type="radio"
                name="tipe_pengguna"
                value="Tuli"
                checked={form.tipe_pengguna === "Tuli"}
                onChange={handleChange}
                required
                className="appearance-none mr-1 w-5 h-5 text-base border border-brand-primary rounded-full checked:bg-brand-primary"
              />
              Tuli
            </label>
            <label className="gap-x-2 flex items-center">
              <input
                type="radio"
                name="tipe_pengguna"
                value="Dengar"
                checked={form.tipe_pengguna === "Dengar"}
                onChange={handleChange}
                required
                className="appearance-none mr-1 w-5 h-5 text-base border border-brand-primary rounded-full checked:bg-brand-primary"
              />
              Dengar
            </label>
          </div>

          {/* Jenis Kelamin - Dropdown */}
          <div className="flex justify-center items-center gap-x-4 my-2">
            <Select
              value={form.jenis_kelamin}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, jenis_kelamin: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  className="text-grey-50 [&[data-placeholder]]:text-grey-50"
                  placeholder="Pilih Jenis Kelamin"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                <SelectItem value="Perempuan">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tanggal Lahir */}
          <div className="w-full">
            <DatePicker
              value={form.tanggal_lahir}
              onChange={(date) =>
                setForm((prev) => ({ ...prev, tanggal_lahir: date }))
              }
            />
          </div>

          {/* Tempat Tinggal */}
          <ProvinsiDropdown
            value={form.alamat}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, alamat: value }))
            }
          />

          {/* No Telepon
        <input
          type="tel"
          name="no_telepon"
          placeholder="No Telepon"
          value={form.no_telepon}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        /> */}

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
              name="password" // <-- tambahkan ini
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              value={form.password}
              onChange={handleChange}
              required
              className="pl-10 pr-10 border-grey-50 rounded-xl active:ring-brand-primary"
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
              value={form.confirm_password}
              onChange={handleChange}
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
              {showConfirmPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
            </button>
          </div>

          {/* <input
          type="password"
          name="confirm_password"
          placeholder="Konfirmasi Password"
          value={form.confirm_password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        /> */}
        </div>
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full bg-grey-100 text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
          >
            Daftar
          </button>
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
        </div>
      </form>
    </div>
  );
}
