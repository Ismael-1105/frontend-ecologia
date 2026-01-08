import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';

const EditVideoDialog = ({ open, onClose, formData, onChange, onSave }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Editar Video</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Título"
                    value={formData.title}
                    onChange={(e) => onChange({ ...formData, title: e.target.value })}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Descripción"
                    value={formData.description}
                    onChange={(e) => onChange({ ...formData, description: e.target.value })}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onSave} variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditVideoDialog;
