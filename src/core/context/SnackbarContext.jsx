import React, { createContext, useState, useContext, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info', // 'success' | 'error' | 'warning' | 'info'
        duration: 6000,
    });

    const showSnackbar = useCallback((message, severity = 'info', duration = 6000) => {
        setSnackbar({
            open: true,
            message,
            severity,
            duration,
        });
    }, []);

    const showSuccess = useCallback((message, duration) => {
        showSnackbar(message, 'success', duration);
    }, [showSnackbar]);

    const showError = useCallback((message, duration) => {
        showSnackbar(message, 'error', duration);
    }, [showSnackbar]);

    const showWarning = useCallback((message, duration) => {
        showSnackbar(message, 'warning', duration);
    }, [showSnackbar]);

    const showInfo = useCallback((message, duration) => {
        showSnackbar(message, 'info', duration);
    }, [showSnackbar]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const value = {
        showSnackbar,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={snackbar.duration}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);

    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }

    return context;
};

export default SnackbarContext;
