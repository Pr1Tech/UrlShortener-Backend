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
    end_time:{
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

})

module.exports=mongoose.model("url",urlSchema)