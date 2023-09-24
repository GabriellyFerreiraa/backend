const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  stock: Number,
  category: String,
  // Otros campos si es necesario
});

module.exports = mongoose.model("Product", productSchema);
