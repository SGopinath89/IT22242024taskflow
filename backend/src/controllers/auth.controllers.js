// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const userModel = require('../models/user.js');
// // const {v4 : uuidv4} = require('uuid')
// const asyncHandler = require("express-async-handler");


// const register = asyncHandler(async (req, res) => {

//     const { username,password} = req.body;
//     try {
//             // const userId = uuidv4()
//             bcrypt.hash(req.body.password, 10).then((hash) => {
//                     const user = new userModel({
//                         // userId: userId,
//                         username: username,
//                         password: hash,
//                     });
//                     user.save().then((response) => {
//                             return res.status(201).json({
//                                 message: 'user successfully created!',
//                                 result: response,
//                                 success: true
//                             })
//                         })
//                         .catch((error) => {
//                             res.status(500).json({ error: error,})
//                         })
//                 })
//     } catch (error) {
//         return res.status(412).send({
//             success: false,
//             message: error.message
//         })
//     }
// }) 


// const login = asyncHandler(async (req, res) => {
//     const { username, password } = req.body

//     let getUser
//     userModel.findOne({username: username}).then((user) => {
//         if (!user) {
//             return res.status(401).json({ message: "Authentication Failed"})
//         }
//         getUser = user
//         return bcrypt.compare(password, user.password)
//     }).then((response) => {
//             if (!response) {
//                 return res.status(401).json({message: "Authentication Failed"})
//             } else {
//                 let jwtToken = jwt.sign(
//                     {
//                         username: getUser.username,
//                         userId : user._id
//                         // userId: getUser.userId
//                     },
//                     process.env.SECRET_KEY,
//                     {
//                         expiresIn: "1h"
//                     }
//                 )
//                 return res.status(200).json({
//                     accessToken: jwtToken
//                     // userId: getUser.userId,
//                 })
//             }
//         })
//         .catch((error) => {
//             return res.status(401).json({
//                 message: error.message,
//                 success: false
//             })
//         })
// });


// const userProfile = asyncHandler(async (req, res, next) => {
//     // const { id } = req.params;

//     try {
//         user= userModel._id;
//         console.log(user)
//         const verifyUser = await userModel.findOne({ user })
//         if (!verifyUser) {
//             return res.status(403).json({
//                 message: "user not found",
//                 success: false,
//             })
//         } else {
//             return res.status(200).json({
//                 message: `user ${verifyUser.username}`,
//                 success: true
//             })
//         }
//     }
//     catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: error.message,
//         })
//     }
// });

// //update user profile (password)
// //delete user profile
// //logout user 

// module.exports = { register,login,userProfile};