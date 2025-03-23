import { createTheme } from '@mui/material/styles';

// Create theme function that accepts mode (light/dark)
export const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2',
      light: mode === 'dark' ? '#e3f2fd' : '#42a5f5',
      dark: mode === 'dark' ? '#42a5f5' : '#1565c0',
    },
    secondary: {
      main: mode === 'dark' ? '#ce93d8' : '#9c27b0',
      light: mode === 'dark' ? '#f3e5f5' : '#ba68c8',
      dark: mode === 'dark' ? '#ab47bc' : '#7b1fa2',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Default theme (light mode)
const theme = createAppTheme('light');

export default theme; 