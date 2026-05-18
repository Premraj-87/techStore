const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc Create review
// @route POST /api/reviews/:productId
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(
      (review) => review.user.toString() === userId.toString()
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You already reviewed this product' });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: userId,
    };

    product.reviews.push(review);

    // Calculate average rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    product.numReviews = product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get product reviews
// @route GET /api/reviews/:productId
exports.getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate(
      'reviews.user',
      'name'
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete review
// @route DELETE /api/reviews/:productId/:reviewId
exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === req.params.reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only allow user to delete their own review or admin
    if (
      product.reviews[reviewIndex].user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    product.reviews.splice(reviewIndex, 1);

    // Recalculate rating
    if (product.reviews.length > 0) {
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    } else {
      product.rating = 0;
    }

    product.numReviews = product.reviews.length;

    await product.save();

    res.json({ message: 'Review removed', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update review
// @route PUT /api/reviews/:productId/:reviewId
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = product.reviews.find(
      (r) => r._id.toString() === req.params.reviewId
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only allow user to update their own review or admin
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = rating;
    review.comment = comment;

    // Recalculate rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.json({ message: 'Review updated', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
