import React from 'react';
import ConfirmDialog from '../../../../components/shared/ConfirmDialog';

/**
 * DeleteVideoDialog Component
 * Confirmation dialog for video deletion
 */
const DeleteVideoDialog = ({ open, video, onConfirm, onCancel }) => {
    return (
        <ConfirmDialog
            open={open}
            title="Delete Video"
            message={`Are you sure you want to delete "${video?.titulo}"? This action cannot be undone.`}
            confirmText="Delete"
            severity="error"
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};

export default DeleteVideoDialog;
