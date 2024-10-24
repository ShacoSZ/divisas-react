import React, { useContext } from 'react';
import { PreferenciasContexto } from './main';

const Preferences = () => {
  const { preferencias, cambiarPreferencias } = useContext(PreferenciasContexto);

  const handleMonedaChange = (event) => {
    cambiarPreferencias({ moneda: event.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-lg border border-gray-200 shadow-sm bg-white">
      <h2 className="text-2xl font-medium text-center mb-8">Preferencias</h2>
      
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <label className="text-gray-600 text-lg">Moneda</label>
          
          <div className="flex items-center space-x-4">
            <select
              value={preferencias.moneda}
              onChange={handleMonedaChange}
              className="w-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {preferencias.lista_monedas?.map((moneda) => (
                <option key={moneda} value={moneda}>
                  {moneda}
                </option>
              ))}
            </select>
            
            <button 
              onClick={() => {/* Save logic here */}}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              GUARDAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;