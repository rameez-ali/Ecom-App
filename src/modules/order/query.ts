import { IContextType } from 'src/types'
import { idArg, nonNull, extendType, nullable } from 'nexus'

import { CartList, CartObjectType, CartPaginator } from './types'
import {getCart } from './service'
import { GetCartByIdInputType, CartOptionsInputType } from './input-types'
import { PaginatorFilterInputType } from '../common/input-types'
import { NexusGenInputs } from 'nexus-typegen'

export const CartQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('getCartById', {
      type: CartObjectType,
      args: {
        data: GetCartByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await getCartById(
          ctx,
          data as NexusGenInputs['GetCartByIdInput']
        )
      },
    })

    t.nullable.field('deleteCartById', {
      type: CartObjectType,
      args: {
        data: GetCartByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await deleteCartById(
          ctx,
          data as NexusGenInputs['GetCartByIdInput']
        )
      },
    })
  },
})
