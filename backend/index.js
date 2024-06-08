const express= require('express');
const app=express();
const cors = require('cors');
require('dotenv').config()
const database= require('../backend/src/db/dbconfig.js');
const routes= require('../backend/src/routes/index.js');
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

database.connectDB();

app.use('/api',routes)

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});


