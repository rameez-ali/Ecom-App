import { GraphQLError } from 'graphql'
import { NexusGenInputs } from '../../../nexus-typegen'
import { idArg, extendType, nonNull, stringArg } from 'nexus'
import { addStripeCustomer, addStripeCard, stripeCharge, stripeRefund } from './service'
import { CustomerObjectType } from './types'
import {
  StripeCardAdditionInputType,
  StripeCustomerAdditionInputType,
  StripeChargeAdditionInputType,
  stripeRefundAdditionInputType,
} from './input-types';
export const StripeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    
    t.nullable.field('addCustomer', {
      type: CustomerObjectType,
      args: {
        data: StripeCustomerAdditionInputType,
      },
      resolve(_, args, ctx) {
        // @ts-ignore
        const { data } = args

        return addStripeCustomer(ctx, data as NexusGenInputs['StripeCustomerAdditionInput'])
      },
    })

    t.nullable.field('addCard', {
      type: CustomerObjectType,
      args: {
        data: StripeCardAdditionInputType,
      },
      resolve(_, args, ctx) {
        // @ts-ignore
        const { data } = args

        return addStripeCard(ctx, data as NexusGenInputs['StripeCardAdditionInput'])
      },
    })

    t.nullable.field('charge', {
      type: CustomerObjectType,
      args: {
        
      },

      resolve(_, args, ctx) {
        // @ts-ignore
        const { data } = args

        return stripeCharge(ctx)
      },
    })

    t.nullable.field('refund', {
      type: CustomerObjectType,
      args: {
        data: stripeRefundAdditionInputType,
      },

      resolve(_, args, ctx) {
        // @ts-ignore
        const { data } = args

        return stripeRefund(ctx, data as NexusGenInputs['stripeRefundAdditionInput'])
      },
    })



  },
})
