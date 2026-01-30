import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

export const createAppTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? blue[700] : blue[300],
      },
      background: {
        default: mode === 'light' ? grey[50] : grey[900],
        paper: mode === 'light' ? '#ffffff' : grey[800],
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            padding: '24px',
            borderRadius: '12px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 600,
          },
        },
      },
    },
  });
};
