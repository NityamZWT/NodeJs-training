const express = require('express');
require('dotenv').config();

const app = express();
const db = require('./config/config')
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const middleware = require('./middlewares/loggingMiddleware');
const userRoutes = require('./routes/userRoutes');
// const uploadRoutes = require('./routes/uploadImage')

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(middleware);

app.use('/api',userRoutes);

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
