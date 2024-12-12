const express= require("express")
const ProductModel = require("../models/product.model")
const productsRouter = express.Router()

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