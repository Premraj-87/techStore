const Product = require('../models/Product');

// @desc Search products
// @route GET /api/products/search
exports.searchProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      minRating,
      sortBy,
      page = 1,
      limit = 12,
    } = req.query;

    // Build filter
    let filter = {};

    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { brand: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    // Sorting
    let sortOptions = {};
    switch (sortBy) {
      case 'price-asc':
        sortOptions.price = 1;
        break;
      case 'price-desc':
        sortOptions.price = -1;
        break;
      case 'rating':
        sortOptions.rating = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'popular':
        sortOptions.numReviews = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    // Get unique categories for filter
    const categories = await Product.distinct('category');

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get product by category
// @route GET /api/products/category/:category
exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const skip = (page - 1) * limit;

    const products = await Product.find({ category })
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments({ category });

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get filtered products with suggestions
// @route GET /api/products/filters
exports.getFilters = async (req, res) => {
  try {
    // Get unique categories
    const categories = await Product.distinct('category');

    // Get unique brands
    const brands = await Product.distinct('brand');

    // Get price range
    const priceRange = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    res.json({
      categories,
      brands,
      priceRange: priceRange[0] || { minPrice: 0, maxPrice: 1000 },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
