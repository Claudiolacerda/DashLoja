import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { ProductCost, Product } from '../../types';
import { CostEditor } from './CostEditor';

export function CostList() {
  const [costs, setCosts] = useState<ProductCost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [costsData, productsData] = await Promise.all([
        api.getProductCosts(),
        api.getProducts(),
      ]);
      setCosts(costsData);
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleUpdateCost = async (productId: string, newCost: number) => {
    try {
      await api.updateProductCost({ productId, cost: newCost });
      loadData();
    } catch (error) {
      console.error('Erro ao atualizar custo:', error);
    }
  };

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.name;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Custos de Produto</h2>
      <p className="text-sm text-gray-500 mb-4">Gerencie os custos dos seus produtos</p>

      <div className="overflow-x-auto bg-white rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Produto</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Custo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {costs.length > 0 ? (
              costs.map((cost) => (
                <CostEditor
                  key={cost.productId}
                  cost={cost}
                  productName={getProductName(cost.productId)}
                  onUpdate={handleUpdateCost}
                />
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                  Nenhum custo cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}