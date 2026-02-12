import { ProductCost } from '../../domain/entities/ProductCost';
import { ProductCostRepository } from '../../domain/repositories/ProductCostRepository';
import { InMemoryDatabase } from '../database/InMemoryDatabase';

export class InMemoryProductCostRepository implements ProductCostRepository {
  private db = InMemoryDatabase.getInstance();

  async save(productCost: ProductCost): Promise<void> {
    this.db.getProductCosts().set(productCost.productId, productCost);
  }

  async findByProductId(productId: string): Promise<ProductCost | null> {
    return this.db.getProductCosts().get(productId) || null;
  }

  async findAll(): Promise<ProductCost[]> {
    return Array.from(this.db.getProductCosts().values());
  }

  async getCostMap(): Promise<Map<string, number>> {
    const costMap = new Map<string, number>();
    for (const [productId, productCost] of this.db.getProductCosts()) {
      costMap.set(productId, productCost.cost);
    }
    return costMap;
  }
}