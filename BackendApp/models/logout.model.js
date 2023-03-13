const mongoose= require("mongoose");

const LogoutSchema= mongoose.Schema({
    token:{
        type:String
    }
})

const LogoutModel= mongoose.model("logout",LogoutSchema);

module.exports={
    LogoutModel
}