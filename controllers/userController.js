

const jwt = require("jsonwebtoken");
const User = require("../models/userModels");


const tokenOlustur=(_id)=>{
    const token=jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:"1h"})
    return token;
}


const userRegister = async (req, res) => {
    const {userId,userMail, userPassword } = req.body;
    try {
        const newUser = await User.signup(userId,userMail, userPassword);
        
        const token=tokenOlustur(newUser._id);
        
        res.status(201).json({userId,userMail,userPassword,token});
    }
    catch (err) {
        res.status(400).json({message: err.message,});
    }
};

const userLogin = async (req, res) => {
    const { userMail, userPassword } = req.body;
    try {
        const user = await User.login(userMail, userPassword);
        const token=tokenOlustur(user._id);
        res.status(200).json({userMail,token});
    }
    catch (err) {
        res.status(400).json({message: err.message,});
    }
};



module.exports = {
    userLogin,
    userRegister
};

