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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🏥 Data Poli</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Nama Poli" value={form.nama_poli} onChange={(e) => setForm({ ...form, nama_poli: e.target.value })} className="border p-2 rounded" required />
        <input type="text" placeholder="Deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-2">Tambah Poli</button>
      </form>
      <CrudTable data={data} columns={[
        { key: "poli_id", label: "ID" },
        { key: "nama_poli", label: "Nama Poli" },
        { key: "deskripsi", label: "Deskripsi" },
      ]} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}
