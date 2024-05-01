const express = require('express');
const {authenticate} = require('../middleware/auth.js');

const router = express.Router();

router.get('/profile',authenticate,(req,res)=>{
    req.json({message: `Welcome ${req.user.username}` });
});

module.exports=router;