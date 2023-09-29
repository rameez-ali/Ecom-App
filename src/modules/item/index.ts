import { CartMutation } from './mutation'
import { CartQuery } from './query'
import {
  CartGeneralNode,
  CartObjectType,
  CartPaginator,
  CartList,
} from './types'
import {
  CartOptionsInputType,
  CartAdditionInputType,
  CartUpdateInputType,
  GetCartByIdInputType,
} from './input-types'

const Todos = [
  CartObjectType,
  CartPaginator,
  CartGeneralNode,
  CartQuery,
  CartMutation,
  CartOptionsInputType,
  CartAdditionInputType,
  CartUpdateInputType,
  GetCartByIdInputType,
  CartList,
]

export default Todos
