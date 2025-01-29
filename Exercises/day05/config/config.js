const mysql = require('mysql2');
require('dotenv').config()

const con = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}).promise();


const initializeDatabase = async () => {
  try {
    // const check = await connection.query(
    //   ''
    // )
    // await con.connect(); 
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
      CREATE TABLE IF NOT EXISTS user_images(
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

     const user_profiles = `CREATE TABLE IF NOT EXISTS user_profiles(
        id INT AUTO_INCREMENT,
        userId INT NOT NULL,
        bio VARCHAR(255),
        linkedInUrl VARCHAR(255), 
        facebookUrl VARCHAR(255),
        instaUrl VARCHAR(255),
        createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
        updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        PRIMARY KEY(id),
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
     )`;

    // Execute the query to create the table
    await con.query(users);
    console.log('userDB created!');

    await con.query(user_images);
    console.log('user_images created!');
    

    await con.query(user_profiles);
    console.log("user_profiles created!");
    
  } catch (err) {
    console.error("Error initializing the database:", err.message);
  }
};

initializeDatabase();

module.exports = con;

