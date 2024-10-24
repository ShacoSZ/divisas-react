import React, { useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Fade,
  Button
} from '@mui/material';
import { ReportesContexto } from './main';
import { PreferenciasContexto } from './main';
import TransactionTicket from './ticket';
import { ArrowLeft } from 'lucide-react';

const TransactionHistory = () => {
  const { reportes } = useContext(ReportesContexto);
  const { preferencias, cambiarPreferencias } = useContext(PreferenciasContexto);

  // Ordenar reportes por fecha, más reciente primero
  const sortedReportes = [...(reportes || [])].sort((a, b) => 
    new Date(b.fecha) - new Date(a.fecha)
  );

  const handleReturn = () => {
    cambiarPreferencias({
      ...preferencias,
      vista_actual: 'Home'
    });
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex justify-between items-center mb-6">
        <Button 
          startIcon={<ArrowLeft />}
          onClick={handleReturn}
          variant="outlined"
        >
          Volver
        </Button>
        <Typography variant="h4" className="text-center flex-grow">
          Historial de Transacciones
        </Typography>
      </Box>

      {!reportes ? (
        <Box className="flex justify-center items-center h-screen">
          <CircularProgress />
        </Box>
      ) : reportes.length === 0 ? (
        <Box className="text-center py-8">
          <Typography variant="h6" className="text-gray-600">
            No hay transacciones registradas
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {sortedReportes.map((transaction, index) => (
            <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
              <Grid item xs={12} md={6} lg={4} key={transaction.fecha}>
                <TransactionTicket transaction={transaction} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TransactionHistory;