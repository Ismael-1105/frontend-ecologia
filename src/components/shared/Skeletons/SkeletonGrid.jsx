import React from 'react';
import { Grid } from '@mui/material';

/**
 * SkeletonGrid Component
 * Wrapper component that renders a grid of skeleton components
 * Handles responsive layout and consistent spacing
 * 
 * @param {Object} props
 * @param {React.Component} props.SkeletonComponent - The skeleton component to render
 * @param {number} props.count - Number of skeleton items to display
 * @param {Object} props.gridProps - Grid item props (xs, sm, md, lg, xl)
 */
const SkeletonGrid = ({
    SkeletonComponent,
    count = 6,
    gridProps = { xs: 12, sm: 6, md: 4 }
}) => {
    return (
        <Grid container spacing={3}>
            {Array.from(new Array(count)).map((_, index) => (
                <Grid item {...gridProps} key={index}>
                    <SkeletonComponent />
                </Grid>
            ))}
        </Grid>
    );
};

export default SkeletonGrid;
