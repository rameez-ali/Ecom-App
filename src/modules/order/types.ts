import { inputObjectType, objectType, interfaceType } from 'nexus'
import { DateTime } from '../scalars'
import { PaginatorObjectType } from '../common/types'


export const OrderGeneralNode = interfaceType({
  name: 'OrderGeneral',
  definition(t) {
    t.nonNull.id('_id')
    t.nullable.string('userId')
    t.nullable.string('date')
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('updatedAt', { type: 'DateTime' })
  },
})

export const OrderItemGeneralNode = interfaceType({
  name: 'OrderItemGeneral',
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

export const InvoiceGeneralNode = interfaceType({
  name: 'InvoiceGeneral',
  definition(t) {
    t.nonNull.id('_id')
    t.nullable.string('userId')
    t.nullable.field('orderId', {type: "Order"})
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('updatedAt', { type: 'DateTime' })
  },
})

export const InvoiceObjectType = objectType({
  name: 'Invoice',
  definition(t) {
    t.implements(InvoiceGeneralNode)
  },
})
