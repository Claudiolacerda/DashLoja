export interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: string;
}

export interface ProductCost {
  productId: string;
  cost: number;
  updatedAt: string;
}

export interface OrderItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  buyerName: string;
  buyerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

export interface Dashboard {
  totalOrders: number;
  totalRevenue: number;
  totalCost: number;
  profit: number;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}