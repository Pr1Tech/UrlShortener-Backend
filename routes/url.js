const express=require("express");
const { urlKısaltma, urlYonlendirme, urlListeleme } = require("../controllers/urlController");
const urlModels=require("../models/urlModels")
const router=express();
const authKontrol=require("../middlewares/authKontrol")


router.use(authKontrol);

//shortened url 
router.post("/",urlKısaltma)

// //redirect to original url
// router.get("/:shortURL",urlYonlendirme)

//list urls
router.get("/list/:id",urlListeleme)
    


module.exports=router;