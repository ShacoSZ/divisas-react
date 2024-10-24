import React, { useContext, useState } from 'react';
import { PreferenciasContexto } from './main';
import { 
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Box,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Preferences = () => {
  const { preferencias, cambiarPreferencias } = useContext(PreferenciasContexto);
  const [monedaSeleccionada, setMonedaSeleccionada] = useState(preferencias.moneda);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));


  const handleMonedaChange = () => {
    cambiarPreferencias({ moneda: monedaSeleccionada });
    setOpenSnackbar(true);
  };

  const handleSelectChange = (event) => {
    setMonedaSeleccionada(event.target.value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Paper 
        elevation={2} 
        sx={{
          maxWidth: '32rem',
          mx: 'auto',
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            fontWeight: 500
          }}
        >
          Preferencias
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="moneda-select-label">Moneda</InputLabel>
            <Select
              labelId="moneda-select-label"
              id="moneda-select"
              value={monedaSeleccionada}
              label="Moneda"
              onChange={handleSelectChange}
              sx={{ width: '100%' }}
            >
              {preferencias.lista_monedas?.map((moneda) => (
                <MenuItem key={moneda} value={moneda}>
                  <Avatar 
                              src={preferencias.map_banderas[moneda]} 
                              sx={{ width: isDesktop ? 32 : 24, height: isDesktop ? 32 : 24, mr: 1 }} 
                            />
                            {moneda}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            onClick={handleMonedaChange}
            sx={{ 
              px: 4,
              py: 1,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Guardar
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          icon={<CheckCircleOutlineIcon />}
          sx={{ width: '100%' }}
        >
          Preferencias actualizadas correctamente
        </Alert>
      </Snackbar>
    </>
  );
};

export default Preferences;