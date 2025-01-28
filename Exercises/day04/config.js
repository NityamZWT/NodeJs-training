const mysql = require('mysql2');

// Create a MySQL connection with promises
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nityam@zealousweb",
  database: "day04db"
}).promise();

// Define an async function to connect and create the table
const initializeDatabase = async () => {
  try {
    await con.connect(); // Connect to the database
    console.log("Connected!");

    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INT,
        role VARCHAR(100),
        isActive BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
        updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
      );
    `;

    // Execute the query to create the table
    await con.query(sql);
    console.log("Table created!");
  } catch (err) {
    console.error("Error initializing the database:", err.message);
  }
};

initializeDatabase();

module.exports = con;

