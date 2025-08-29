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
    <div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-2 border">
                {col.label}
              </th>
            ))}
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[columns[0].key]} className="border-b">
              {columns.map((col) => (
                <td key={col.key} className="p-2 border">
                  {row[col.key]}
                </td>
              ))}
              <td className="p-2 border space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() => startEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => onDelete(row[columns[0].key])}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-96"
          >
            <h3 className="text-xl font-bold mb-4">Edit Data</h3>
            {columns.map((col) => (
              <div key={col.key} className="mb-3">
                <label className="block text-sm font-semibold mb-1">
                  {col.label}
                </label>
                <input
                  type="text"
                  value={editForm[col.key]}
                  onChange={(e) => handleEditChange(e, col.key)}
                  className="border p-2 w-full rounded"
                />
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
