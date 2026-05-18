const express = require('express');
const router = express.Router();
const { 
  addOrderItems,
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrderSummary
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Create order
router.post('/', protect, createOrder);

// Get user orders
router.get('/', protect, getMyOrders);

// Get order analytics
router.get('/analytics/summary', protect, getOrderSummary);

// Get order by ID
router.get('/:id', protect, getOrderById);

// Update order to paid
router.put('/:id/pay', protect, updateOrderToPaid);

// Legacy support
router.post('/legacy', protect, addOrderItems);

module.exports = router;
