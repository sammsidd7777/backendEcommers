// const mongoose = require("mongoose");
// const express = require("express");
// const cors= require("cors");
// const app = express();

// app.use(cors());






// const userRoutes = require("./routes/user") 
// const productsRoutes=require("./routes/product")
// const cartRoutes = require("./routes/cart")
// const addressRoutes=require("./routes/address");
// const path = require("path/posix");
//  app.use("/images", express.static("./uploads"))

//  app.use(express.json());
// app.use("/user", userRoutes);
// app.use("/products", productsRoutes);
// app.use("/cart", cartRoutes);
// app.use("/address", addressRoutes);





// app.get("/product", (req, res) => {
//     res.send("GET request to product");
// });

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/new-store")
//   .then(() => console.log("Server connected successfully"))
//   .catch((error) => console.log("server connect fail "));

// // Start the server
// app.listen(5200, () => {
//   console.log('Server is running on http://localhost:5200');
// });
























const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser")
const dotenv =require("dotenv")
dotenv.config()


const Port = process.env.PORT || 5000

console.log(Port)

const app = express();
app.use(cookieParser())
// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json()); // To parse JSON bodies

// Static file serving
// app.use("/images", express.static(path.join(__dirname, "./upload")));
app.use("/images", express.static("./uploads"));

// Routes
const userRoutes = require("./routes/user");
const productsRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const addressRoutes = require("./routes/address");
const wishRoutes =require("./routes/wish")
const paymentRoutes=require("./routes/Payment")

app.use("/user", userRoutes);
app.use("/payment", paymentRoutes);
app.use("/wish",wishRoutes)
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/address", addressRoutes);

// Test route
app.use("/image", (req, res) => {
    res.send("GET request to product");
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/check-store")
  .then(() => console.log("Server connected successfully"))
  .catch((error) => console.log("Server connection failed", error));

// Start the server
app.listen(5200, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
