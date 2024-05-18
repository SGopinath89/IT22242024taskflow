const userModel= require("../models/user.js")
const {createRandomHexColor}= require("./helperMethod.js")

const register = async(user, callback)=>{
    const newUser= userModel({...user, color:createRandomHexColor()});
    await newUser.save().then((result)=>{
        return callback(false,{message: "User created Successfully!"});
    }).catch((error)=>{
        return callback(true,{message: "User creation failed!", details:error.message});
    });
};

const login= async(email,callback)=>{
    try {
        let user= await userModel.findOne({email});
        if(!user){
            return callback({message: "Invalid Email/Password", details:error.message});
        }
        return callback(false,{...user.toJson()});
    } catch (error) {
        return callback({message:error.message});
    }
}

const getUser= async(id, callback)=>{
    try {
        let user= await userModel.findById({id});
        if(!user){
            return callback({message: "User not found", details:error.message});
        }
        return callback(false,{...user.toJson()});
    } catch (error) {
        return callback({message:error.message});
    }
}

const getUserWithEmail= async(email, callback)=>{
    try {
        let user= await userModel.findByOne({email});
        if(!user){
            return callback({message: "Email not found ", details:error.message});
        }
        return callback(false,{...user.toJson()});
    } catch (error) {
        return callback({message:error.message});
    }
}



module.exports={
    register,
    login,
    getUser,
    getUserWithEmail
}