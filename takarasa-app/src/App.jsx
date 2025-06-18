import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import Dashboard from "./pages/Dashboard";
import Belajar from "./pages/Belajar";
import IsyaratKeTulisanPage from "./pages/IsyaratKeTulisanPage";
import { KameraPage } from "./pages/KameraPage";
import { HasilIsyaratPage } from "./pages/HasilIsyaratPage";
// import TulisanKeIsyaratPage from "./pages/TulisanKeIsyaratPage";
import TestCam from "./pages/TestCam";
import Informasi from "./pages/Informasi";
import LayananJBI from "./pages/LayananJBIPage";
import EventKegiatan from "./pages/EventKegiatanPage";
import Komunitas from "./pages/KomunitasPage";
import DetailJBI from "./pages/DetailJBI";
import DetailEvent from"./pages/DetailEvent";
import DetailWorkshop from "./pages/DetailWorkshop";
import PesanJBI from "./pages/PemesananJBI";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-otp" element={<VerifyOtpPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/belajar" element={<Belajar />} />
                {/* Alur Isyarat ke Tulisan */}
                <Route
                    path="/terjemahan-isyarat"
                    element={<IsyaratKeTulisanPage />}
                />
                <Route
                    path="/terjemahan-isyarat/kamera"
                    element={<KameraPage />}
                />{" "}
                {/* Buat Komponen ini */}
                <Route
                    path="/terjemahan-isyarat/hasil"
                    element={<HasilIsyaratPage />}
                />{" "}
                {/* Buat Komponen ini */}
                {/* Alur Tulisan ke Isyarat */}
                {/* <Route
                    path="/terjemahan-tulisan"
                    element={<TulisanKeIsyaratPage />}
                    /> */}
                <Route path="/test-cam" element={<TestCam />} />
                <Route path="/informasi" element={<Informasi />} />
                <Route path="/layanan-jbi" element={<LayananJBI/>}/>
                <Route path="/event-kegiatan" element={<EventKegiatan />} />
                <Route path="/komunitas" element={<Komunitas />} />
                <Route path="/detail-jbi" element={<DetailJBI />} />
                <Route path="/detail-event" element={<DetailEvent />} />
                <Route path="/detail-workshop" element={<DetailWorkshop />} />
                <Route path="/pesan-jbi" element={<PesanJBI />} />
            </Routes>
        </Router>
    );
}
