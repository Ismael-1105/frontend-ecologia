import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import MemberCard from './MemberCard';
import { MemberCardSkeleton } from '../../../../components/shared/Skeletons';
import userService from '../../../../core/services/userService';

const MemberList = ({ searchQuery }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                const response = await userService.getAllUsers();
                const users = response.data || response || [];
                const mappedMembers = users.map(user => ({
                    id: user._id,
                    name: user.name,
                    role: user.role,
                    institution: user.institution || '',
                    profilePicture: user.profilePicture,
                    videos: user.videoCount || 0,
                    posts: user.postCount || 0,
                }));
                setMembers(mappedMembers);
            } catch (error) {
                console.error('Error al cargar miembros:', error);
                setMembers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    // Filter members by search query
    const filteredMembers = searchQuery
        ? members.filter(member =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.institution?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : members;

    if (loading) {
        return (
            <Grid container spacing={3}>
                {Array.from(new Array(6)).map((_, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                        <MemberCardSkeleton />
                    </Grid>
                ))}
            </Grid>
        );
    }

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
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={member.id}>
                            <MemberCard member={member} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default MemberList;
