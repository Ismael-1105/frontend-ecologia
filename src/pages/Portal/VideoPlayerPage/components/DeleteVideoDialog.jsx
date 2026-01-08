import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
} from '@mui/material';

const DeleteVideoDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>¿Eliminar video?</DialogTitle>
            <DialogContent>
                <Typography>
                    ¿Estás seguro de que deseas eliminar este video? Esta acción no se puede deshacer.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteVideoDialog;
