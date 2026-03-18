import { Order } from '../../services/api';

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
    <tr className="hover:bg-slate-700/30 transition-colors">
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-blue-400">{order.id}</span>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-white">{order.buyerName}</p>
          <p className="text-xs text-slate-400">{order.buyerEmail}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-300">{formatDate(order.createdAt)}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-semibold text-green-400">{formatCurrency(order.totalAmount)}</span>
      </td>
    </tr>
  );
}