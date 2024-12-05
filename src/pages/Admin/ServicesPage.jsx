import React, { useState } from 'react';
import { Card, Button, Input, LoadingSpinner } from '../../components/ui';
import { Plus, Edit, Trash2, Check, X, DollarSign } from 'lucide-react';

const ServiceDialog = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    service || {
      name: '',
      description: '',
      price: '',
      active: true
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, price: parseFloat(formData.price) });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {service ? 'Editar Servicio' : 'Nuevo Servicio'}
            </h2>
            <button 
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <Input
            label="Nombre del Servicio"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              rows={3}
              required
            />
          </div>

          <Input
            label="Precio"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            prefix={<DollarSign className="w-4 h-4 text-gray-500" />}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {service ? 'Guardar Cambios' : 'Crear Servicio'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

const ServiceCard = ({ service, onEdit, onToggleActive, onDelete }) => (
  <Card className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 space-y-4 md:space-y-0">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-lg">{service.name}</h3>
        <span className="text-green-600 font-medium">
          ${service.price.toFixed(2)}
        </span>
      </div>
      <p className="text-gray-600 mt-1">{service.description}</p>
    </div>

    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
      <Button 
        variant={service.active ? "secondary" : "primary"}
        onClick={() => onToggleActive(service.id)}
        size="sm"
      >
        {service.active ? (
          <span className="flex items-center gap-1">
            <Check size={16} /> Activo
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <X size={16} /> Inactivo
          </span>
        )}
      </Button>

      <Button
        variant="outline"
        onClick={() => onEdit(service)}
        size="sm"
      >
        <Edit size={16} />
      </Button>

      <Button
        variant="danger"
        onClick={() => onDelete(service.id)}
        size="sm"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  </Card>
);

const ServicesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  React.useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setServices([
        {
          id: 1,
          name: 'Corte de Cabello',
          description: 'Corte de cabello profesional con acabado y estilo personalizado.',
          price: 25.00,
          active: true
        },
        {
          id: 2,
          name: 'Barba',
          description: 'Recorte y perfilado de barba, incluye productos para el cuidado.',
          price: 15.00,
          active: true
        },
        {
          id: 3,
          name: 'Corte + Barba',
          description: 'Combinación de corte de cabello y arreglo de barba con descuento.',
          price: 35.00,
          active: true
        },
        {
          id: 4,
          name: 'Tinte',
          description: 'Coloración profesional con productos de alta calidad.',
          price: 45.00,
          active: false
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSave = (serviceData) => {
    if (selectedService) {
      setServices(services.map(s => 
        s.id === selectedService.id ? { ...s, ...serviceData } : s
      ));
    } else {
      setServices([...services, { ...serviceData, id: Date.now() }]);
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowDialog(true);
  };

  const handleToggleActive = (serviceId) => {
    setServices(services.map(s =>
      s.id === serviceId ? { ...s, active: !s.active } : s
    ));
  };

  const handleDelete = (serviceId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      setServices(services.filter(s => s.id !== serviceId));
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Servicios</h1>
        <Button
          onClick={() => {
            setSelectedService(null);
            setShowDialog(true);
          }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Servicio
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={handleEdit}
            onToggleActive={handleToggleActive}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showDialog && (
        <ServiceDialog
          service={selectedService}
          onClose={() => {
            setShowDialog(false);
            setSelectedService(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ServicesPage;