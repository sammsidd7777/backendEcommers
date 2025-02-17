const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt");
// const { Addtocart } = require("../controllers/cartCantrolle");


const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
   
  },
  productTitle:{
      type:String,
  },
  productPrice:{
      type:Number
  },
  productImg:{
    type:[]

  },
  quantity:{
    type: Number}
 
})

const wishSchema = new mongoose.Schema({
  productId: {
    type: String,
   
  }
 
 
})

const AddressSchema = new mongoose.Schema({
  FlatNo: {
    type: String,
    
   
  },
  AddressNo:{
    type: String,
   
  },
  city:{
    type: String,
  },
  state:{
    type: String,
  },
  pinCode:{
    type: String,
  }
 
})


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, "please enter a valid phone number"],
    validate: [validator.isMobilePhone, "please enter a valid number"],
  },

  userRole:{
    type: [String], 
    default: ["user"],
  },

  password: {
    type: String,
    required: true,

    minlength: [8, "Please enter a valid password"],
  },
  cart:[cartSchema],

  wish:[wishSchema],

  Address:[AddressSchema]

});


const user=mongoose.model('User',userSchema);
module.exports = user; 


// const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcrypt");

// // Cart Schema
// const cartSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,  // Assuming you have a Product model
//     ref: 'Product',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1  // At least 1 product should be added to the cart
//   }
// });

// // Address Schema
// const AddressSchema = new mongoose.Schema({
//   flatNo: {
//     type: String,
//     required: true
//   },
//   addressNo: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   state: {
//     type: String,
//     required: true
//   },
//   pinCode: {
//     type: String,
//     required: true,
//     validate(value) {
//       if (!/^\d{6}$/.test(value)) {  // Assuming pinCode should be 6 digits
//         throw new Error("Invalid pinCode format");
//       }
//     }
//   }
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Invalid email");
//       }
//     }
//   },
//   phone: {
//     type: String,
//     required: true,
//     minlength: [10, "Please enter a valid phone number"],
//     validate: [validator.isMobilePhone, "Please enter a valid number"]
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: [8, "Password must be at least 8 characters long"]
//   },
//   cart: [cartSchema],  // Array of cart items
//   address: AddressSchema
// });

// // Pre-save hook for password hashing
// userSchema.pre('save', async function(next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

// // Model creation
// const User = mongoose.model('User', userSchema);
// module.exports = User;
