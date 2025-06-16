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
import BelajarBahasaIsyaratPage from "./pages/BelajarBahasaIsyaratPage";
import DetailBelajarBahasaIsyaratPage from "./pages/DetailBelajarBahasaIsyaratPage";
import IsyaratKeTulisanPage from "./pages/IsyaratKeTulisanPage";
import { KameraPage } from "./pages/KameraPage";
import { HasilIsyaratPage } from "./pages/HasilIsyaratPage";
import Text2Sign from './pages/Text2Sign';
import Text2SignResult from './pages/Text2SignResult';
import TestCam from "./pages/TestCam";
import Informasi from "./pages/Informasi";

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
                <Route
                    path="/belajar-bahasa-isyarat"
                    element={<BelajarBahasaIsyaratPage />}
                />
                <Route
                    path="/detail-belajar-bahasa-isyarat"
                    element={<DetailBelajarBahasaIsyaratPage />}
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
            </Routes>
        </Router>
    );
}
