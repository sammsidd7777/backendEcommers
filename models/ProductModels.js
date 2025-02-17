const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,  
        required: true,  
    },
    
    productBrand: {
        type: String,  
    },
    
    productPrice: {
        type: Number,  
        required: true,  
        min: 0,           
    },
    
    productCategory: {
        type: String,    
        required: true,  
    },
    
    productType: {
        type: String,   
        required: true,  
    },
    
    productDescription: {
        type: String,   
        default: '',     
    },
    
    productImg: {
        type: [String],  
        required: true, 
    }
});

// Create model
const Products = mongoose.model('Product', productSchema);

// Export the model
module.exports = Products;
