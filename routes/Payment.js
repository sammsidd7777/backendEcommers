const express = require("express");
const { CreateOrder, VarifyPayment  } = require("../controllers/payment");

const router = express.Router()
 

router.get("/CreateOrder/:Id/:Num", CreateOrder)
router.post("/VerifiyPayment",VarifyPayment)
// router.get("/OrderDetail",GetOrderDetails)


module.exports = router;