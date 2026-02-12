import { Order } from '../../domain/entities/Order';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { WebhookDTO } from '../../src/dtos/dtos';
import { AppError } from '../../shared/errors/AppError';

export class ProcessWebhookUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(webhookData: WebhookDTO): Promise<Order> {
    const existingOrder = await this.orderRepository.findById(webhookData.id);
    
    if (existingOrder) {
      throw new AppError('Order already processed', 409);
    }

    const order = Order.create(
      webhookData.id,
      webhookData.buyer.buyerName,
      webhookData.buyer.buyerEmail,
      webhookData.lineItems.map(item => ({
        itemId: item.itemId,
        itemName: item.itemName,
        quantity: item.qty,
        unitPrice: item.unitPrice
      })),
      webhookData.totalAmount,
      new Date(webhookData.createdAt)
    );

    await this.orderRepository.save(order);

    return order;
  }
}