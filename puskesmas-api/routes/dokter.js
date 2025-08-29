const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all
router.get("/", (req, res) => {
  db.query("SELECT * FROM dokter", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM dokter WHERE dokter_id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

// CREATE
router.post("/", (req, res) => {
  const { nama, spesialis, no_str, no_hp } = req.body;
  db.query("INSERT INTO dokter (nama, spesialis, no_str, no_hp) VALUES (?,?,?,?)",
    [nama, spesialis, no_str, no_hp],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Dokter ditambahkan", id: result.insertId });
    });
});

// UPDATE
router.put("/:id", (req, res) => {
  const { nama, spesialis, no_str, no_hp } = req.body;
  db.query("UPDATE dokter SET nama=?, spesialis=?, no_str=?, no_hp=? WHERE dokter_id=?",
    [nama, spesialis, no_str, no_hp, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Dokter diperbarui" });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM dokter WHERE dokter_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Dokter dihapus" });
  });
});

module.exports = router;
