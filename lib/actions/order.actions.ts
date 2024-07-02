'use server';

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams } from '@/types';
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        ...order.coffee.map((item) => ({
          price_data: {
            currency: 'vnd',
            unit_amount: parseInt(item.price, 10),
            product_data: {
              name: item.title,
            },
          },
          quantity: parseInt(item.quantity, 10),
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
        coffeeId: order.coffee.map((item) => item.coffeeId).join(','),
        coffeeTitle: order.coffee.map((item) => item.title).join(','),
        coffeePrice: order.coffee.map((item) => item.price).join(','),
        coffeeQuantity: order.coffee.map((item) => item.quantity).join(','),
        coffeeTotalAmount: order.coffee.map((item) => item.totalCoffeeAmount).join(','),
        buyerId: order.buyerId,
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
      stripeId: order.stripeId,
      totalAmount: order.totalAmount,
      coffee: order.coffee.map((item) => ({
        coffeeId: item.coffeeId,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        totalCoffeeAmount: item.totalCoffeeAmount,
      })),
      buyerId: order.buyerId,
      createdAt: order.createdAt,
    });
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
    throw error;
  }
};
