import { z } from 'zod';

export const updateCostSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  cost: z.number().nonnegative('Cost cannot be negative')
});

export type UpdateCostInput = z.infer<typeof updateCostSchema>;