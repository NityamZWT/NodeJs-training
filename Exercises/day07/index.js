const express = require('express');
require('dotenv').config();
const {sequelize} = require("./models/index");

const middleware = require('./middlewares/loggingMiddleware');
const userRoutes = require('./routes/userRoutes');
const User_Image = require('./models/Images');

//express instance as app
const app = express();
// const db = require('./config/config')
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;


// app configure
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(middleware);

app.use('/api',userRoutes);
app.all('*', (req, res)=>{
    return res.status(400).json({message:"route doesn't exists!!"});
})

//Database initialization
async function startServer() {
    try {
      // console.log('DB INTIAIL--',sequelize);
      
      await sequelize.authenticate();
      await sequelize.sync({alter:true});

  
      console.log('Database synced successfully.');
      
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }

  startServer()

//app listening at localhost and 3000
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
