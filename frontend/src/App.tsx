import { Dashboard } from './components/Dashboard/Dashboard';
import { OrderList } from './components/Orders/OrderList';
import { ProductList } from './components/Products/ProductList';
import { CostList } from './components/Costs/CostList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">💰 Controle Financeiro</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Dashboard />
        <OrderList />
        <ProductList />
        <CostList />
      </main>
    </div>
  );
}

export default App;