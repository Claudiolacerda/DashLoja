import { useState } from 'react';
import { ProductCost } from '../../services/api';

interface CostEditorProps {
  cost: ProductCost;
  productName?: string;
  onUpdate: (productId: string, newCost: number) => Promise<void>;
}

export function CostEditor({ cost, productName, onUpdate }: CostEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCost, setNewCost] = useState(cost.cost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(cost.productId, newCost);
    setIsEditing(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-900">
        {productName || cost.productId}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="number"
              value={newCost}
              onChange={(e) => setNewCost(parseFloat(e.target.value))}
              className="px-2 py-1 border rounded w-32"
              step="0.01"
              min="0"
              required
            />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setNewCost(cost.cost);
              }}
              className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </form>
        ) : (
          formatCurrency(cost.cost)
        )}
      </td>
      <td className="px-4 py-3 text-sm">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 border border-blue-200"
          >
            ✏️ Editar
          </button>
        )}
      </td>
    </tr>
  );
}