export interface OrderItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
}

export class Order {
  constructor(
    public readonly id: string,
    public readonly buyerName: string,
    public readonly buyerEmail: string,
    public readonly items: OrderItem[],
    public readonly totalAmount: number,
    public readonly createdAt: Date
  ) {}

  static create(
    id: string,
    buyerName: string,
    buyerEmail: string,
    items: OrderItem[],
    totalAmount: number,
    createdAt: Date
  ): Order {
    if (!id || id.trim() === '') throw new Error('Order ID is required');
    if (!buyerName || buyerName.trim() === '') throw new Error('Buyer name is required');
    if (!buyerEmail || buyerEmail.trim() === '') throw new Error('Buyer email is required');
    if (!items || items.length === 0) throw new Error('Order must have at least one item');
    if (totalAmount <= 0) throw new Error('Total amount must be greater than zero');
    return new Order(id, buyerName, buyerEmail, items, totalAmount, createdAt);
  }

  calculateTotalCost(productCosts: Map<string, number>): number {
    return this.items.reduce((total, item) => {
      const cost = productCosts.get(item.itemId) || 0;
      return total + (cost * item.quantity);
    }, 0);
  }
}