import { Button } from "@/components/ui/button";
import { SealPercent, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import logoPembayaran from "@/assets/img/Hourglass.svg";

// Digunakan sebagai gambar placeholder saat loading
const defaultProfilePic = "/src/assets/img/ppdefault.jpg";

export default function PembayaranJBI() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    // PERBAIKAN 3: State loading harus dimulai dengan 'true'
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="relative max-w-md min-h-screen font-jakarta flex flex-col items-center mx-auto overflow-hidden px-6">
                {/* Background SVG tidak perlu diubah */}
                <div className="absolute inset-0 -z-20 pointer-events-none">
                    {/* ... kode SVG Anda ... */}
                </div>

                <header className="relative flex items-center justify-center p-4 w-full">
                    <h1 className="w-full text-center text-xl font-semibold">
                        Pembayaran
                    </h1>
                </header>

                <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="w-40 h-w-40">
                        <img src={logoPembayaran} alt="Logo Pembayaran" />
                    </div>
                    <div className="w-full">
                        <h1 className="font-semibold text-xl text-grey-100 mb-3">
                            Detail
                        </h1>
                        <div className="flex justify-between items-center">
                            <p className="text-grey-50 text-sm pb-3 pr-6">
                                Metode Pembayaran
                            </p>
                            <p className="text-grey-100 text-sm pb-3">
                                Jamal Musiala
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-grey-50 text-sm pb-3 pr-6">
                                No. VA
                            </p>
                            <p className="text-grey-100 text-sm pb-3">
                                Jamal Musiala
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-grey-50 text-sm pb-3 pr-6">
                                ID Pesanan
                            </p>
                            <p className="text-grey-100 text-sm pb-3">
                                Jamal Musiala
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-grey-50 text-sm pb-3 pr-6">
                                Status
                            </p>
                            <p className="text-grey-100 text-sm pb-3">
                                Jamal Musiala
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-grey-50 text-sm pb-3 pr-6">
                                Waktu Pemesanan
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
                        <h1 className="font-semibold text-xl text-grey-100 mb-3">
                            Lainnya
                        </h1>
                        <Button
                            asChild
                            variant="outline"
                            type="submit"
                            className="w-full h-14 bg-grey-10 outline outline-2 outline-offset-[-2px]  outline-brand-primary text-lg text-brand-primary rounded-full py-3 font-semibold flex items-center justify-evenly mb-3 hover:bg-brand-primary50"
                            disabled={loading}
                        >
                            <Link to="/">
                            {loading ? "Memproses..." : "Whatsapp Admin"}
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            type="submit"
                            className="w-full h-14 bg-grey-10 outline outline-2 outline-offset-[-2px]  outline-brand-primary text-lg text-brand-primary rounded-full py-3 font-semibold flex items-center justify-evenly mb-3 hover:bg-brand-primary50"
                            disabled={loading}
                        >
                            <Link to="/dashboard">
                            {loading ? "Memproses..." : "Kembali ke Beranda"}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
