import { Product, ProductCost, Order, Dashboard, ApiResponse } from '../src/types';

const API_URL = 'http://localhost:3001/api';

export const api = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    const data: ApiResponse<Product[]> = await response.json();
    return data.data;
  },

  async createProduct(product: { id: string; name: string; price: number }): Promise<Product> {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data: ApiResponse<Product> = await response.json();
    return data.data;
  },

  async getProductCosts(): Promise<ProductCost[]> {
    const response = await fetch(`${API_URL}/product-costs`);
    const data: ApiResponse<ProductCost[]> = await response.json();
    return data.data;
  },

  async updateProductCost(cost: { productId: string; cost: number }): Promise<ProductCost> {
    const response = await fetch(`${API_URL}/product-costs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cost),
    });
    const data: ApiResponse<ProductCost> = await response.json();
    return data.data;
  },

  async getOrders(): Promise<Order[]> {
    const response = await fetch(`${API_URL}/orders`);
    const data: ApiResponse<Order[]> = await response.json();
    return data.data;
  },

  async getDashboard(startDate?: string, endDate?: string): Promise<Dashboard> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await fetch(`${API_URL}/dashboard?${params}`);
    const data: ApiResponse<Dashboard> = await response.json();
    return data.data;
  },
};