import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Alert,
  Button,
  Stack,
  Fade
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DashboardStats, TrendingVideos, RecentActivity, VideoPlayerModal, UploadVideoModal } from './components/index.jsx';
import { videoService } from '../../../core/services';
import { useAuth } from '../../../core/context/AuthContext';
import { useLikesDislikesToggle } from '../../../core/hooks/useLikesDislikesToggle';

const DashboardPage = () => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const navigate = useNavigate();

  // Get like/dislike handlers from custom hook with state management
  const { handleLike, handleDislike } = useLikesDislikesToggle(trendingVideos, setTrendingVideos);

  // Check for videoId in URL params (from TrendingVideos links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('videoId');
    if (videoId) {
      setSelectedVideoId(videoId);
      setIsPlayerModalOpen(true);
    }
  }, []);

  const handleClosePlayerModal = () => {
    setIsPlayerModalOpen(false);
    setSelectedVideoId(null);
    // Clear URL params
    window.history.replaceState({}, '', '/portal/dashboard');
  };

  const handleCreatePost = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="xl" sx={{ py: 0 }}>
        {/* Welcome Header */}
        <Box sx={{ mb: 4 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                Bienvenido al Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Explora las últimas discusiones y recursos de la comunidad
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreatePost}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Subir Video
            </Button>
          </Stack>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Box sx={{ mb: 4 }}>
          <DashboardStats />
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Main Content - Trending Videos */}
          <Grid item xs={12} lg={8}>
            <TrendingVideos 
              videos={trendingVideos}
              onVideosUpdate={setTrendingVideos}
              onVideoSelect={(id) => {
                setSelectedVideoId(id);
                setIsPlayerModalOpen(true);
              }}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* Recent Activity */}
              <RecentActivity />

              {/* Quick Actions Card - Optional */}
              {/* You can add more sidebar widgets here */}
            </Stack>
          </Grid>
        </Grid>

        {/* Video Player Modal */}
        <VideoPlayerModal
          open={isPlayerModalOpen}
          onClose={handleClosePlayerModal}
          videoId={selectedVideoId}
        />

        {/* Upload Video Modal */}
        <UploadVideoModal
          open={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
        />
      </Container>
    </Fade>
  );
};

export default DashboardPage;

