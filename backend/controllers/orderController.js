const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// @desc Create order
// @route POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Verify product stock
    for (let item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.product} not found` });
      }
      if (product.countInStock < item.qty) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.name}` });
      }
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: 'mock_payment_' + Date.now(),
        status: 'completed',
        update_time: new Date().toISOString(),
        email_address: req.user.email,
      },
      orderStatus: 'processing',
      trackingNumber: `TRK-${uuidv4().slice(0, 8).toUpperCase()}`,
      statusTimeline: [
        {
          status: 'pending',
          date: new Date(),
          description: 'Order placed successfully',
        },
        {
          status: 'processing',
          date: new Date(),
          description: 'Payment received. Order is being processed.',
        },
      ],
    });

    // Update product stock
    for (let item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { countInStock: -item.qty } }
      );
    }

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get user orders
// @route GET /api/orders
exports.getMyOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments({ user: req.user._id });

    res.json({
      orders,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get order by ID
// @route GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check authorization
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    // Update order status timeline
    order.statusTimeline.push({
      status: 'processing',
      date: new Date(),
      description: 'Payment received. Order is being processed.',
    });
    order.orderStatus = 'processing';

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get order analytics
// @route GET /api/orders/analytics/summary
exports.getOrderSummary = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({ user: req.user._id });
    const pendingOrders = await Order.countDocuments({
      user: req.user._id,
      orderStatus: 'pending',
    });
    const completedOrders = await Order.countDocuments({
      user: req.user._id,
      orderStatus: 'delivered',
    });
    const totalSpent = await Order.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user._id), isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalSpent: totalSpent[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get order by ID - Legacy support
const addOrderItems = async (req, res) => {
  return exports.createOrder(req, res);
};

module.exports = {
  addOrderItems,
  createOrder: exports.createOrder,
  getMyOrders: exports.getMyOrders,
  getOrderById: exports.getOrderById,
  updateOrderToPaid: exports.updateOrderToPaid,
  getOrderSummary: exports.getOrderSummary,
};
