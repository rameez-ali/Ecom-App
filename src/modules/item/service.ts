import { GraphQLError } from 'graphql'
import Cart from './model'
import Product from '../product/model'
import { NexusGenInputs, NexusGenObjects } from 'nexus-typegen'
import { IContextType } from '../../types'
import {ObjectId} from "mongodb"
import User from '../user/model'
export const addCart = async ({
  ctx,
  payload,
}: {
  ctx: IContextType
  payload: NexusGenInputs['CartAdditionInput']
}): Promise<NexusGenObjects['User'] | any> => {

  const userId = ctx.user._id;

  try{
  const { quantity, productId } = payload

  const checkProduct = await Product.findOne({_id:productId});

  if (!checkProduct) {
    throw new GraphQLError("Product doesn't exist")
  }

  const cartcheck = await Cart.find({}).limit(1).sort({createdAt: -1});

  if(cartcheck.length == 0){
    const cartData = {
      items: [{
          productId: productId,
          quantity: quantity,
          total: checkProduct.price * quantity,
          price: checkProduct.price
      }],
      userId: userId,
  }

      const createdCart = await Cart.create(cartData);
      return createdCart
  }

  
  const checkItem = cartcheck[0].items?.some((dbItem) => {
    const item = dbItem.toObject()
    if(item.productId.toString() === productId) {
      return true
    }

    return false
  })
  

  if(checkItem) {

    const updatedItems = cartcheck[0].items?.map((dbItem) => {
      const item = dbItem.toObject()
      if(item.productId.toString() === productId) {
        return {...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price}
      }
  
      return item
    })
    console.log("matched")


    const h = await Cart.findByIdAndUpdate(

      { _id : cartcheck[0]._id },
      { $set : { "items": updatedItems }},
      { new: true}
    )

    return h
  } else {
    console.log("unmatched")

    const cartData = {
      items: [{
          productId: productId,
          quantity: quantity,
          total: checkProduct.price * quantity,
          price: checkProduct.price
      }],
      userId: userId,
  }

    const h = await Cart.findByIdAndUpdate(
      
      { _id : cartcheck[0]._id },
      { $push : { "items": cartData.items }},
      { new: true}
    )

    return h;
  }
      
}
catch (err) {
  throw new GraphQLError(err.message)
}
}

export const getCart = async (
  ctx: IContextType
): Promise<NexusGenObjects['User']> => {
  try {
    const cartcheck = await Cart.find().populate({ path: "items.productId", select: "name price total"});
    const cart = cartcheck[0];
    return cart
} catch (err) {
  throw new GraphQLError(err.message)
}
}



export const deleteTodoById = async (
  ctx: IContextType,
  payload: NexusGenInputs['GetCartByIdInput']
): Promise<NexusGenObjects['User']> => {
  
  const cartcheck = await Cart.find().populate({ path: "items.productId", select: "name price total"});
  const cart = cartcheck[0]
  cart.items = [];
  // cart.subTotal = 0
  const data = await cart.save();

  return data;

}

