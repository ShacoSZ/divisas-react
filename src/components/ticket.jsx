import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Avatar,
  Paper
} from '@mui/material';
import { useContext } from 'react';
import { PreferenciasContexto } from './main';

const TransactionTicket = ({ transaction }) => {
  const { preferencias } = useContext(PreferenciasContexto);
  
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <Paper elevation={3} className="max-w-md mx-auto my-4 bg-white">
      <Card className="border-t-4 border-blue-500">
        <CardContent>
          {/* Encabezado del ticket */}
          <Box className="text-center mb-4">
            <Typography variant="h5" className="font-bold text-gray-800">
              Comprobante de Conversión
            </Typography>
            <Typography variant="subtitle2" className="text-gray-600">
              Divisas "Patito"
            </Typography>
          </Box>

          <Divider className="my-4" />

          {/* Detalles de la transacción */}
          <Box className="space-y-4">
            {/* Fecha y hora */}
            <Box className="text-center mb-4">
              <Typography variant="body2" className="text-gray-600">
                Fecha y hora de la transacción
              </Typography>
              <Typography variant="body1" className="font-medium">
                {formatDate(transaction.fecha)}
              </Typography>
            </Box>

            <Divider className="my-4" />

            {/* Monedas y conversión */}
            <Box className="flex justify-between items-center">
              <Box className="text-center flex-1">
                <Avatar 
                  src={preferencias.map_banderas[transaction.divisa_De]}
                  className="mx-auto mb-2"
                />
                <Typography variant="h6" className="font-bold">
                  {transaction.divisa_De}
                </Typography>
                <Typography variant="h5" className="text-blue-600">
                  {Number(transaction.monto_divisa_d).toLocaleString('es-ES', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </Typography>
              </Box>

              <Typography variant="h6" className="mx-4">
                →
              </Typography>

              <Box className="text-center flex-1">
                <Avatar 
                  src={preferencias.map_banderas[transaction.divisa_A]}
                  className="mx-auto mb-2"
                />
                <Typography variant="h6" className="font-bold">
                  {transaction.divisa_A}
                </Typography>
                <Typography variant="h5" className="text-green-600">
                  {Number(transaction.monto_resultante).toLocaleString('es-ES', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </Typography>
              </Box>
            </Box>

            <Divider className="my-4" />

            {/* Tasa de cambio */}
            <Box className="text-center">
              <Typography variant="body2" className="text-gray-600">
                Tasa de cambio
              </Typography>
              <Typography variant="body1" className="font-medium">
                1 {transaction.divisa_De} = {' '}
                {(transaction.monto_resultante / transaction.monto_divisa_d).toFixed(4)}{' '}
                {transaction.divisa_A}
              </Typography>
            </Box>
          </Box>

          {/* Pie del ticket */}
          <Box className="mt-6 text-center">
            <Typography variant="caption" className="text-gray-500">
              ID de Transacción: {transaction.fecha.split('T')[0]}-{Math.random().toString(36).substr(2, 9)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default TransactionTicket;