import { Button } from "@/components/ui/button";
import Admin from "@/assets/img/Admin.jpg";
import { CaretLeft, CoinVertical, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

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
                        Hubungi Admin
                    </h1>
                </header>

                <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4 h-full">
                    <div className="h-52 w-96 rounded-xl">
                        <img
                            src={Admin}
                            alt="Foto"
                            className=" w-96 h-52 object-cover rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="font-semibold text-xl text-grey-100">
                            Hubungi Admin TAKARASA
                        </h1>
                        <p className="text-base text-grey-100">
                            Admin TAKARASA tersedia via WhatsApp, Customer
                            Service kami melayani anda pukul 08.00 sampai 17.00.
                        </p>
                        <p className="text-base text-grey-100">
                            Hubungi kami apabila terdapat kendala dalam
                            menjalankan aplikasi TAKARASA dengan cara menekan
                            tombol dibawah.
                        </p>
                    </div>
                    <Button
                        asChild
                        type="submit"
                        className="bottom-0 h-12 w-full p-[10px] bg-grey-100 text-lg text-white rounded-full py-3 font-semibold ease-in-out duration-300 hover:bg-grey-80"
                        disabled={loading}
                    >
                        <Link to="">
                            {loading ? "Memproses..." : "Hubungi Admin"}
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
