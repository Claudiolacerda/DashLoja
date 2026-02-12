import { Order } from '../../domain/entities/Order';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { InMemoryDatabase } from '../database/InMemoryDatabase';

export class InMemoryOrderRepository implements OrderRepository {
  private db = InMemoryDatabase.getInstance();

  async save(order: Order): Promise<void> {
    this.db.getOrders().set(order.id, order);
  }

  async findById(id: string): Promise<Order | null> {
    return this.db.getOrders().get(id) || null;
  }

  async findAll(): Promise<Order[]> {
    return Array.from(this.db.getOrders().values());
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    const orders = Array.from(this.db.getOrders().values());
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  }

  async count(): Promise<number> {
    return this.db.getOrders().size;
  }

  async countByDateRange(startDate: Date, endDate: Date): Promise<number> {
    const orders = await this.findByDateRange(startDate, endDate);
    return orders.length;
  }
}