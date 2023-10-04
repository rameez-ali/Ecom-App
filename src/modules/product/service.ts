import { checkIfUserAlreadyExist } from './helpers'
import { comparePassword, hashPassword } from '../../utils/auth.utils'
import { GraphQLError } from 'graphql'
import Product, { ITask, ITaskDocument } from './model'
import Todo from '../item/model'
import { NexusGenInputs, NexusGenObjects } from 'nexus-typegen'
import { signJwt } from '../../utils/jwt.utils'
import { IContextType } from '../../types'
import { FilterQuery } from 'mongoose'

export const getProducts = async (ctx: IContextType) => {
  const products = await Product.find()

  if (!products) {
    throw new GraphQLError("Product doesn't exist")
  }

  return {
    data: products,
  }
}

export const addProduct = async (
  payload: NexusGenInputs['ProductAdditionInput']
): Promise<NexusGenObjects['Product']> => {
  const { name, price, image } = payload

  const createdProduct = await Product.create({
    name,
    price,
    image,
  })

  // const h = await Product.findByIdAndUpdate(
  //   productId,
  //   { $push: { tasks: createdProduct._id } },
  //   { new: true, useFindAndModify: false }
  // )

  // console.log(h)

  return createdProduct
}

export const deleteProductById = async (
  ctx: IContextType,
  payload: NexusGenInputs['GetProductByIdInput']
): Promise<NexusGenObjects['User']> => {
  if (ctx.user) {
    const id = ctx.user._id
    if (!id) {
      throw new GraphQLError('Not Authorize')
    }

    const products = await Product.findByIdAndDelete({ _id: payload.taskId })

    if (!products) {
      throw new GraphQLError("Task doesn't exist")
    }

    // Detaching this Task from Todo
    const product = await Todo.findOne({ tasks: payload.taskId })
    if (product) {
      await Todo.findByIdAndUpdate(product._id, {
        $pull: { tasks: payload.taskId },
      })
    }

    return products
  }

  throw new GraphQLError('Not Authorize')
}

export const updateProductById = async ({
  ctx,
  payload,
  productIdInput,
}: {
  ctx: IContextType
  payload: NexusGenInputs['ProductUpdateInput']
  productIdInput: NexusGenInputs['GetProductByIdInput']
}): Promise<NexusGenObjects['User'] | any> => {
  try {
    if (!ctx.user._id) {
      throw new GraphQLError('Unauthorized')
    }

    const { productId } = productIdInput

    const product = await Product.findById(productId)

    if (!product) {
      throw new GraphQLError('No product found')
    }

    console.log(payload)
    const { ...data } = payload
    const productUpdate = await Product.findByIdAndUpdate(
      productId,
      { ...data },
      { new: true }
    )
    if (productUpdate) return productUpdate
  } catch (err: any) {
    throw new GraphQLError(err.message)
  }
}
