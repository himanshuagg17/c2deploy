const express= require("express");
const {ProductModel}= require("../models/products.model");

const ProductRouter= express.Router();

ProductRouter.post("/create",async (req,res)=>{
    const productData=req.body;
    const product=new ProductModel(productData);
    await product.save();
    res.send("the product has been added");
})