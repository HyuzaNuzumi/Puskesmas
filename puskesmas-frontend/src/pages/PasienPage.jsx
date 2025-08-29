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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">👨‍⚕️ Data Pasien</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-6">
        <input type="text" placeholder="NIK" value={form.nik} onChange={(e) => setForm({ ...form, nik: e.target.value })} className="border p-2 rounded" required />
        <input type="text" placeholder="Nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="border p-2 rounded" required />
        <input type="date" value={form.tanggal_lahir} onChange={(e) => setForm({ ...form, tanggal_lahir: e.target.value })} className="border p-2 rounded" required />
        <select value={form.jenis_kelamin} onChange={(e) => setForm({ ...form, jenis_kelamin: e.target.value })} className="border p-2 rounded" required>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
        <input type="text" placeholder="Alamat" value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} className="border p-2 rounded" required />
        <input type="text" placeholder="No HP" value={form.no_hp} onChange={(e) => setForm({ ...form, no_hp: e.target.value })} className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-3">Tambah Pasien</button>
      </form>
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
  );
}
