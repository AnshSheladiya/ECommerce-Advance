/**
 * File Name: user.js
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  address_2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state_province: {
    type: String,
    required: true,
  },
  zip_postal_code: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  secondary_phone_number: {
    type: String,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  profile_picture_url: {
    type: String,
  },
  avatar: {
    type: String,
    default: null,
  },
  cover_photo_url: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  company_website: {
    type: String,
    default: null,
  },
  social_media_accounts: {
    type: Object,
  },
  newsletter_subscription: {
    type: Boolean,
    default: false,
  },
  order_history: [
    {
      order_number: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
  payment_information: {
    type: Object,
  },
  shipping_address_book: [
    {
      label: {
        type: String,
        required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      address_2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state_province: {
        type: String,
        required: true,
      },
      zip_postal_code: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone_number: {
        type: String,
        required: true,
      },
    },
  ],
  billing_address_book: [
    {
      label: {
        type: String,
        required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      address_2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state_province: {
        type: String,
        required: true,
      },
      zip_postal_code: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone_number: {
        type: String,
        required: true,
      },
    },
  ],
  wish_list: [
    {
      name: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
      },
    },
  ],
  recently_viewed_products: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      notes: {
        type: String,
      },
    },
  ],
  favorite_products: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      notes: { type: String },
    },
  ],
  recently_purchased: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      notes: { type: String },
    },
  ],
  product_reviews: [
    {
      product_name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  product_ratings: [
    {
      product_name: { type: String, required: true },
      rating: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  product_recommendations: [
    {
      name: { type: String, required: true },
    },
  ],
  creation_date: {
    type: Date,
    default: Date.now,
  },
  last_login: {
    type: Date,
    default: null,
  },
  account_status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'deleted'],
    default: 'active',
  },
  account_type: {
    type: String,
    enum: ['basic', 'premium', 'business'],
    default: 'basic',
  },
  account_balance: {
    type: Number,
    default: 0,
  },
  authentication_provider: {
    type: String,
    enum: ['local', 'Facebook', 'Google'],
    default: 'local',
  },
  authentication_id: {
    type: String,
    default: null,
  },
  two_factor_enabled: {
    type: Boolean,
    default: false,
  },
  two_factor_method: {
    type: String,
    enum: ['SMS', 'app', 'email'],
    default: null,
  },
  security_questions: {
    type: Array,
    default: [],
  },
  last_password_change: {
    type: Date,
    default: null,
  },
  password_reset_token: {
    type: String,
    default: null,
  },
  password_reset_expiry: {
    type: Date,
    default: null,
  },
  login_attempts: {
    type: Number,
    default: 0,
  },
  login_attempt_lockout: {
    type: Boolean,
    default: false,
  },
  login_attempt_lockout_count: {
    type: Number,
    default: 5,
  },
  preferred_language: {
    type: String,
    default: null,
  },
  timezone: {
    type: String,
    default: null,
  },
  occupation: {
    // Job title of User
    type: String,
    default: null,
  },
  interests: {
    type: Array,
    default: [],
  },

  referral_source: {
    type: String,
    default: null,
  },
  referral_code: {
    type: String,
    default: null,
  },
  referral_reward: {
    type: Number,
    default: 0,
  },
  notification_preferences: {
    type: Object,
    default: {
      email: true,
      push: true,
      SMS: true,
    },
  },
  privacy_settings: {
    type: Object,
    default: {
      profile_visibility: 'public',
    },
  },
});

module.exports = userSchema;
