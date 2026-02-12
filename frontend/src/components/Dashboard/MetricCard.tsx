interface MetricCardProps {
  title: string;
  value: string;
  color?: string;
}

export function MetricCard({ title, value, color = 'blue' }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    gray: 'bg-gray-50 border-gray-200',
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.gray}`}>
      <p className="text-sm text-gray-600 mb-2">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}