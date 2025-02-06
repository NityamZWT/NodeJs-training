const express = require('express');
const { sequelize } = require('./models');
require('dotenv').config();
const app = express();

const globalErrorHandler = require('./middlewares/globalErrorHandler')
const responseHandler = require('./utilities/customHandler')

const authRoutes = require('./routers/authRoutes');
const userRoutes = require('./routers/userRoutes')
const categoryRoutes = require('./routers/categoryRoutes')
const productRoutes = require('./routers/productRoutes')
const cartRoutes = require('./routers/cartRoutes')
const whishlistRoutes = require('./routers/wishlistRoutes')
const orderRoutes = require('./routers/orderRoutes')


//setup hostname and port
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.use(express.urlencoded({extended:false}))
app.use(express.json());

//assign route to route handler
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/categories', categoryRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/wishlist',whishlistRoutes)
app.use('/api/orders',orderRoutes)

// default route if no route matches
app.all('*', (req, res)=>{
    return responseHandler(res, 404, false, "No such route is available");
})

// handle database connection
async function dbConnection() {
    try {
      await sequelize.authenticate();
      console.log("connect to database");

      await sequelize.sync({alter: true});
      console.log('Database synced successfully.');
      
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }

dbConnection();

//global error handler middlewarw
app.use(globalErrorHandler)

// app listenting
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
