import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Box,
    Tab,
    Tabs,
    CircularProgress,
    Alert,
    Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { UserProfileCard } from '../../../components/Profile';
import { BadgeGrid } from '../../../components/Badges';
import { VideoGrid } from '../VideoPlayerPage/components';
import { videoService } from '../../../core/services';
import useBadges from '../../../core/hooks/useBadges';
import { useAuth } from '../../../core/context/AuthContext';

const UserProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [userVideos, setUserVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);

    const { userBadges, loading: badgesLoading } = useBadges(userId);

    useEffect(() => {
        const loadData = async () => {
            await loadProfile();
            await loadVideos();
        };

        loadData();
    }, [userId]);

    const loadProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            if (userId === currentUser?._id) {
                setProfileUser(currentUser);
            } else {
                setProfileUser({
                    _id: userId,
                    name: "Usuario",
                    email: "usuario@example.com",
                    role: "Estudiante",
                });
            }
        } catch (err) {
            console.error("Error fetching user profile:", err);
            setError("Error al cargar el perfil del usuario");
        } finally {
            setLoading(false);
        }
    };

    const loadVideos = async () => {
        try {
            const response = await videoService.getAllVideos();
            const allVideos = response.data || [];

            const filtered = allVideos.filter(
                (v) => (v.author?._id || v.autor_id?._id) === userId
            );

            setUserVideos(filtered);
        } catch (err) {
            console.error("Error fetching user videos:", err);
        }
    };


    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleVideoPlay = (video) => {
        // Navigate to video player or open modal
        console.log('Play video:', video);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha desconocida';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Back Button */}
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Volver
            </Button>

            <Grid container spacing={3}>
                {/* Profile Card */}
                <Grid item xs={12} md={4}>
                    <UserProfileCard
                        user={{
                            ...profileUser,
                            badges: userBadges,
                            videoCount: userVideos.length,
                            totalViews: userVideos.reduce((sum, v) => sum + (v.views || 0), 0),
                            totalLikes: userVideos.reduce((sum, v) => sum + (v.likeCount || 0), 0),
                        }}
                        showStats
                        showBadges
                    />
                </Grid>

                {/* Content Area */}
                <Grid item xs={12} md={8}>
                    {/* Tabs */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                        <Tabs value={currentTab} onChange={handleTabChange}>
                            <Tab label={`Videos (${userVideos.length})`} />
                            <Tab label={`Logros (${userBadges.length})`} />
                        </Tabs>
                    </Box>

                    {/* Tab Content */}
                    {currentTab === 0 && (
                        <Box>
                            {userVideos.length > 0 ? (
                                <Grid container spacing={3}>
                                    <VideoGrid
                                        videos={userVideos}
                                        loading={false}
                                        onVideoPlay={handleVideoPlay}
                                        onMenuOpen={() => { }}
                                        formatDate={formatDate}
                                    />
                                </Grid>
                            ) : (
                                <Alert severity="info">
                                    Este usuario aún no ha subido videos.
                                </Alert>
                            )}
                        </Box>
                    )}

                    {currentTab === 1 && (
                        <Box>
                            {badgesLoading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <BadgeGrid
                                    badges={userBadges}
                                    title=""
                                    emptyMessage="Este usuario aún no ha obtenido logros."
                                />
                            )}
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfilePage;
