import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { ProductCostRepository } from '../../domain/repositories/ProductCostRepository';
import { DashboardDTO, DashboardFilterDTO } from '../../src/dtos/dtos';

export class GetDashboardUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private productCostRepository: ProductCostRepository
  ) {}

  async execute(filter?: DashboardFilterDTO): Promise<DashboardDTO> {
    let orders;
    let totalOrders;

    if (filter?.startDate && filter?.endDate) {
      const startDate = new Date(filter.startDate);
      const endDate = new Date(filter.endDate);
      
      endDate.setHours(23, 59, 59, 999);

      orders = await this.orderRepository.findByDateRange(startDate, endDate);
      totalOrders = orders.length;
    } else {
      orders = await this.orderRepository.findAll();
      totalOrders = await this.orderRepository.count();
    }

    const costMap = await this.productCostRepository.getCostMap();

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    const totalCost = orders.reduce((sum, order) => {
      return sum + order.calculateTotalCost(costMap);
    }, 0);

    const profit = totalRevenue - totalCost;

    return {
      totalOrders,
      totalRevenue,
      totalCost,
      profit
    };
  }
}