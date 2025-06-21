import { Button } from "@/components/ui/button";
import { SealPercent, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import logoPembayaran from "@/assets/img/Hourglass.svg";
import {
    Clock,
    Copy,
    CheckCircle,
    XCircle,
    WhatsappLogo,
} from "@phosphor-icons/react";

const StatusBadge = ({ status }) => {
    const statusInfo = {
        pending: {
            text: "Menunggu Pembayaran",
            icon: <Clock size={16} className="text-yellow-600" />,
            color: "text-yellow-600 bg-yellow-100",
        },
        confirmed: {
            text: "Pembayaran Berhasil",
            icon: <CheckCircle size={16} className="text-green-600" />,
            color: "text-green-600 bg-green-100",
        },
        cancelled: {
            text: "Dibatalkan",
            icon: <XCircle size={16} className="text-red-600" />,
            color: "text-red-600 bg-red-100",
        },
        waiting_confirmation: {
            text: "Menunggu Konfirmasi Admin",
            icon: <Clock size={16} className="text-blue-600" />,
            color: "text-blue-600 bg-blue-100",
        },
    };

    const current = statusInfo[status] || {
        text: status,
        icon: null,
        color: "text-gray-500 bg-gray-100",
    };

    return (
        <div
            className={`flex items-center gap-2 text-sm font-semibold px-2 py-1 rounded-full ${current.color}`}
        >
            {current.icon}
            <span>{current.text}</span>
        </div>
    );
};

export default function StatusPemesananPage() {
    const { id } = useParams();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lakukan pengecekan: Hanya jalankan request API jika id BUKAN undefined.
        if (id) { // <-- Gunakan 'id' di sini
            setLoading(true);

            // Ambil data booking terbaru dari server
            api.get(`/bookings/${id}`) // <-- Gunakan 'id' di sini juga
                .then((res) => {
                    setBooking(res.data);
                })
                .catch((err) => {
                    console.error("Gagal mengambil detail booking:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            console.warn("Booking ID tidak ditemukan di URL (atau ID adalah undefined). Tidak bisa mengambil detail.");
            setLoading(false);
            // Anda bisa tambahkan logika untuk mengarahkan ulang user atau menampilkan pesan error di UI
        }
    }, [id]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Nomor VA berhasil disalin!");
    };

    if (loading)
        return (
            <div className="text-center p-10">Memuat Detail Pembayaran...</div>
        );
    if (!booking)
        return <div className="text-center p-10">Pesanan tidak ditemukan.</div>;

    // Siapkan pesan untuk WhatsApp (jika diperlukan)
    const whatsappMessage = `Halo Admin, saya ingin bertanya mengenai pesanan dengan ID #${booking.id}.`;
    const whatsappLink = `https://wa.me/6281234567890?text=${encodeURIComponent(
        whatsappMessage
    )}`; // Ganti dengan nomor WA Anda

    // Format tanggal agar lebih mudah dibaca
    const formattedDate = new Date(booking.created_at).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto bg-gray-50 px-4">
                <header className="relative flex items-center justify-center p-4 w-full">
                    <h1 className="w-full text-center text-xl font-semibold">
                        Detail Pesanan
                    </h1>
                </header>

                <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="w-32 h-w-32">
                        <img src={logoPembayaran} alt="Logo Pembayaran" />
                    </div>
                    <div className="w-full bg-white p-6 rounded-xl shadow-md">
                        <h2 className="font-bold text-lg text-gray-800 mb-4 text-center">
                            Rincian
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-sm">Status</p>
                                <StatusBadge status={booking.status} />
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-sm">
                                    ID Pesanan
                                </p>
                                <p className="text-gray-800 text-sm font-mono">
                                    #{booking.id}
                                </p>
                            </div>
                            {/* Hanya tampilkan VA jika ada */}
                            {booking.va_number && (
                                <>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500 text-sm">
                                            Metode Pembayaran
                                        </p>
                                        <p className="text-gray-800 text-sm font-semibold">
                                            BCA Virtual Account
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500 text-sm">
                                            No. VA
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-800 text-sm font-mono">
                                                {booking.va_number}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    copyToClipboard(
                                                        booking.va_number
                                                    )
                                                }
                                                title="Salin"
                                            >
                                                <Copy
                                                    size={16}
                                                    className="text-gray-400 hover:text-blue-600"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-sm">
                                    Waktu Pemesanan
                                </p>
                                <p className="text-gray-800 text-sm">
                                    {formattedDate}
                                </p>
                            </div>
                        </div>

                        <div className="border-t my-4"></div>

                        <div className="flex justify-between items-center my-3">
                            <p className="text-gray-800 text-base font-bold">
                                Total Pembayaran
                            </p>
                            <p className="text-blue-600 text-xl font-bold">
                                Rp{" "}
                                {parseInt(booking.total_harga).toLocaleString(
                                    "id-ID"
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="w-full mt-6 space-y-3">
                        <Button
                            asChild
                            className="w-full h-12 bg-green-500 text-white hover:bg-green-600 rounded-full text-base"
                        >
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                            >
                                <WhatsappLogo weight="fill" />
                                Hubungi Admin
                            </a>
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            className="w-full h-12 text-gray-600 hover:bg-gray-200 rounded-full text-base"
                        >
                            <Link to="/dashboard">Kembali ke Beranda</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
