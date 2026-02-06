import { useState } from "react";

export default function CrudTable({ data, columns, onDelete, onEdit }) {
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (item) => {
    setEditingItem(item);
    setEditForm(item);
  };

  const handleEditChange = (e, key) => {
    setEditForm({ ...editForm, [key]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editingItem.id || editingItem[columns[0].key], editForm);
    setEditingItem(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📭</span>
                    <p>Belum ada data</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row[columns[0].key]} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {row[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      onClick={() => startEdit(row)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      onClick={() => onDelete(row[columns[0].key])}
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Edit */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-fade-in"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>✏️</span>
                Edit Data
              </h3>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              {columns.map((col) => (
                <div key={col.key} className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {col.label}
                  </label>
                  <input
                    type="text"
                    value={editForm[col.key]}
                    onChange={(e) => handleEditChange(e, col.key)}
                    className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="bg-gray-500 text-white px-6 py-2.5 rounded-lg hover:bg-gray-600 transition-colors shadow-md"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
              >
                💾 Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
