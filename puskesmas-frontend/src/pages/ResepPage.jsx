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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">💊 Data Resep</h2>

      {/* Form Tambah Resep */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="number"
          placeholder="Kunjungan ID"
          value={form.kunjungan_id}
          onChange={(e) => setForm({ ...form, kunjungan_id: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Obat ID"
          value={form.obat_id}
          onChange={(e) => setForm({ ...form, obat_id: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Dosis"
          value={form.dosis}
          onChange={(e) => setForm({ ...form, dosis: e.target.value })}
          className="border p-2 rounded col-span-2"
          required
        />
        <input
          type="number"
          placeholder="Jumlah"
          value={form.jumlah}
          onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-2"
        >
          Tambah Resep
        </button>
      </form>

      {/* Tabel dengan Edit & Delete */}
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
  );
}
