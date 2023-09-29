import { GraphQLError } from 'graphql'
import { NexusGenInputs } from '../../../nexus-typegen'
import { idArg, extendType, nonNull, stringArg } from 'nexus'
import { addProduct, updateProductById } from './service'
import {
  GetProductByIdInputType,
  ProductOptionsInputType,
  ProductAdditionInputType,
  ProductUpdateInputType,
} from './input-types'
import { ProductObjectType, ProductPaginator } from './types'
import { ReturnMessageObjectType } from '../common/types'
import { Console } from 'console'

export const ProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // Add Product
    t.nullable.field('addProduct', {
      type: ProductObjectType,
      args: {
        data: ProductAdditionInputType,
      },
      resolve(_, args) {
        // @ts-ignore
        const { data } = args

        return addProduct(data as NexusGenInputs['ProductAdditionInput'])
      },
    })

    t.nullable.field('updateProductById', {
      type: ProductObjectType,
      args: {
        data: ProductUpdateInputType,
        productId: GetProductByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data, productId } = args
        console.log(data)
        return await updateProductById({
          ctx,
          payload: data as NexusGenInputs['ProductUpdateInput'],
          productIdInput: productId as NexusGenInputs['GetProductByIdInput'],
        })
      },
    })
  },
})
