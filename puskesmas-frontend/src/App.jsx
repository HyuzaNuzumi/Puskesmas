import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PasienPage from "./pages/PasienPage";
import DokterPage from "./pages/DokterPage";
import PoliPage from "./pages/PoliPage";
import KunjunganPage from "./pages/KunjunganPage";
import ObatPage from "./pages/ObatPage";
import ResepPage from "./pages/ResepPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-blue-600 p-4 text-white flex justify-between mt-6 rounded-xl">
          <h1 className="font-bold">🏥 Puskesmas</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/pasien" className="hover:underline">Pasien</Link>
            <Link to="/dokter" className="hover:underline">Dokter</Link>
            <Link to="/poli" className="hover:underline">Poli</Link>
            <Link to="/kunjungan" className="hover:underline">Kunjungan</Link>
            <Link to="/obat" className="hover:underline">Obat</Link>
            <Link to="/resep" className="hover:underline">Resep</Link>
          </div>
        </nav>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<h2 className="text-xl">Selamat Datang di Sistem Puskesmas</h2>} />
            <Route path="/pasien" element={<PasienPage />} />
            <Route path="/dokter" element={<DokterPage />} />
            <Route path="/poli" element={<PoliPage />} />
            <Route path="/kunjungan" element={<KunjunganPage />} />
            <Route path="/obat" element={<ObatPage />} />
            <Route path="/resep" element={<ResepPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
