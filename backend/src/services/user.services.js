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
        
        return callback(false,{...user.toJSON()});
    } catch (error) {
        return callback({message:"An error occurred While User login"});
    }
}


const getUserById = async (userId) => {
    try {
        const user = await userModel.findById(userId).select('-password -__v'); 
        return user;
    } catch (error) {
        throw new Error('Error fetching user details');
    }
};

const getUser = async (id, callback) => {
    try {
      let user = await userModel.findById(id);
      if (!user) return callback({ errMessage: "User not found!" });
      return callback(false, { ...user.toJSON() });
    } catch (err) {
      return callback({
        errMessage: "Something went wrong",
        details: err.message,
      });
    }
  };

const getUserWithEmail= async(email, callback)=>{
    try {
        let user= await userModel.findOne({email});
        if(!user){
            return callback({message: "Email not found "});
        }
        return callback(false,{...user.toJSON()});
    } catch (error) {
        return callback({message:error.message});
    }
}



module.exports={
    register,
    login,
    getUser,
    getUserWithEmail,
    getUserById
}