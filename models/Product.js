const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  availability: Boolean,
 }, { collection: 'produit' });
  
const Product = mongoose.model('produit', productSchema);

module.exports = Product