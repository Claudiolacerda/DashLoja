import { Product } from '../../types';

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{product.id}</p>
        </div>
        <span className="text-lg font-bold text-gray-900">
          {formatCurrency(product.price)}
        </span>
      </div>
    </div>
  );
}