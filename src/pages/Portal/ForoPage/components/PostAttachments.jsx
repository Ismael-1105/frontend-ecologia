import React from 'react';
import { Box, Chip, Stack, Typography, Link } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';

/**
 * PostAttachments Component
 * Displays file attachments for a forum post
 */
const PostAttachments = ({ attachments }) => {
    if (!attachments || attachments.length === 0) {
        return null;
    }

    const getFileIcon = (mimetype) => {
        if (mimetype.startsWith('image/')) {
            return <ImageIcon fontSize="small" />;
        }
        return <DescriptionIcon fontSize="small" />;
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const renderAttachment = (attachment, index) => {
        const isImage = attachment.mimetype.startsWith('image/');

        if (isImage) {
            return (
                <Box
                    key={index}
                    sx={{
                        position: 'relative',
                        borderRadius: 1,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                            boxShadow: 2
                        }
                    }}
                >
                    <img
                        src={attachment.url}
                        alt={attachment.originalName}
                        style={{
                            width: '100%',
                            maxHeight: '300px',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                            color: 'white',
                            p: 0.5,
                            px: 1
                        }}
                    >
                        <Typography variant="caption" noWrap>
                            {attachment.originalName}
                        </Typography>
                    </Box>
                </Box>
            );
        }

        // Document attachment
        return (
            <Link
                key={index}
                href={attachment.url}
                download={attachment.originalName}
                underline="none"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Chip
                    icon={getFileIcon(attachment.mimetype)}
                    label={`${attachment.originalName} (${formatFileSize(attachment.size)})`}
                    clickable
                    deleteIcon={<DownloadIcon />}
                    onDelete={() => { }} // Makes the download icon appear
                    variant="outlined"
                    sx={{
                        maxWidth: '100%',
                        '& .MuiChip-label': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }
                    }}
                />
            </Link>
        );
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Archivos adjuntos ({attachments.length})
            </Typography>
            <Stack spacing={1}>
                {attachments.map((attachment, index) => renderAttachment(attachment, index))}
            </Stack>
        </Box>
    );
};

export default PostAttachments;
