import React, { createContext, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ResponsiveNavigation from './navbar';
import CurrencyConverter from './dashboard';
import Preferences from './preferences';
import Currencies from './currencies';

const defaultPreferences = {
  moneda: 'USD',
  lista_monedas: ['USD', 'EUR', 'GBP', 'JPY'],
  vista_actual: 'Home',
  map_banderas: {},
  tasas_cambio: {}
};

// Clave para localStorage
const STORAGE_KEY = 'app_preferences';

export const PreferenciasContexto = createContext({
  preferencias: defaultPreferences,
  cambiarPreferencias: () => {},
  guardarPreferencias: () => {},
  cargarPreferencias: () => {}
});
  

const Main = () => {
  const [preferencias, setPreferencias] = useState(defaultPreferences);

  useEffect(() => {
    cargarPreferencias();
  }, []);

  useEffect(() => {
    guardarPreferencias();
  }, [preferencias]);


  const guardarPreferencias = () => {
    try {
      const preferencesJSON = JSON.stringify(preferencias);
      localStorage.setItem(STORAGE_KEY, preferencesJSON);
      console.log('Preferencias guardadas exitosamente');
    } catch (error) {
      console.error('Error al guardar preferencias:', error);
    }
  };

  const cargarPreferencias = () => {
    try {
      const savedPreferences = localStorage.getItem(STORAGE_KEY);
      if (savedPreferences) {
        setPreferencias(JSON.parse(savedPreferences));
        console.log('Preferencias cargadas exitosamente');
      }
    } catch (error) {
      console.error('Error al cargar preferencias:', error);
      setPreferencias(defaultPreferences);
    }
  };

  const cambiarPreferencias = (nuevasPreferencias) => {
    setPreferencias(prev => ({
      ...prev,
      ...nuevasPreferencias
    }));
  };


  const renderVistaActual = () => {
    switch (preferencias.vista_actual) {
      case 'Home':
        return <CurrencyConverter />;
      case 'Divisas':
        return <Currencies />;
      case 'Ajustes':
        return <Preferences />;
      default:
        return <CurrencyConverter />;
    }
  }

  const contextValue = {
    preferencias,
    cambiarPreferencias,
    guardarPreferencias,
    cargarPreferencias
  };


  return (
    <PreferenciasContexto.Provider value={contextValue}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <ResponsiveNavigation />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            bgcolor: 'background.default', 
            p: 3, 
            width: { sm: `calc(100% - 240px)` }, 
            marginBottom: { xs: '56px', sm: 0 } 
          }}
        >
          {renderVistaActual()}
        </Box>
      </Box>
    </PreferenciasContexto.Provider>
  );
};

export default Main;