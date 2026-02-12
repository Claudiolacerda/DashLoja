import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { InMemoryDatabase } from '../database/InMemoryDatabase';

export class InMemoryProductRepository implements ProductRepository {
  private db = InMemoryDatabase.getInstance();

  async save(product: Product): Promise<void> {
    this.db.getProducts().set(product.id, product);
  }

  async findById(id: string): Promise<Product | null> {
    return this.db.getProducts().get(id) || null;
  }

  async findAll(): Promise<Product[]> {
    return Array.from(this.db.getProducts().values());
  }

  async exists(id: string): Promise<boolean> {
    return this.db.getProducts().has(id);
  }
}