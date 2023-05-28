const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxlength: [100, "Product name cannot be longer than 100 characters"]
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxlength: [5, "Product price cannot be longer than 5 characters"],
    default: 0.0
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: ["Electronics", "Furniture", "Clothing", "Books", "Music", "Sports", "Foods", "Beauty/Healthcare",],
      message: "Please select a valid category"
    }
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxlength: [5, "Product stock cannot exceed 5 characters"],
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product