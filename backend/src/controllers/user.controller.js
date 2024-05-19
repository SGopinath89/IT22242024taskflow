const bcrypt = require("bcrypt");
const userService = require("../services/user.services.js");
const auth = require("../middleware/auth.middleware.js");
const user = require("../models/user.js");

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

const login =async(req,res)=>{
    const {email, password}= req.body;
    if(!(email && password)){
        return res.status(400).send({message: "Please fill all the Required fields"});
    }

    await userService.login(email,(error,result)=>{
        if(error)
            return res.status(400).send({message:error.message})

        const hashedPassword= result.password;
        if(!bcrypt.compareSync(password,hashedPassword))
            return res.status(400).send({message: "Email/Password is incorrect "});

        result.token= auth.generateToken(result._id.toString(),result.email);
        result.password=undefined;
        result.__v= undefined;

        return res.status(200).send({message:"User login successful", user:result});
    });
};

// const getUser= async(req,res)=>{
//     const{id}= req.params;
//         await userService.getUser(id,(error,result)=>{
//         if(error)
//             return res.status(404).send({message:error.message})

//         result.password=undefined;
//         result.__v= undefined;

//         return res.status(200).send(result);
//     });
// };

const getUser = async (req, res) => {
    try {
        // const userId = req.user.id;
        const{id}= req.params;
        const user = await userService.getUser(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const sanitizedUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            color: user.color
        };

        return res.status(200).json(sanitizedUser);
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: "An error occurred while fetching user details." });
    }
};


const getUserwithMail= async(req,res)=>{
    const {email}= req.body;
    await userService.getUserWithEmail(email,(error,result)=>{
        if(error)
            return res.status(404).send({message:error.message});

        const displayData={
            name:result.name,
            surname:result.surname,
            color:result.color,
            email : result.email
        };
        return res.status(200).send(displayData);
    })
}

module.exports={
    register,
    login,
    getUserwithMail,
    getUser
}