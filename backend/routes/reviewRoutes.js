const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

// Create review
router.post('/:productId', protect, reviewController.createReview);

// Get reviews
router.get('/:productId', reviewController.getReviews);

// Update review
router.put('/:productId/:reviewId', protect, reviewController.updateReview);

// Delete review
router.delete('/:productId/:reviewId', protect, reviewController.deleteReview);

module.exports = router;
