const express = require("express");
const {  addProduct, allproduct, detail, DeleteProduct,  } = require("../controllers/productCantroller");


const router = express.Router();

// router.use(protect)

// GET /api/products

router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",

    message: "Welcome to product!",
  });
});

router.get("/all",allproduct)
router.get("/detail/:id",detail)
router.get("/delete/:id",DeleteProduct)
router.post("/add", addProduct);


module.exports = router;
