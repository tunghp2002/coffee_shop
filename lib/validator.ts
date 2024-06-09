import { z } from 'zod';

export const coffeeFormSchema = z.object({
  title: z.string().min(3, 'Description must be at least 3 characters.'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters.')
    .max(400, 'Description must be less than 400 characters'),
  imageUrl: z.string(),
  categoryId: z.string(),
  price: z.string(),
});
