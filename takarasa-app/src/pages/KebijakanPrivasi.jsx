import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CaretLeft } from "@phosphor-icons/react";

export default function KebijakanPrivasiPage() {
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
                    Kebijakan Privasi
                </h1>
            </header>

            {/* Konten Utama Kebijakan Privasi */}
            <main className="px-6 pb-10 text-gray-800">
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Terakhir Diperbarui: 22 Juni 2025
                </p>

                <p className="mb-4 text-justify">
                    Privasi Anda penting bagi kami di <strong>Takarasa</strong> ("kami", "aplikasi", "layanan"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi Anda saat Anda menggunakan aplikasi seluler kami.
                </p>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">1. Informasi yang Kami Kumpulkan</h2>
                    <p className="mb-2 text-gray-700 text-justify">
                        Kami dapat mengumpulkan beberapa jenis informasi dari dan tentang pengguna Layanan kami:
                    </p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
                        <li>
                            <strong>Informasi yang Anda Berikan:</strong> Saat Anda mendaftar, kami mengumpulkan informasi pribadi seperti nama, alamat email, dan kata sandi untuk membuat dan mengelola akun Anda.
                        </li>
                        <li>
                            <strong>Informasi Penggunaan:</strong> Kami mengumpulkan data tentang interaksi Anda dengan aplikasi, seperti modul pembelajaran yang Anda akses, kata atau kalimat yang Anda terjemahkan, dan aktivitas Anda di fitur komunitas. Ini membantu kami memahami kebutuhan Anda dan meningkatkan layanan.
                        </li>
                        <li>
                            <strong>Informasi Teknis:</strong> Kami dapat mengumpulkan informasi perangkat dan koneksi secara otomatis, seperti jenis perangkat, sistem operasi, alamat IP, dan pengidentifikasi perangkat unik untuk tujuan keamanan dan analitik.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
                    <p className="mb-2 text-gray-700">
                        Kami menggunakan informasi yang kami kumpulkan untuk berbagai tujuan, antara lain:
                    </p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                        <li>Untuk menyediakan, memelihara, dan meningkatkan fungsionalitas aplikasi.</li>
                        <li>Untuk mempersonalisasi pengalaman belajar Anda.</li>
                        <li>Untuk menganalisis penggunaan dan meningkatkan akurasi fitur terjemahan kami.</li>
                        <li>Untuk berkomunikasi dengan Anda, termasuk mengirimkan pembaruan layanan atau informasi penting lainnya.</li>
                        <li>Untuk melindungi keamanan dan integritas platform kami.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">3. Keamanan Data</h2>
                    <p className="text-gray-700 text-justify">
                        Kami menerapkan langkah-langkah keamanan teknis dan administratif yang wajar untuk melindungi informasi pribadi Anda dari akses, pengungkapan, perubahan, atau perusakan yang tidak sah. Namun, perlu diketahui bahwa tidak ada metode transmisi data melalui internet atau penyimpanan elektronik yang 100% aman.
                    </p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">4. Berbagi Informasi</h2>
                    <p className="text-gray-700 text-justify">
                        Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya dapat membagikan informasi dengan penyedia layanan pihak ketiga yang membantu kami mengoperasikan aplikasi (misalnya, penyedia hosting) atau jika diwajibkan oleh hukum.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">5. Hak-Hak Anda</h2>
                    <p className="text-gray-700 text-justify">
                        Anda memiliki hak untuk mengakses, memperbaiki, atau meminta penghapusan data pribadi Anda yang kami simpan. Anda dapat mengelola informasi akun Anda melalui pengaturan di dalam aplikasi atau dengan menghubungi kami.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">6. Perubahan pada Kebijakan Ini</h2>
                    <p className="text-gray-700 text-justify">
                        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberitahu Anda tentang perubahan apa pun dengan memposting kebijakan baru di halaman ini dan memperbarui tanggal "Terakhir Diperbarui" di bagian atas.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">7. Hubungi Kami</h2>
                    <p className="text-gray-700 text-justify">
                        Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="takarasaofficial@gmail.com" className="text-blue-600 hover:underline">takarasaofficial@gmail.com</a>.
                    </p>
                </section>
            </main>
        </div>
    );
}