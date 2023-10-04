import { date } from 'zod'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

let OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

let OrderItemSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

let InvoiceSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orignalinvoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    chargeId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Order = mongoose.model('Order', OrderSchema)
export const OrderItem = mongoose.model('OrderItem', OrderItemSchema)
export const Invoice = mongoose.model('Invoice', InvoiceSchema)

module.exports = { Order, OrderItem, Invoice }
