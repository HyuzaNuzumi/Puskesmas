const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM poli", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM poli WHERE poli_id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

router.post("/", (req, res) => {
  const { nama_poli, deskripsi } = req.body;
  db.query("INSERT INTO poli (nama_poli, deskripsi) VALUES (?,?)",
    [nama_poli, deskripsi],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Poli ditambahkan", id: result.insertId });
    });
});

router.put("/:id", (req, res) => {
  const { nama_poli, deskripsi } = req.body;
  db.query("UPDATE poli SET nama_poli=?, deskripsi=? WHERE poli_id=?",
    [nama_poli, deskripsi, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Poli diperbarui" });
    });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM poli WHERE poli_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Poli dihapus" });
  });
});

module.exports = router;
