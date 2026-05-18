const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const invoiceController = require('../controllers/invoiceController');

// Generate invoice PDF
router.get('/:orderId', protect, invoiceController.generateInvoice);

// Get invoice list
router.get('/', protect, invoiceController.getInvoices);

module.exports = router;
