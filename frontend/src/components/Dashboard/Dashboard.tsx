import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { Dashboard as DashboardType } from '../../types';
import { MetricCard } from './MetricCard';
import { DateFilter } from './DateFilter';

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

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h2>
      <p className="text-sm text-gray-500 mb-6">Visão geral da sua loja</p>

      <DateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFilter={loadDashboard}
      />

      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Lucro"
            value={formatCurrency(dashboard.profit)}
            color="blue"
          />
          <MetricCard
            title="Faturamento"
            value={formatCurrency(dashboard.totalRevenue)}
            color="green"
          />
          <MetricCard
            title="Custo Total"
            value={formatCurrency(dashboard.totalCost)}
            color="red"
          />
          <MetricCard
            title="Total de Pedidos"
            value={dashboard.totalOrders.toLocaleString()}
            color="gray"
          />
        </div>
      )}
    </div>
  );
}