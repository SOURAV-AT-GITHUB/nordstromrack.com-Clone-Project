const express= require("express")
const productsRouter = express.Router()
const ProductModel = require("../models/product.model")

productsRouter.get("/",async(req,res)=>{
      try {
            const data = await ProductModel.find()
            console.log(data)
            res.json({message:"Request resolved",data})
      } catch (error) {
            res.status(500).json({message:"Internal server error, please try again"})
      }
})

module.exports = productsRouter