const express= require("express");
require('dotenv').config()
const userRouter=require("./routes/user")
const urlRouter=require("./routes/url")
const redirectRouter=require("./routes/redirect")
const adminRouter=require("./routes/admin")
const cors=require("cors");
const mongoose=require("mongoose");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);

app.use((req,res,next)=>{

    console.log(req.path,req.method);
    next();
})

app.use(cors({
    origin:"http://localhost:3000"
}));


app.use("/api/redirect",redirectRouter)
app.use("/api/url",urlRouter)

app.use("/api/user",userRouter)

app.use("/api/admin",adminRouter)


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("veritabanı bağlandı");
        app.listen(process.env.PORT,()=>{
            console.log(`server ${process.env.PORT} portunda başladı`);
        })
    })
    .catch(err=>{
        console.log(err);
    })


