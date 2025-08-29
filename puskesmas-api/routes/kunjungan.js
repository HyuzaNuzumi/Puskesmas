const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all kunjungan (join biar informatif)
router.get("/", (req, res) => {
  const sql = `
    SELECT k.kunjungan_id, p.nama AS pasien, d.nama AS dokter, o.nama_poli, k.tanggal_kunjungan, k.keluhan, k.diagnosa
    FROM kunjungan k
    JOIN pasien p ON k.pasien_id = p.pasien_id
    JOIN dokter d ON k.dokter_id = d.dokter_id
    JOIN poli o ON k.poli_id = o.poli_id
    ORDER BY k.tanggal_kunjungan DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { pasien_id, dokter_id, poli_id, tanggal_kunjungan, keluhan, diagnosa } = req.body;
  db.query(
    "INSERT INTO kunjungan (pasien_id, dokter_id, poli_id, tanggal_kunjungan, keluhan, diagnosa) VALUES (?,?,?,?,?,?)",
    [pasien_id, dokter_id, poli_id, tanggal_kunjungan, keluhan, diagnosa],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Kunjungan ditambahkan", id: result.insertId });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM kunjungan WHERE kunjungan_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Kunjungan dihapus" });
  });
});

module.exports = router;
