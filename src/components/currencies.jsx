import React,{useContext, useCallback} from 'react';
import { PreferenciasContexto } from './main'; 

import { Card, CardContent, Typography, TextField, InputAdornment, Grid, Box, Avatar, Pagination, useMediaQuery, useTheme,Button } from '@mui/material';

const Currencies = () => {
    const { preferencias, cambiarPreferencias } = useContext(PreferenciasContexto);
    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 6;

    // Your currency data and conversion logic here
    const paginatedCurrencies = [];
    const filteredCurrencies = [];
    const fromCurrency = '';
    const toCurrency = '';
    const amount = 0;
    const countryFlags = {};
        

    const convert = (amount, fromCurrency, toCurrency) => {
        // Conversion logic here
        return 0;
    };

    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <Card sx={{ mb: 4, border: '1px solid black' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Mis divisas
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
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" color="primary">
                        Add Currency
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Currencies;