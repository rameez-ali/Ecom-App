import { inputObjectType } from 'nexus'

export const StripeCustomerAdditionInputType = inputObjectType({
  name: 'StripeCustomerAdditionInput',
  definition(t) {
    t.nonNull.string('customer_name')
    t.nonNull.string('customer_email')
  },
})

export const StripeCardAdditionInputType = inputObjectType({
  name: 'StripeCardAdditionInput',

  definition(t) {
    t.nonNull.string('customerId')
    t.nonNull.string('cardName')
    t.nonNull.int('cardExpYear')
    t.nonNull.int('cardExpMonth')
    t.nonNull.string('cardNumber')
    t.nonNull.string('cardCVC')
  },
})

export const StripeChargeAdditionInputType = inputObjectType({
  name: 'StripeChargeAdditionInput',

  definition(t) {
    t.nonNull.int('tamount')
  },
})

export const stripeRefundAdditionInputType = inputObjectType({
  name: 'stripeRefundAdditionInput',

  definition(t) {
    t.nonNull.int('amount')
    t.nonNull.string('invoiceId')
  },
})


