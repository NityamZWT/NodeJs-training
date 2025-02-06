require('dotenv').config()

//database connection configuration
module.exports={
  "development": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.ECOMMERCE_DB,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  }
}
