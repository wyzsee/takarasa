import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import Dashboard from './pages/Dashboard';
import TestCam from './pages/TestCam';
import Text2Sign from './pages/Text2Sign';
import Text2SignResult from './pages/Text2SignResult';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test-cam" element={<TestCam />} />
        <Route path="/text-to-sign" element={<Text2Sign />} />
        <Route path="/text-to-sign/result" element={<Text2SignResult />} />
      </Routes>
    </Router>
  );
}
