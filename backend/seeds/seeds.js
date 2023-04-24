const mongoose = require('mongoose');
const Category = require('../src/api/models/category');
const Product = require('../src/api/models/product');
const config = require('../src/api/config/config');
const categories = require('./seed-categories');
const products = require('./seed-products');

mongoose.connect(config.database[process.env.NODE_ENV || 'development'].url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if seed data already exists
const checkSeedData = async (Model, data) => {
  const count = await Model.countDocuments({});
  return count === data.length;
};

// Insert categories if not already inserted
const seedCategories = async () => {
  if (await checkSeedData(Category, categories)) {
    console.log('Categories already seeded');
    return;
  }
  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log('Categories seeded successfully');
};

// Insert products if not already inserted
const seedProducts = async () => {
  if (await checkSeedData(Product, products)) {
    console.log('Products already seeded');
    return;
  }
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products seeded successfully');
};

(async () => {
  try {
    await seedCategories();
    await seedProducts();
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
})();
