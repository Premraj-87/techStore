const dotenv = require('dotenv');
const connectDB = require('../config/db');
const products = require('../data/products');
const Product = require('../models/Product');

dotenv.config();

const updateProductImages = async () => {
  try {
    await connectDB();

    const updates = await Promise.all(
      products.map(async (seedProduct) => {
        const product = await Product.findOne({ name: seedProduct.name });

        if (!product) return null;

        product.images = seedProduct.images;
        await product.save();
        return product.name;
      })
    );

    const updated = updates.filter(Boolean);
    console.log(`Updated images for ${updated.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

updateProductImages();
