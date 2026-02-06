import { useState, useEffect } from "react";
import axios from "axios";
import CrudTable from "../components/CrudTable";

export default function PasienPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nik: "", nama: "", tanggal_lahir: "", jenis_kelamin: "L", alamat: "", no_hp: "" });

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/pasien");
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/pasien", form);
    setForm({ nik: "", nama: "", tanggal_lahir: "", jenis_kelamin: "L", alamat: "", no_hp: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/pasien/${id}`);
    fetchData();
  };

  const handleEdit = async (id, updatedData) => {
    await axios.put(`http://localhost:5000/api/pasien/${id}`, updatedData);
    fetchData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-4xl">👥</span>
          Data Pasien
        </h2>
        <p className="mt-2 text-blue-100">Kelola informasi pasien yang terdaftar</p>
      </div>

      {/* Form Input */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>➕</span>
          Tambah Pasien Baru
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">NIK</label>
            <input 
              type="text" 
              placeholder="Masukkan NIK" 
              value={form.nik} 
              onChange={(e) => setForm({ ...form, nik: e.target.value })} 
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukkan nama" 
              value={form.nama} 
              onChange={(e) => setForm({ ...form, nama: e.target.value })} 
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Lahir</label>
            <input 
              type="date" 
              value={form.tanggal_lahir} 
              onChange={(e) => setForm({ ...form, tanggal_lahir: e.target.value })} 
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
            <select 
              value={form.jenis_kelamin} 
              onChange={(e) => setForm({ ...form, jenis_kelamin: e.target.value })} 
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
              required
            >
              <option value="L">👨 Laki-laki</option>
              <option value="P">👩 Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
            <input 
              type="text" 
              placeholder="Masukkan alamat" 
              value={form.alamat} 
              onChange={(e) => setForm({ ...form, alamat: e.target.value })} 
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">No. HP</label>
            <input 
              type="text" 
              placeholder="Masukkan nomor HP" 
              value={form.no_hp} 
              onChange={(e) => setForm({ ...form, no_hp: e.target.value })} 
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 col-span-full flex items-center justify-center gap-2"
          >
            <span>➕</span>
            Tambah Pasien
          </button>
        </form>
      </div>

      {/* Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Daftar Pasien</h3>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
            Total: {data.length} pasien
          </div>
        </div>
        <CrudTable data={data} columns={[
          { key: "pasien_id", label: "ID" },
          { key: "nik", label: "NIK" },
          { key: "nama", label: "Nama" },
          { key: "tanggal_lahir", label: "Tanggal Lahir" },
          { key: "jenis_kelamin", label: "Jenis Kelamin" },
          { key: "alamat", label: "Alamat" },
          { key: "no_hp", label: "No HP" },
        ]} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
}
