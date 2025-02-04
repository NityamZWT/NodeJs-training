const express = require('express');
const { sequelize } = require('./models');
require('dotenv').config();
const app = express();

const globalErrorHandler = require('./middlewares/globalErrorHandler')
const responseHandler = require('./utilities/responseHandler')

const authRoutes = require('./routers/authRoutes');
const userRoutes = require('./routers/userRoutes')
const categoryRoutes = require('./routers/categoryRoutes')


const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/categories', categoryRoutes)
app.all('*', (req, res)=>{
    return responseHandler(res, 404, false, "No such route is available");
})

async function dbConnection() {
    try {
      await sequelize.authenticate();
      console.log("connect to database");

      await sequelize.sync({alter:true});
      console.log('Database synced successfully.');
      
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }

dbConnection();

app.use(globalErrorHandler)

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
