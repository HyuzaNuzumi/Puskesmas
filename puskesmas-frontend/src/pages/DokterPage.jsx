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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🧑‍⚕️ Data Dokter</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Nama" value={form.nama} onChange={(e)=>setForm({...form,nama:e.target.value})} className="border p-2 rounded" required />
        <input type="text" placeholder="Spesialis" value={form.spesialis} onChange={(e)=>setForm({...form,spesialis:e.target.value})} className="border p-2 rounded" required />
        <input type="text" placeholder="No STR" value={form.no_str} onChange={(e)=>setForm({...form,no_str:e.target.value})} className="border p-2 rounded" required />
        <input type="text" placeholder="No HP" value={form.no_hp} onChange={(e)=>setForm({...form,no_hp:e.target.value})} className="border p-2 rounded" required />
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Tambah Dokter</button>
      </form>
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
  );
}
