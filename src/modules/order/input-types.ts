import { inputObjectType } from 'nexus'
import { DateTime } from '../scalars'

export const OrderAdditionInputType = inputObjectType({
  name: 'OrderAdditionInput',
  definition(t) {
    t.nonNull.string('userId')
  },
})

export const OrderItemAdditionInputType = inputObjectType({
  name: 'OrderItemAdditionInput',
  definition(t) {
    t.nonNull.string('productId')
    t.nonNull.string('orderId')
    t.nonNull.string('quantity')
    t.nonNull.string('price')
  },
})


export const GetOrderByIdInputType = inputObjectType({
  name: 'GetOrderByIdInput',
  definition(t) {
    t.nonNull.string('orderId')
  },
})

export const GetOrderItemByIdInputType = inputObjectType({
  name: 'GetOrdeItemByIdInput',
  definition(t) {
    t.nonNull.string('orderId')
  },
})
