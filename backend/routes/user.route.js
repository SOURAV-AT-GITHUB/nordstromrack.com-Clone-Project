const express = require("express");
const userRouter = express.Router();
const UserModel = require("../models/user.model");
const CartModel = require('../models/cart.model')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv");
const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, firstname, lastname, password } = req.body;
  if (
    typeof email !== "string" ||
    typeof firstname !== "string" ||
    typeof lastname !== "string" ||
    typeof password !== "string"
  ) {
    res.status(400).json({ message: "Invalid request body." });
  } else {
    try {
      const isExistingUser = await UserModel.findOne({ email });
      if (isExistingUser) {
        res.status(409).json({ message: "email already registered" });
      } else {
        bcrypt.hash(password, 4, async (err, hash) => {
          if (err) {
            res
              .status(500)
              .json({ message: "Internal server error, please try again!" });
          } else {
            try {
              const newUSer = new UserModel({
                email,
                firstname,
                lastname,
                password: hash,
              });
              const newUsersCart = new CartModel({
                email,
                data:[]
              })
              await newUSer.save();
              await newUsersCart.save()
              res.status(201).json({ message: "Account Created" });
            } catch (error) {
              res
                .status(500)
                .json({ message: "Unknow error in server, please try again." });
              console.log(error);
            }
          }
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unknow error in server, please try again." });
      console.log(error);
    }
  }
});

userRouter.post("/search-by-email", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Invalid request body." });
  } else {
    try {
      const isExistingUser = await UserModel.findOne({ email });
      if (isExistingUser) {
        res.json({ message: "UserExist",isExisting:true });
      } else {
        res.json({ message: "User not found",isExisting:false });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error, please try again." });
    }
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    res.status().json({ message: "Invalid req body" });
  } else {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        res
          .status(404)
          .json({ message: `${email} is not registered with nordstromrack` });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res
              .status(500)
              .json({ message: "Internal server error, please try again." });
          } else if (!result) {
            res.status(401).json({ message: "Wrong password." });
          } else if (result) {
            const token = jwt.sign(
              { email, firstname: user.firstname, lastname: user.lastname },
              JWT_SECRET,
              { algorithm: "HS256" }
            );
            res.json({
              message: "Login Success",
              token,
              email,
              firstname: user.firstname,
              lastname: user.lastname,
            });
          } else {
            res
              .status(500)
              .json({ message: "Unknow error in server, please try again." });
          }
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unknow error in server, please try again." });
      console.log(error);
    }
  }
});

module.exports = userRouter;
