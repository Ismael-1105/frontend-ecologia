import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Avatar,
    Typography,
    CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../core/context/AuthContext';

/**
 * CommentForm Component
 * Form for creating or replying to comments
 */
const CommentForm = ({
    onSubmit,
    parentComment = null,
    placeholder = 'Escribe un comentario...',
    autoFocus = false,
    onCancel = null,
}) => {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        setSubmitting(true);
        try {
            await onSubmit(content, parentComment);
            setContent('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        setContent('');
        if (onCancel) {
            onCancel();
        }
    };

    if (!user) {
        return (
            <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    Inicia sesión para comentar
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                p: parentComment ? 0 : 2,
            }}
        >
            <Avatar
                src={user.profilePicture}
                alt={user.name}
                sx={{ width: 40, height: 40 }}
            >
                {user.name?.[0]?.toUpperCase()}
            </Avatar>

            <Box sx={{ flex: 1 }}>
                <TextField
                    fullWidth
                    multiline
                    minRows={parentComment ? 2 : 3}
                    maxRows={8}
                    placeholder={placeholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    autoFocus={autoFocus}
                    disabled={submitting}
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'background.paper',
                        },
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1,
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        {content.length}/2000
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {onCancel && (
                            <Button
                                size="small"
                                onClick={handleCancel}
                                disabled={submitting}
                            >
                                Cancelar
                            </Button>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            endIcon={submitting ? <CircularProgress size={16} /> : <SendIcon />}
                            disabled={!content.trim() || submitting || content.length > 2000}
                        >
                            {parentComment ? 'Responder' : 'Comentar'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CommentForm;
