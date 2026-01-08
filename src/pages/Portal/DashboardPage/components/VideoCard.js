
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { alpha } from '@mui/material/styles';

const renderStars = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

const VideoCard = ({ video, onClick }) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(video);
    } else if (video.videoUrl) {
      window.open(video.videoUrl, '_blank');
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        onClick={handleCardClick}
        sx={(theme) => ({
          backgroundColor: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.7)
            : theme.palette.background.paper,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
          transition: 'all 0.3s ease',
          cursor: video.videoUrl ? 'pointer' : 'default',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.palette.mode === 'dark'
              ? `0 12px 32px ${alpha(theme.palette.primary.main, 0.2)}`
              : `0 12px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
            borderColor: theme.palette.primary.main,
            '& .play-icon': {
              opacity: 1,
              transform: 'translate(-50%, -50%) scale(1.1)',
            },
          },
        })}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={video.image}
            alt={video.title}
            sx={{
              objectFit: 'cover',
            }}
          />
          {video.videoUrl && (
            <IconButton
              className="play-icon"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.8,
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <PlayCircleOutlineIcon
                sx={{
                  fontSize: 60,
                  color: 'primary.main',
                }}
              />
            </IconButton>
          )}
        </Box>

        <CardContent sx={{ pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {video.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1.5 }}
          >
            Por: {video.author}
          </Typography>

          {video.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '40px',
              }}
            >
              {video.description}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Chip
              label={video.tag}
              size="small"
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                fontWeight: 600,
                borderRadius: 2,
              })}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {renderStars(video.rating)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default VideoCard;
