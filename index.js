const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 4000;
const multer = require("multer");
const path = require("path");



app.use(express.json());
app.use(cors());


//Database Connection with MongoDB
mongoose.connect("mongodb+srv://hanaalkadry:Nawras.1991@cluster0.vmfhsu8.mongodb.net/forever");

//API Creation

app.get("/",(req,res)=>{
  res.send("Express App is Running");
})

//Image Storage Engine

const storage = multer.diskStorage({
  destination: './backend/upload/images',
  filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage:storage})


//Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
  res.json({
    success: 1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
  })
})

app.listen(port,(error)=>{
    if(!error){
      console.log("Server Running on Port " +port)
    }else{
      console.log("Error : "+error)
    }
})