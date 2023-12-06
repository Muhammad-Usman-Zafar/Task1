const express = require("express");
require("dotenv").config();
const errorHandler = require("./Handler/errorHandler")

const connectDB = require("./DB/connectDB");
connectDB();

const app = express();

const port  = process.env.PORT || 6000;

const router = require("./Routers/Routers");

app.use(express.json())

app.use("/api",router)

app.use(errorHandler)


app.listen(port, ()=>{
  console.log(`yes i am listening ${port} :) `)
});