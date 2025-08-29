-- Puskesmas Database Schema
CREATE DATABASE IF NOT EXISTS puskesmas;
USE puskesmas;

-- Tabel Pasien
CREATE TABLE IF NOT EXISTS pasien (
    pasien_id INT AUTO_INCREMENT PRIMARY KEY,
    nik VARCHAR(16) UNIQUE NOT NULL,
    nama VARCHAR(100) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jenis_kelamin ENUM('L', 'P') NOT NULL,
    alamat TEXT,
    no_hp VARCHAR(15)
);

-- Tabel Dokter
CREATE TABLE IF NOT EXISTS dokter (
    dokter_id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    spesialis VARCHAR(50),
    no_str VARCHAR(20) UNIQUE,
    no_hp VARCHAR(15)
);

-- Tabel Poli
CREATE TABLE IF NOT EXISTS poli (
    poli_id INT AUTO_INCREMENT PRIMARY KEY,
    nama_poli VARCHAR(50) NOT NULL,
    deskripsi TEXT
);

-- Tabel Obat
CREATE TABLE IF NOT EXISTS obat (
    obat_id INT AUTO_INCREMENT PRIMARY KEY,
    nama_obat VARCHAR(100) NOT NULL,
    stok INT DEFAULT 0,
    satuan VARCHAR(20),
    harga DECIMAL(10,2)
);

-- Tabel Kunjungan
CREATE TABLE IF NOT EXISTS kunjungan (
    kunjungan_id INT AUTO_INCREMENT PRIMARY KEY,
    pasien_id INT NOT NULL,
    dokter_id INT NOT NULL,
    poli_id INT NOT NULL,
    tanggal_kunjungan DATETIME DEFAULT CURRENT_TIMESTAMP,
    keluhan TEXT,
    diagnosa TEXT,
    FOREIGN KEY (pasien_id) REFERENCES pasien(pasien_id) ON DELETE CASCADE,
    FOREIGN KEY (dokter_id) REFERENCES dokter(dokter_id) ON DELETE CASCADE,
    FOREIGN KEY (poli_id) REFERENCES poli(poli_id) ON DELETE CASCADE
);

-- Tabel Resep
CREATE TABLE IF NOT EXISTS resep (
    resep_id INT AUTO_INCREMENT PRIMARY KEY,
    kunjungan_id INT NOT NULL,
    obat_id INT NOT NULL,
    jumlah INT NOT NULL,
    FOREIGN KEY (kunjungan_id) REFERENCES kunjungan(kunjungan_id) ON DELETE CASCADE,
    FOREIGN KEY (obat_id) REFERENCES obat(obat_id) ON DELETE CASCADE
);

-- Sample data untuk testing
INSERT IGNORE INTO poli (nama_poli, deskripsi) VALUES 
('Poli Umum', 'Pelayanan kesehatan umum'),
('Poli Gigi', 'Pelayanan kesehatan gigi dan mulut'),
('Poli KIA', 'Pelayanan Kesehatan Ibu dan Anak');

INSERT IGNORE INTO dokter (nama, spesialis, no_str, no_hp) VALUES 
('Dr. Ahmad Fauzi', 'Dokter Umum', 'STR001', '081234567890'),
('Dr. Siti Aminah', 'Dokter Gigi', 'STR002', '081234567891'),
('Dr. Budi Santoso', 'Dokter Anak', 'STR003', '081234567892');

INSERT IGNORE INTO obat (nama_obat, stok, satuan, harga) VALUES 
('Paracetamol 500mg', 100, 'tablet', 500.00),
('Amoxicillin 500mg', 50, 'kapsul', 2000.00),
('OBH Combi', 25, 'botol', 15000.00),
('Antasida', 75, 'tablet', 1000.00);
