import React, { createContext, useState } from 'react';
import { Box } from '@mui/material';
import ResponsiveNavigation from './navbar';
import CurrencyConverter from './dashboard';
import Preferences from './preferences';
import Currencies from './currencies';

export const PreferenciasContexto = createContext({
  moneda: 'USD',
  lista_mondeas: ['USD', 'EUR', 'GBP', 'JPY'],
  map_banderas: {},
  vista_actual: 'Home',
  cambiarMoneda: () => {
    
  },
  cargarListaMonedas: () => {},
});
  

const Main = () => {
  const [preferencias, setPreferencias] = useState({
    moneda: 'USD',
    lista_monedas: ['USD', 'EUR', 'GBP', 'JPY'],
    vista_actual: 'Home',
  });



  const cambiarPreferencias = (nuevasPreferencias) => {
    setPreferencias({ ...preferencias, ...nuevasPreferencias });
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

  return (
    <PreferenciasContexto.Provider value={{ preferencias, cambiarPreferencias }}> 
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