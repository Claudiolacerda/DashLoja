import { Dashboard } from './components/Dashboard/Dashboard';
import { OrderList } from './components/Orders/OrderList';
import { ProductList } from './components/Products/ProductList';
import { CostList } from './components/Costs/CostList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-blue-800/30 sticky top-0 z-50 shadow-xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-3xl">💰</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Controle Financeiro
              </h1>
              <p className="text-sm text-blue-300">Sistema de Gestão Empresarial</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Dashboard />
        <OrderList />
        <ProductList />
        <CostList />
      </main>

     <footer className="bg-slate-900/80 backdrop-blur-md border-t border-blue-800/30 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              © 2026 <span className="font-semibold text-blue-400">Controle Financeiro</span> - Desenvolvido por Claudio Lacerda
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">v1.0</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded-full border border-green-500/30">Online</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;