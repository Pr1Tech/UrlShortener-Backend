const express=require("express");
const userModels=require("../models/userModels")
const  {userRegister}=require("../controllers/userController")
const  {userLogin}=require("../controllers/userController")
const router=express();



//register
router.post("/register",userRegister);

//login
router.post("/login",userLogin);




module.exports=router;