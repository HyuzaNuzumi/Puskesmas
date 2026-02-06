import { useState, useEffect } from "react";
import axios from "axios";
import CrudTable from "../components/CrudTable";

export default function ObatPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nama_obat: "", stok: "", harga: "" });

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/obat");
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/obat", form);
    setForm({ nama_obat: "", stok: "", harga: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/obat/${id}`);
    fetchData();
  };

  const handleEdit = async (id, updated) => {
    await axios.put(`http://localhost:5000/api/obat/${id}`, updated);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-4xl">💊</span>
          Data Obat
        </h2>
        <p className="mt-2 text-pink-100">Kelola inventori obat dan farmasi</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>➕</span>
          Tambah Obat Baru
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Obat</label>
            <input type="text" placeholder="Contoh: Paracetamol" value={form.nama_obat} onChange={(e)=>setForm({...form,nama_obat:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stok</label>
            <input type="number" placeholder="Jumlah stok" value={form.stok} onChange={(e)=>setForm({...form,stok:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
            <input type="number" placeholder="Harga per unit" value={form.harga} onChange={(e)=>setForm({...form,harga:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all" required />
          </div>
          <button type="submit" className="col-span-full bg-gradient-to-r from-pink-600 to-pink-700 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-pink-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <span>➕</span> Tambah Obat
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Daftar Obat</h3>
          <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-lg font-semibold">
            Total: {data.length} jenis obat
          </div>
        </div>
        <CrudTable
          data={data}
          columns={[
            { key: "obat_id", label: "ID" },
            { key: "nama_obat", label: "Nama Obat" },
            { key: "stok", label: "Stok" },
            { key: "harga", label: "Harga" },
          ]}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
