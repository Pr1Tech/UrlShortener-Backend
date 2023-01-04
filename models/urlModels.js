const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const urlSchema=Schema({
    original_url:{
        type:String,
        required:true,
    },
    shortened_url:{
        type:String,
        required:true,
    },
    created_by:{
        type:String,
        require:true
    },
    specialURL:{
        type:String
    },
    expirationTime:{
        type:Date
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isActive:{
        type:Boolean,
        default:true
    }

},{
    expires: 'expirationTime'
})


urlSchema.statics.urlKısaltma=async function(original_url,expirationTime,date,specialURL){
    if (original_url==="" || expirationTime==="" ) {
        throw new Error("Lütfen tüm alanları doldurunuz")
    }
    if (expirationTime<=date) {
        throw new Error("Lütfen geçerli bir tarih giriniz")
    }
    if (validator.isURL(original_url)) {
        throw new Error("Lütfen geçerli bir URL giriniz")
    }
    if (validator.isLength(specialURL,{max:10})) {
        throw new Error("Özel URL 10 karakterden fazla olamaz")
    }
}

module.exports=mongoose.model("url",urlSchema)