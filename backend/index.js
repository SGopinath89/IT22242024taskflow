const express= require('express');
// const config = require('../backend/src/config/config.js');
const database= require('../backend/src/db/dbconfig.js');
const authRoutes = require ('./src/routes/auth.router.js');
const boardRoutes= require('../backend/src/routes/board.router.js')
const app=express();
require('dotenv').config()

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

database.connectDB();

app.use('/api/auth',authRoutes);
app.use('/api/boards',boardRoutes)


app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});

