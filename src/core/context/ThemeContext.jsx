import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

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
            main: '#859864', // Sage green
            light: '#a3b584',
            dark: '#6a7a50',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#7a9b76', // Complementary green
            light: '#9bb598',
            dark: '#5f7c5c',
            contrastText: '#ffffff',
        },
        success: {
            main: '#6b9b37', // Vibrant green for success
            light: '#8fb35f',
            dark: '#547c2c',
        },
        background: {
            default: '#f8f9f6', // Very light sage
            paper: '#ffffff',
        },
        text: {
            primary: '#2d3319', // Dark green-gray
            secondary: '#5a6147', // Medium green-gray
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
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(133, 152, 100, 0.3)',
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
            main: '#a3b584', // Lighter sage for dark mode
            light: '#bcc9a3',
            dark: '#859864',
            contrastText: '#0f1410',
        },
        secondary: {
            main: '#9bb598', // Lighter complementary green
            light: '#b5c9b2',
            dark: '#7a9b76',
            contrastText: '#0f1410',
        },
        success: {
            main: '#8fb35f', // Lighter vibrant green
            light: '#a8c47f',
            dark: '#6b9b37',
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
            main: '#7a9b76',
            light: '#a8c4a4',
            dark: '#5a7a56',
        },
        background: {
            default: '#0f1410', // Very dark charcoal with green tint
            paper: '#1a1f1a', // Dark charcoal
        },
        text: {
            primary: '#e8ebe4', // Light sage
            secondary: '#b8bdb3', // Muted light sage
        },
        divider: 'rgba(163, 181, 132, 0.12)',
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
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(133, 152, 100, 0.3)',
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
        const savedMode = localStorage.getItem('themeMode');
        return savedMode || 'light';
    });

    // Save theme preference to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('themeMode', mode);
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
