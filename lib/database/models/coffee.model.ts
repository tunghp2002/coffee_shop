import { Schema, model, models, Document } from 'mongoose';

export interface ICoffee extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  price: string;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const CoffeeSchema = new Schema<ICoffee>({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  price: { type: String, required: true },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Coffee = models.Coffee || model<ICoffee>('Coffee', CoffeeSchema);

export default Coffee;
