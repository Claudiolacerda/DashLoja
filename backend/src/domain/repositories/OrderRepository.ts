import { Order } from '../entities/Order';

export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Order[]>;
  count(): Promise<number>;
  countByDateRange(startDate: Date, endDate: Date): Promise<number>;
}