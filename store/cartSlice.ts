import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, ICoffee } from '@/lib/database/models/coffee.model';

type CartState = CartItem[];

const initialState: CartState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICoffee>) => {
      const existingItem = state.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<ICoffee>) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
    increaseQuantity: (state, action: PayloadAction<ICoffee>) => {
      const item = state.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<ICoffee>) => {
      const item = state.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
