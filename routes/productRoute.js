const Product = require('../models/Product')

const express = require("express")

const route = express.Router()

route.post('/products', async (req, res) => {
  const { name, price, id  } = req.body;

  // Check if the 'price' field is provided and is a valid number
  if (typeof price !== 'number') {
      return res.status(400).send('Price must be a valid number.');
  }

  const newProduct = new Product({
      name: name || 'Sample',
      price: price || 1888,
      id: id || 'Elec',
     
  });

  try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
  } catch (err) {
      console.error('Error saving product:', err);
      res.status(500).send('Internal Server Error');
  }
});


  // Route to find all products
  route.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error('Error finding products:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  // Route to get products within a price range
route.post('/products/price-range', async (req, res) => {
  const minPrice = parseFloat(req.body.minPrice);
  const maxPrice = parseFloat(req.body.maxPrice);

  try {
    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    res.json(products);
  } catch (err) {
    console.error('Error finding products:', err);
    res.status(500).send('Internal Server Error');

  }
});

  
  // Route to update a product
  route.put('/products/:id', async (req, res) => {
      const Id = req.params.id;
      const {price, name} = req.body
  
    try {
      const result = await Product.updateOne({ _id: Id },{price:price , name:name});
      console.log(result);
      res.status(201).send('product update successfully');
  
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  route.delete('/products/:id', async (req, res) => {
    try {
      const id = req.params.id;
      
      // Use findOneAndDelete() to find and delete the product by ID
      const deletedProduct = await Product.findOneAndDelete({ _id: id });
      
      if (!deletedProduct) {
        return res.status(404).send('Product not found');
      }
  
      return res.status(200).json(deletedProduct);
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = route