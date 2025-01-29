const express = require('express');
require('dotenv').config();

//express instance as app
const app = express();
// const db = require('./config/config')
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const middleware = require('./middlewares/loggingMiddleware');
const userRoutes = require('./routes/userRoutes');

// app configure
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(middleware);

app.use('/api',userRoutes);
app.all('*', (req, res)=>{
    return res.status(400).json({message:"route doesn't exists!!"});
})

//app listening at localhost and 3000
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
