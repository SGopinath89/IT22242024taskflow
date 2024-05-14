const jwt = require('jsonwebtoken');
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

module.exports = (req, res, next)=>{

    try{

        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(token)

        req.userData = decoded;
        next();

    }catch(err){
        return res.status(401).json({message: "Authentication Failed"});
    }
};