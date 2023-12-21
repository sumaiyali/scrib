const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://stbacmtd:stbacmtd123@mernauth.ifu6be5.mongodb.net/mernauth")//react-login-tut
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username: { 
        type: String,
        required: true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection
