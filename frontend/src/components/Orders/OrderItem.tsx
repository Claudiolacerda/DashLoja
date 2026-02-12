import { Order } from '../../types';

interface OrderItemProps {
  order: Order;
}

export function OrderItem({ order }: OrderItemProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">{order.id}</td>
      <td className="px-4 py-3 text-sm">{order.buyerName}</td>
      <td className="px-4 py-3 text-sm">{formatDate(order.createdAt)}</td>
      <td className="px-4 py-3 text-sm font-medium">{formatCurrency(order.totalAmount)}</td>
    </tr>
  );
}
