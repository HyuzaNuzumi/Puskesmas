import { useState, useEffect } from "react";
import axios from "axios";
import CrudTable from "../components/CrudTable";

export default function KunjunganPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    pasien_id: "",
    dokter_id: "",
    poli_id: "",
    tanggal: "",
    keluhan: "",
    diagnosa: "",
  });

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/kunjungan");
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/kunjungan", form);
    setForm({ pasien_id: "", dokter_id: "", poli_id: "", tanggal: "", keluhan: "", diagnosa: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/kunjungan/${id}`);
    fetchData();
  };

  const handleEdit = async (id, updated) => {
    await axios.put(`http://localhost:5000/api/kunjungan/${id}`, updated);
    fetchData();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">📋 Data Kunjungan</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-6">
        <input type="number" placeholder="ID Pasien" value={form.pasien_id} onChange={(e)=>setForm({...form,pasien_id:e.target.value})} className="border p-2 rounded" required />
        <input type="number" placeholder="ID Dokter" value={form.dokter_id} onChange={(e)=>setForm({...form,dokter_id:e.target.value})} className="border p-2 rounded" required />
        <input type="number" placeholder="ID Poli" value={form.poli_id} onChange={(e)=>setForm({...form,poli_id:e.target.value})} className="border p-2 rounded" required />
        <input type="date" value={form.tanggal} onChange={(e)=>setForm({...form,tanggal:e.target.value})} className="border p-2 rounded" required />
        <input type="text" placeholder="Keluhan" value={form.keluhan} onChange={(e)=>setForm({...form,keluhan:e.target.value})} className="border p-2 rounded" required />
        <input type="text" placeholder="Diagnosa" value={form.diagnosa} onChange={(e)=>setForm({...form,diagnosa:e.target.value})} className="border p-2 rounded" />
        <button type="submit" className="col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Tambah Kunjungan</button>
      </form>
      <CrudTable
        data={data}
        columns={[
          { key: "kunjungan_id", label: "ID" },
          { key: "pasien_id", label: "Pasien ID" },
          { key: "dokter_id", label: "Dokter ID" },
          { key: "poli_id", label: "Poli ID" },
          { key: "tanggal", label: "Tanggal" },
          { key: "keluhan", label: "Keluhan" },
          { key: "diagnosa", label: "Diagnosa" },
        ]}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
