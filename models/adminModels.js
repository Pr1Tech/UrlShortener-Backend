const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const validator=require("validator")


const Schema=mongoose.Schema;

const adminSchema=Schema({
    userId:{
        type:String,
        required:true,
    },
    userPassword:{
        type:String,
        required:true
    },
    userMail:{
        type:String,
        require:true,
        unique:true
    }
})

adminSchema.statics.signup=async function(userId,userMail,userPassword){

    if (userPassword==="" || userMail==="" || userId==="") {
        throw new Error("Lütfen tüm alanları doldurunuz")
    }
    if(!validator.isEmail(userMail)){
        throw new Error("Lütfen geçerli bir mail adresi giriniz")
    }
    if(!validator.isStrongPassword(userPassword)){
        throw new Error("Lütfen şifrenizi güçlendiriniz")
    }
    if(!validator.isLength(userId,{min:4,max:16})){
        throw new Error("Kullanıcı adı 4-16 karakter arasında olmalıdır")
    }
    



    const user=await this.findOne({userMail})
    if(user){
        throw new Error("Bu mail adresi kullanımda")
    }
    const salt =  bcrypt.genSaltSync(10);
    const hash =  bcrypt.hashSync(userPassword, salt);
    
    const newUser=await this.create({userId,userMail,userPassword:hash})
    return newUser;
}

adminSchema.statics.login=async function(userMail,userPassword){

    if (!userMail || !userPassword ) {
        throw new Error("Lütfen tüm alanları doldurunuz")
    }
        
    const user = await this.findOne({userMail})
    if (!user) {
        throw new Error("Kullanıcı bulunamadı")
    }
    const isMatch = await bcrypt.compare(userPassword, user.userPassword)
    if (!isMatch) {
        throw new Error("Şifre yanlış")
    }
    return user;

}
    


module.exports=mongoose.model('Admin',adminSchema)