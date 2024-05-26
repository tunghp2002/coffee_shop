import { Schema, model, models } from 'mongoose';

export interface ISize extends Document {
  _id: string;
  name: string;
}

const SizeSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Size = models.size || model('Size', SizeSchema);

export default Size;
