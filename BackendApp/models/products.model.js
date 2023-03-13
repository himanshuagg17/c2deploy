const mongoose=require("mongoose");

const ProductSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,
    category:{
        type:String,
        required:true
    }
    ,
    price:{
        type:Number,
        required:true
    }
})


const ProductModel= mongoose.model("product",ProductSchema);

module.exports={
    ProductModel
}