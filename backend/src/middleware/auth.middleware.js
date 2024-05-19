// const User = require('../models/user.js');

// module.exports = async(req,res,next)=>{
//     const token = req.headers.authorization?.split('')[1];
//     console.log(token)

//     if(!token){
//         return res.status(401).json({message: 'Authentication required'});
//     }


//     try{
//         const decodedToken = jwt.verify(token, process.env,SECRET_KEY);
//         const user = await User.findbyId(decodedToken.userId);
//         console.log(token)
//         if(!user){
//             return res.status(404).json({message:'User not found'});
//         }

//         req.user =user;
//         next();
//     }catch(error){
//         res.status(401).json({message: 'Invalid token'});
//     }
// };


// module.exports ={
//     authenticate
// }

// module.exports = (req, res, next)=>{

//     try{

//         const token = req.headers.authorization.replace("Bearer ", "");
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         console.log(token)

//         req.userData = decoded;
//         next();

//     }catch(err){
//         return res.status(401).json({message: "Authentication Failed"});
//     }
// };

const userModel= require("../models/user.js")
const jwt = require('jsonwebtoken');
const unless = require('express-unless');


const generateToken= (id,email)=>{
    const token= jwt.sign( {id,email}, process.env.JWT_SECRET,{
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    return token.toString();
}

const verifyToken=async(req,res,next)=>{
    try {
        if(!req.headers["authorization"])
            return res.status(401).json({message: "No token provided"});

        const header= req.headers["authorization"];
        const token = header.split(" ")[1];

        await jwt.verify(token,process.env.JWT_SECRET,async(error,verifiedToken)=>{
            if(error){
                return res.status(401).send({message:"Authorization token invalid", details:error.message});
            }
            const user= await userModel.findById(verifiedToken.id);
            req.user=user;
            next();
        })

    } catch (error) {
        return res.status(500).send({message:"Authentication Failed",details:error.message})
    }
}

verifyToken.unless = unless;

module.exports={
    generateToken,
    verifyToken
}