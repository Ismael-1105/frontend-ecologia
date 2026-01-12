import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Box,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import { userService } from '../../../core/services';
import { useSnackbar } from '../../../core/context/SnackbarContext.jsx';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import PaginationComponent from '../../../components/shared/PaginationComponent';
import ConfirmDialog from '../../../components/shared/ConfirmDialog';

/**
 * Users Management Page (Admin)
 * Manage all users, change roles, delete users
 */
const UsersManagementPage = () => {
    const { showSuccess, showError } = useSnackbar();

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState('');

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line
    }, [page, searchQuery, roleFilter]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: 10,
                ...(roleFilter && { role: roleFilter }),
            };

            const response = await userService.getAllUsers(params);
            setUsers(response.data);
            setPagination(response.pagination);
        } catch (error) {
            showError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleEditRole = (user) => {
        setSelectedUser(user);
        setNewRole(user.role);
        setEditDialogOpen(true);
    };

    const handleSaveRole = async () => {
        try {
            await userService.updateUser(selectedUser._id, { role: newRole });
            setEditDialogOpen(false);
            showSuccess('User role updated successfully');
            loadUsers();
        } catch (error) {
            showError(error.message || 'Failed to update user role');
        }
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await userService.deleteUser(userToDelete._id);
            setDeleteDialogOpen(false);
            showSuccess('User deleted successfully');
            loadUsers();
        } catch (error) {
            showError(error.message || 'Failed to delete user');
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'SuperAdmin':
                return 'error';
            case 'Administrador':
                return 'warning';
            case 'Docente':
                return 'info';
            default:
                return 'default';
        }
    };

    if (loading && users.length === 0) {
        return <LoadingSpinner fullScreen message="Loading users..." />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Users Management
            </Typography>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(1);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ flex: 1, minWidth: 250 }}
                        />

                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Filter by Role</InputLabel>
                            <Select
                                value={roleFilter}
                                label="Filter by Role"
                                onChange={(e) => {
                                    setRoleFilter(e.target.value);
                                    setPage(1);
                                }}
                            >
                                <MenuItem value="">All Roles</MenuItem>
                                <MenuItem value="Estudiante">Estudiante</MenuItem>
                                <MenuItem value="Docente">Docente</MenuItem>
                                <MenuItem value="Administrador">Administrador</MenuItem>
                                <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Institution</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="body2" color="text.secondary">
                                            No users found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user._id} hover>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.institution || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Chip label={user.role} color={getRoleColor(user.role)} size="small" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small" onClick={() => handleEditRole(user)}>
                                                <Edit fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDeleteUser(user)}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ p: 2 }}>
                    <PaginationComponent pagination={pagination} onPageChange={setPage} />
                </Box>
            </Card>

            {/* Edit Role Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit User Role</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" paragraph>
                        Change role for: <strong>{selectedUser?.name}</strong>
                    </Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Role</InputLabel>
                        <Select value={newRole} label="Role" onChange={(e) => setNewRole(e.target.value)}>
                            <MenuItem value="Estudiante">Estudiante</MenuItem>
                            <MenuItem value="Docente">Docente</MenuItem>
                            <MenuItem value="Administrador">Administrador</MenuItem>
                            <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveRole}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete User"
                message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
                confirmText="Delete"
                severity="error"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteDialogOpen(false)}
            />
        </Container>
    );
};

export default UsersManagementPage;
