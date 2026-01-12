import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Fade } from '@mui/material';
import { useAuth } from '../../../core/context/AuthContext';
import { userService, authService } from '../../../core/services';
import { useSnackbar } from '../../../core/context/SnackbarContext.jsx';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import {
    ProfileHeader,
    ProfileInfo,
    ChangePassword,
    DangerZone
} from './components';

/**
 * Profile Page
 * View and edit user profile
 */
const ProfilePage = () => {
    const { user, updateUser, logout } = useAuth();
    const { showSuccess, showError } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        institution: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                institution: user.institution || '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveProfile = async () => {
        try {
            setLoading(true);
            const updatedUser = await userService.updateMyProfile(formData);
            updateUser(updatedUser);
            setEditing(false);
            showSuccess('Profile updated successfully');
        } catch (error) {
            showError(error.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            name: user.name || '',
            email: user.email || '',
            institution: user.institution || '',
        });
        setEditing(false);
    };

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            const updatedUser = await userService.updateProfilePicture(file);
            updateUser(updatedUser);
            showSuccess('Profile picture updated successfully');
        } catch (error) {
            showError(error.message || 'Failed to update profile picture');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (passwordData, onSuccess) => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 8) {
            showError('Password must be at least 8 characters');
            return;
        }

        try {
            setLoading(true);
            await authService.changePassword(passwordData.currentPassword, passwordData.newPassword);
            showSuccess('Password changed successfully');
            if (onSuccess) onSuccess();
        } catch (error) {
            showError(error.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async (password) => {
        if (!password) {
            showError('Please enter your password');
            return;
        }

        try {
            setLoading(true);
            await userService.deleteMyAccount(password);
            showSuccess('Account deleted successfully');
            await logout();
        } catch (error) {
            showError(error.message || 'Failed to delete account');
            setLoading(false);
        }
    };

    if (!user) {
        return <LoadingSpinner fullScreen />;
    }

    return (
        <Fade in={true} timeout={500}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                    Mi Perfil
                </Typography>

                <Grid container spacing={4}>
                    {/* Profile Picture Card */}
                    <Grid item xs={12} md={4}>
                        <ProfileHeader
                            user={user}
                            onProfilePictureChange={handleProfilePictureChange}
                        />
                    </Grid>

                    {/* Profile Info & Settings */}
                    <Grid item xs={12} md={8}>
                        <ProfileInfo
                            formData={formData}
                            editing={editing}
                            loading={loading}
                            onEdit={() => setEditing(true)}
                            onCancel={handleCancelEdit}
                            onSave={handleSaveProfile}
                            onChange={handleInputChange}
                        />

                        <ChangePassword
                            onChangePassword={handleChangePassword}
                            loading={loading}
                        />

                        <DangerZone
                            onDeleteAccount={handleDeleteAccount}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Fade>
    );
};

export default ProfilePage;
