import { ProductMutation } from './mutation'
import { ProductQuery } from './query'
import {
  ProductGeneralNode,
  ProductObjectType,
  ProductPaginator,
  ProductList,
} from './types'
import {
  ProductOptionsInputType,
  ProductAdditionInputType,
  ProductUpdateInputType,
  GetProductByIdInputType,
} from './input-types'

const Products = [
  ProductObjectType,
  ProductPaginator,
  ProductGeneralNode,
  ProductQuery,
  ProductMutation,
  ProductOptionsInputType,
  ProductAdditionInputType,
  ProductUpdateInputType,
  GetProductByIdInputType,
  ProductList,
]

export default Products
