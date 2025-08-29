const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/pasien", require("./routes/pasien"));
app.use("/api/dokter", require("./routes/dokter"));
app.use("/api/poli", require("./routes/poli"));
app.use("/api/kunjungan", require("./routes/kunjungan"));
app.use("/api/obat", require("./routes/obat"));
app.use("/api/resep", require("./routes/resep"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
