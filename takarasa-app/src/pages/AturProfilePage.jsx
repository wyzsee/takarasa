import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CaretLeft, PencilSimple } from "@phosphor-icons/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const defaultProfilePic = "/src/assets/img/ppdefault.jpg";

export default function AturProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // State untuk menampung seluruh data user
    const [loading, setLoading] = useState(true);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userJenisKelamin, setUserJenisKelamin] = useState("");
    const [userTanggalLahir, setUserTanggalLahir] = useState("");
    const [userAlamat, setUserAlamat] = useState("");

    // State untuk preview gambar & file yang akan diupload
    const [imagePreview, setImagePreview] = useState(defaultProfilePic);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await api.get("/user");
                setUserName(res.data.name);
                setUserEmail(res.data.email);
                setUserTanggalLahir(res.data.tanggal_lahir);
                setUserJenisKelamin(res.data.jenis_kelamin);
                setUserAlamat(res.data.alamat);
            } catch (err) {
                console.error("Gagal ambil user:", err);
            }
        }
        getUser();
    }, []);

    // Ambil data user dan isi form saat halaman dimuat
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get("/user");
                setUser(res.data);
                if (res.data.foto_profil) {
                    // Pastikan base URL API ditambahkan jika path-nya relatif
                    setImagePreview(
                        `http://localhost:8000/storage/${res.data.foto_profil}`
                    );
                }
            } catch (err) {
                console.error("Gagal ambil user:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    // Handler untuk perubahan input form biasa
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handler saat file gambar dipilih
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // Buat URL preview sementara
        }
    };

    // Handler untuk submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);

        if (imageFile) {
            formData.append("foto_profil", imageFile);
        }

        try {
            await api.post("/user/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Profil berhasil diperbarui!");
            navigate("/profile");
        } catch (err) {
            console.error("Gagal update profil:", err.response?.data || err);
            alert("Gagal memperbarui profil.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6">
                <header className="relative flex items-center justify-center p-4 w-full">
                    <Link to="/voucher-dimiliki" className="left-0 absolute">
                        <CaretLeft size={24} />
                    </Link>

                    <h1 className="w-full text-center text-xl font-semibold">
                        Atur Profile
                    </h1>
                </header>

                <div className="container w-full flex-grow flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <form onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col gap-3 items-center p-4 rounded-2xl">
                            <div className="h-[100px] w-[100px] rounded-full">
                                <img
                                    src={imagePreview}
                                    alt="Profile"
                                    className="w-24 h-24 object-cover rounded-full border-2 border-slate-300"
                                />
                            </div>
                            <div className="flex gap-1">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                />
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    Edit Foto Profil
                                    <PencilSimple size={14} className="ml-1" />
                                </Button>
                            </div>
                        </div>
                        <div className="rounded w-full min-h-full max-w-md px-2 grid grid-cols-2 gap-y-4 gap-x-4 z-10">
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
                                    value={user?.name || ""}
                                    onChange={handleChange}
                                    className="border-grey-50 rounded-xl"
                                />
                            </div>

                            {/* Jenis Kelamin (Setengah Lebar) */}
                            <div className="flex flex-col gap-2">
                                <p className="text-sm">Jenis Kelamin</p>
                                <Label
                                    htmlFor="jenis_kelamin"
                                    className="sr-only"
                                >
                                    Jenis Kelamin
                                </Label>
                                <Input
                                    id="jenis_kelamin"
                                    name="jenis_kelamin"
                                    type="text"
                                    value={userJenisKelamin}
                                    className="border-grey-50 rounded-xl"
                                    disabled
                                />
                            </div>

                            {/* Tanggal Lahir (Setengah Lebar) */}
                            <div className="flex flex-col gap-2">
                                <p className="text-sm">Tanggal Lahir</p>
                                <Label
                                    htmlFor="tanggal_lahir"
                                    className="sr-only"
                                >
                                    Tanggal Lahir
                                </Label>
                                <Input
                                    id="tanggal_lahir"
                                    name="tanggal_lahir"
                                    type="text"
                                    value={
                                        user && user.tanggal_lahir
                                            ? format(
                                                  new Date(user.tanggal_lahir),
                                                  "dd MMMM yyyy",
                                                  { locale: id }
                                              )
                                            : "Belum diatur"
                                    }
                                    placeholder={userTanggalLahir}
                                    required
                                    className="border-grey-50 rounded-xl"
                                    disabled
                                />
                            </div>

                            {/* Tempat Tinggal (Lebar Penuh) */}
                            <div className="col-span-2 flex flex-col gap-2 mb-4">
                                <p className="text-sm">Tempat Tinggal</p>
                                <Label
                                    htmlFor="tempat_tinggal"
                                    className="sr-only"
                                >
                                    Tempat Tinggal
                                </Label>
                                <Input
                                    id="tempat_tinggal"
                                    name="tempat_tinggal"
                                    type="text"
                                    value={userAlamat}
                                    className="border-grey-50 rounded-xl"
                                    disabled
                                />
                            </div>

                            {/* Email (Lebar Penuh) */}
                            <div className="relative col-span-2">
                                <p className="text-sm absolute -top-6">Email</p>
                                <Label htmlFor="email" className="sr-only">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={user?.email || ""}
                                    onChange={handleChange}
                                    className=" border-grey-50 rounded-xl"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="mt-4 bottom-0 h-12 w-full p-[10px] bg-grey-100 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                            disabled={loading}
                        >
                            {loading ? "Memproses..." : "Simpan Perubahan"}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
