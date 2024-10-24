import React, { useContext, useState } from 'react';
import { PreferenciasContexto } from './main';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Box,
  Avatar,
  Pagination,
  useMediaQuery,
  useTheme,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  FormControl
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Currencies = () => {
  const { preferencias, cambiarPreferencias } = useContext(PreferenciasContexto);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [newCurrency, setNewCurrency] = useState({
    name: '',
    rate: ''
  });

  const ITEMS_PER_PAGE = 6;

  // Filter currencies based on search term
  const filteredCurrencies = preferencias.lista_monedas?.filter(currency =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Calculate pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const paginatedCurrencies = filteredCurrencies.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewCurrency({ name: '', rate: '' });
  };

  const handleAddCurrency = () => {
    if (newCurrency.name && newCurrency.rate) {
      const updatedCurrencies = [...preferencias.lista_monedas, newCurrency.name];
      const updatedRates = {
        ...preferencias.tasas_cambio,
        [newCurrency.name]: parseFloat(newCurrency.rate)
      };
      
      cambiarPreferencias({
        ...preferencias,
        lista_monedas: updatedCurrencies,
        tasas_cambio: updatedRates,
        map_banderas: {
          ...preferencias.map_banderas,
          [newCurrency.name]: `https://flagcdn.com/w20/mx.png`
        }
      });
      
      handleCloseModal();
    }
  };

  return (
    <>
      <Card sx={{ mb: 4, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Mis divisas
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenModal}
              sx={{ textTransform: 'none' }}
            >
              Agregar divisa
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Buscar divisa"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Grid container spacing={2}>
            {paginatedCurrencies.map((currency) => (
              <Grid item xs={12} sm={6} key={currency}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 

                    }}>
                      <Avatar 
                        src={preferencias.map_banderas[currency]} 
                        variant="rounded"
                        sx={{ width: isDesktop ? 80 : 24, height: isDesktop ? 40 : 24, mr: 1 }} 
                      />
                    </Box>
                    <Typography variant={isDesktop ? 'h5' : 'h6'} component="h2">
                     {currency}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={Math.ceil(filteredCurrencies.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handleChangePage}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Agregar nueva divisa</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Nombre de la divisa"
              variant="outlined"
              value={newCurrency.name}
              onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
          </FormControl>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>
              1 {preferencias.moneda} =
            </Typography>
            <TextField
              type="number"
              value={newCurrency.rate}
              onChange={(e) => setNewCurrency({ ...newCurrency, rate: e.target.value })}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">{newCurrency.name}</InputAdornment>,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button 
            onClick={handleAddCurrency} 
            variant="contained"
            disabled={!newCurrency.name || !newCurrency.rate}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Currencies;