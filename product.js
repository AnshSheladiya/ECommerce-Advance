/**
 * File Name: product.js
 */
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    // Product details
    product_name: {
      type: String,
      required: true,
    },

    // Description related fields
    description: {
      type: String,
    },
    short_description: {
      type: String,
    },
    long_description: {
      type: String,
    },

    // Image related fields
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        angle: {
          type: String,
          required: true,
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
        fileSize: {
          type: Number,
        },
        mimeType: {
          type: String,
        },
        dimensions: {
          width: {
            type: Number,
          },
          height: {
            type: Number,
          },
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        updatedAt: {
          type: Date,
        },
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],

    // Brand,Category...
    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },

    // Price related fields
    price: {
      type: Number,
    },
    sale_price: {
      type: Number,
    },
    currency: {
      type: String,
    },

    // Physical attributes
    weight: {
      type: Number,
    },
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    dimension_unit: {
      type: String,
    },
    weight_unit: {
      type: String,
    },


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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
