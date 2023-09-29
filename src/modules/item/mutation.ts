import { GraphQLError } from 'graphql'
import { NexusGenInputs } from '../../../nexus-typegen'
import { idArg, mutationType, nonNull, stringArg, extendType } from 'nexus'
import { addCart, getCart } from './service'
import {
  CartAdditionInputType,
  GetCartByIdInputType,
  CartOptionsInputType,
  CartUpdateInputType,
} from './input-types'
import { CartObjectType, CartList, CartPaginator } from './types'
import { ReturnMessageObjectType } from '../common/types'

export const CartMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // Register Job Seeker

    t.nullable.field('addCart', {
      type: CartObjectType,
      args: {
        data: CartAdditionInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await addCart({
          ctx,
          payload: data as NexusGenInputs['CartAdditionInput'],
        })
      },
    })

  },
})
