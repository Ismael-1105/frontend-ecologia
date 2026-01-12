import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ResourceCard from './ResourceCard';
import { ResourceCardSkeleton } from '../../../../components/shared/Skeletons';

// Mock data for resources
const mockResources = [
    {
        id: 1,
        title: 'Manual de Identificación de Aves de Loja',
        type: 'PDF',
        downloads: 234,
        author: 'Fundación Jocotoco'
    },
    {
        id: 2,
        title: 'Video: Técnicas de reforestación nativa',
        type: 'Video',
        downloads: 189,
        author: 'Dr. Carlos Mendoza'
    },
    {
        id: 3,
        title: 'Infografía: Ciclo del agua en los Andes',
        type: 'Imagen',
        downloads: 156,
        author: 'María García'
    },
    {
        id: 4,
        title: 'Guía de Compostaje para Escuelas',
        type: 'PDF',
        downloads: 198,
        author: 'Ana Córdova'
    },
    {
        id: 5,
        title: 'Presentación: Biodiversidad en Podocarpus',
        type: 'PDF',
        downloads: 145,
        author: 'Luis Armijos'
    },
    {
        id: 6,
        title: 'Video: Conservación del Oso de Anteojos',
        type: 'Video',
        downloads: 267,
        author: 'Pedro Sánchez'
    }
];

const ResourceList = ({ searchQuery, uploadedResources = [] }) => {
    // Combine uploaded resources with mock data
    const allResources = [...uploadedResources, ...mockResources];

    // Filter resources by search query
    const filteredResources = searchQuery
        ? allResources.filter(resource =>
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (resource.author && resource.author.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : allResources;

    return (
        <Box>
            {filteredResources.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No se encontraron recursos
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredResources.map((resource, index) => (
                        <Grid item xs={12} md={6} key={resource.id || `uploaded-${index}`}>
                            <ResourceCard resource={resource} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ResourceList;
