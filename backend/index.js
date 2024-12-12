const express = require("express");
require("dotenv").config();
const cors = require("cors")
const DBConnection = require("./config/DBConnection");
const productsRouter = require("./routes/products.route")
const userRouter = require("./routes/user.route");
const cartRouter = require("./routes/cart.model");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors())
app.use('/products',productsRouter)
app.use('/user',userRouter)
app.use('/cart',cartRouter)

app.get("/",(req,res)=>{
      res.json({message:"Home route, server running fine."})
})
app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`);

  try {
    await DBConnection;
    console.log("Database connected.");
  } catch (error) {
    console.log(error);
  }
});
