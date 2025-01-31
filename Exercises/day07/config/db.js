const mysql = require('mysql2');
require('dotenv').config()
const {Sequelize} = require('sequelize');


const seq = new Sequelize('day04db', 'root', 'nityam@zealousweb', {
  host: 'localhost',
  dialect: 'mysql'
} );
async function DBmain(){
  try {
    await seq.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}



module.exports = {seq, DBmain}