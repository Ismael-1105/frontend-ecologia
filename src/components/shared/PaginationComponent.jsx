import React from 'react';
import { Pagination as MuiPagination, Box, Typography } from '@mui/material';

/**
 * Pagination Component
 * Reusable pagination with metadata display
 */
const PaginationComponent = ({ pagination, onPageChange }) => {
    if (!pagination || pagination.totalPages <= 1) {
        return null;
    }

    const { currentPage, totalPages, totalCount, limit } = pagination;

    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, totalCount);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
                gap: 2,
            }}
        >
            <Typography variant="body2" color="text.secondary">
                Showing {startItem} to {endItem} of {totalCount} results
            </Typography>

            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => onPageChange(page)}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
            />
        </Box>
    );
};

export default PaginationComponent;
