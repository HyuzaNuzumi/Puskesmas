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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">💊 Data Obat</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-6">
        <input type="text" placeholder="Nama Obat" value={form.nama_obat} onChange={(e)=>setForm({...form,nama_obat:e.target.value})} className="border p-2 rounded" required />
        <input type="number" placeholder="Stok" value={form.stok} onChange={(e)=>setForm({...form,stok:e.target.value})} className="border p-2 rounded" required />
        <input type="number" placeholder="Harga" value={form.harga} onChange={(e)=>setForm({...form,harga:e.target.value})} className="border p-2 rounded" required />
        <button type="submit" className="col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Tambah Obat</button>
      </form>
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
  );
}
