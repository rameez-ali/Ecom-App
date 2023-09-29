import { IContextType } from 'src/types'
import { idArg, nonNull, extendType, nullable } from 'nexus'

import { ProductList, ProductObjectType, ProductPaginator } from './types'
import { deleteProductById, getProducts } from './service'
import { GetProductByIdInputType, ProductOptionsInputType } from './input-types'
import { PaginatorFilterInputType } from '../common/input-types'
import { NexusGenInputs } from 'nexus-typegen'

export const ProductQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getProducts', {
      type: ProductPaginator,
      args: {
        options: nullable(ProductOptionsInputType),
        paginator: nullable(PaginatorFilterInputType),
      },
      async resolve(_, args, ctx: IContextType) {
        const data = await getProducts(
          ctx,
          args.paginator as NexusGenInputs['PaginatorFilterInput']
        )
        return data
      },
    })

    t.nullable.field('deleteProductById', {
      type: ProductObjectType,
      args: {
        data: GetProductByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await deleteProductById(
          ctx,
          data as NexusGenInputs['GetProductByIdInput']
        )
      },
    })
  },
})
