import { inputObjectType, objectType, interfaceType } from 'nexus'
import { DateTime } from '../scalars'
import Cart  from '../model'
import { PaginatorObjectType } from '../common/types'


export const OrderGeneralNode = interfaceType({
  name: 'OrderGeneral',
  definition(t) {
    t.nonNull.id('_id')
    t.nullable.string('userId')
    t.nonNull.int('date')
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('updatedAt', { type: 'DateTime' })
  },
})

export const OrderItemGeneralNode = interfaceType({
  name: 'OrderGeneral',
  definition(t) {
    t.nonNull.id('_id')
    t.nullable.string('productId')
    t.nonNull.string('orderId')
    t.nonNull.int('quantity')
    t.nonNull.int('price')
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('updatedAt', { type: 'DateTime' })
  },
})

export const OrderObjectType = objectType({
  name: 'Order',
  definition(t) {
    t.implements(OrderGeneralNode)
  },
})

export const OrderItemObjectType = objectType({
  name: 'OrderItem',
  definition(t) {
    t.implements(OrderItemGeneralNode)
  },
})
