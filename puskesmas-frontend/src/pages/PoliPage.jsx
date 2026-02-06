import { useState, useEffect } from "react";
import axios from "axios";
import CrudTable from "../components/CrudTable";

export default function PoliPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nama_poli: "", deskripsi: "" });

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/poli");
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/poli", form);
    setForm({ nama_poli: "", deskripsi: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/poli/${id}`);
    fetchData();
  };

  const handleEdit = async (id, updatedData) => {
    await axios.put(`http://localhost:5000/api/poli/${id}`, updatedData);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-4xl">🏥</span>
          Data Poli
        </h2>
        <p className="mt-2 text-purple-100">Kelola informasi poliklinik yang tersedia</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>➕</span>
          Tambah Poli Baru
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Poli</label>
            <input type="text" placeholder="Contoh: Poli Umum, Poli Gigi" value={form.nama_poli} onChange={(e) => setForm({ ...form, nama_poli: e.target.value })} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
            <input type="text" placeholder="Deskripsi poli" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all" required />
          </div>
          <button type="submit" className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 col-span-full flex items-center justify-center gap-2">
            <span>➕</span> Tambah Poli
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Daftar Poli</h3>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-semibold">
            Total: {data.length} poli
          </div>
        </div>
        <CrudTable data={data} columns={[
          { key: "poli_id", label: "ID" },
          { key: "nama_poli", label: "Nama Poli" },
          { key: "deskripsi", label: "Deskripsi" },
        ]} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
}
