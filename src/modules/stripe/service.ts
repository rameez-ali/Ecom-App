import User from '../user/model'
import Cart from '../item/model'
import {Order} from '../order/model'
import {OrderItem} from '../order/model'
import {Invoice} from '../order/model'
import { NexusGenInputs, NexusGenObjects } from 'nexus-typegen'
import { IContextType } from '../../types'
import { CustomerObjectType } from './types'
import { GraphQLError } from 'graphql'
import stripe from '../../lib/stripe'

export const addStripeCustomer = async (
  ctx: IContextType,
  payload: NexusGenInputs['StripeCustomerAdditionInput']
): Promise<NexusGenObjects['CustomerObject']> => {

  const userId = ctx.user._id;

  const { customer_name, customer_email} = payload

  try{
  const customer = await stripe.customers.create({
    name: customer_name,
    email: customer_email,
  });

  const user = await User.findByIdAndUpdate(
    userId,
    { $set:{stripe_customer_id:customer.id}},
    { new: true }
  )

  return {
    status: "success",
    message: `Customer created with ID: ${customer.id}`
  }
  }
  catch(error){
    throw new Error(error?.message)
  }

  

}

export const addStripeCard = async (
  ctx: IContextType,
  payload: NexusGenInputs['StripeCardAdditionInput']
): Promise<NexusGenObjects['StripeCardAdditionInput']> => {
  const { customerId, cardName, cardNumber, cardExpYear, cardExpMonth, cardCVC } = payload

  const userId = ctx.user._id;

  try{
    const card_Token = await stripe.tokens.create({
      card: {
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCVC,
      },
    });
    

    const card = await stripe.customers.createSource(customerId,{
      source: `${card_Token.id}`,
    })

    const user = await User.findByIdAndUpdate(
      userId,
      { $set:{stripe_card_id:card.id}},
      { new: true }
    )

    return {
      status: "success",
      message: `Card created with ID: ${card.id}`
    }
  }
  catch(error){
    throw new Error(error?.message)
  }
}

export const stripeCharge = async (
  ctx: IContextType,
)=> {

  const userId = ctx.user._id;

  const checkuser = await User.findOne({_id:userId});


  if (!checkuser?.stripe_card_id) {
    throw new GraphQLError("Please Add Card ")
  }

  if (!checkuser?.stripe_customer_id) {
    throw new GraphQLError("Please Add Stripe Customer")
  }
  
  const cartcheck = await Cart.findOne({userId:userId}).limit(1).sort({createdAt: -1});

  if (!cartcheck) {
    throw new GraphQLError("Please Add Products into Cart")
  }
  
  let price = 0;

  const chargedAmount = cartcheck.items?.map((dbItem) => {
           price += parseInt(dbItem.total);
  })

  const chargeprice = price;

  console.log("sda");
  
  try{
    const charge = await stripe.charges.create({
      amount: 100 * chargeprice,
      currency: 'usd',
      source: checkuser?.stripe_card_id,
      customer: checkuser?.stripe_customer_id,
    });

  const isoString = '2022-10-10';

  const dateObj = new Date(isoString);

  const createdOrder = await Order.create({
    userId:userId,
    date:dateObj,
  });

  let pid, qty, price;
  const checkItem = cartcheck.items?.some((dbItem) => {
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

  const createdInvoice = Invoice.create({
    orderId:createdOrder._id,
    userId:userId,
    totalAmount:chargeprice,
    chargeId:charge.id,
    type:"credit",
  })

    return {
      status: "success",
      message: `Charged Created with ID: : ${charge.id}`
    }
  }
  catch(error){
    throw new Error(error?.message)
  }
}

export const stripeRefund = async (
  ctx: IContextType,
  payload: NexusGenInputs['stripeRefundAdditionInput']
): Promise<NexusGenObjects['stripeRefundAdditionInput']> => {
  const { invoiceId, amount } = payload

  const userId = ctx.user._id;

  const invoicecheck = await Invoice.findOne({_id:invoiceId});

  console.log(invoicecheck._id);

  if (!invoicecheck) {
    throw new GraphQLError("No Invoice Found")
  }

  try{
    const refund = await stripe.refunds.create({
      charge: invoicecheck.chargeId,
      amount: amount * 100,
    });

    const createdrefundInvoice = Invoice.create({
      orderId:invoicecheck.orderId,
      userId:invoicecheck.userId,
      totalAmount:amount,
      orignalinvoiceId:invoicecheck._id,
      chargeId:invoicecheck.chargeId,
      type:"debit",
    })
    

    return {
      status: "success",
      message: `Refund created with ID: ${refund.id}`
    }
  }
  catch(error){
    throw new Error(error?.message)
  }
}
