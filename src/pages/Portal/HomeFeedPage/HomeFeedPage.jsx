import React from 'react';
import {
    Box,
    Typography,
    Grid,
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import VideoCardYouTube from '../../../components/shared/VideoCardYouTube';
import { VideoCardSkeleton } from '../../../components/shared/Skeletons';
import useHomeFeed from './hooks/useHomeFeed';
import ResourcesPreview from './components/ResourcesPreview';
import ForumPreview from './components/ForumPreview';

// Number of videos to show before inserting the preview sections
const VIDEOS_BEFORE_SECTIONS = 8;

const HomeFeedPage = () => {
    // Search state comes from PortalLayout's AppBar via Outlet context
    const { searchQuery } = useOutletContext();

    const {
        videos,
        loading,
        loadingMore,
        hasMore,
        lastVideoRef,
    } = useHomeFeed(searchQuery);

    // Split videos into first batch (before sections) and rest (after sections)
    const firstBatch = videos.slice(0, VIDEOS_BEFORE_SECTIONS);
    const restBatch = videos.slice(VIDEOS_BEFORE_SECTIONS);

    // Only show sections on main feed (no search active)
    const showSections = !searchQuery && videos.length > 0;

    return (
        <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 }, maxWidth: 1800, mx: 'auto' }}>
            {/* Video Grid */}
            {loading ? (
                <Grid container spacing={2.5}>
                    {[...Array(12)].map((_, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                            <VideoCardSkeleton />
                        </Grid>
                    ))}
                </Grid>
            ) : videos.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {searchQuery ? 'No se encontraron videos' : 'No hay contenido disponible'}
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                        {searchQuery
                            ? `No hay resultados para "${searchQuery}". Intenta con otros términos.`
                            : 'Aún no se ha publicado contenido en la plataforma.'
                        }
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* First batch of videos */}
                    <Grid container spacing={2.5}>
                        {firstBatch.map((video, index) => {
                            const isLast = index === videos.length - 1;
                            return (
                                <Grid
                                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                    key={video._id}
                                    ref={isLast ? lastVideoRef : undefined}
                                >
                                    <VideoCardYouTube video={video} />
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* ─── Inserted Sections (Resources + Forum) ─── */}
                    {showSections && (
                        <Box sx={{ my: 1 }}>
                            <ResourcesPreview />
                            <ForumPreview />
                        </Box>
                    )}

                    {/* Rest of videos */}
                    {restBatch.length > 0 && (
                        <Grid container spacing={2.5} sx={{ mt: showSections ? 0 : undefined }}>
                            {restBatch.map((video, index) => {
                                const globalIndex = VIDEOS_BEFORE_SECTIONS + index;
                                const isLast = globalIndex === videos.length - 1;
                                return (
                                    <Grid
                                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                        key={video._id}
                                        ref={isLast ? lastVideoRef : undefined}
                                    >
                                        <VideoCardYouTube video={video} />
                                    </Grid>
                                );
                            })}

                            {/* Loading more indicator */}
                            {loadingMore && (
                                [...Array(4)].map((_, index) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`skeleton-${index}`}>
                                        <VideoCardSkeleton />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    )}

                    {/* Loading more when no rest batch yet */}
                    {restBatch.length === 0 && loadingMore && (
                        <Grid container spacing={2.5}>
                            {[...Array(4)].map((_, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`skeleton-${index}`}>
                                    <VideoCardSkeleton />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </>
            )}

            {/* End of feed message */}
            {!loading && !hasMore && videos.length > 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.disabled">
                        No hay más contenido para mostrar
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default HomeFeedPage;
