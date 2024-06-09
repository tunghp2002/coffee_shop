import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ICoffeeWithQuantity } from '@/store/cartSlice';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ userId }: { userId: string }) => {
  const cart = useSelector(
    (state: RootState) => state.cart
  ) as ICoffeeWithQuantity[];

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
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const order = cart.map((item) => ({
      coffeeTitle: item.title,
      coffeeId: item._id,
      price: item.price,
      quantity: item.quantity,
      buyerId: userId,
    }));
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
