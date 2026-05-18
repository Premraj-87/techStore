const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const wishlistController = require('../controllers/wishlistController');

// Get wishlist
router.get('/', protect, wishlistController.getWishlist);

// Add to wishlist
router.post('/:productId', protect, wishlistController.addToWishlist);

// Remove from wishlist
router.delete('/:productId', protect, wishlistController.removeFromWishlist);

// Check if product in wishlist
router.get('/check/:productId', protect, wishlistController.checkWishlist);

module.exports = router;
