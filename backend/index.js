const express= require('express');
const config = require('../backend/src/config/config.js');
const database= require('../backend/src/db/dbconfig.js');
const authRoutes = require ('../backend/src/routes/auth.js');
const userRoutes = require('../backend/src/routes/user.js');
const app=express();

app.use(express.json());

database.connectDB();

app.listen(config.port,()=>{
    console.log(`Server is up on port ${config.port}`);
});

