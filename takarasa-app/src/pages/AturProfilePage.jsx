import { Button } from "@/components/ui/button";
import ProfilePicture from "@/assets/img/profile_picture.jpg";
import {
    CaretLeft,
    CoinVertical,
    CaretRight,
    EnvelopeSimple,
    Lock,
    User,
    House,
    Eye,
    EyeSlash,
    PencilSimple,
} from "@phosphor-icons/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ProvinsiDropdown from "@/components/ui/TempatTinggal";
import DatePicker from "@/components/ui/DatePicker";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function AturProfile() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "radio") {
            setForm({ ...form, [name]: value }); // radio pakai value langsung
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    useEffect(() => {
        async function getUser() {
            try {
                const res = await api.get("/user");
                setUserName(res.data.name);
            } catch (err) {
                console.error("Gagal ambil user:", err);
            }
        }
        getUser();
    }, []);

    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6">
                <header className="relative flex items-center justify-center p-4 w-full">
                    <Link to="/profile" className="left-0 absolute">
                        <CaretLeft size={24} />
                    </Link>

                    <h1 className="w-full text-center text-xl font-semibold">
                        Atur Profile
                    </h1>
                </header>

                <div className="container w-full flex-grow flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="w-full flex flex-col gap-3 items-center p-4 rounded-2xl">
                        <div className="h-[100px] w-[100px] rounded-full">
                            <img
                                src={ProfilePicture}
                                alt="Profile Picture"
                                className="w-24 h-24 object-cover rounded-full"
                            />
                        </div>
                        <div className="flex gap-1">
                            <h1 className="text-sm font-normal text-grey-100">
                                Edit Foto Profil
                            </h1>
                            <PencilSimple size={10} />
                        </div>
                    </div>

                    <form className="rounded w-full min-h-full max-w-md px-2 grid grid-cols-2 gap-y-4 gap-x-4 z-10">
                        {/* Nama (Lebar Penuh) */}
                        <div className="col-span-2 flex flex-col gap-2">
                            <p className="text-sm">Nama Pengguna</p>
                            <Label htmlFor="name" className="sr-only">
                                Nama
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nama"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="border-grey-50 rounded-xl"
                            />
                        </div>

                        {/* Jenis Kelamin (Setengah Lebar) */}
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Jenis Kelamin</p>
                            <Select
                                value={form.jenis_kelamin}
                                onValueChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        jenis_kelamin: value,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        className="text-grey-50 [&[data-placeholder]]:text-grey-50"
                                        placeholder="Pilih Jenis Kelamin"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Laki-laki">
                                        Laki-laki
                                    </SelectItem>
                                    <SelectItem value="Perempuan">
                                        Perempuan
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tanggal Lahir (Setengah Lebar) */}
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Tanggal Lahir</p>
                            <DatePicker
                                value={form.tanggal_lahir}
                                onChange={(date) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        tanggal_lahir: date,
                                    }))
                                }
                            />
                        </div>

                        {/* Tempat Tinggal (Lebar Penuh) */}
                        <div className="col-span-2 flex flex-col gap-2 mb-4">
                            <p className="text-sm">Tempat Tinggal</p>
                            <ProvinsiDropdown
                                value={form.alamat}
                                onValueChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        alamat: value,
                                    }))
                                }
                            />
                        </div>

                        {/* Email (Lebar Penuh) */}
                        <div className="relative col-span-2">
                            <p className="text-sm absolute -top-6">Email</p>
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
                    </form>

                    <Button
                        asChild
                        type="submit"
                        className="bottom-0 h-12 w-full p-[10px] bg-grey-100 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                        disabled={loading}
                    >
                        <Link to="">
                            {loading ? "Memproses..." : "Simpan Perubahan"}
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
