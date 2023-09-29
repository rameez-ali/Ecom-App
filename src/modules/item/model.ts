const mongoose = require('mongoose')
const Schema = mongoose.Schema
let CartSchema = new Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        price: {
           type: Number,
            required: true,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Cart', CartSchema)
