import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '../../../../lib/actions/order.actions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err });
  }

  const eventType = event.type;
  console.log(eventType);
  if (eventType === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { id, amount_total, metadata } = session;

    const coffeeIds = metadata?.coffeeId ? metadata.coffeeId.split(',') : [];
    const coffeeTitles = metadata?.coffeeTitle
      ? metadata.coffeeTitle.split(',')
      : [];
    const coffeePrices = metadata?.coffeePrice
      ? metadata.coffeePrice.split(',')
      : [];
    const coffeeQuantities = metadata?.coffeeQuantity
      ? metadata.coffeeQuantity.split(',')
      : [];
    const coffeeTotalAmounts = metadata?.coffeeTotalAmount
      ? metadata.coffeeTotalAmount.split(',')
      : [];

    const coffee = coffeeIds.map((coffeeId: string, index: number) => ({
      coffeeId,
      title: coffeeTitles[index] || `Coffee ${index + 1}`,
      quantity: coffeeQuantities[index] || '1',
      price: coffeePrices[index] || '0',
      totalCoffeeAmount: coffeeTotalAmounts[index] || '0',
    }));

    const order = {
      stripeId: id,
      coffee,
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    };
    console.log(order);
    try {
      const newOrder = await createOrder(order);
      return NextResponse.json({ message: 'OK', order: newOrder });
    } catch (error) {
      console.error('Error creating order in webhook:', error);
      return NextResponse.json({
        message: 'Error creating order',
        error: error,
      });
    }
  }

  return new Response('', { status: 200 });
}
