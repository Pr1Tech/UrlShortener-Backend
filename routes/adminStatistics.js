const express=require("express");
const { userList,adminList,adminDelete,userDelete,urlDelete,urlList} = require("../controllers/adminController");
const adminModels=require("../models/adminModels")
const router=express();
const authKontrol=require("../middlewares/authAdminKontrol")


router.use(authKontrol);

router.get("/list/users",userList)

router.get("/list/admins",adminList)

router.get("/list/urls",urlList)

router.delete("/delete/admin/:userMail",adminDelete)

router.delete("/delete/user/:userMail",userDelete)

router.delete("/delete/url/:urlId",urlDelete)





module.exports=router;