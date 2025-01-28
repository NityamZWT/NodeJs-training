const mysql = require('mysql2');


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nityam@zealousweb",
  database: "day04db"
}).promise();


const initializeDatabase = async () => {
  try {
    await con.connect(); 
    console.log("Connected!");

    const users = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INT,
        role VARCHAR(100),
        isActive BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
        updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
      );`;

     const user_images = `
      CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT,
        userId INT NOT NULL,
        imageName VARCHAR(255) NOT NULL,
        path VARCHAR(255) NOT NULL,
        mimeType VARCHAR(255),
        extension VARCHAR(255),
        size INT,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
        PRIMARY KEY(id),
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
      )
     `; 

    // Execute the query to create the table
    await con.query(users);
    await con.query(user_images);
    console.log("Table created!");
  } catch (err) {
    console.error("Error initializing the database:", err.message);
  }
};

initializeDatabase();

module.exports = con;

