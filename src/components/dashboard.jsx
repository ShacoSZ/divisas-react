import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card, 
  CardContent, 
  Grid,
  Box,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Avatar,
  useMediaQuery,
  useTheme,
  IconButton
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, Search, ArrowLeftRight } from 'lucide-react';
import ResponsiveNavigation from './dashboard'; // Asegúrate de importar el nuevo componente

const ITEMS_PER_PAGE = 8;

const CurrencyDashboard = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('MXN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [chartData, setChartData] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [exchangeRatesHistory, setExchangeRatesHistory] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countryFlags, setCountryFlags] = useState({});

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
      const response = await fetch(`https://api.frankfurter.app/${oneYearAgo}..${today}?base=USD`);
      const data = await response.json();

      const mostRecentDate = Object.keys(data.rates).sort().pop();
      const latestRates = data.rates[mostRecentDate];

      setExchangeRates(latestRates);
      setExchangeRatesHistory(data.rates);

      let currenciesList = Object.keys(latestRates).map(code => ({ code, name: `${code}` }));
      currenciesList.push({ code: 'USD', name: 'USD' });
      setCurrencies(currenciesList);

      const flagsPromises = currenciesList.map(async (currency) => {
        if (currency.code === 'EUR') {
          return { [currency.code]: 'https://flagcdn.com/w20/eu.png' };
        }
        try {
          const flagResponse = await fetch(`https://restcountries.com/v3.1/currency/${currency.code}`);
          const flagData = await flagResponse.json();
          if (flagData && flagData[0] && flagData[0].flags) {
            return { [currency.code]: flagData[0].flags.png };
          }
        } catch (error) {
          console.error(`Error fetching flag for ${currency.code}:`, error);
        }
        return { [currency.code]: null };
      });

      const flags = await Promise.all(flagsPromises);
      const flagsObject = Object.assign({}, ...flags);
      setCountryFlags(flagsObject);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateChartData = useCallback((currency, ratesHistory) => {
    const newChartData = Object.entries(ratesHistory).map(([date, dailyRates]) => ({
      date,
      rate: dailyRates[currency]
    })).filter(item => item.rate !== undefined);
    
    setChartData(newChartData);
  }, []);

  useEffect(() => {
    if (Object.keys(exchangeRatesHistory).length > 0) {
      updateChartData(fromCurrency, exchangeRatesHistory);
    }
  }, [fromCurrency, exchangeRatesHistory, updateChartData]);

  const convert = useCallback((value, from, to) => {
    if (from === 'USD') {
      return (value * exchangeRates[to]).toFixed(3);
    } else if (to === 'USD') {
      return (value / exchangeRates[from]).toFixed(3);
    } else {
      const valueInUSD = value / exchangeRates[from];
      return (valueInUSD * exchangeRates[to]).toFixed(3);
    }
  }, [exchangeRates]);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const filteredCurrencies = currencies.filter(currency => 
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCurrencies = filteredCurrencies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', py: 4 }}>
      <Container maxWidth={isDesktop ? "lg" : "md"}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: 'primary.main' }}>
          Divisas "Patito"
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 4, border: '1px solid black' }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel>De</InputLabel>
                      <Select
                        value={fromCurrency}
                        onChange={handleFromCurrencyChange}
                        input={<OutlinedInput label="De" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={countryFlags[selected]} sx={{ width: isDesktop ? 32 : 24, height: isDesktop ? 32 : 24, mr: 1 }} />
                            {selected}
                          </Box>
                        )}
                      >
                        {currencies.map((currency) => (
                          <MenuItem key={currency.code} value={currency.code}>
                            <Avatar src={countryFlags[currency.code]} sx={{ width: isDesktop ? 32 : 24, height: isDesktop ? 32 : 24, mr: 1 }} />
                            {currency.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label={`Monto en ${fromCurrency}`}
                      variant="outlined"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      sx={{ mt: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DollarSign size={20} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton onClick={handleSwapCurrencies} color="primary" sx={{ transform: isDesktop ? 'scale(1.5)' : 'scale(1)' }}>
                      <ArrowLeftRight />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel>A</InputLabel>
                      <Select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        input={<OutlinedInput label="A" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={countryFlags[selected]} sx={{ width: isDesktop ? 32 : 24, height: isDesktop ? 32 : 24, mr: 1 }} />
                            {selected}
                          </Box>
                        )}
                      >
                        {currencies.map((currency) => (
                          <MenuItem key={currency.code} value={currency.code}>
                            <Avatar src={countryFlags[currency.code]} sx={{ width: isDesktop ? 32 : 24, height: isDesktop ? 32 : 24, mr: 1 }} />
                            {currency.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label={`Monto en ${toCurrency}`}
                      variant="outlined"
                      value={convert(amount, fromCurrency, toCurrency)}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <DollarSign size={20} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mt: 2 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mb: 4, border: '1px solid black' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Historial de Tipo de Cambio en base de USD a la moneda base seleccionada (USD/{fromCurrency})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#1976d2" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 4, border: '1px solid black' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Otras Conversiones
                </Typography>
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
                        <Search size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid container spacing={2}>
                  {paginatedCurrencies.filter(c => c.code !== fromCurrency && c.code !== toCurrency).map((currency) => (
                    <Grid item xs={12} sm={6} key={currency.code}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar src={countryFlags[currency.code]} sx={{ width: isDesktop ? 32 : 24, height: isDesktop ? 32 : 24, mr: 1 }} />
                            <Typography variant={isDesktop ? 'h6' : 'body1'} color="textSecondary">
                              {currency.name}
                            </Typography>
                          </Box>
                          <Typography variant={isDesktop ? 'h5' : 'h6'} component="h2">
                            {convert(amount, fromCurrency, currency.code)}
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CurrencyDashboard;