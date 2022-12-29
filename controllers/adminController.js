const Admin = require('../models/adminModels');
const userModel = require('../models/userModels');
const urlModel = require('../models/urlModels');


const jwt = require("jsonwebtoken");

const tokenOlustur=(_id)=>{
    const token=jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:"1h"})
    return token;
}


const userRegister = async (req, res) => {
    const {userId,userMail, userPassword } = req.body;
    try {
        const newUser = await Admin.signup(userId,userMail, userPassword);
        
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
        const user = await Admin.login(userMail, userPassword);
        const token=tokenOlustur(user._id);
        res.status(200).json({userMail,token});
    }
    catch (err) {
        res.status(400).json({message: err.message,});
    }
};

const userList=async(req,res)=>{

    try {
        const users =await userModel.find();
        if(users.length>0){
            return res.status(200).json(users)
        }
        else{
            return res.status(404).json({hata:"Kullanıcı bulunamadı"})
        }
    }
    catch (error) {
        res.status(400).json({hata:error.message})
    }
}

const adminList=async(req,res)=>{

    try {
        const users =await Admin.find();
        if(users.length>0){
            return res.status(200).json(users)
        }
        else{
            return res.status(404).json({hata:"Admin bulunamadı"})
        }
    }
    catch (error) {
        res.status(400).json({hata:error.message})
    }
}

const adminDelete=async(req,res)=>{
    const {userMail}=req.params;
    try {
        const admin=await Admin.findByIdAndDelete(userMail);
        res.status(200).json({message:"Admin silindi"})        
        
    }
    catch (error) {
        res.status(400).json({hata:error.message})
    }
}

const userDelete=async(req,res)=>{
    const {userMail}=req.params;
    try {
        const user=await userModel.findByIdAndDelete(userMail);
        res.status(200).json({message:"Kullanıcı silindi"})
    }
    catch (error) {
        res.status(400).json({hata:error.message})
    }
}

//delete url by user id

const urlDelete=async(req,res)=>{
    
    try {
        const url =await urlModel.find({created_by:req.params.id});
        res.status(200).json({message:"Kullanıcı silindi"})
    }
    catch (error) {
        res.status(400).json({hata:error.message})
    }
}

const urlList=async(req,res)=>{
    try {
        const url =await urlModel.find();
        if(url.length>0){
            return res.status(200).json(url)
        }
        else{
            return res.status(404).json({hata:"Url bulunamadı"})
        }
    }
    catch (error) {
        res.status(400).json({hata:error.message})
    }
}





module.exports = {
    userLogin,
    userRegister,
    userList,
    adminList,
    adminDelete,
    userDelete,
    urlDelete,
    urlList
};