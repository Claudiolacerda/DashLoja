import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { Product } from '../../types';
import { ProductItem } from './ProductItem';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: 0 });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createProduct(newProduct);
      setNewProduct({ id: '', name: '', price: 0 });
      setShowForm(false);
      loadProducts();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      alert('Erro ao criar produto. Verifique se o ID já existe.');
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Produtos</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"
        >
          + Novo
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-4 border">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="ID do Produto"
              value={newProduct.id}
              onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
              className="px-3 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Nome"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="px-3 py-2 border rounded-md"
              required
            />
            <input
              type="number"
              placeholder="Preço"
              value={newProduct.price || ''}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="px-3 py-2 border rounded-md"
              step="0.01"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Salvar Produto
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}