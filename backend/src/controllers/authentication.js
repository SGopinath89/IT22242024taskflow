const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');


const register = async (req,res,next)=>{
    const {username, password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({username, password: hashedPassword})
    }
}