import { useState, useEffect } from "react";
import axios from "axios";
import CrudTable from "../components/CrudTable";

export default function ResepPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ kunjungan_id: "", obat_id: "", dosis: "", jumlah: "" });

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resep");
      setData(res.data);
    } catch (err) {
      console.error("Gagal fetch data resep:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Tambah resep
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/resep", form);
      setForm({ kunjungan_id: "", obat_id: "", dosis: "", jumlah: "" });
      fetchData();
    } catch (err) {
      console.error("Gagal tambah resep:", err);
    }
  };

  // Hapus resep
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resep/${id}`);
      fetchData();
    } catch (err) {
      console.error("Gagal hapus resep:", err);
    }
  };

  // Update resep
  const handleEdit = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/resep/${id}`, updatedData);
      fetchData();
    } catch (err) {
      console.error("Gagal update resep:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-4xl">📝</span>
          Data Resep
        </h2>
        <p className="mt-2 text-indigo-100">Kelola resep obat untuk pasien</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>➕</span>
          Tambah Resep Baru
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Kunjungan</label>
            <input
              type="number"
              placeholder="Masukkan ID Kunjungan"
              value={form.kunjungan_id}
              onChange={(e) => setForm({ ...form, kunjungan_id: e.target.value })}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Obat</label>
            <input
              type="number"
              placeholder="Masukkan ID Obat"
              value={form.obat_id}
              onChange={(e) => setForm({ ...form, obat_id: e.target.value })}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Dosis</label>
            <input
              type="text"
              placeholder="Contoh: 3x1 sehari"
              value={form.dosis}
              onChange={(e) => setForm({ ...form, dosis: e.target.value })}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah</label>
            <input
              type="number"
              placeholder="Jumlah obat"
              value={form.jumlah}
              onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 col-span-full flex items-center justify-center gap-2"
          >
            <span>➕</span> Tambah Resep
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Daftar Resep</h3>
          <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg font-semibold">
            Total: {data.length} resep
          </div>
        </div>
        <CrudTable
          data={data}
          columns={[
            { key: "resep_id", label: "ID" },
            { key: "kunjungan_id", label: "Kunjungan ID" },
            { key: "obat_id", label: "Obat ID" },
            { key: "dosis", label: "Dosis" },
            { key: "jumlah", label: "Jumlah" },
          ]}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
