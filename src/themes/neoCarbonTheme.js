
import { createTheme } from '@mui/material/styles';

const neoCarbonTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6bc17d',
      light: '#8fd4a0',
      dark: '#41ab5d',
    },
    secondary: {
      main: '#82b88e',
      light: '#a3ccad',
      dark: '#5a9e6a',
    },
    success: {
      main: '#6bc17d',
    },
    info: {
      main: '#29B6F6',
    },
    warning: {
      main: '#FBC02D',
    },
    error: {
      main: '#E57373',
    },
    background: {
      default: '#0f0f0f',
      paper: '#272727',
    },
    text: {
      primary: '#E6E6E6',
      secondary: '#A8B0B8',
    },
    divider: 'rgba(255, 255, 255, 0.12)'
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.25rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflowY: 'auto',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.25s ease',
        },
        containedPrimary: {
          boxShadow: '0 6px 16px rgba(65, 171, 93, 0.35)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 24px rgba(65, 171, 93, 0.45)',
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.25s ease',
          '&:hover': {
            boxShadow: '0 10px 24px rgba(0, 0, 0, 0.35)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.25s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        },
      },
    },
  },
});

export default neoCarbonTheme;
