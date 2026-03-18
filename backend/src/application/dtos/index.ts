export interface CreateProductDTO {
  id: string;
  name: string;
  price: number;
}

export interface UpdateCostDTO {
  productId: string;
  cost: number;
}

export interface WebhookDTO {
  id: string;
  buyer: {
    buyerName: string;
    buyerEmail: string;
  };
  lineItems: Array<{
    itemId: string;
    itemName: string;
    qty: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  createdAt: string;
}

export interface DashboardDTO {
  totalOrders: number;
  totalRevenue: number;
  totalCost: number;
  profit: number;
}

export interface DashboardFilterDTO {
  startDate?: string;
  endDate?: string;
}