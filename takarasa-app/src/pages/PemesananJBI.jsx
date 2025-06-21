import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // 1. Import useParams
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft, Calendar } from "@phosphor-icons/react";

// Hapus import gambar statis
// import FotoBambang from "@/assets/img/Bambang.jpg";

export default function PemesananJBIPage() { // Sesuaikan nama komponen
    const navigate = useNavigate();
    const { id: interpreterId } = useParams(); // 2. Ambil ID JBI dari URL

    // State untuk data JBI yang akan ditampilkan
    const [interpreterDetail, setInterpreterDetail] = useState(null);
    const [error, setError] = useState(null);

    // State untuk form dan loading submit
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

    // 3. Hapus data statis
    // const informationData = [ ... ]; // HAPUS

    // 4. useEffect untuk mengambil data JBI dan data user yang login
    useEffect(() => {
        async function fetchData() {
            try {
                // Ambil data JBI yang akan dipesan
                const interpreterRes = await api.get(`/interpreters/${interpreterId}`);
                setInterpreterDetail(interpreterRes.data);

                // Ambil data user yang sedang login
                const userRes = await api.get("/user");
                // Pre-fill form dengan data user yang login
                setFormData(prevState => ({
                    ...prevState,
                    namaLengkap: userRes.data.name || "",
                    email: userRes.data.email || ""
                }));

            } catch (err) {
                console.error("Gagal mengambil data:", err);
                setError("Gagal memuat data. Pastikan Anda sudah login.");
            }
        }

        fetchData();
    }, [interpreterId]); // Jalankan ulang jika ID JBI berubah

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 5. handleSubmit yang mengirim data ke backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSubmit = {
            ...formData,
            interpreter_id: interpreterId, // Sertakan ID JBI yang dipesan
        };

        try {
            // Kirim data ke endpoint /bookings
            const response = await api.post('/bookings', dataToSubmit);

            console.log(response.data.message); // Pesan sukses dari Laravel

            // Jika berhasil, arahkan ke halaman pembayaran dengan membawa detail pesanan dari server
            navigate('/pembayaran-jbi/:id', { state: { detailPemesanan: response.data.data } });

        } catch (error) {
            console.error("Gagal membuat pemesanan:", error.response?.data);
            // Tampilkan pesan error validasi dari Laravel jika ada
            const errorMessages = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join("\n")
                : "Gagal membuat pemesanan. Periksa kembali data Anda.";
            alert(errorMessages);
        } finally {
            setLoading(false);
        }
    };

    // Tampilkan loading jika data JBI belum siap
    if (!interpreterDetail) {
        return <div className="flex justify-center items-center h-screen">Memuat...</div>;
    }

    // Tampilkan error jika gagal fetch
    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white max-w-md min-h-screen font-jakarta flex flex-col mx-auto relative">
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#E0DDF8] rounded-full"></div>
                <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#F8EBC6] rounded-full"></div>
            </div>

            <header className="relative flex items-center mx-2 p-4">
                <Button type="button" variant="ghost" size="icon" onClick={() => navigate(-1)} className="absolute">
                    <CaretLeft size={24} className="h-6 w-6" />
                </Button>
                <h1 className="text-xl w-full my-3 text-center font-semibold text-grey-90">
                    Pemesanan JBI
                </h1>
            </header>

            <main className="flex-grow w-full px-6 pb-4 overflow-y-auto">
                {/* 6. Tampilkan data JBI dari state 'interpreterDetail' */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 p-4 my-auto bg-[#ada8d5] backdrop-blur-sm rounded-2xl shadow-sm border border-grey-20">
                        <img
                            className="w-16 h-16 object-cover rounded-lg"
                            alt={interpreterDetail.name}
                            src={interpreterDetail.image_path} // URL dinamis
                        />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-bold text-white">
                                {interpreterDetail.name}
                            </h2>
                            <p className="text-sm text-white">
                                {interpreterDetail.description}
                            </p>
                        </div>
                    </div>

                    {/* Form section */}
                    <section className="flex flex-col gap-4 mt-2">
                        {/* Nama Pemesan */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="namaLengkap" className="text-sm font-medium text-grey-80">
                                Nama Pemesan <span className="text-error">*</span>
                            </label>
                            <input
                                type="text"
                                id="namaLengkap"
                                name="namaLengkap"
                                value={formData.namaLengkap}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                placeholder="Nama lengkap pemesan"
                                required
                            />
                        </div>

                        {/* Jenis Kelamin */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="jenisKelamin" className="text-sm font-medium text-grey-80">
                                Jenis Kelamin <span className="text-error">*</span>
                            </label>
                            <select
                                id="jenisKelamin"
                                name="jenisKelamin"
                                value={formData.jenisKelamin}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                required
                            >
                                <option value="" disabled>Pilih jenis kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        {/* Email Pemesan */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-grey-80">
                                Email Pemesan <span className="text-error">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                placeholder="Alamat email pemesan"
                                required
                            />
                        </div>

                        {/* No. Telp Pemesan */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="noTelp" className="text-sm font-medium text-grey-80">
                                No. Telp Pemesan <span className="text-error">*</span>
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
                                    placeholder="821-1111-1111"
                                    required
                                />
                            </div>
                        </div>

                        {/* Nama Acara */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="namaAcara" className="text-sm font-medium text-grey-80">
                                Nama Acara <span className="text-error">*</span>
                            </label>
                            <input
                                type="text"
                                id="namaAcara"
                                name="namaAcara"
                                value={formData.namaAcara}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                placeholder="Nama atau judul acara"
                                required
                            />
                        </div>

                        {/* Bentuk Acara */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="bentukAcara" className="text-sm font-medium text-grey-80">
                                Bentuk Acara <span className="text-error">*</span>
                            </label>
                            <select
                                id="bentukAcara"
                                name="bentukAcara"
                                value={formData.bentukAcara}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                required
                            >
                                <option value="" disabled>Pilih bentuk acara</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>
                        </div>

                        {/* Jenis Acara */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="jenisAcara" className="text-sm font-medium text-grey-80">
                                Jenis Acara <span className="text-error">*</span>
                            </label>
                            <select
                                id="jenisAcara"
                                name="jenisAcara"
                                value={formData.jenisAcara}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                required
                            >
                                <option value="" disabled>Pilih jenis acara</option>
                                <option value="Formal">Formal</option>
                                <option value="Semi-Formal">Semi Formal</option>
                                <option value="Non-Formal">Non Formal</option>
                            </select>
                        </div>

                        {/* Nama Instansi */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="namaInstansi" className="text-sm font-medium text-grey-80">
                                Nama Instansi <span className="text-error">*</span>
                            </label>
                            <input
                                type="text"
                                id="namaInstansi"
                                name="namaInstansi"
                                value={formData.namaInstansi}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                placeholder="Nama instansi penyelenggara"
                                required
                            />
                        </div>

                        {/* Waktu */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="waktu" className="text-sm font-medium text-grey-80">
                                Waktu <span className="text-error">*</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="datetime-local"
                                    id="waktu"
                                    name="waktu"
                                    value={formData.waktu}
                                    onChange={handleInputChange}
                                    className="w-full pl-4 pr-10 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                    required
                                />
                                <Calendar size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-50 pointer-events-none" />
                            </div>
                        </div>

                        {/* Lokasi */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="lokasi" className="text-sm font-medium text-grey-80">
                                Lokasi <span className="text-error">*</span>
                            </label>
                            <textarea
                                id="lokasi"
                                name="lokasi"
                                value={formData.lokasi}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none"
                                placeholder="Alamat lengkap acara"
                                required
                            ></textarea>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="w-full max-w-md p-6 bg-white/0">
                <Button type="submit" disabled={loading} className="w-full h-[54px] bg-gray-800 text-white hover:bg-gray-700 py-3 text-base font-semibold rounded-full">
                    {loading ? 'Memproses...' : 'Selanjutnya'}
                </Button>
            </footer>
        </form>
    );
}