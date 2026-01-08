import React, { useState } from 'react';
import { Card, CardContent, Typography, Divider, Button, Box, TextField, Alert } from '@mui/material';
import ConfirmDialog from '../../../../components/shared/ConfirmDialog';
import { Warning } from '@mui/icons-material';

const DangerZone = ({ onDeleteAccount }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');

    const handleDelete = () => {
        onDeleteAccount(deletePassword);
    };

    return (
        <>
            <Card sx={{ mt: 3, borderRadius: 3, border: '1px solid', borderColor: 'error.light', bgcolor: 'error.lighter' }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Warning color="error" />
                        <Typography variant="h6" color="error" fontWeight="bold">
                            Zona de Peligro
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                        Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate de querer hacerlo.
                    </Typography>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setDeleteDialogOpen(true)}
                        sx={{ borderRadius: 2 }}
                    >
                        Eliminar Cuenta
                    </Button>
                </CardContent>
            </Card>

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Eliminar Cuenta"
                message={
                    <Box>
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            Esta acción no se puede deshacer. Se eliminarán todos tus datos y videos.
                        </Alert>
                        <Typography paragraph>
                            Por favor ingresa tu contraseña para confirmar.
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            label="Contraseña"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                        />
                    </Box>
                }
                confirmText="Eliminar Definitivamente"
                severity="error"
                onConfirm={handleDelete}
                onCancel={() => {
                    setDeleteDialogOpen(false);
                    setDeletePassword('');
                }}
            />
        </>
    );
};

export default DangerZone;
