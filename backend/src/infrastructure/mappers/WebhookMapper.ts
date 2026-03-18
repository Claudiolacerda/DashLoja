import { WebhookDTO } from '../../application/dtos';

export class WebhookMapper {
  static toDomain(externalWebhook: any): WebhookDTO {
    return {
      id: externalWebhook.id,
      buyer: {
        buyerName: externalWebhook.buyer.buyerName,
        buyerEmail: externalWebhook.buyer.buyerEmail
      },
      lineItems: externalWebhook.lineItems.map((item: any) => ({
        itemId: item.itemId,
        itemName: item.itemName,
        qty: item.qty,
        unitPrice: item.unitPrice
      })),
      totalAmount: externalWebhook.totalAmount,
      createdAt: externalWebhook.createdAt
    };
  }

  static isValid(data: any): boolean {
    return (
      data &&
      typeof data.id === 'string' &&
      data.buyer &&
      typeof data.buyer.buyerName === 'string' &&
      typeof data.buyer.buyerEmail === 'string' &&
      Array.isArray(data.lineItems) &&
      data.lineItems.length > 0 &&
      typeof data.totalAmount === 'number' &&
      typeof data.createdAt === 'string'
    );
  }
}