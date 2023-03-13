const mongoose= require("mongoose");

const bcrypt= require("bcrypt");

const UserSchema= mongoose.Schema({
    email:{
       type:String,
       required:true
    }
    ,
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["seller","user"],
        default:"user"
    }
})


const UserModel= mongoose.model("user",UserSchema);

module.exports={
    UserModel
}