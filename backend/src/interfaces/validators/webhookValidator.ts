import { z } from 'zod';

export const webhookSchema = z.object({
  id: z.string().min(1),
  buyer: z.object({
    buyerName: z.string().min(1),
    buyerEmail: z.string().email()
  }),
  lineItems: z.array(
    z.object({
      itemId: z.string().min(1),
      itemName: z.string().min(1),
      qty: z.number().positive(),
      unitPrice: z.number().positive()
    })
  ).min(1),
  totalAmount: z.number().positive(),
  createdAt: z.string().datetime()
});

export type WebhookInput = z.infer<typeof webhookSchema>;