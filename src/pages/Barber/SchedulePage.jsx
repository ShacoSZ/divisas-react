import React, { useState } from 'react';
import { Card, Button, LoadingSpinner } from '../../components/ui';
import { Clock, Save, Edit2, Plus, Trash2 } from 'lucide-react';

const TimeSlotEditor = ({ initialData, onSave, onCancel }) => {
  const [timeData, setTimeData] = useState(initialData || {
    start_time: '',
    end_time: '',
    start_rest_time: '',
    end_rest_time: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(timeData);
  };

  return (
    <Card className="p-4 bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora de inicio
            </label>
            <input
              type="time"
              value={timeData.start_time}
              onChange={(e) => setTimeData({ ...timeData, start_time: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora de fin
            </label>
            <input
              type="time"
              value={timeData.end_time}
              onChange={(e) => setTimeData({ ...timeData, end_time: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inicio de descanso
            </label>
            <input
              type="time"
              value={timeData.start_rest_time}
              onChange={(e) => setTimeData({ ...timeData, start_rest_time: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fin de descanso
            </label>
            <input
              type="time"
              value={timeData.end_rest_time}
              onChange={(e) => setTimeData({ ...timeData, end_rest_time: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>
      </form>
    </Card>
  );
};

const DaySchedule = ({ day, schedule, onUpdateSchedule, onDeleteSchedule }) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatTime = (time) => {
    return time ? new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }) : '---';
  };

  if (isEditing) {
    return (
      <TimeSlotEditor
        initialData={schedule}
        onSave={(timeData) => {
          onUpdateSchedule(day, timeData);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg capitalize">{day}</h3>
          {schedule ? (
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>Horario: {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}</span>
              </div>
              {schedule.start_rest_time && schedule.end_rest_time && (
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Descanso: {formatTime(schedule.start_rest_time)} - {formatTime(schedule.end_rest_time)}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No hay horario establecido</p>
          )}
        </div>
        <div className="flex gap-2">
          {schedule ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDeleteSchedule(day)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Agregar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const SchedulePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [schedules, setSchedules] = useState({});
  const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

  React.useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setSchedules({
        lunes: {
          start_time: '09:00',
          end_time: '18:00',
          start_rest_time: '13:00',
          end_rest_time: '14:00',
        },
        martes: {
          start_time: '09:00',
          end_time: '18:00',
          start_rest_time: '13:00',
          end_rest_time: '14:00',
        },
        miércoles: {
          start_time: '09:00',
          end_time: '18:00',
          start_rest_time: '13:00',
          end_rest_time: '14:00',
        }
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleUpdateSchedule = (day, scheduleData) => {
    setSchedules(prev => ({
      ...prev,
      [day]: scheduleData
    }));
  };

  const handleDeleteSchedule = (day) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      setSchedules(prev => {
        const newSchedules = { ...prev };
        delete newSchedules[day];
        return newSchedules;
      });
    }
  };

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
        <h1 className="text-2xl font-bold">Mi Horario</h1>
        <p className="text-gray-600">Gestiona tus días y horas de trabajo</p>
      </div>

      <div className="grid gap-4">
        {days.map(day => (
          <DaySchedule
            key={day}
            day={day}
            schedule={schedules[day]}
            onUpdateSchedule={handleUpdateSchedule}
            onDeleteSchedule={handleDeleteSchedule}
          />
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;