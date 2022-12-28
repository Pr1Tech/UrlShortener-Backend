const urlModel = require('../models/urlModels');

const urlKısaltma = async (req, res) => {
    const { original_url, created_by, specialURL, end_time } = req.body;
    const shortened_url = shortener(specialURL);
    try {
        const url = await urlModel.create({ original_url, shortened_url, specialURL, created_by, end_time });
        res.status(200).json({original_url, shortened_url, specialURL, created_by, end_time });
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
}

const urlYonlendirme=async(req,res)=>{
    try {
        const url =await urlModel.findOne({shortened_url:req.params.shortURL});
        if(url){
            url.clicks++;
            url.save();
            return res.status(200).json(url.original_url);
        }
        else{
            return res.status(404).json({hata:"url bulunamadı"})
        }
    } catch (error) {
        res.status(400).json({hata:error.message})
    }
}

const urlListeleme=async(req,res)=>{

    try {
        const url =await urlModel.find({created_by:req.params.id});
        if(url.length>0){
            return res.status(200).json(url)
        }
        else{
            return res.status(404).json({hata:"kullanıcı ya ait bulunamadı"})
        }
    }
    catch (error) {
        res.status(400).json({hata:error.message})
    }
}

//shortener function
const shortener=(specialURL)=>{
    const characters="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result="";
    for(let i=0;i<6;i++){
        result+=characters.charAt(Math.floor(Math.random()*characters.length));
    }
    if(specialURL){
        
        return result=specialURL+"_"+result;
    }
    else{
        return result
    }
}

module.exports = {  
    urlKısaltma,
    urlYonlendirme,
    urlListeleme
}