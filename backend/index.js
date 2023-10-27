const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY || "e-commerce";

const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.log(error);
  });

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  // res.send(result);
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ message: "Something went wrong!!" });
    }
    res.send({ result, token: token });
  });
});

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body).select("-password");
  if (req.body.email && req.body.password) {
    if (user) {
      // res.send(user);
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ message: "Something went wrong!!" });
        }
        res.send({ user, token: token });
      });
    } else {
      res.send({ msg: "User not found!" });
    }
  } else {
    res.send({ msg: "Something went wrong!" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ msg: "No products found!" });
  }
});

app.delete("/delete-product/:id", verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ msg: "No records found!" });
  }
});

app.put("/update-product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).sen({ message: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ message: "Please add token with header" });
  }
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
