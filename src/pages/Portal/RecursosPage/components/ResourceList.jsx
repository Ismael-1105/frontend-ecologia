import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import ResourceCard from './ResourceCard';
import { ResourceCardSkeleton } from '../../../../components/shared/Skeletons';
import { getAllUploads } from '../../../../core/api/uploadService';

const ResourceList = ({ searchQuery, uploadedResources = [] }) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getAllUploads({
                limit: 100, // Get more resources
                sort: '-createdAt', // Newest first
            });

            setResources(response.data || []);
        } catch (err) {
            console.error('Error fetching resources:', err);
            setError(err.message || 'Error al cargar los recursos');
        } finally {
            setLoading(false);
        }
    };

    // Combine uploaded resources with fetched resources
    const allResources = [...uploadedResources, ...resources];

    // Filter resources by search query
    const filteredResources = searchQuery
        ? allResources.filter(resource => {
            const title = resource.title?.toLowerCase() || '';
            const author = resource.uploadedBy?.name?.toLowerCase() || '';
            const query = searchQuery.toLowerCase();

            return title.includes(query) || author.includes(query);
        })
        : allResources;

    if (loading) {
        return (
            <Grid container spacing={3}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid item xs={12} md={6} key={item}>
                        <ResourceCardSkeleton />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        );
    }

    return (
        <Box>
            {filteredResources.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        {searchQuery
                            ? 'No se encontraron recursos con ese criterio de búsqueda'
                            : 'No hay recursos disponibles. ¡Sé el primero en subir uno!'}
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredResources.map((resource, index) => (
                        <Grid item xs={12} md={6} key={resource._id || resource.id || `resource-${index}`}>
                            <ResourceCard resource={resource} onUpdate={fetchResources} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ResourceList;
