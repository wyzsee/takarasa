import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CaretLeft } from "@phosphor-icons/react";

export default function KetentuanLayananPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#fffff] max-w-md min-h-screen font-jakarta flex flex-col mx-auto relative">
            {/* Background gradasi dekoratif */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#E0DDF8] rounded-full"></div>
                <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-50 blur-3xl bg-[#F8EBC6] rounded-full"></div>
            </div>

            {/* Header Halaman */}
            <header className=" flex items-center mx-2 p-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="absolute"
                >
                    <CaretLeft size={24} className="h-6 w-6" />
                </Button>
                <h1 className="text-xl w-full my-3 text-center font-semibold text-gray-800">
                    Ketentuan Layanan
                </h1>
            </header>

            {/* Konten Utama Ketentuan Layanan */}
            <main className="px-6 pb-10 text-gray-800">
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Terakhir Diperbarui: 22 Juni 2025
                </p>

                <p className="mb-4">
                    Selamat datang di <strong>Takarasa</strong>. Harap baca Ketentuan Layanan ("Ketentuan") ini dengan saksama sebelum menggunakan aplikasi kami. Dengan mengakses atau menggunakan layanan Takarasa, Anda setuju untuk terikat oleh Ketentuan ini.
                </p>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">1. Deskripsi Layanan</h2>
                    <p className="text-gray-700 text-justify">
                        Takarasa ("Layanan") adalah platform digital yang didedikasikan untuk pembelajaran dan penerjemahan Bahasa Isyarat Indonesia (BISINDO), serta menyediakan fitur komunitas untuk menjadi jembatan komunikasi antara masyarakat umum dan teman Tuli. Layanan kami mencakup materi pembelajaran, fitur terjemahan, dan ruang interaksi komunitas.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">2. Akun Pengguna</h2>
                    <p className="text-gray-700 text-justify">
                        Untuk menggunakan beberapa fitur aplikasi, Anda mungkin perlu mendaftar dan membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda, termasuk kata sandi, dan untuk semua aktivitas yang terjadi di bawah akun Anda.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">3. Kewajiban Pengguna</h2>
                    <p className="mb-2 text-gray-700">
                        Anda setuju untuk tidak menggunakan Layanan untuk:
                    </p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                        <li>Melakukan aktivitas yang melanggar hukum atau peraturan yang berlaku.</li>
                        <li>Mengunggah atau menyebarkan konten yang bersifat melecehkan, cabul, mengancam, atau ujaran kebencian.</li>
                        <li>Melanggar hak kekayaan intelektual milik Takarasa atau pihak ketiga lainnya.</li>
                        <li>Mengganggu atau merusak integritas atau kinerja Layanan dan server kami.</li>
                        <li>Mencoba mendapatkan akses tidak sah ke Layanan atau sistem terkait.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">4. Hak Kekayaan Intelektual</h2>
                    <p className="text-gray-700 text-justify">
                        Seluruh konten yang terdapat dalam Layanan, termasuk teks, grafis, logo, ikon, gambar, materi pembelajaran, dan perangkat lunak, adalah milik Takarasa atau pemberi lisensinya dan dilindungi oleh undang-undang hak cipta dan merek dagang yang berlaku.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">5. Penafian (Disclaimer)</h2>
                    <p className="text-gray-700 text-justify">
                        Layanan kami disediakan "sebagaimana adanya". Meskipun kami berusaha untuk memberikan akurasi yang tinggi, kami tidak menjamin bahwa fitur terjemahan bahasa isyarat akan selalu 100% akurat atau bebas dari kesalahan. Takarasa tidak bertanggung jawab atas kesalahpahaman atau konsekuensi yang timbul dari penggunaan fitur terjemahan.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">6. Batasan Tanggung Jawab</h2>
                    <p className="text-gray-700 text-justify">
                        Sejauh diizinkan oleh hukum, Takarasa tidak akan bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari atau sehubungan dengan penggunaan Anda atas Layanan kami.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">7. Perubahan Ketentuan</h2>
                    <p className="text-gray-700 text-justify">
                        Kami berhak untuk mengubah atau mengganti Ketentuan ini kapan saja. Kami akan memberikan pemberitahuan tentang perubahan tersebut melalui aplikasi atau media lain yang wajar. Penggunaan Layanan secara berkelanjutan setelah perubahan tersebut merupakan penerimaan Anda terhadap Ketentuan yang baru.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">8. Hubungi Kami</h2>
                    <p className="text-gray-700 text-justify">
                        Jika Anda memiliki pertanyaan tentang Ketentuan Layanan ini, silakan hubungi kami di <a href="mailto:takarasaofficial@gmail.com" className="text-blue-600 hover:underline">takarasaofficial@gmail.com</a>.
                    </p>
                </section>
            </main>
        </div>
    );
}