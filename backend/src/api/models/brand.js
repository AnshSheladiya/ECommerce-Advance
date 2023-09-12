const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    is_deleted: Boolean,
    deleted_at: Date,
    deleted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    createdByIp: String,
    updatedByIp: String,
  },
  {
    versionKey: false,
  }
);

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
