import { Button } from "@/components/ui/button";
import { SealPercent, CaretRight, CheckCircle } from "@phosphor-icons/react";
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

    const VoucherModal = ({ vouchers, onSelect, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Pilih Voucher</h2>
                <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                    {vouchers.map((userVoucher) => (
                        <div
                            key={userVoucher.id}
                            onClick={() => onSelect(userVoucher)}
                            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                        >
                            <p className="font-bold">
                                {userVoucher.voucher.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {userVoucher.voucher.description}
                            </p>
                            <p className="text-sm font-semibold text-grey-100">
                                Diskon {userVoucher.voucher.percentage}%
                            </p>
                        </div>
                    ))}
                </div>
                <Button
                    onClick={onClose}
                    variant="ghost"
                    className="mt-4 w-full"
                >
                    Tutup
                </Button>
            </div>
        </div>
    );

export default function PembayaranJBI() {
    const navigate = useNavigate();
    const { id: bookingId } = useParams(); // Cukup satu ID dari URL

    // State yang kita butuhkan
    const [booking, setBooking] = useState(null); // Mulai dengan null
    const [loading, setLoading] = useState(true); // Mulai dengan true
    const [error, setError] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);

    const [availableVouchers, setAvailableVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

    const [priceDetails, setPriceDetails] = useState({
        harga_awal: 0,
        potongan_voucher: 0,
        biaya_admin: 0,
        total_harga: 0,
    });

    const handleSelectMethod = (methodCode) => {
        setSelectedMethod(methodCode);
    };

    // Hanya satu useEffect untuk mengambil semua data yang dibutuhkan
    useEffect(() => {
        async function fetchData() {
            try {
                // 1. Ambil detail booking
                const bookingRes = await api.get(`/bookings/${bookingId}`);
                const bookingData = bookingRes.data;
                setBooking(bookingData);

                // Inisialisasi harga dari data booking
                setPriceDetails({
                    harga_awal: bookingData.harga_awal,
                    potongan_voucher: bookingData.potongan_voucher,
                    biaya_admin: bookingData.biaya_admin,
                    total_harga: bookingData.total_harga,
                });

                // 2. Ambil daftar voucher
                const voucherRes = await api.get("/my-vouchers");
                setAvailableVouchers(voucherRes.data);
            } catch (err) {
                console.error("Gagal mengambil data:", err);
                setError("Gagal memuat detail. Silakan coba lagi.");
            } finally {
                setLoading(false);
            }
        }

        if (bookingId) {
            fetchData();
        }
    }, [bookingId]);

    const handleApplyVoucher = async (userVoucher) => {
        setLoading(true);
        setIsVoucherModalOpen(false);

        try {
            const res = await api.post(`/bookings/${bookingId}/apply-voucher`, {
                // KIRIM PROPERTI 'unique_code' DARI OBJEK 'userVoucher'
                voucher_code: userVoucher.unique_code,
            });

            // Update state harga dengan data dari backend
            setPriceDetails(res.data.data);
            // Di sini kita bisa menyimpan seluruh objek 'userVoucher' jika perlu
            setSelectedVoucher(userVoucher.voucher);
            alert(res.data.message);
        } catch (err) {
            console.error("Gagal menerapkan voucher:", err);
            // Log pesan error dari server untuk debugging
            const serverMessage =
                err.response?.data?.message || "Terjadi kesalahan";
            const validationErrors = err.response?.data?.errors;

            // Tampilkan pesan validasi yang lebih spesifik jika ada
            if (validationErrors && validationErrors.voucher_code) {
                alert(validationErrors.voucher_code[0]);
            } else {
                alert(serverMessage);
            }
        } finally {
            setLoading(false);
        }
    };

   const handlePayment = async () => {
    if (!selectedMethod) {
        alert("Silakan pilih metode pembayaran terlebih dahulu.");
        return;
    }
    
    setLoading(true);

    try {
        // Panggil endpoint baru untuk "membuat" transaksi
        await api.post(`/bookings/${booking.id}/create-transaction`, {
            // Anda bisa kirim data tambahan jika perlu, misal metode pembayaran
            payment_method: selectedMethod 
        });

        // Jika sukses, langsung arahkan ke halaman status
        navigate(`/detail-pembayaran-jbi/${booking.id}`);

    } catch (err) {
        console.error("Gagal membuat transaksi:", err);
        alert("Gagal memproses permintaan. Silakan coba lagi.");
    } finally {
        setLoading(false);
    }
};


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
                            alt="Foto"
                            src=""
                        />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-bold text-white">
                                {loading
                                    ? "Memuat..."
                                    : booking.interpreter.name}
                            </h2>
                            <p className="text-sm text-white">
                                {loading
                                    ? "..."
                                    : booking.interpreter.description}
                            </p>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="font-semibold text-xl text-grey-100 mb-3">
                            Detail Pesanan
                        </h1>
                        <table>
                            <tbody>

                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Nama Pemesan
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading ? "..." : booking.customer_name}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Jenis Kelamin
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading ? "..." : booking.customer_gender}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Email Pemesan
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading ? "..." : booking.customer_email}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    No Telepon
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading
                                        ? "..."
                                        : `+62${booking.customer_phone}`}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Nama Acara
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading ? "..." : booking.event_name}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Bentuk Acara
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading ? "..." : booking.event_type}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Jenis Acara
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading ? "..." : booking.event_formality}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Nama Instansi
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading
                                        ? "..."
                                        : booking.organization_name}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Waktu
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading ? "..." : booking.event_datetime}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-grey-50 text-sm pb-3 pr-6">
                                    Lokasi
                                </td>
                                <td className="text-grey-100 text-sm pb-3">
                                    {loading ? "..." : booking.event_location}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <h1 className="font-semibold text-xl text-grey-100 my-3">
                            Voucher
                        </h1>
                        <div
                            className="bg-brand-primary w-full p-4 rounded-xl cursor-pointer"
                            onClick={() => setIsVoucherModalOpen(true)} // Buka modal saat diklik
                        >
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <SealPercent
                                        size={24}
                                        className="text-grey-10"
                                    />
                                    <p className="text-grey-10 text-sm">
                                        {selectedVoucher
                                            ? `Voucher "${selectedVoucher.name}" diterapkan`
                                            : "Pilih voucher yang tersedia"}
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
                                Rincian Harga
                            </h1>
                            {/* Subtotal */}
                            <div className="flex justify-between items-center">
                                <p className="text-grey-50 text-sm pb-3 pr-6">
                                    Subtotal
                                </p>
                                <p className="text-grey-100 text-sm pb-3">
                                    Rp{" "}
                                    {priceDetails.harga_awal.toLocaleString(
                                        "id-ID"
                                    )}
                                </p>
                            </div>
                            {/* Biaya Admin */}
                            <div className="flex justify-between items-center">
                                <p className="text-grey-50 text-sm pb-3 pr-6">
                                    Biaya Admin
                                </p>
                                <p className="text-grey-100 text-sm pb-3">
                                    Rp{" "}
                                    {priceDetails.biaya_admin.toLocaleString(
                                        "id-ID"
                                    )}
                                </p>
                            </div>
                            {/* Diskon Voucher (hanya tampil jika ada) */}
                            {priceDetails.potongan_voucher > 0 && (
                                <div className="flex justify-between">
                                    <p className="text-grey-50">
                                        Diskon Voucher
                                    </p>
                                    <p className="text-green-500 font-semibold">
                                        - Rp{" "}
                                        {priceDetails.potongan_voucher.toLocaleString(
                                            "id-ID"
                                        )}
                                    </p>
                                </div>
                            )}
                            <div className="border-b border-brand-primary w-full my-2"></div>
                            {/* Total */}
                            <div className="flex justify-between items-center my-3">
                                <p className="text-grey-100 text-lg font-bold pb-3 pr-6">
                                    Total
                                </p>
                                <p className="text-brand-primary text-lg font-bold pb-3">
                                    Rp{" "}
                                    {priceDetails.total_harga.toLocaleString(
                                        "id-ID"
                                    )}
                                </p>
                            </div>
                            <Button
                                onClick={handlePayment}
                                type="submit"
                                disabled={loading}
                                className="w-full h-[54px] bg-gray-800 text-white hover:bg-gray-700 py-3 text-base font-semibold rounded-full"
                            >
                                {loading ? "Memproses..." : "Bayar Sekarang"}
                            </Button>
                        </div>
                        {isVoucherModalOpen && (
                            <VoucherModal
                                vouchers={availableVouchers}
                                onSelect={handleApplyVoucher}
                                onClose={() => setIsVoucherModalOpen(false)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
