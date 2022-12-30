const express=require("express");
const { urlKısaltma, urlYonlendirme, urlListeleme } = require("../controllers/urlController");
const urlModels=require("../models/urlModels")
const router=express();
const authKontrol=require("../middlewares/authKontrol")


router.use(authKontrol);

//shortened url 
router.post("/",urlKısaltma)


//list urls
router.get("/list/:id",urlListeleme)
    


module.exports=router;