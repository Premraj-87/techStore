const PDFDocument = require('pdfkit');
const Order = require('../models/Order');
// @desc Generate invoice PDF
// @route GET /api/invoices/:orderId
exports.generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      'user',
      'name email phone'
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check authorization
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const doc = new PDFDocument();
    const filename = `invoice-${order._id}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);

    // Header
    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('INVOICE', { align: 'center' });

    doc.fontSize(10).font('Helvetica').text(`Order ID: ${order._id}`, {
      align: 'center',
    });
    doc.text(`Date: ${order.createdAt.toLocaleDateString()}`, {
      align: 'center',
    });

    doc.moveDown();

    // Company info
    doc.fontSize(12).font('Helvetica-Bold').text('From:');
    doc.fontSize(10).font('Helvetica').text('Ecommerce Store');
    doc.text('Email: info@ecommerce.com');
    doc.text('Phone: +1-800-123-4567');

    doc.moveDown();

    // Customer info
    doc.fontSize(12).font('Helvetica-Bold').text('Bill To:');
    doc.fontSize(10).font('Helvetica').text(`Name: ${order.user.name}`);
    doc.text(`Email: ${order.user.email}`);
    doc.text(`Phone: ${order.user.phone || 'N/A'}`);

    doc.moveDown();

    // Shipping address
    doc.fontSize(12).font('Helvetica-Bold').text('Shipping Address:');
    doc.fontSize(10).font('Helvetica');
    const addr = order.shippingAddress;
    doc.text(`${addr.address}, ${addr.city}, ${addr.postalCode}`);
    doc.text(addr.country);

    doc.moveDown();

    // Items table
    doc.fontSize(12).font('Helvetica-Bold').text('Order Items:');

    const tableTop = doc.y;
    const col1 = 50;
    const col2 = 250;
    const col3 = 350;
    const col4 = 450;

    // Header
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Item', col1, tableTop);
    doc.text('Qty', col2, tableTop);
    doc.text('Price', col3, tableTop);
    doc.text('Total', col4, tableTop);

    let y = tableTop + 20;
    doc.font('Helvetica').fontSize(9);

    order.orderItems.forEach((item) => {
      doc.text(item.name.substring(0, 30), col1, y);
      doc.text(item.qty.toString(), col2, y);
      doc.text(`$${item.price.toFixed(2)}`, col3, y);
      doc.text(`$${(item.qty * item.price).toFixed(2)}`, col4, y);
      y += 25;
    });

    doc.moveTo(50, y).lineTo(500, y).stroke();
    y += 10;

    // Totals
    doc.fontSize(10).font('Helvetica');
    doc.text(`Subtotal: $${order.itemsPrice.toFixed(2)}`, 350, y);
    y += 15;
    doc.text(`Tax: $${order.taxPrice.toFixed(2)}`, 350, y);
    y += 15;
    doc.text(`Shipping: $${order.shippingPrice.toFixed(2)}`, 350, y);
    y += 20;

    doc.fontSize(12).font('Helvetica-Bold');
    doc.text(`Total: $${order.totalPrice.toFixed(2)}`, 350, y);

    doc.moveDown();

    // Order status
    doc.fontSize(10).font('Helvetica-Bold').text('Order Status:');
    doc.font('Helvetica').text(
      `Status: ${order.orderStatus.toUpperCase()}`,
      50
    );
    if (order.trackingNumber) {
      doc.text(`Tracking: ${order.trackingNumber}`);
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get invoice list
// @route GET /api/invoices
exports.getInvoices = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      isPaid: true,
    })
      .sort({ createdAt: -1 })
      .select('_id createdAt totalPrice orderStatus');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
