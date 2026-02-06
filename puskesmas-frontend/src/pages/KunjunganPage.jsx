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
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-4xl">📋</span>
          Data Kunjungan
        </h2>
        <p className="mt-2 text-orange-100">Kelola kunjungan pasien ke poliklinik</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>➕</span>
          Tambah Kunjungan Baru
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Pasien</label>
            <input type="number" placeholder="Masukkan ID Pasien" value={form.pasien_id} onChange={(e)=>setForm({...form,pasien_id:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Dokter</label>
            <input type="number" placeholder="Masukkan ID Dokter" value={form.dokter_id} onChange={(e)=>setForm({...form,dokter_id:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Poli</label>
            <input type="number" placeholder="Masukkan ID Poli" value={form.poli_id} onChange={(e)=>setForm({...form,poli_id:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Kunjungan</label>
            <input type="date" value={form.tanggal} onChange={(e)=>setForm({...form,tanggal:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Keluhan</label>
            <input type="text" placeholder="Keluhan pasien" value={form.keluhan} onChange={(e)=>setForm({...form,keluhan:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Diagnosa</label>
            <input type="text" placeholder="Diagnosa dokter" value={form.diagnosa} onChange={(e)=>setForm({...form,diagnosa:e.target.value})} className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" />
          </div>
          <button type="submit" className="col-span-full bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-orange-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <span>➕</span> Tambah Kunjungan
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Daftar Kunjungan</h3>
          <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-semibold">
            Total: {data.length} kunjungan
          </div>
        </div>
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
    </div>
  );
}
