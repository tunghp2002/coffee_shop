'use server';
import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams } from '../../types';
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';

export const checkoutOrder = async (order: CheckoutOrderParams[]) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        ...order.map((item) => ({
          price_data: {
            currency: 'vnd',
            unit_amount: item.price,
            product_data: {
              name: item.coffeeTitle,
            },
          },
          quantity: item.quantity,
        })),
        {
          price_data: {
            currency: 'vnd',
            unit_amount: 50000,
            product_data: {
              name: 'Shipping Charge',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        coffeeId: order.map((item) => item.coffeeId).join(','),
        buyerId: order[0].buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (error) {
    console.error('Stripe session creation error:', error);
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    const newOrder = await Order.create({
      ...order,
      coffee: order.coffeeId,
      buyer: order.buyerId,
    });
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};
