import { inputObjectType, objectType, interfaceType } from 'nexus'
import { DateTime } from '../scalars'
import { PaginatorObjectType } from '../common/types'

export const ProductGeneralNode = interfaceType({
  name: 'ProductGeneral',
  definition(t) {
    t.nonNull.id('_id')
    t.nullable.string('name')
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('updatedAt', { type: 'DateTime' })
  },
})

export const ProductObjectType = objectType({
  name: 'Product',
  definition(t) {
    t.implements(ProductGeneralNode)
  },
})

export const ProductPaginator = objectType({
  name: 'ProductPaginator',
  definition(t) {
    t.nullable.list.nullable.field('data', { type: ProductObjectType })
    t.nullable.field('paginatorInfo', { type: PaginatorObjectType })
  },
})

export const ProductList = objectType({
  name: 'Products',
  definition(t) {
    t.nullable.list.nullable.field('data', { type: ProductObjectType })
  },
})
