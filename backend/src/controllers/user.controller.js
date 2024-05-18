const bcrypt = require("bcryptjs");
const userService = require("../services/user.services.js");
const auth = require("../middleware/auth.middleware.js");

const register= async( req,res)=>{
    const {name, surname, email,password}= req.body;
    if(!(name && surname && email && password)){
        return res.status(400).send({message: "Fields are missing"});
    }

    const salt= bcrypt.genSaltSync(10);
    const hashedPassword= bcrypt.hashSync(password,salt);
    req.body.password= hashedPassword;

    await userService.register(req.body,(error,result)=>{
        if(error)
            return res.status(400).send({message:error.message});
    return res.status(201).send(result);
});
};

//do not edit 
