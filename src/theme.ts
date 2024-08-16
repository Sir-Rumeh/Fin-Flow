import { createTheme } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-data-grid-premium/themeAugmentation';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5C068C',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          // backgroundColor: 'red',
        },
      },
    },
  },
});
