import React, { Component } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

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
        console.error('Error caught by boundary:', error, errorInfo);
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
                        }}
                    >
                        <ErrorOutline sx={{ fontSize: 80, color: 'error.main' }} />

                        <Typography variant="h4" component="h1" gutterBottom>
                            Oops! Something went wrong
                        </Typography>

                        <Typography variant="body1" color="text.secondary" paragraph>
                            We're sorry for the inconvenience. An unexpected error has occurred.
                        </Typography>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <Box
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    bgcolor: 'grey.100',
                                    borderRadius: 1,
                                    maxWidth: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                <Typography variant="body2" component="pre" sx={{ textAlign: 'left' }}>
                                    {this.state.error.toString()}
                                </Typography>
                                {this.state.errorInfo && (
                                    <Typography variant="caption" component="pre" sx={{ textAlign: 'left', mt: 1 }}>
                                        {this.state.errorInfo.componentStack}
                                    </Typography>
                                )}
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button
                                variant="contained"
                                onClick={this.handleReset}
                            >
                                Try Again
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => window.location.href = '/'}
                            >
                                Go Home
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
