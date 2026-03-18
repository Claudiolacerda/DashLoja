export class ProductCost {
  constructor(
    public readonly productId: string,
    public readonly cost: number,
    public readonly updatedAt: Date = new Date()
  ) {}

  static create(productId: string, cost: number): ProductCost {
    if (!productId || productId.trim() === '') {
      throw new Error('Product ID is required');
    }
    if (cost < 0) {
      throw new Error('Cost cannot be negative');
    }
    return new ProductCost(productId, cost);
  }

  update(newCost: number): ProductCost {
    if (newCost < 0) {
      throw new Error('Cost cannot be negative');
    }
    return new ProductCost(this.productId, newCost, new Date());
  }
}