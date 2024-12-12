const express= require("express")
const cartRouter = express.Router()
const CartModel = require('../models/cart.model')

cartRouter.get('/',async(req,res)=>{
      res.send('Ok')
})

module.exports = cartRouter