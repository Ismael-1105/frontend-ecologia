import React, { Component } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ErrorOutline, Home, Refresh } from '@mui/icons-material';
import logger from '../../utils/logger';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error using logger (will only show in development)
        logger.error('Error caught by boundary:', error, errorInfo);

        // In production, you could send to error tracking service
        // Example: Sentry.captureException(error);

        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
        // Reload the page to reset state
        window.location.reload();
    };

    handleGoHome = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100vh',
                            textAlign: 'center',
                            gap: 3,
                            py: 4,
                        }}
                    >
                        {/* Error Icon */}
                        <Box
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                bgcolor: 'error.light',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ErrorOutline sx={{ fontSize: 80, color: 'error.main' }} />
                        </Box>

                        {/* Error Title */}
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            😕 Algo salió mal
                        </Typography>

                        {/* Error Description */}
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 2 }}>
                            Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la página o volver al inicio.
                        </Typography>

                        {/* Development Error Details */}
                        {import.meta.env.MODE === 'development' && this.state.error && (
                            <Box
                                sx={{
                                    mt: 2,
                                    p: 3,
                                    bgcolor: 'error.light',
                                    borderRadius: 2,
                                    maxWidth: '100%',
                                    overflow: 'auto',
                                    border: '1px solid',
                                    borderColor: 'error.main',
                                }}
                            >
                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                                    Error Details (Development Only):
                                </Typography>
                                <Typography variant="body2" component="pre" sx={{ textAlign: 'left', mb: 2 }}>
                                    {this.state.error.toString()}
                                </Typography>
                                {this.state.errorInfo && (
                                    <>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                                            Component Stack:
                                        </Typography>
                                        <Typography variant="caption" component="pre" sx={{ textAlign: 'left' }}>
                                            {this.state.errorInfo.componentStack}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        )}

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<Refresh />}
                                onClick={this.handleReset}
                                sx={{ minWidth: 160 }}
                            >
                                Recargar Página
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<Home />}
                                onClick={this.handleGoHome}
                                sx={{ minWidth: 160 }}
                            >
                                Volver al Inicio
                            </Button>
                        </Box>
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
