const faker = require('faker');
const handleErrors = require('./handleErrors');

// API endpoint to create 1000 products
exports.createProducts = handleErrors(async (req, res) => {
  const numProducts = 1000;
  const products = [];

  for (let i = 0; i < numProducts; i++) {
    const product = {
      product_name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      quantity: faker.datatype.number(1000)
    };

    products.push(product);
  }
  return res.json(products);
});

