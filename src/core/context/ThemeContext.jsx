import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { safeGetItem, safeSetItem } from '../utils/safeStorage';

const ThemeContext = createContext();

export const useThemeMode = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within a ThemeModeProvider');
    }
    return context;
};

// Define themes outside component to prevent recreation
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        // Light mode colors - Eco Green Theme
        primary: {
            main: '#41ab5d',
            light: '#6bc17d',
            dark: '#328a48',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#5a9e6a',
            light: '#82b88e',
            dark: '#3d7a4c',
            contrastText: '#ffffff',
        },
        success: {
            main: '#41ab5d',
            light: '#6bc17d',
            dark: '#328a48',
        },
        background: {
            default: '#ffffff',
            paper: '#e6ebf9',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '&::-webkit-scrollbar': { width: 10 },
                    '&::-webkit-scrollbar-track': { background: '#ffffff' },
                    '&::-webkit-scrollbar-thumb': { background: '#c1c1c1', borderRadius: 5 },
                    '&::-webkit-scrollbar-thumb:hover': { background: '#909090' },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(65, 171, 93, 0.3)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 12,
                },
            },
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        // Dark mode colors - Soft Charcoal Theme
        primary: {
            main: '#6bc17d',
            light: '#8fd4a0',
            dark: '#41ab5d',
            contrastText: '#0f0f0f',
        },
        secondary: {
            main: '#82b88e',
            light: '#a3ccad',
            dark: '#5a9e6a',
            contrastText: '#0f0f0f',
        },
        success: {
            main: '#6bc17d',
            light: '#8fd4a0',
            dark: '#41ab5d',
        },
        error: {
            main: '#ef5350',
            light: '#ff867c',
            dark: '#b61827',
        },
        warning: {
            main: '#ff9800',
            light: '#ffc947',
            dark: '#c66900',
        },
        info: {
            main: '#5a9e6a',
            light: '#82b88e',
            dark: '#3d7a4c',
        },
        background: {
            default: '#0f0f0f',
            paper: '#272727',
        },
        text: {
            primary: '#f1f1f1',
            secondary: '#aaaaaa',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '&::-webkit-scrollbar': { width: 10 },
                    '&::-webkit-scrollbar-track': { background: '#0f0f0f' },
                    '&::-webkit-scrollbar-thumb': { background: '#555555', borderRadius: 5 },
                    '&::-webkit-scrollbar-thumb:hover': { background: '#888888' },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(65, 171, 93, 0.3)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export const ThemeModeProvider = ({ children }) => {
    // Initialize theme from localStorage or default to 'light'
    const [mode, setMode] = useState(() => {
        const savedMode = safeGetItem('themeMode');
        return savedMode || 'light';
    });

    // Save theme preference to localStorage whenever it changes
    useEffect(() => {
        safeSetItem('themeMode', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    };

    // Select theme based on mode (no recreation, just selection)
    const theme = useMemo(
        () => (mode === 'dark' ? darkTheme : lightTheme),
        [mode]
    );

    const value = useMemo(
        () => ({
            mode,
            theme,
            toggleTheme,
        }),
        [mode, theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
