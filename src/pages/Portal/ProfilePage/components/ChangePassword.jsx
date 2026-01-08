import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, TextField, InputAdornment, Collapse } from '@mui/material';
import { Lock, Key, Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePassword = ({ onChangePassword, loading }) => {
    const [changing, setChanging] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        onChangePassword(passwordData, () => {
            setChanging(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        });
    };

    return (
        <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Lock color="primary" />
                        <Typography variant="h6" fontWeight="bold">
                            Seguridad
                        </Typography>
                    </Box>
                    {!changing && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setChanging(true)}
                            size="small"
                        >
                            Cambiar Contraseña
                        </Button>
                    )}
                </Box>

                <Collapse in={changing}>
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Contraseña Actual"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Nueva Contraseña"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Confirmar Nueva Contraseña"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
                            <Button onClick={() => setChanging(false)} disabled={loading} color="inherit">
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading}
                                sx={{ borderRadius: 2 }}
                            >
                                Actualizar Contraseña
                            </Button>
                        </Box>
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    );
};

export default ChangePassword;
