const express = require("express");
const router = express.Router();
const db = require("../db");

// Get semua pasien
router.get("/", (req, res) => {
  db.query("SELECT * FROM pasien", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get pasien by id
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM pasien WHERE pasien_id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

// Tambah pasien
router.post("/", (req, res) => {
  const { nik, nama, tanggal_lahir, jenis_kelamin, alamat, no_hp } = req.body;
  db.query("INSERT INTO pasien (nik, nama, tanggal_lahir, jenis_kelamin, alamat, no_hp) VALUES (?, ?, ?, ?, ?, ?)",
    [nik, nama, tanggal_lahir, jenis_kelamin, alamat, no_hp],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Pasien ditambahkan", id: result.insertId });
    }
  );
});

// Update pasien
router.put("/:id", (req, res) => {
  const { nama, tanggal_lahir, jenis_kelamin, alamat, no_hp } = req.body;
  db.query("UPDATE pasien SET nama=?, tanggal_lahir=?, jenis_kelamin=?, alamat=?, no_hp=? WHERE pasien_id=?",
    [nama, tanggal_lahir, jenis_kelamin, alamat, no_hp, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Pasien diperbarui" });
    }
  );
});

// Hapus pasien
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM pasien WHERE pasien_id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Pasien dihapus" });
  });
});

module.exports = router;
