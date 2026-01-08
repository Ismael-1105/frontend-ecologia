import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import {
    VideoLibrary as VideoLibraryIcon,
    Visibility as VisibilityIcon,
    Comment as CommentIcon,
    TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import StatsCard from '../../../../components/common/StatsCard';
import { statsService } from '../../../../core/services';

const DashboardStats = () => {
    const [stats, setStats] = useState({
        totalVideos: 0,
        totalViews: 0,
        totalComments: 0,
        activeUsers: '0'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await statsService.getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({
                    totalVideos: 0,
                    totalViews: 0,
                    totalComments: 0,
                    activeUsers: '0'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statsData = [
        {
            icon: VideoLibraryIcon,
            label: 'Videos',
            value: loading ? '...' : stats.totalVideos,
            change: '+3 nuevos',
            color: 'primary'
        },
        {
            icon: VisibilityIcon,
            label: 'Vistas Totales',
            value: loading ? '...' : stats.totalViews.toLocaleString(),
            change: '+12% esta semana',
            color: 'success'
        },
        {
            icon: CommentIcon,
            label: 'Comentarios',
            value: loading ? '...' : stats.totalComments,
            change: '+8 hoy',
            color: 'info'
        },
        {
            icon: TrendingUpIcon,
            label: 'Usuarios Activos',
            value: loading ? '...' : stats.activeUsers,
            change: '+45 este mes',
            color: 'warning'
        }
    ];

    return (
        <Grid container spacing={3}>
            {statsData.map((stat, index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                    <StatsCard {...stat} />
                </Grid>
            ))}
        </Grid>
    );
};

export default DashboardStats;
