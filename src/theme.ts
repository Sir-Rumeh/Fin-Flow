import { createTheme } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-data-grid-premium/themeAugmentation';
import 'assets/fonts/Gotham.css';

export const theme = createTheme({
  typography: {
    fontFamily: 'Gotham',
  },
  palette: {
    primary: {
      main: '#5C068C',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontFamily: 'Gotham',
        },
      },
    },
  },
});
