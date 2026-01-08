import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

/**
 * CategoryBreadcrumb Component
 * Displays breadcrumb navigation for category hierarchy
 */
const CategoryBreadcrumb = ({ breadcrumb = [], onNavigate }) => {
    if (breadcrumb.length === 0) {
        return null;
    }

    const handleClick = (category, index) => (event) => {
        event.preventDefault();
        if (onNavigate) {
            onNavigate(category, index);
        }
    };

    return (
        <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="category breadcrumb"
            sx={{ mb: 2 }}
        >
            {breadcrumb.map((category, index) => {
                const isLast = index === breadcrumb.length - 1;

                return isLast ? (
                    <Typography
                        key={category._id}
                        color="text.primary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        {category.icon && <span>{category.icon}</span>}
                        {category.name}
                    </Typography>
                ) : (
                    <Link
                        key={category._id}
                        underline="hover"
                        color="inherit"
                        href="#"
                        onClick={handleClick(category, index)}
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        {category.icon && <span>{category.icon}</span>}
                        {category.name}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default CategoryBreadcrumb;
