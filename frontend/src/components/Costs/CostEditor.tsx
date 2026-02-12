import { ProductCost } from '../../types';

interface CostEditorProps {
  cost: ProductCost;
  productName?: string;
  onUpdate: (productId: string, newCost: number) => void;
}

export function CostEditor({ cost, productName, onUpdate }: CostEditorProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">{productName || cost.productId}</td>
      <td className="px-4 py-3 text-sm font-medium">{formatCurrency(cost.cost)}</td>
      <td className="px-4 py-3">
        <button
          onClick={() => {
            const newCost = prompt('Novo custo:', cost.cost.toString());
            if (newCost && !isNaN(parseFloat(newCost))) {
              onUpdate(cost.productId, parseFloat(newCost));
            }
          }}
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
        >
          ✏️ Editar
        </button>
      </td>
    </tr>
  );
}