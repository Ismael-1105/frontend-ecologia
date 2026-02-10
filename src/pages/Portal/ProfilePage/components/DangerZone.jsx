import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import SweetAlert from '../../../../components/common/SweetAlert';
import { Warning } from '@mui/icons-material';

const DangerZone = ({ onDeleteAccount }) => {
    const handleDelete = async () => {
        const password = await SweetAlert.showPasswordConfirmation(
            'Eliminar Cuenta',
            'Esta acción no se puede deshacer. Se eliminarán todos tus datos y videos. Por favor ingresa tu contraseña para confirmar.'
        );

        if (password) {
            onDeleteAccount(password);
        }
    };

    return (
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
                    onClick={handleDelete}
                    sx={{ borderRadius: 2 }}
                >
                    Eliminar Cuenta
                </Button>
            </CardContent>
        </Card>
    );
};

export default DangerZone;
