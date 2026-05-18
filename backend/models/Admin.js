const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'support'],
      default: 'admin',
    },
    permissions: [String],
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
