import { GraphQLError } from 'graphql'
import { NexusGenInputs } from '../../../nexus-typegen'
import {extendType } from 'nexus'
import { addOrder} from './service'
import {
  OrderAdditionInputType,
} from './input-types'
import { OrderObjectType} from './types'

export const OrderMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // Register Job Seeker

    t.nullable.field('addOrder', {
      type: OrderObjectType,
      args: {
        data: OrderAdditionInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await addOrder({
          ctx,
          payload: data as NexusGenInputs['OrderAdditionInput'],
        })
      },
    })

  },
})
