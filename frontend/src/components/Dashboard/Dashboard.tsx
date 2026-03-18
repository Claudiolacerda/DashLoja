import { useState, useEffect } from 'react';
import { api, Dashboard as DashboardType } from '../../services/api';
import { DateFilter } from './DateFilter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Package } from 'lucide-react';

export function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardType | null>(null);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');

  const loadDashboard = async () => {
    try {
      const data = await api.getDashboard(startDate, endDate);
      setDashboard(data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const chartData = dashboard ? [
    { name: 'Faturamento', valor: dashboard.totalRevenue, cor: '#3B82F6' },
    { name: 'Custo', valor: dashboard.totalCost, cor: '#EF4444' },
    { name: 'Lucro', valor: dashboard.profit, cor: '#10B981' },
  ] : [];

  return (
    <div className="mb-12">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Dashboard Financeiro</h2>
            <p className="text-sm text-slate-400">Análise completa do seu negócio</p>
          </div>
        </div>
      </div>

      <DateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFilter={loadDashboard}
      />

      {dashboard && (
        <>
          {/* CARDS MÉTRICAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* LUCRO */}
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl">💰</span>
              </div>
              <p className="text-sm font-medium text-green-300 mb-1">Lucro</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(dashboard.profit)}</p>
              <p className="text-xs text-green-400 mt-2">
                Margem: {dashboard.totalRevenue > 0 ? ((dashboard.profit / dashboard.totalRevenue) * 100).toFixed(1) : 0}%
              </p>
            </div>

            {/* FATURAMENTO */}
            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border-2 border-blue-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl">💵</span>
              </div>
              <p className="text-sm font-medium text-blue-300 mb-1">Faturamento</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(dashboard.totalRevenue)}</p>
              <p className="text-xs text-blue-400 mt-2">
                Receita total do período
              </p>
            </div>

            {/* CUSTO */}
            <div className="bg-gradient-to-br from-red-900/40 to-rose-900/40 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl">💸</span>
              </div>
              <p className="text-sm font-medium text-red-300 mb-1">Custo Total</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(dashboard.totalCost)}</p>
              <p className="text-xs text-red-400 mt-2">
                Custos operacionais
              </p>
            </div>

            {/* PEDIDOS */}
            <div className="bg-gradient-to-br from-slate-800/40 to-gray-900/40 backdrop-blur-sm border-2 border-slate-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center shadow-lg shadow-slate-500/50">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl">📦</span>
              </div>
              <p className="text-sm font-medium text-slate-300 mb-1">Total de Pedidos</p>
              <p className="text-3xl font-bold text-white">{dashboard.totalOrders}</p>
              <p className="text-xs text-slate-400 mt-2">
                Ticket médio: {dashboard.totalOrders > 0 ? formatCurrency(dashboard.totalRevenue / dashboard.totalOrders) : 'R$ 0,00'}
              </p>
            </div>
          </div>

          {/* GRÁFICO PREMIUM - FUNDO ESCURO */}
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/30 p-8 shadow-2xl overflow-hidden">
            {/* Efeito de brilho de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Análise Financeira</h3>
                  <p className="text-sm text-slate-400">Comparativo de receitas, custos e lucros</p>
                </div>
              </div>
              
              <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8}/>
                      </linearGradient>
                      <linearGradient id="colorCusto" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#B91C1C" stopOpacity={0.8}/>
                      </linearGradient>
                      <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.5} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#E2E8F0', fontSize: 13, fontWeight: 500 }} 
                      axisLine={{ stroke: '#334155' }}
                      tickLine={{ stroke: '#334155' }}
                    />
                    <YAxis 
                      tick={{ fill: '#E2E8F0', fontSize: 13 }} 
                      axisLine={{ stroke: '#334155' }}
                      tickLine={{ stroke: '#334155' }}
                    />
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                      contentStyle={{ 
                        backgroundColor: '#0F172A', 
                        border: '1px solid #475569',
                        borderRadius: '12px',
                        color: '#F1F5F9',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                        padding: '12px'
                      }}
                      labelStyle={{ color: '#CBD5E1', fontWeight: 600, marginBottom: '8px' }}
                      cursor={{ fill: '#1E293B', opacity: 0.3 }}
                    />
                    <Bar dataKey="valor" radius={[12, 12, 0, 0]} barSize={90}>
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.name === 'Faturamento' ? 'url(#colorFaturamento)' :
                            entry.name === 'Custo' ? 'url(#colorCusto)' :
                            'url(#colorLucro)'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}