import React, { useState } from 'react';
import { Card, Button, LoadingSpinner } from '../../components/ui';
import { Calendar, Clock, Scissors, User, Check, X, AlertCircle } from 'lucide-react';

const AppointmentCard = ({ appointment }) => {
  const statusConfig = {
    pending: {
      icon: AlertCircle,
      text: 'Pendiente',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200'
    },
    completed: {
      icon: Check,
      text: 'Completada',
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    cancelled: {
      icon: X,
      text: 'Cancelada',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    }
  };

  const StatusIcon = statusConfig[appointment.status].icon;

  return (
    <Card className={`border ${statusConfig[appointment.status].bg} ${statusConfig[appointment.status].border}`}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{appointment.barberName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-gray-500" />
              <span>{appointment.service}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{appointment.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{appointment.time}</span>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <div className={`flex items-center gap-2 ${statusConfig[appointment.status].color}`}>
              <StatusIcon className="w-5 h-5" />
              <span className="font-medium">{statusConfig[appointment.status].text}</span>
            </div>
            <div className="text-lg font-semibold">
              ${appointment.price}
            </div>
            {appointment.status === 'pending' && (
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
                    // Aquí iría la lógica para cancelar la cita
                  }
                }}
              >
                Cancelar Cita
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

const ClientAppointments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  React.useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setAppointments([
        {
          id: 1,
          barberName: 'Carlos García',
          service: 'Corte de Cabello',
          date: '04 Dic 2024',
          time: '10:00 AM',
          price: 25.00,
          status: 'pending'
        },
        {
          id: 2,
          barberName: 'Ana Martínez',
          service: 'Corte + Barba',
          date: '10 Dic 2024',
          time: '11:30 AM',
          price: 35.00,
          status: 'pending'
        },
        {
          id: 3,
          barberName: 'Luis Rodríguez',
          service: 'Barba',
          date: '01 Dic 2024',
          time: '14:00 PM',
          price: 15.00,
          status: 'completed'
        },
        {
          id: 4,
          barberName: 'María López',
          service: 'Corte de Cabello',
          date: '28 Nov 2024',
          time: '16:00 PM',
          price: 25.00,
          status: 'cancelled'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    const today = new Date();
    const appointmentDate = new Date(appointment.date.replace('Dic', 'Dec'));
    
    if (activeTab === 'upcoming') {
      return appointmentDate >= today && appointment.status === 'pending';
    } else if (activeTab === 'past') {
      return appointmentDate < today || appointment.status !== 'pending';
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mis Citas</h1>
        <p className="text-gray-600">Revisa tus citas programadas e historial</p>
      </div>

      <div className="flex gap-4">
        <Button
          variant={activeTab === 'upcoming' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('upcoming')}
        >
          Próximas Citas
        </Button>
        <Button
          variant={activeTab === 'past' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('past')}
        >
          Historial
        </Button>
      </div>

      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))
        ) : (
          <Card className="p-8 text-center text-gray-500">
            No hay citas {activeTab === 'upcoming' ? 'programadas' : 'en el historial'}
          </Card>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={() => {
            // Aquí iría la navegación a la página de nueva cita
            // navigate('/new-appointment');
          }}
        >
          Programar Nueva Cita
        </Button>
      </div>
    </div>
  );
};

export default ClientAppointments;