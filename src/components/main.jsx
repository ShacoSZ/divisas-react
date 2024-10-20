import React from 'react';
import { Box } from '@mui/material';
import ResponsiveNavigation from './navbar';
import CurrencyConverter from './dashboard';

const Main = () => {
  return (
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
        <CurrencyConverter />
      </Box>
    </Box>
  );
};

export default Main;