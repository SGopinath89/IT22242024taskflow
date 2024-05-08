const validator = require('../utils/validator.js');

const registerVlidation = async(req,res, next)=>{
    const validateRule ={
        "username": "required|string|min:3",
        "password": "required|min:6",
    }

    await validator(req.body,validateRule,{},(err,status)=>{
        if(!status){
            res.status(412).send({
                success: false,
                message: 'Validatation failed',
                data: err
            })
        }else{
            next();
        }
}).catch(err => console.log(err))

}

const loginValidation = async (req, res, next) => {
    const validateRule = {
        "username": "required|string|min:3", 
        "password":"required|min:6",
    }

    await validator(req.body, validateRule, {}, (err, status) =>{
        if (!status){
            res.status(412).send({
                success: false,
                    message: 'Validation failed',
                    data: err
            })
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

module.exports = {
    registerValidation, 
    loginValidation
}
