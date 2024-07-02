import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { checkoutOrder, createOrder } from '@/lib/actions/order.actions';
import { CartItem } from '@/lib/database/models/coffee.model';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CheckoutProps = {
  cart: CartItem[];
  userId: string;
};

const Checkout = ({ cart, userId }: CheckoutProps) => {
  const cartItems = useSelector((state: RootState) => state.cart) as CartItem[];

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      coffee: cart.map((item) => ({
        coffeeId: item._id,
        title: item.title,
        quantity: Number(item.quantity).toString(),
        price: Number(item.price).toString(),
        totalCoffeeAmount: (
          Number(item.quantity) * Number(item.price)
        ).toString(),
      })),
      buyerId: userId,
      totalAmount: cart
        .reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        )
        .toString(),
      createdAt: new Date(),
    };
    console.log(order);

    await checkoutOrder(order);
  };

  return (
    <form onSubmit={onCheckout} method="post">
      <Button
        type="submit"
        role="link"
        size="lg"
        className="w-full mt-6 rounded-md"
        disabled={cart.length === 0}
      >
        Checkout
      </Button>
    </form>
  );
};

export default Checkout;
