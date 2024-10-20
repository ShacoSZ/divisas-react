import React from 'react';
import { useMediaQuery, useTheme, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, DollarSign, Settings } from 'lucide-react';

const ResponsiveNavigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigationItems = [
    { text: 'Divisas', icon: <DollarSign /> },
    { text: 'Home', icon: <Home /> },
    { text: 'Ajustes', icon: <Settings /> },
  ];

  const renderNavigationItems = () => (
    <>
      {navigationItems.map((item) => (
        <ListItem button key={item.text}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </>
  );

  if (isMobile) {
    return (
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar sx={{ justifyContent: 'space-around' }}>
          {navigationItems.map((item) => (
            <IconButton key={item.text} color="inherit">
              {item.icon}
            </IconButton>
          ))}
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>{renderNavigationItems()}</List>
    </Drawer>
  );
};

export default ResponsiveNavigation;