const express = require('express');
const Product = require("../models/ProductModels");
const User = require("../models/UserModels")

// for adding product to cart
const app = express();
app.use(express.json());

// Add product into cart
exports.Addtocart = async (req, res) => {
    try {
        let productId = req.params.productId;
        let user = req.user;

        if (!user) {
            return res.status(400).json({ status: "error", message: "User not login" });
        }

        // Find the product by its ID
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        // Check if the product is already in the cart
        let cart = user.cart;
        let itemIndex = cart.findIndex(el => el.productId === productId);

        // Add or update the product in the cart
        if (itemIndex === -1) {
            // Add product to the cart with relevant information
            user.cart.push({
                productId: productId,
                productTitle: product.productName,
                productPrice: product.productPrice,
                productImg: product.productImg[0],
                quantity: 1
            });
            await user.save();
            console.log(user) // Save the updated cart
            res.status(201).json({ status: "success", message: user.cart });
        } else {
            // Update the quantity of the product in the cart
            user.cart[itemIndex].quantity++;
            await user.save();  // Save the updated cart
            res.status(200).json({ status: "success", message: user.cart });
        }

    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(400).json({ status: "error", message: error.message });
    }
};



// Update product quantity in the cart
exports.updateQuantity = async (req, res) => {

    

    try {
        let quantity = req.params.quantity;
        let cartItemId  = req.params.cartItemId;
        let user = req.user

       console.log(quantity,cartItemId)

        // Check if the quantity is a number
        if (isNaN(Number(quantity))) throw new Error("Quantity must be a number");
        quantity = Number(quantity);

      
        // Find the specific cart item
        let cartItem = user.cart.id(cartItemId);
        if (!cartItem) throw new Error("Cart item not found");

        // Validate the quantity and update or remove the cart item
        if (quantity < 0) {
            throw new Error("Quantity must be greater than or equal to 0");
        } else if (quantity === 0) {
            // Remove item from cart if quantity is 0
            user.cart.id(cartItemId).remove();
            await user.save();
            res.status(200).json({ status: "success", message: user.cart });
        } else {
            // Update the quantity of the item
            cartItem.quantity = quantity;
            await user.save();
            res.status(200).json({ status: "success", message: user.cart });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: "error", message: error.message });
    }
};


// get all item from cart 

exports.AllcartItem = async (req, res) => {
    try {
        let user = req.user;

        const Cartdata = await user.cart;  // Assuming Cartdata is an array of products
        let number = [];

        number.push(...Cartdata);  // Spread Cartdata array into 'number' if it's an array of items



        let x = 0;
        let totalprodcut = 0;
        let totalPrice = 0

        number.map((el) => {
            if (el.quantity >= 0) {
                totalprodcut += el.quantity;totalPrice += el.productPrice            }
            x = x + 1;
        });
        res.status(200).json({ status: "success", message: { Cartdata, totalPrice, totalprodcut } });

    } catch (error) {
        console.error(error); 
        res.status(400).json({ status: "error", message: "Failed to retrieve cart items." });
    }
};



// delete cart product 

exports.DeletecartItem = async (req, res) => {
    try {
        const item = req.params.id;
        const user = req.user;
        let cart = user.cart;

        let update = cart.filter(el=>el.productId !== item)
    
        user.cart = update;

        await user.save();

        res.status(200).json({status: "200", message: "Item successfully removed from the cart",cart: update});

    } catch (error) {
       
        res.status(500).json({status: "500",message: error.message});
    }
};


