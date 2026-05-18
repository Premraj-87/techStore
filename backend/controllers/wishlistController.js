const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc Get wishlist
// @route GET /api/wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products.product')
      .sort({ 'products.addedAt': -1 });

    if (!wishlist) {
      return res.json({ products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add to wishlist
// @route POST /api/wishlist/:productId
exports.addToWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        products: [{ product: productId }],
      });
    } else {
      // Check if product already in wishlist
      const existingProduct = wishlist.products.find(
        (p) => p.product.toString() === productId
      );

      if (existingProduct) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }

      wishlist.products.push({ product: productId });
    }

    await wishlist.save();
    await wishlist.populate('products.product');

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Remove from wishlist
// @route DELETE /api/wishlist/:productId
exports.removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      (p) => p.product.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate('products.product');

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Check if product in wishlist
// @route GET /api/wishlist/check/:productId
exports.checkWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.json({ inWishlist: false });
    }

    const inWishlist = wishlist.products.some(
      (p) => p.product.toString() === req.params.productId
    );

    res.json({ inWishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
