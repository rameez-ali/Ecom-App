import { inputObjectType } from 'nexus'
import { DateTime } from '../scalars'

export const ProductOptionsInputType = inputObjectType({
  name: 'ProductOptionsInput',
  definition(t) {
    t.string('q')
  },
})

export const ProductAdditionInputType = inputObjectType({
  name: 'ProductAdditionInput',

  definition(t) {
    t.nonNull.string('name')
    t.nonNull.int('price')
    t.nonNull.string('image')
  },
})

export const ProductUpdateInputType = inputObjectType({
  name: 'ProductUpdateInput',
  definition(t) {
    t.string('name')
    t.int('price')
    t.string('image')
  },
})

export const GetProductByIdInputType = inputObjectType({
  name: 'GetProductByIdInput',
  definition(t) {
    t.nonNull.string('productId')
  },
})
