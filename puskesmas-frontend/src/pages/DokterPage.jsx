import { useState, useEffect } from "react";
import axios from "axios";
import CrudTable from "../components/CrudTable";

export default function DokterPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nama: "", spesialis: "", no_str: "", no_hp: "" });

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/dokter");
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/dokter", form);
    setForm({ nama: "", spesialis: "", no_str: "", no_hp: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/dokter/${id}`);
    fetchData();
  };

  const handleEdit = async (id, updated) => {
    await axios.put(`http://localhost:5000/api/dokter/${id}`, updated);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-4xl">👨‍⚕️</span>
          Data Dokter
        </h2>
        <p className="mt-2 text-green-100">Kelola informasi dokter dan tenaga medis</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>➕</span>
          Tambah Dokter Baru
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Dokter</label>
            <input type="text" placeholder="Masukkan nama" value={form.nama} onChange={(e)=>setForm({...form,nama:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Spesialis</label>
            <input type="text" placeholder="Contoh: Umum, Gigi, Anak" value={form.spesialis} onChange={(e)=>setForm({...form,spesialis:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">No. STR</label>
            <input type="text" placeholder="Nomor STR" value={form.no_str} onChange={(e)=>setForm({...form,no_str:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">No. HP</label>
            <input type="text" placeholder="Nomor HP" value={form.no_hp} onChange={(e)=>setForm({...form,no_hp:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" required />
          </div>
          <button type="submit" className="col-span-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <span>➕</span> Tambah Dokter
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Daftar Dokter</h3>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
            Total: {data.length} dokter
          </div>
        </div>
        <CrudTable
          data={data}
          columns={[
            { key: "dokter_id", label: "ID" },
            { key: "nama", label: "Nama" },
            { key: "spesialis", label: "Spesialis" },
            { key: "no_str", label: "No STR" },
            { key: "no_hp", label: "No HP" },
          ]}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
