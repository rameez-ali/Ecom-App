import { GraphQLError } from 'graphql'
import { Order } from './model'
import { OrderItem } from './model'
import { Invoice } from './model'
import Cart from '../item/model'
import { NexusGenInputs, NexusGenObjects } from 'nexus-typegen'
import { IContextType } from '../../types'
import { Collection, ObjectId } from 'mongodb'

export const addOrder = async ({
  ctx,
  payload,
}: {
  ctx: IContextType
  payload: NexusGenInputs['OrderAdditionInput']
}): Promise<NexusGenObjects['User'] | any> => {
  const userId = ctx.user._id

  try {
    const { userId } = payload

    const cartcheck = await Cart.find({}).limit(1).sort({ createdAt: -1 })

    const isoString = '2022-10-10'

    const dateObj = new Date(isoString)

    const createdOrder = await Order.create({
      userId: userId,
      date: dateObj,
    })

    console.log(createdOrder)

    let pid, qty, price
    const checkItem = cartcheck[0].items?.some((dbItem) => {
      console.log(dbItem)
      pid = dbItem.productId
      qty = dbItem.quantity
      price = dbItem.price

      const createdOrderItem = OrderItem.create({
        orderId: createdOrder._id,
        productId: pid,
        quantity: qty,
        price: price,
      })
    })

    return createdOrder
  } catch (err) {
    throw new GraphQLError(err.message)
  }
}

export const getInvoices = async (ctx: IContextType) => {
  const userId = ctx.user._id

  const invoices = await Invoice.aggregate([
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          _id: ObjectId('6516c5d005d82e3f4aae5fe2'),
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: 'orders',
          localField: 'orderId',
          foreignField: '_id',
          as: 'order',
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: 'orderitems',
          localField: 'orderId',
          foreignField: 'orderId',
          as: 'orderitems',
        },
    },
  ])

  console.log(invoices)

  // return {
  //   data: invoices[0],
  // }

  return invoices.map((invoice) => ({
    ...invoice,
    orderId: invoice.order[0],
    orderIds: invoice.orderitems[0],
  }))

  //return invoices

  //return invoices
}
