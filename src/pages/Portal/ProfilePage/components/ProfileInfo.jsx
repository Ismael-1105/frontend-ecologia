import React from 'react';
import { Card, CardContent, Box, Typography, Button, TextField, Grid, InputAdornment } from '@mui/material';
import { Edit, Save, Cancel, Person, Email, School } from '@mui/icons-material';

const ProfileInfo = ({
    formData,
    editing,
    loading,
    onEdit,
    onCancel,
    onSave,
    onChange
}) => {
    return (
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Información Personal
                    </Typography>
                    {!editing && (
                        <Button
                            startIcon={<Edit />}
                            onClick={onEdit}
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 2 }}
                        >
                            Editar
                        </Button>
                    )}
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Nombre Completo"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            disabled={!editing}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={onChange}
                            disabled={!editing} // Usually email shouldn't be editable easily, but keeping logic
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Institución / Universidad"
                            name="institution"
                            value={formData.institution}
                            onChange={onChange}
                            disabled={!editing}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <School color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>

                {editing && (
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
                        <Button
                            startIcon={<Cancel />}
                            onClick={onCancel}
                            disabled={loading}
                            color="inherit"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={onSave}
                            disabled={loading}
                            sx={{ px: 4, borderRadius: 2 }}
                        >
                            Guardar Cambios
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ProfileInfo;
