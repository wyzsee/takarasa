import { Button } from "@/components/ui/button";
import { SealPercent, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import logoBca from "@/assets/img/logoBank/bca.svg";
import logoBni from "@/assets/img/logoBank/bni.png";
import logoGopay from "@/assets/img/logoBank/gopay.webp";
import logoDana from "@/assets/img/logoBank/dana.jpg";

// Digunakan sebagai gambar placeholder saat loading
const defaultProfilePic = "/src/assets/img/ppdefault.jpg";

const paymentMethods = [
    {
        code: "BCA_VA",
        name: "BCA Virtual Account",
        logo: logoBca,
    },
    {
        code: "BNI_VA",
        name: "BNI Virtual Account",
        logo: logoBni,
    },
    {
        code: "GOPAY",
        name: "GoPay",
        logo: logoGopay,
    },
    {
        code: "DANA",
        name: "DANA",
        logo: logoDana,
    },
];

export default function PembayaranJBI() {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState("");

    const handleSelectMethod = (methodCode) => {
        setSelectedMethod(methodCode);
    };

    const { id: interpreterId } = useParams();

    // PERBAIKAN 1: Tambahkan state untuk formData
    const [formData, setFormData] = useState({
        namaLengkap: "",
        email: "",
    });

    // PERBAIKAN 2 (PENTING): Ubah state awal menjadi object kosong {} untuk menghindari error 'null'
    const [interpreterDetail, setInterpreterDetail] = useState({});

    const [error, setError] = useState(null);

    // PERBAIKAN 3: State loading harus dimulai dengan 'true'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Tidak perlu set loading di sini karena sudah di-set di initial state
        async function fetchData() {
            try {
                // Ambil data JBI dan user secara bersamaan untuk efisiensi
                const [interpreterRes, userRes] = await Promise.all([
                    api.get(`/interpreters/${interpreterId}`),
                    api.get("/user"),
                ]);

                setInterpreterDetail(interpreterRes.data);

                // Pre-fill form dengan data user yang login
                setFormData((prevState) => ({
                    ...prevState,
                    namaLengkap: userRes.data.name || "",
                    email: userRes.data.email || "",
                }));
            } catch (err) {
                console.error("Gagal mengambil data:", err);
                setError("Gagal memuat data. Pastikan Anda sudah login.");
            } finally {
                // Set loading menjadi false setelah semua proses selesai
                setLoading(false);
            }
        }

        fetchData();
    }, [interpreterId]);

    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6">
                {/* Background SVG tidak perlu diubah */}
                <div className="absolute inset-0 -z-20 pointer-events-none">
                    {/* ... kode SVG Anda ... */}
                </div>

                <header className="relative flex items-center justify-center p-4 w-full">
                    <h1 className="w-full text-center text-xl font-semibold">
                        Detail Pemesanan
                    </h1>
                </header>

                <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="flex items-center gap-4 p-4 my-auto bg-[#ada8d5] backdrop-blur-sm rounded-2xl shadow-sm border border-grey-20 w-full">
                        {/* PERBAIKAN 4: Gunakan 'loading' sebagai penentu untuk placeholder */}
                        <img
                            className="w-16 h-16 object-cover rounded-lg bg-gray-400" // bg untuk placeholder
                            alt={
                                loading
                                    ? "Memuat JBI..."
                                    : interpreterDetail.name
                            }
                            src={
                                loading || !interpreterDetail.image_path
                                    ? defaultProfilePic
                                    : `http://localhost:8000${interpreterDetail.image_path}`
                            }
                        />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-bold text-white">
                                {loading ? "Memuat..." : interpreterDetail.name}
                            </h2>
                            <p className="text-sm text-white">
                                {loading
                                    ? "..."
                                    : interpreterDetail.description}
                            </p>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="font-semibold text-xl text-grey-100 mb-3">
                            Detail Pesanan
                        </h1>
                        <table>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Nama Pemesan
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    Jamal Musiala
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Jenis Kelamin
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    Laki-laki
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Email Pemesan
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    jamalmusiala@gmail.xom
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    No Telepon
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    0895365391032
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Nama Acara
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    Talkshow
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Bentuk Acara
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    Semi Formal
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Jenis Acara
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    Offline
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Nama Instansi
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    Radio Generasi Muda
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Waktu
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    2025-08-05 | 16.00 - 18.00 WIB
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Lokasi
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    Aula
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Catatan
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    Disediakan Makan Siang
                                </td>
                            </tr>
                        </table>
                        <h1 className="font-semibold text-xl text-grey-100 my-3">
                            Voucher
                        </h1>
                        <div className="bg-brand-primary w-full p-4 rounded-xl">
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <SealPercent
                                        size={24}
                                        className="text-grey-10"
                                    />
                                    <p className="text-grey-10 text-sm">
                                        3 voucher yang dapat digunakan
                                    </p>
                                </div>
                                <CaretRight
                                    size={24}
                                    className="text-grey-10"
                                />
                            </div>
                        </div>
                        <h1 className="font-semibold text-xl text-grey-100 my-3">
                            Metode Pembayaran
                        </h1>
                        <div className="flex flex-col gap-3">
                            {/* Langkah 3: Render daftar metode pembayaran menggunakan .map() */}
                            {paymentMethods.map((method) => {
                                const isSelected =
                                    selectedMethod === method.code;

                                return (
                                    <div
                                        key={method.code}
                                        // Langkah 4: Handle klik untuk mengubah state
                                        onClick={() =>
                                            handleSelectMethod(method.code)
                                        }
                                        // Langkah 5: Terapkan style berbeda berdasarkan state 'isSelected'
                                        className={`
                                w-full p-4 rounded-xl cursor-pointer border-2 transition-all duration-200
                                ${
                                    isSelected
                                        ? "bg-brand-primary text-white border-brand-accent"
                                        : "bg-brand-primary50 border-transparent hover:bg-gray-200"
                                }
                            `}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-4 items-center">
                                                <img
                                                    src={method.logo}
                                                    className="w-12 h-12 object-contain bg-white p-1 rounded-xl"
                                                    alt={method.name}
                                                />
                                                <p
                                                    className={`font-semibold text-base ${
                                                        isSelected
                                                            ? "text-white"
                                                            : "text-grey-100"
                                                    }`}
                                                >
                                                    {method.name}
                                                </p>
                                            </div>
                                            {isSelected && (
                                                <CheckCircle
                                                    size={24}
                                                    weight="fill"
                                                    className="text-brand-accent"
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-3">
                            <h1 className="font-semibold text-xl text-grey-100 mb-3">
                                Detail Pesanan
                            </h1>
                            <div className="flex justify-between items-center">
                                <p className="text-grey-50 text-sm pb-3 pr-6">
                                    Subtotal
                                </p>
                                <p className="text-grey-100 text-sm pb-3">
                                    Jamal Musiala
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-grey-50 text-sm pb-3 pr-6">
                                    Biaya Admin
                                </p>
                                <p className="text-grey-100 text-sm pb-3">
                                    Jamal Musiala
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-grey-50 text-sm pb-3 pr-6">
                                    Potongan Harga
                                </p>
                                <p className="text-grey-100 text-sm pb-3">
                                    Jamal Musiala
                                </p>
                            </div>
                            <div className="border-b border-brand-primary w-full"></div>
                            <div className="flex justify-between items-center my-3">
                                <p className="text-grey-100 text-sm pb-3 pr-6">
                                    Total
                                </p>
                                <p className="text-brand-primary text-sm font-semibold pb-3">
                                    Jamal Musiala
                                </p>
                            </div>
                            <Button type="submit" disabled={loading} className="w-full h-[54px] bg-gray-800 text-white hover:bg-gray-700 py-3 text-base font-semibold rounded-full">
                                                {loading ? 'Memproses...' : 'Selanjutnya'}
                                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
