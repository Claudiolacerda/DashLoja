import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { Order } from '../../types';
import { OrderItem } from './OrderItem';

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Pedidos Recentes</h2>
      <p className="text-sm text-gray-500 mb-4">Últimos pedidos recebidos via webhook</p>

      <div className="overflow-x-auto bg-white rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Pedido</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cliente</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Data</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.slice(0, 5).map((order) => (
                <OrderItem key={order.id} order={order} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Nenhum pedido encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}