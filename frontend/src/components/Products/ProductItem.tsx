import { Product } from '../../services/api';

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
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-5 rounded-2xl hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between mb-3">
        <span className="px-2.5 py-1 bg-slate-900/50 text-slate-400 text-xs font-mono rounded-lg border border-slate-700/50">
          {product.id}
        </span>
      </div>
      <h3 className="font-semibold text-white text-lg mb-2">{product.name}</h3>
      <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {formatCurrency(product.price)}
      </p>
    </div>
  );
}