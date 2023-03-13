const express= require("express");

const {UserModel} =require("../models/user.model");
const {LogoutModel} =require("../models/logout.model");

const jwt= require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRouter= express.Router();



UserRouter.post("/register",async(req,res)=>{
    try{
        const {email,password,role}= req.body;
        bcrypt.hash(password,5,async(err, hashedPassword)=>{
            if(hashedPassword){
                const user= new UserModel({email,password:hashedPassword,role});
                await user.save();
                res.status(201).json({msg:"signup was successful"});
            }
            else{
                console.log(err);
                res.status(500).json({msg:err.message});
            }
        } )
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})




UserRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user= await UserModel.findOne({email});
        if(!user){
            res.status(404).json({msg:"user not found"});
        }
        else{
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token= jwt.sign({user_id:user._id,user_role:user.role}, process.env.key,{
                        expiresIn:"1m"
                    });

                    const refreshToken= jwt.sign({user_id:user._id,user_role:user.role}, process.env.refreshkey,{
                        expiresIn:"5m"
                    });

                    res.send({msg:"login successful",token,refreshToken});

                }
                else{
                    res.status(404).json({err:"user not found"});
                }
            })
        }
    }
    catch{
        console.log("something went wrong");
        res.status(404).json({err:err.message});
    }
})


UserRouter.post("/logout",async(req,res)=>{
    try{
        const token= req.headers.authorization.split(" ")[1];
        const logout= new LogoutModel({token});
        await logout.save();
        res.send("the user has been logged out");
    }
    catch(err){
        console.log(err);
        res.status(404).json({err:err.message});
    }
})


module.exports={
    UserRouter
}