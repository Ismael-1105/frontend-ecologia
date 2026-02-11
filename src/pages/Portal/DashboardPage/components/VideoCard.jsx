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
import { VIDEO_CARD_LAYOUT } from '../../../../config/constants';

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
          height: VIDEO_CARD_LAYOUT.HEIGHT,
          minHeight: VIDEO_CARD_LAYOUT.HEIGHT,
          maxHeight: VIDEO_CARD_LAYOUT.HEIGHT,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
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
        <Box 
          sx={{ 
            position: 'relative', 
            width: '100%', 
            height: 0,
            paddingTop: `${(1 / VIDEO_CARD_LAYOUT.THUMBNAIL_ASPECT_RATIO) * 100}%`,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <CardMedia
            component="img"
            image={video.image || video.thumbnailUrl || video.thumbnail || VIDEO_CARD_LAYOUT.FALLBACK_THUMBNAIL}
            alt={video.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
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

        <CardContent 
          sx={{ 
            pb: 2, 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
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
              lineHeight: 1.3,
              height: '2.6em',
            }}
          >
            {video.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ 
              mb: 1.5,
              flexShrink: 0,
            }}
          >
            Por: {video.author}
          </Typography>

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
              lineHeight: 1.4,
              height: video.description ? '2.8em' : VIDEO_CARD_LAYOUT.DESCRIPTION_MIN_HEIGHT,
              minHeight: VIDEO_CARD_LAYOUT.DESCRIPTION_MIN_HEIGHT,
              flexShrink: 0,
            }}
          >
            {video.description || ''}
          </Typography>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              mt: 'auto',
              flexShrink: 0,
            }}
          >
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