const express= require("express");
const { connection } = require("./configs/db");
const {UserRouter}= require("./routes/user.routes");
const {authenticate}= require("./middleware/authentication");
require("dotenv").config();

const app=express();
app.use(express.json());
app.use("/",UserRouter);


app.use("/",authenticate);





app.listen(process.env.port, async(req,res)=>{
    try{
        await connection;
        console.log("the server is connected at port 2000");
    }
    catch(err){
        console.log("something went wrong");
    }
})