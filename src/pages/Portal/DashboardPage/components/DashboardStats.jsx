import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import {
    VideoLibrary as VideoLibraryIcon,
    Visibility as VisibilityIcon,
    Comment as CommentIcon,
    TrendingUp as TrendingUpIcon,
    Forum as ForumIcon,
    UploadFile as UploadFileIcon
} from '@mui/icons-material';
import StatsCard from '../../../../components/common/StatsCard';
import { StatsCardSkeleton } from '../../../../components/shared/Skeletons';
import { statsService } from '../../../../core/services';
import { useAuth } from '../../../../core/context/AuthContext';

const DashboardStats = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalVideos: 0,
        totalViews: 0,
        totalComments: 0,
        recentVideos: 0,
        userComments: 0,
        viewsGrowthPercent: 0,
        totalPosts: 0,
        totalResources: 0,
        totalForumComments: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await statsService.getDashboardStats(user?._id);
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({
                    totalVideos: 0,
                    totalViews: 0,
                    totalComments: 0,
                    recentVideos: 0,
                    userComments: 0,
                    viewsGrowthPercent: 0,
                    totalPosts: 0,
                    totalResources: 0,
                    totalForumComments: 0
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    const statsData = [
        {
            icon: VideoLibraryIcon,
            label: 'Mis Videos',
            value: stats.totalVideos,
            change: `+${stats.recentVideos} esta semana`,
            color: 'primary'
        },
        {
            icon: VisibilityIcon,
            label: 'Mis Vistas',
            value: stats.totalViews.toLocaleString(),
            change: `+${stats.viewsGrowthPercent}% esta semana`,
            color: 'success'
        },
        {
            icon: CommentIcon,
            label: 'Mis Comentarios',
            value: stats.userComments,
            change: `${stats.totalComments} en mis videos`,
            color: 'info'
        },
        {
            icon: ForumIcon,
            label: 'Mis Discusiones',
            value: stats.totalPosts,
            change: 'en el foro',
            color: 'secondary'
        },
        {
            icon: UploadFileIcon,
            label: 'Mis Recursos',
            value: stats.totalResources,
            change: 'documentos compartidos',
            color: 'warning'
        },
    ];

    if (loading) {
        return (
            <Grid container spacing={3}>
                {[...Array(5)].map((_, index) => (
                    <Grid size={{ xs: 6, md: 4 }} key={index}>
                        <StatsCardSkeleton />
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <Grid container spacing={3}>
            {statsData.map((stat, index) => (
                <Grid size={{ xs: 6, md: 4 }} key={index}>
                    <StatsCard {...stat} />
                </Grid>
            ))}
        </Grid>
    );
};

export default DashboardStats;
