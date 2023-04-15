/**
 * File Name: order.js
 */

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    unique: true,
  },
  order_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  customer_id: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  customer_phone: {
    type: String,
    required: true,
  },
  shipping_address: {
    type: Object,
    required: true,
  },
  billing_address: {
    type: Object,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
  shipping_method: {
    type: String,
    required: true,
  },
  shipping_status: {
    type: String,
    required: true,
  },
  order_total: {
    type: Number,
    required: true,
  },
  order_items: {
    type: Array,
    required: true,
  },
  coupon_code: {
    type: String,
  },
  coupon_discount: {
    type: Number,
  },
  taxes: {
    type: Object,
  },
  order_notes: {
    type: String,
  },
  order_status: {
    type: String,
    required: true,
  },
  order_history: {
    type: Array,
  },
  order_source: {
    type: String,
    required: true,
  },
  order_source_details: {
    type: Object,
  },
  order_source_url: {
    type: String,
  },
  order_source_ip_address: {
    type: String,
  },
  order_source_browser: {
    type: String,
  },
  order_source_os: {
    type: String,
  },
  order_number: { type: String, required: true },
  delivery_date: { type: Date },
  order_tracking_number: { type: String },
  order_tracking_url: { type: String },
  order_notes_internal: { type: String },
  order_notes_customer: { type: String },
  order_cancel_reason: { type: String },
  order_cancel_date: { type: Date },
  order_cancelled_by: { type: String },
  order_refund_amount: { type: Number },
  order_refund_reason: { type: String },
  order_refund_date: { type: Date },
  order_refunded_by: { type: String },
  order_fulfillment_status: { type: String },
  order_fulfillment_date: { type: Date },
  order_fulfilled_by: { type: String },
  order_return_reason: { type: String },
  order_return_date: { type: Date },
  order_returned_by: { type: String },
  order_return_address: { type: Object },
  order_return_shipping_method: { type: String },
  order_return_tracking_number: { type: String },
  order_return_tracking_url: { type: String },
  order_exchange_date: { type: Date },
  order_exchanged_by: { type: String },
  order_exchange_shipping: { type: Object },
  order_discount_code: String,
  order_discount_amount: Number,
  order_subtotal: Number,
  order_tax_rate: Number,
  order_tax_amount: Number,
  order_shipping_method: String,
  order_shipping_cost: Number,
  order_handling_fee: Number,
  order_payment_method: String,
  order_payment_reference: String,
  order_payment_date: Date,
  order_payment_status: String,
  order_payment_amount: Number,
  order_payment_transaction_id: String,
  order_payment_gateway: String,
  order_customer_id: String,
  order_customer_email: String,
  order_customer_first_name: String,
  order_customer_last_name: String,
  order_customer_phone_number: String,
});

module.exports = OrderSchema;
