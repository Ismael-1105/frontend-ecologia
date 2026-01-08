import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import MemberCard from './MemberCard';

// Mock data for community members
const mockMembers = [
    {
        id: 1,
        name: 'Dr. Carlos Mendoza',
        role: 'Docente',
        institution: 'Universidad Nacional de Loja',
        videos: 12,
        posts: 45
    },
    {
        id: 2,
        name: 'María García',
        role: 'Docente',
        institution: 'Colegio Bernardo Valdivieso',
        videos: 8,
        posts: 38
    },
    {
        id: 3,
        name: 'Luis Armijos',
        role: 'Estudiante',
        institution: 'Universidad Técnica Particular de Loja',
        videos: 5,
        posts: 32
    },
    {
        id: 4,
        name: 'Ana Córdova',
        role: 'Docente',
        institution: 'Unidad Educativa La Dolorosa',
        videos: 10,
        posts: 28
    },
    {
        id: 5,
        name: 'Pedro Sánchez',
        role: 'Estudiante',
        institution: 'Universidad Nacional de Loja',
        videos: 3,
        posts: 25
    },
    {
        id: 6,
        name: 'Rosa Palacios',
        role: 'Docente',
        institution: 'Colegio La Inmaculada',
        videos: 7,
        posts: 22
    }
];

const MemberList = ({ searchQuery }) => {
    // Filter members by search query
    const filteredMembers = searchQuery
        ? mockMembers.filter(member =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.institution?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : mockMembers;

    return (
        <Box>
            {filteredMembers.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No se encontraron miembros
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredMembers.map((member) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
                            <MemberCard member={member} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default MemberList;
