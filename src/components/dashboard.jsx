import React, { useState, useEffect } from 'react';
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
  Box
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { AttachMoney as MoneyIcon } from '@mui/icons-material';

const CurrencyDashboard = () => {
  const [amount, setAmount] = useState(150);
  const [fromCurrency, setFromCurrency] = useState('MXN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [chartData, setChartData] = useState([]);

  const exchangeRates = {
    MXN: 1,
    USD: 0.05029,
    EUR: 0.04646,
    JPY: 7.55834,
    GBP: 0.03866,
    CHF: 0.04360,
    RUB: 5.02285
  };

  const currencies = [
    { code: 'MXN', name: 'MXN Peso' },
    { code: 'USD', name: 'USD Dollar' },
    { code: 'EUR', name: 'EUR Euro' },
    { code: 'JPY', name: 'JPY Yen' },
    { code: 'GBP', name: 'GBP Pound Sterling' },
    { code: 'CHF', name: 'CHF Swiss Franc' },
    { code: 'RUB', name: 'RUB Russian Ruble' }
  ];

  useEffect(() => {
    // Simulate fetching historical data
    const mockHistoricalData = [
      { date: '2023-01-01', rate: 19.5 },
      { date: '2023-02-01', rate: 20.0 },
      { date: '2023-03-01', rate: 20.2 },
      { date: '2023-04-01', rate: 20.5 },
      { date: '2023-05-01', rate: 20.3 },
      { date: '2023-06-01', rate: 20.7 },
    ];
    setChartData(mockHistoricalData);
  }, []);

  const convert = (value, from, to) => {
    return (value / exchangeRates[from] * exchangeRates[to]).toFixed(3);
  };

  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: 'primary.main' }}>
          Divisas "El Canario"
        </Typography>
        
        <Card sx={{ mb: 4, border: '1px solid black' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>De</InputLabel>
                  <Select
                    value={fromCurrency}
                    label="De"
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency.code} value={currency.code}>
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
                    startAdornment: <MoneyIcon />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>A</InputLabel>
                  <Select
                    value={toCurrency}
                    label="A"
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency.code} value={currency.code}>
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
                    startAdornment: <MoneyIcon />,
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
              Otras Conversiones
            </Typography>
            <Grid container spacing={2}>
              {currencies.filter(c => c.code !== fromCurrency && c.code !== toCurrency).map((currency) => (
                <Grid item xs={12} sm={6} md={4} key={currency.code}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {currency.name}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {convert(amount, fromCurrency, currency.code)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        
        <Card sx={{ mb: 4, border: '1px solid black' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Historial de Tipo de Cambio (USD/MXN)
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

     
      </Container>
    </Box>
  );
};

export default CurrencyDashboard;