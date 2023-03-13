const jwt= require("jsonwebtoken");
const {UserModel}=require("../models/user.model");
require("dotenv").config();

const {LogoutModel}= require("../models/logout.model");

const authenticate= async(req,res,next)=>{
    const token= req.headers.authorization.split(" ")[1];
    const blacklistToken= await LogoutModel.find({token});

    try{
        if(!blacklistToken.includes({token})){
            jwt.verify(token,process.env.key,(err,decoded)=>{
                if(decoded){
                    const {user_role}= decoded;
                    req.body.user_role=user_role;
                    next();
                }
                else{
                    res.status(401).json({msg:err.message});
                }
            })
        }
        else{
            res.status(401).json("login first");
        }
    }
    catch(err){
        console.log(err);
        res.status(404).json({err:err.message});
    }
};

module.exports={
    authenticate
}