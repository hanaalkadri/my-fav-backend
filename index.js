const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 4000;
const multer = require("multer");
const path = require("path");
const { type } = require("os");



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

//Schema for Creating Products

const Product = mongoose.model("Product",{
  id:{
    type: Number,
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  new_price:{
    type:Number,
    required:true,
  },
  old_price:{
    type:Number,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  availabe:{
    type:Boolean,
    default:true,
  },

})

app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
let id = 1;
if (products.length > 0) {
  const last_product = products[products.length - 1];
  id = typeof last_product.id === 'number' ? last_product.id + 1 : 1;
}else{
      id=1;
    }
    const product = new Product({
      id:id,
      name:req.body.name,
      image:req.body.image,
      category:req.body.category,
      new_price:req.body.new_price,
      old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
      success:true,
      name:req.body.name,
    })
})

//Creating API for Deleting Products
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name
  });
});

//Creating API for getting all products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Saved");
    res.send(products);
})

app.listen(port,(error)=>{
    if(!error){
      console.log("Server Running on Port " +port)
    }else{
      console.log("Error : "+error)
    }
})