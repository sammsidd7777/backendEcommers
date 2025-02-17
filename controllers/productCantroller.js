const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/ProductModels");
const sizeOf = require("image-size");
const { error } = require("console");


const storage = multer.diskStorage({ 
  filename: (req, file, cb) => {
    const randomString =
      Math.floor(Math.random() * 1000000).toString() + Date.now();
    cb(null, randomString); 
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Fixing the upload directory path
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/webp","image/png","image/jpg","image/AVIF","image/avif"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed."));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 70 * 1024 * 1024 }, // 50 MB max file size
  fileFilter: fileFilter,
}).array("productImg", 999); // Handle multiple file uploads

  



exports.addProduct = async (req, res) => {
  console.log("Received product addition request");
 

  upload(req, res, (err) => {
    if (err) {
      console.log("Error in file upload", err);
      return res.status(500).send("Error in file upload");
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({status:"401",message:"file not coming"});
    }

    if (!req.body.productName || !req.body.productCategory || !req.body.productPrice||!req.body.productType||!req.body.productDescription ||!req.body.productBrand ) {
    
      return res.status(400).send("Missing required product fields.");
    }

    console.log("Product data:", req.body);
    console.log("Uploaded files:", req.files);
    
    createNewProduct(req, res);
  });
};




// const createNewProduct = async (req, res) => {
//   // console.log(req)
//   console.log("samm")
//   try {
//     const images = req.files.map((file) => file.filename);

//     const newProduct = await Product.create({
//       productName: req.body.productName,
//       productBrand: req.body.productBrand,
//       productCategory: req.body.productCategory,
//       productPrice: req.body.productPrice,
//       productDescription: req.body.productDescription,
//       productImg: images,
//       productType: req.body.productType,
//     });

//     const productData = JSON.parse(JSON.stringify(newProduct));
//     res.status(200).json(productData);
//     console.log("New product added:", newProduct);
//   } catch (error) {
//     console.log("Error creating product:", error.message);
//     res.status(400).json({
//       status: "error",
//       message: ["Something went wrong while adding the product", error.message],
//     });
//   }
// };



exports.allproduct= async (req,res) =>{

  try{
    const product=await Product.find()
    // console.log(product)
    const bestSellers= await Product.find({productBrand: "puma"})
    // console.log(bestSellers)
    const bigDiscount = await Product.find({productBrand: "nike"})
    const newArrivals = await Product.find({productBrand: "adidas"});

      const fontdata={bestSellers,bigDiscount,newArrivals,product}

      // console.log(product)
    res.status(200).json({status: "OK", message: {fontdata}})
    
  }catch(error){
    res.status(500).json({error})
  }
 
}


exports.detail=async(req,res)=>{
  console.log(req.params.id)
try {
      const product_detail = await Product.findById(req.params.id);

  // const product_detail= await Product.find({_id===req.params.id});
  const category=product_detail.productCategory;
  console.log(category)
  const product=await Product.find({productCategory: category});

  // console.log(product_detail);
  const datas={product_detail, product};

  // console.log(datas)



  res.status(200).json({status: "OK", message:{datas}})
  // res.status(200).json({status: "OK"})
  
} catch (error) {
  console.log(error);
      res.status(400).json({status: "product not found", })    
}
  

}


exports.DeleteProduct=async(req,res)=>{
      
  try {
    const productId=req.params.id;
    // console.log(productId)
    

    const product=await Product.findByIdAndDelete(productId)

    // product.save()

    Product.save()
    res.status(200).json({status:"200",message:"product Removerd"})
    
  } catch (error) {
    res.status(401)
    
  }
}
