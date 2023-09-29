import { StripeMutation } from './mutation'
import {
  StripeCardAdditionInputType,
  StripeCustomerAdditionInputType,
  StripeChargeAdditionInputType,
} from './input-types'
import { CustomerGeneralNode, CustomerObjectType } from "./types"

const Stripes = [
  StripeMutation,
  StripeCardAdditionInputType,
  StripeCustomerAdditionInputType,
  StripeChargeAdditionInputType,
  CustomerGeneralNode, CustomerObjectType
]

export default Stripes
