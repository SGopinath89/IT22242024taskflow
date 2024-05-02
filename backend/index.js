const express= require('express');
const config = require('../backend/src/config/config.js');
const database= require('../backend/src/db/dbconfig.js');
const authRoutes = require ('../backend/src/routes/auth.js');
const userRoutes = require('../backend/src/routes/user.js');
const app=express();
const port = process.env.PORT;

app.use(express.json());
 
app.use(express.urlencoded({extended: false}));



database.connectDB();

app.use('/api/auth',authRoutes);


app.listen(config.port,()=>{
    console.log(`Server is up on port ${config.port}`);
});

