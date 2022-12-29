const express=require("express");
const adminModels=require("../models/adminModels")
const  {userRegister}=require("../controllers/adminController")
const  {userLogin}=require("../controllers/adminController")
const router=express();



//register
router.post("/register",userRegister);

//login
router.post("/login",userLogin);




module.exports=router;