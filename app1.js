
const productRoute = require('./routes/productRoute')
require('./config/db')


const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(productRoute)


// Route to create a new product

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
