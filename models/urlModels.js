const mongoose=require("mongoose");
const validator=require("validator")

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
    end_time:{
        type:Date,
        expires: '0s',
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

})


urlSchema.statics.urlKısaltma=async function(original_url,end_time,date,specialURL){
    if (!original_url || !end_time) {
        throw new Error("Lütfen tüm alanları doldurunuz")
    }
    if (!validator.isDate(end_time)) {
        throw new Error("Lütfen geçerli bir tarih giriniz")
    }
    if (!validator.isURL(original_url)) {
        throw new Error("Lütfen geçerli bir URL giriniz")
    }
    if (!validator.isLength(specialURL,{max:10})) {
        throw new Error("Özel URL 10 karakterden fazla olamaz")
    }
}

module.exports=mongoose.model("url",urlSchema)