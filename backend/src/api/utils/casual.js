const casual = require('casual');

function generateProducts(numProducts) {
  const products = [];

  casual.define('product', function () {
    return {
      product_name: casual.title,
      description: casual.sentences(2),
      price: casual.double(from = 0, to = 1000),
      quantity: casual.integer(from = 1, to = 100)
    };
  });

  for (let i = 0; i < numProducts; i++) {
    const product = casual.product;
    products.push(product);
  }

  return products;
}

module.exports=generateProducts;



// const Product = require('./api/models/product');
// const generateProducts = require('./api/utils/casual');
// app.use("/add-products", async (req, res) => {
//   try {
//     const numProducts = 10000;
//     const products = generateProducts(numProducts);

//     const insertedProducts = await Product.insertMany(products);
//     return res.json(insertedProducts);
//   } catch (error) {
//     console.error(error);
//     res.send({ success: false, error });
//   }
// });