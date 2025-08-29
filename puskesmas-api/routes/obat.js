const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM obat", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM obat WHERE obat_id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

router.post("/", (req, res) => {
  const { nama_obat, stok, satuan, harga } = req.body;
  db.query("INSERT INTO obat (nama_obat, stok, satuan, harga) VALUES (?,?,?,?)",
    [nama_obat, stok, satuan, harga],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Obat ditambahkan", id: result.insertId });
    });
});

router.put("/:id", (req, res) => {
  const { nama_obat, stok, satuan, harga } = req.body;
  db.query("UPDATE obat SET nama_obat=?, stok=?, satuan=?, harga=? WHERE obat_id=?",
    [nama_obat, stok, satuan, harga, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Obat diperbarui" });
    });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM obat WHERE obat_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Obat dihapus" });
  });
});

module.exports = router;
