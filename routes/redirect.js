const express=require("express");
const { urlYonlendirme } = require("../controllers/urlController");

const router=express();


//redirect to original url
router.get("/:shortURL",urlYonlendirme)


module.exports=router;