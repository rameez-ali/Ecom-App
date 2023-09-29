import { inputObjectType, objectType, interfaceType } from 'nexus'
import { DateTime } from '../scalars'
import Cart  from '../model'
import { PaginatorObjectType } from '../common/types'


export const CartGeneralNode = interfaceType({
  name: 'CartGeneral',
  definition(t) {
    t.nonNull.id('_id')
    t.nonNull.int('quantity')
    t.nullable.string('productId')
    //t.nullable.list.nullable.field('items', {type: ItemObjectType})
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('updatedAt', { type: 'DateTime' })
  },
})

export const CartObjectType = objectType({
  name: 'Cart',
  definition(t) {
    t.implements(CartGeneralNode)
  },
})


export const CartPaginator = objectType({
  name: 'CartPaginator',
  definition(t) {
    t.nullable.list.nullable.field('data', { type: CartObjectType })
    t.nullable.field('paginatorInfo', { type: PaginatorObjectType })
  },
})

export const CartList = objectType({
  name: 'Carts',
  definition(t) {
    t.nullable.list.nullable.field('data', { type: CartObjectType })
  },
})
