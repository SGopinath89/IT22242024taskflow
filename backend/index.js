const express= require('express');
const config = require('../backend/src/config/config.js');

const app=express();

app.use(express.json());

app.listen(config.port,()=>{
    console.log(`Server is up on port ${config.port}`);
});