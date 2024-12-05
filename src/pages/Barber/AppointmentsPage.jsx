import React, { useState } from 'react';
import { Card, Button, LoadingSpinner } from '../../components/ui';
import { Calendar, Clock, User, Check, X, AlertCircle } from 'lucide-react';

const AppointmentCard = ({ appointment, onUpdateStatus }) => {
  const statusStyles = {
    pending: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      icon: AlertCircle
    },
    completed: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      icon: Check
    },
    cancelled: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: X
    }
  };

  const StatusIcon = statusStyles[appointment.status].icon;

  return (
    <Card className={`${statusStyles[appointment.status].bg} transition-colors`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{appointment.clientName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{appointment.date}</span>
            </div>
            <div className="text-gray-600">
              <span className="font-medium">Servicio: </span>
              {appointment.service}
            </div>
          </div>
          
          <div className={`flex items-center gap-2 ${statusStyles[appointment.status].text}`}>
            <StatusIcon className="w-5 h-5" />
            <span className="font-medium capitalize">{appointment.status}</span>
          </div>
        </div>

        {appointment.status === 'pending' && (
          <div className="mt-4 flex gap-2 justify-end">
            <Button
              variant="danger"
              size="sm"
              onClick={() => onUpdateStatus(appointment.id, 'cancelled')}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onUpdateStatus(appointment.id, 'completed')}
            >
              Completar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

const AppointmentsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('today');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  React.useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setAppointments([
        {
          id: 1,
          clientName: 'Juan Pérez',
          service: 'Corte de Cabello',
          date: '2024-12-04',
          time: '10:00',
          status: 'pending'
        },
        {
          id: 2,
          clientName: 'María López',
          service: 'Corte + Barba',
          date: '2024-12-04',
          time: '11:30',
          status: 'pending'
        },
        {
          id: 3,
          clientName: 'Carlos Ruiz',
          service: 'Barba',
          date: '2024-12-04',
          time: '14:00',
          status: 'completed'
        },
        {
          id: 4,
          clientName: 'Ana García',
          service: 'Tinte',
          date: '2024-12-04',
          time: '16:00',
          status: 'cancelled'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleUpdateStatus = (appointmentId, newStatus) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === appointmentId
        ? { ...appointment, status: newStatus }
        : appointment
    ));
  };

  const filteredAppointments = appointments.filter(appointment => {
    switch (activeTab) {
      case 'today':
        return appointment.date === selectedDate;
      case 'pending':
        return appointment.status === 'pending';
      case 'completed':
        return appointment.status === 'completed';
      case 'cancelled':
        return appointment.status === 'cancelled';
      default:
        return true;
    }
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
        <p className="text-gray-600">Gestiona tus citas programadas</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        />
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Button 
            variant={activeTab === 'today' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('today')}
          >
            Hoy
          </Button>
          <Button 
            variant={activeTab === 'pending' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('pending')}
          >
            Pendientes
          </Button>
          <Button 
            variant={activeTab === 'completed' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('completed')}
          >
            Completadas
          </Button>
          <Button 
            variant={activeTab === 'cancelled' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('cancelled')}
          >
            Canceladas
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onUpdateStatus={handleUpdateStatus}
            />
          ))
        ) : (
          <Card className="p-8 text-center text-gray-500">
            No hay citas para mostrar
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;