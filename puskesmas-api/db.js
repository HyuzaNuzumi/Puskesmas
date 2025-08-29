const mysql = require("mysql2");

// Use connection pool for better connection management
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // ganti dengan password mysql kamu
  database: "puskesmas",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    return;
  }
  
  if (connection) {
    console.log("✅ Connected to MySQL database successfully!");
    connection.release();
  }
});

// Handle connection errors
pool.on('connection', function (connection) {
  console.log('Database connected as id ' + connection.threadId);
});

pool.on('error', function(err) {
  console.error('Database error:', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Attempting to reconnect...');
  } else {
    throw err;
  }
});

module.exports = pool;
