const express = require("express");
const router = express.Router();
const db = require("../db");

// Get semua resep dengan join
router.get("/", (req, res) => {
  const sql = `
    SELECT r.resep_id, p.nama AS pasien, o.nama_obat, r.jumlah, k.tanggal_kunjungan
    FROM resep r
    JOIN kunjungan k ON r.kunjungan_id = k.kunjungan_id
    JOIN pasien p ON k.pasien_id = p.pasien_id
    JOIN obat o ON r.obat_id = o.obat_id
    ORDER BY r.resep_id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { kunjungan_id, obat_id, jumlah } = req.body;
  db.query("INSERT INTO resep (kunjungan_id, obat_id, jumlah) VALUES (?,?,?)",
    [kunjungan_id, obat_id, jumlah],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Resep ditambahkan", id: result.insertId });
    });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM resep WHERE resep_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Resep dihapus" });
  });
});

module.exports = router;
