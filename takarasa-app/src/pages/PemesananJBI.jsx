import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft, Calendar } from "@phosphor-icons/react";
import FotoBambang from "@/assets/img/Bambang.jpg";

export default function InformationPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        namaLengkap: "",
        jenisKelamin: "",
        email: "",
        noTelp: "",
        namaAcara: "",
        bentukAcara: "",
        jenisAcara: "",
        namaInstansi: "",
        waktu: "",
        lokasi: "",
    });

    const informationData = [
        {
            id: 1,
            title: "Bambang Susanto S.Sos., M.Cs",
            description: "Ahli bahasa isyarat, inklusi disabilitas, dan teknologi aksesibel.",
            image: FotoBambang,
        },
    ];

    useEffect(() => {
        async function getUser() {
            try {
                const res = await api.get("/user");
                setUserName(res.data.name.split(' ')[0]);
            } catch (err) {
                console.error("Gagal mengambil data user:", err);
                setUserName("Pengguna");
            }
        }
        getUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Data yang akan dikirim:", formData);
        setTimeout(() => {
            setLoading(false);
            alert("Pemesanan berhasil! (Simulasi)");
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white max-w-md min-h-screen font-jakarta flex flex-col mx-auto relative">
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#E0DDF8] rounded-full"></div>
                <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#F8EBC6] rounded-full"></div>
            </div>

            <header className="relative flex items-center mx-2 p-4">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="absolute"
                >
                    <CaretLeft size={24} className="h-6 w-6" />
                </Button>
                <h1 className="text-xl w-full my-3 text-center font-semibold text-grey-90">
                    Pemesanan JBI
                </h1>
            </header>

            <main className="flex-grow w-full px-6 pb-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {informationData.map((info) => (
                        <div className="flex flex-col gap-4" key={info.id}>
                            <div className="flex items-center gap-4 p-4 my-auto bg-[#ada8d5] backdrop-blur-sm rounded-2xl shadow-sm border border-grey-20">
                                <img
                                    className="w-16 h-16 object-cover rounded-lg"
                                    alt={info.title}
                                    src={info.image}
                                />
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg font-bold text-grey-10">
                                        {info.title}
                                    </h2>
                                    <p className="text-sm text-grey-10">
                                        {info.description}
                                    </p>
                                </div>
                            </div>

                            <section className="flex flex-col gap-4 mt-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="namaLengkap" className="text-sm font-medium text-grey-80">
                                        Nama Pemesan
                                        <span className="text-error">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="namaLengkap"
                                        name="namaLengkap"
                                        value={formData.namaLengkap}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                        placeholder="Nama lengkap pemesan" required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="jenisKelamin" className="text-sm font-medium text-grey-80">
                                        Jenis Kelamin
                                        <span className="text-error">*</span>
                                    </label>
                                    <select
                                        id="jenisKelamin"
                                        name="jenisKelamin"
                                        value={formData.jenisKelamin}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                        required>

                                        <option value="" disabled>Pilih jenis kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium text-grey-80">
                                        Email Pemesan
                                        <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email" name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                        placeholder="Alamat email pemesan" required />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="noTelp" className="text-sm font-medium text-grey-80">
                                        No. Telp Pemesan
                                        <span className="text-error">*</span>
                                    </label>
                                    <div className="flex items-center w-full border border-grey-50 rounded-lg focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-transparent transition-all">
                                        <span className="px-4 text-grey-60 border-r border-grey-50">+62</span>
                                        <input
                                            type="tel"
                                            id="noTelp"
                                            name="noTelp"
                                            value={formData.noTelp}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-none rounded-r-lg focus:ring-0"
                                            placeholder="821-1111-1111" required />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="namaAcara" className="text-sm font-medium text-grey-80">
                                        Nama Acara
                                        <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="namaAcara"
                                        name="namaAcara"
                                        value={formData.namaAcara}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                        placeholder="Nama atau judul acara" required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="bentukAcara" className="text-sm font-medium text-grey-80">
                                        Bentuk Acara
                                        <span className="text-error">*</span>
                                    </label>
                                    <select
                                        id="bentukAcara"
                                        name="bentukAcara"
                                        value={formData.bentukAcara}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" required>
                                        <option value="" disabled>Pilih bentuk acara</option>
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="jenisAcara" className="text-sm font-medium text-grey-80">
                                        Jenis Acara
                                        <span className="text-error">*</span>
                                    </label>
                                    <select
                                        id="jenisAcara"
                                        name="jenisAcara"
                                        value={formData.jenisAcara}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" required>

                                        <option value="" disabled>Pilih jenis acara</option>
                                        <option value="Formal">Formal</option>
                                        <option value="Semi-Formal">Semi Formal</option>
                                        <option value="Non-Formal">Non Formal</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="namaInstansi" className="text-sm font-medium text-grey-80">
                                        Nama Instansi
                                        <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="namaInstansi"
                                        name="namaInstansi"
                                        value={formData.namaInstansi}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                        placeholder="Nama instansi penyelenggara" required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="waktu" className="text-sm font-medium text-grey-80">
                                        Waktu
                                        <span className="text-error">*</span>
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type="datetime-local"
                                            id="waktu" name="waktu"
                                            value={formData.waktu}
                                            onChange={handleInputChange}
                                            className="w-full pl-4 pr-10 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" required />
                                        <Calendar size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-50 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="lokasi" className="text-sm font-medium text-grey-80">
                                        Lokasi
                                        <span className="text-error">*</span>
                                    </label>
                                    <textarea
                                        id="lokasi"
                                        name="lokasi"
                                        value={formData.lokasi}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none"
                                        placeholder="Alamat lengkap acara" required></textarea>
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="w-full max-w-md p-6 bg-white/0">
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[px:54] bg-grey-100 text-white hover:bg-grey-80 py-3 text-base font-semibold rounded-full"
                >
                    {loading ? 'Memproses...' : 'Selanjutnya'}
                </Button>
            </footer>
        </form>
    );
}