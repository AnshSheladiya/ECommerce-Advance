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
    videos: [
      {
        url: String,
        uploadedAt: Date,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        fileSize: Number,
        mimeType: String,
        duration: Number, // Add this field for video duration
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

    // Product inventory fields
    quantity: {
      type: Number,
    },
    manage_stock: {
      type: Boolean,
    },
    stock_status: { type: String },
    min_order_quantity: {
      type: Number,
    },
    max_order_quantity: {
      type: Number,
    },

    // Products RatingReviews fields
    reviews: [
      {
        reviewer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        reviewer_rating: Number,
        comment: String,
      },
    ],
    viewers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    rating: { type: Number, default: 0 },
    views_count: { type: Number, default: 0 },
    likes_count: { type: Number, default: 0 },

    // Product flags/indicators
    is_featured: {
      type: Boolean,
    },
    is_bestseller: {
      type: Boolean,
    },
    is_new: {
      type: Boolean,
    },
    is_on_sale: {
      type: Boolean,
    },
    is_top_rated: {
      type: Boolean,
    },
    is_available: {
      type: Boolean,
    },
    is_active: {
      type: Boolean,
    },
    is_new_arrival: {
      type: Boolean,
    },

    tax_class_id: {
      type: Number,
    },
    taxable: {
      type: Boolean,
    },
    tax_exempt: {
      type: Boolean,
    },
    tax_class: { type: String },
    is_taxable: { type: Boolean, default: true },
    tax_rate: { type: Number },

    allow_backorders: {
      type: Boolean,
    },
    backorder_availability: {
      type: String,
    },
    out_of_stock_availability: {
      type: String,
    },
    low_stock_notification: {
      type: Number,
    },
    sku: {
      type: String,
    },
    manufacturer_part_no: {
      type: String,
    },
    upc: {
      type: String,
    },
    ean: {
      type: String,
    },
    isbn: {
      type: String,
    },
    mpn: { type: String },
    condition: { type: String },
    custom_fields: { type: Object },
    meta_keywords: { type: String },
    meta_description: { type: String },
    canonical_url: { type: String },
    additional_information: { type: String },
    downloadables: { type: [mongoose.Schema.Types.ObjectId] },
    samples: { type: [mongoose.Schema.Types.ObjectId] },
    configurable_attributes: { type: Object },
    bundle_options: { type: Object },
    tier_price: { type: Number },
    min_sale_qty: { type: Number },
    max_sale_qty: { type: Number },
    notify_stock_qty: { type: Number },
    gift_message_available: { type: Boolean },
    gift_message_maximumchars: { type: Number },
    shipping_method: { type: String },
    shipping_class: { type: String },
    is_downloadable: { type: Boolean },
    is_virtual: { type: Boolean },
    product_type: { type: String },
    manufacturer: { type: String },
    supplier: { type: String },
    origin_country: { type: String },
    shipping_weight: { type: Number },
    shipping_length: { type: Number },
    shipping_width: { type: Number },
    shipping_height: { type: Number },
    tags: [{ type: String }],
    sale_start_date: { type: Date },
    sale_end_date: { type: Date },

    is_stock_controlled: { type: Boolean, default: false },
    stock_quantity: { type: Number, default: 0 },
    low_stock_threshold: { type: Number, default: 0 },
    out_of_stock_threshold: { type: Number, default: 0 },
    is_backorder_allowed: { type: Boolean, default: false },
    is_preorder_allowed: { type: Boolean, default: false },
    preorder_availability: { type: String },

    variations: [
      {
        size: String,
        color: String,
        material: String,
        price: Number,
        weight: Number,
        availability: Boolean,
      },
    ],
    related_products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    upsell_products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    cross_sell_products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    gift_wrapping_options: [
      {
        label: String,
        price: Number,
      },
    ],
    gift_message: { type: String },
    warranty: { type: String },
    return_policy: { type: String },

    is_free_shipping: Boolean,
    free_shipping_min_amt: Number,
    is_loyalty_program: Boolean,
    loyalty_points: Number,
    video_url: String,
    frequently_bought_with: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    compare_prices: [
      {
        vendor_name: String,
        price: Number,
      },
    ],
    shipping_time: String,
    bundle_products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
