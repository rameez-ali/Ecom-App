import { inputObjectType } from 'nexus'
import { DateTime } from '../scalars'

export const CartOptionsInputType = inputObjectType({
  name: 'CartOptionsInput',
  definition(t) {
    t.string('q')
  },
})


export const CartAdditionInputType = inputObjectType({
  name: 'CartAdditionInput',
  definition(t) {
    t.nonNull.string('productId')
    t.nonNull.int('quantity')
  },
})

export const CartUpdateInputType = inputObjectType({
  name: 'CartUpdateInput',
  definition(t) {
    t.nonNull.string('productId')
    t.nonNull.int('quantity');
  },
})

export const GetCartByIdInputType = inputObjectType({
  name: 'GetCartByIdInput',
  definition(t) {
    t.nonNull.string('cartId')
  },
})
