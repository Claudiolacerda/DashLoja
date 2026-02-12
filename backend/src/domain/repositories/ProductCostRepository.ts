import { ProductCost } from '../entities/ProductCost';

export interface ProductCostRepository {
  save(productCost: ProductCost): Promise<void>;
  findByProductId(productId: string): Promise<ProductCost | null>;
  findAll(): Promise<ProductCost[]>;
  getCostMap(): Promise<Map<string, number>>;
}