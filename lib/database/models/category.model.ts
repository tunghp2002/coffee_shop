import { Schema, model, models, Document } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
});

const Category =
  models.Category || model<ICategory>('Category', CategorySchema);

export default Category;
