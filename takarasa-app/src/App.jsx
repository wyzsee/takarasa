import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtpPassword from "./pages/VerifyOtpPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";


import Dashboard from "./pages/Dashboard";
import { KameraPage } from "./pages/KameraPage";
import { HasilIsyaratPage } from "./pages/HasilIsyaratPage";
import Text2Sign from './pages/Text2Sign';
import Text2SignResult from './pages/Text2SignResult';

import Belajar from "./pages/Belajar";
import BelajarBahasaIsyaratPage from "./pages/BelajarBahasaIsyaratPage";
import DetailBelajarBahasaIsyaratPage from "./pages/DetailBelajarBahasaIsyaratPage";

import Kuis from "./pages/Kuis";
import KuisDetail from "./pages/KuisDetail";
import KuisKonten from "./pages/KuisKonten";

import PenukaranPoinPage from "./pages/PenukaranPoinPage";
import RiwayatPenukaranPoinPage from "./pages/RiwayatPenukaranPoinPage";
import VoucherDimilikiPage from "./pages/VoucherDimilikiPage";
import DetailVoucherPage from "./pages/DetailVoucherPage";
import IsyaratKeTulisanPage from "./pages/IsyaratKeTulisanPage";

import Informasi from "./pages/Informasi";
import LayananJBI from "./pages/LayananJBIPage";
import EventKegiatan from "./pages/EventKegiatanPage";
import Komunitas from "./pages/KomunitasPage";
import DetailJBI from "./pages/DetailJBI";
import DetailEvent from"./pages/DetailEvent";
import DetailWorkshop from "./pages/DetailWorkshop";
import PesanJBI from "./pages/PemesananJBI";

import Profile from "./pages/Profile";
import AturProfilePage from "./pages/AturProfilePage";
import HubungiAdminPage from "./pages/HubungiAdminPage";

import TestCam from "./pages/TestCam";




export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-otp" element={<VerifyOtpPage />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-otp-password" element={<VerifyOtpPassword />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/belajar" element={<Belajar />} />
                <Route
                    path="/belajar-bahasa-isyarat"
                    element={<BelajarBahasaIsyaratPage />}
                />
                <Route
                    path="/detail-belajar-bahasa-isyarat"
                    element={<DetailBelajarBahasaIsyaratPage />}
                />
                <Route
                    path="/penukaran-poin"
                    element={<PenukaranPoinPage />}
                />
                <Route
                    path="/riwayat-penukaran-poin"
                    element={<RiwayatPenukaranPoinPage />}
                />
                <Route
                    path="/voucher-dimiliki"
                    element={<VoucherDimilikiPage />}
                />
                <Route
                    path="/detail-voucher"
                    element={<DetailVoucherPage />}
                />
                <Route
                    path="/terjemahan-isyarat"
                    element={<IsyaratKeTulisanPage />}
                />
                <Route
                    path="/terjemahan-isyarat/kamera"
                    element={<KameraPage />}
                />{" "}
                <Route
                    path="/terjemahan-isyarat/hasil"
                    element={<HasilIsyaratPage />}
                />{" "}
                
                <Route path="/text-to-sign" element={<Text2Sign />} />
                <Route path="/text-to-sign/result" element={<Text2SignResult />} />

                <Route path="/test-cam" element={<TestCam />} />
                <Route path="/informasi" element={<Informasi />} />


                <Route path="/profile" element={<Profile />} />
                <Route path="/atur-profile" element={<AturProfilePage />} />
                <Route path="/hubungi-admin" element={<HubungiAdminPage />} />

                <Route path="/kuis" element={<Kuis />} />
                <Route path="/kuis/:slug" element={<KuisDetail />} />
                <Route path="/kuis/:slug/:id" element={<KuisKonten />} />
                <Route path="/kuis/alfabet" element={<KuisDetail />} />
                <Route path="/kuis/alfabet/1" element={<KuisKonten />} />

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
