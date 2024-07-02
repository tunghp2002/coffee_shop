import { Schema, model, models, Document } from 'mongoose';

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  coffee: Array<{
    coffeeId: string;
    title: string;
    quantity: string;
    price: string;
    totalCoffeeAmount: string;
  }>;
  buyerId: string;
}

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  coffee: [
    {
      coffeeId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      totalCoffeeAmount: {
        type: String,
        required: true,
      },
    },
  ],
  buyerId: {
    type: String,
    required: true,
  },
});

const Order = models?.Order || model<IOrder>('Order', OrderSchema);

export default Order;
