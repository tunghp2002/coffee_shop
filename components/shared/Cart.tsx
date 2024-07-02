'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import IconCross from '@/public/assets/icons/IconCross';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '@/store/cartSlice';
import CheckoutButton from './CheckoutButton';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubTotal(total);
  }, [cart]);

  return (
    <div className="h-screen pt-20 wrapper">
      <h1 className="mb-10 text-center text-2xl font-bold">Your Cart</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <ul>
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <li key={item._id} className="mb-6 mx-auto max-w-5xl px-6">
                <div className="rounded-lg md:flex md:space-x-6 xl:px-0 bg-white shadow-md">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between p-6">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between items-center sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <Button
                          className="p-medium-16 cursor-pointer h-8 rounded-none rounded-l bg-gray-100 py-1 px-3.5 duration-100 text-primary hover:text-blue-50"
                          onClick={() => dispatch(decreaseQuantity(item))}
                        >
                          -
                        </Button>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={item.quantity}
                          min="1"
                          readOnly
                        />
                        <Button
                          className="p-medium-16 h-8 cursor-pointer rounded-none rounded-r bg-gray-100 py-1 px-3 duration-100 text-primary hover:text-blue-50"
                          onClick={() => dispatch(increaseQuantity(item))}
                        >
                          +
                        </Button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <p className="text-sm w-full">{item.price} VND</p>
                        <IconCross
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => dispatch(removeFromCart(item))}
                          height={20}
                          width={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </ul>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 mx-auto">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{subTotal} VND</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">50,000 VND</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{subTotal + 50000} VND</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <CheckoutButton cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
