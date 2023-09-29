import { GraphQLError } from 'graphql'
import {Order} from './model'
import {OrderItem} from './model'
import Cart from '../item/model'
import { NexusGenInputs, NexusGenObjects } from 'nexus-typegen'
import { IContextType } from '../../types'

export const addOrder = async ({
  ctx,
  payload,
}: {
  ctx: IContextType
  payload: NexusGenInputs['OrderAdditionInput']
}): Promise<NexusGenObjects['User'] | any> => {

  const userId = ctx.user._id;

  try{
  
  const {userId } = payload

  const cartcheck = await Cart.find({}).limit(1).sort({createdAt: -1});

  const isoString = '2022-10-10';

  const dateObj = new Date(isoString);

  const createdOrder = await Order.create({
    userId:userId,
    date:dateObj,
  });

  console.log(createdOrder)

  let pid, qty, price;
  const checkItem = cartcheck[0].items?.some((dbItem) => {

    console.log(dbItem)
    pid = dbItem.productId;
    qty = dbItem.quantity;
    price = dbItem.price;

    
    
    const createdOrderItem = OrderItem.create({
      orderId:createdOrder._id,
      productId:pid,
      quantity:qty,
      price:price,
    })
  })
  
  return createdOrder

}
catch (err) {
  throw new GraphQLError(err.message)
}
}


export const GetOrderByIdInputType = async (
  ctx: IContextType,
  payload: NexusGenInputs['GetOrderByIdInput']
): Promise<NexusGenObjects['User']> => {
  
  const order = await Order.find();

  return order;

}

