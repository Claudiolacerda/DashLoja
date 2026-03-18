import { z } from 'zod';

export const createProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price must be positive')
});

export type CreateProductInput = z.infer<typeof createProductSchema>;