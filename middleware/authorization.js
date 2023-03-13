const authorize= (role)=>{
    return(req,res,next)=>{
        const {user_role}= req.body;
        console.log(user_role);
        if(role.includes(user_role)){
            next();
        }
        else{
            res.status(401).json({msg:"not authorized"});
        }
    }
}

module.exports={
    authorize
}