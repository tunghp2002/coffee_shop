import { Schema, model, models, Document } from 'mongoose';

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  coffee: Array<{
    _id: string;
    title: string;
  }>;
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
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
  },
  coffee: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Coffee',
    },
  ],
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Order = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
