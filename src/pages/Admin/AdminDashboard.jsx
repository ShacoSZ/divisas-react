import React, { useState } from 'react';
import { Card, LoadingSpinner } from '../../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Users, Scissors, TrendingUp, AlertCircle } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card className="flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Citas Hoy"
        value={stats.todayAppointments}
        icon={Calendar}
        color="bg-blue-500"
      />
      <StatCard
        title="Barberos Activos"
        value={stats.activeBarbers}
        icon={Users}
        color="bg-green-500"
      />
      <StatCard
        title="Servicios Activos"
        value={stats.activeServices}
        icon={Scissors}
        color="bg-purple-500"
      />
    </div>
  );
};

const TodayAppointments = ({ appointments }) => (
  <Card className="mt-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Citas de Hoy</h2>
      <Clock className="w-5 h-5 text-gray-500" />
    </div>
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">{appointment.clientName}</p>
            <p className="text-sm text-gray-600">{appointment.serviceName}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{appointment.time}</p>
            <p className="text-sm text-gray-600">{appointment.barberName}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const PopularServices = ({ services }) => (
  <Card className="mt-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Servicios Más Populares</h2>
      <TrendingUp className="w-5 h-5 text-gray-500" />
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={services}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="appointments" fill="#4F46E5" />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

const Alerts = ({ alerts }) => (
  <Card className="mt-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Alertas</h2>
      <AlertCircle className="w-5 h-5 text-gray-500" />
    </div>
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <div 
          key={index} 
          className={`p-3 rounded-lg ${
            alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
            alert.type === 'error' ? 'bg-red-50 text-red-700' :
            'bg-blue-50 text-blue-700'
          }`}
        >
          <p>{alert.message}</p>
        </div>
      ))}
    </div>
  </Card>
);

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Simular datos para el ejemplo
  React.useEffect(() => {
    // Aquí iría la llamada a la API real
    const mockData = {
      stats: {
        todayAppointments: 15,
        activeBarbers: 5,
        activeServices: 8
      },
      appointments: [
        { id: 1, clientName: 'Juan Pérez', serviceName: 'Corte de Cabello', time: '10:00', barberName: 'Carlos' },
        { id: 2, clientName: 'María García', serviceName: 'Barba', time: '11:30', barberName: 'Luis' },
        { id: 3, clientName: 'Pedro López', serviceName: 'Corte + Barba', time: '14:00', barberName: 'Ana' },
      ],
      popularServices: [
        { name: 'Corte de Cabello', appointments: 45 },
        { name: 'Barba', appointments: 30 },
        { name: 'Corte + Barba', appointments: 25 },
        { name: 'Afeitado', appointments: 15 },
      ],
      alerts: [
        { type: 'warning', message: 'Barbero Luis no ha confirmado su horario para mañana' },
        { type: 'error', message: 'Servicio "Tinte de Cabello" sin barbero asignado' },
        { type: 'info', message: 'Nueva actualización de precios pendiente de revisar' },
      ]
    };

    setTimeout(() => {
      setDashboardData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <DashboardStats stats={dashboardData.stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TodayAppointments appointments={dashboardData.appointments} />
          <Alerts alerts={dashboardData.alerts} />
        </div>
        <div>
          <PopularServices services={dashboardData.popularServices} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;