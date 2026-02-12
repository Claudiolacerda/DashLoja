import { Product } from '../../domain/entities/Product';
import { ProductCost } from '../../domain/entities/ProductCost';
import { Order } from '../../domain/entities/Order';

export class InMemoryDatabase {
  private static instance: InMemoryDatabase;
  
  private products: Map<string, Product> = new Map();
  private productCosts: Map<string, ProductCost> = new Map();
  private orders: Map<string, Order> = new Map();

  private constructor() {}

  static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase();
    }
    return InMemoryDatabase.instance;
  }

  getProducts(): Map<string, Product> {
    return this.products;
  }

  getProductCosts(): Map<string, ProductCost> {
    return this.productCosts;
  }

  getOrders(): Map<string, Order> {
    return this.orders;
  }

  reset(): void {
    this.products.clear();
    this.productCosts.clear();
    this.orders.clear();
  }
}