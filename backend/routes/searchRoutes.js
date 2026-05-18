const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Search products
router.get('/search', searchController.searchProducts);

// Get products by category
router.get('/category/:category', searchController.getByCategory);

// Get filter options
router.get('/filters', searchController.getFilters);

module.exports = router;
