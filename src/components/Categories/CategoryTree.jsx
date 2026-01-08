import React, { useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Collapse,
    Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

/**
 * CategoryTreeItem Component
 * Recursive component for displaying category tree nodes
 */
const CategoryTreeItem = ({ category, onSelect, selectedId, level = 0 }) => {
    const [open, setOpen] = useState(true);
    const hasChildren = category.children && category.children.length > 0;
    const isSelected = selectedId === category._id;

    const handleClick = () => {
        if (onSelect) {
            onSelect(category);
        }
        if (hasChildren) {
            setOpen(!open);
        }
    };

    return (
        <>
            <ListItem disablePadding sx={{ pl: level * 2 }}>
                <ListItemButton
                    onClick={handleClick}
                    selected={isSelected}
                    sx={{
                        borderLeft: isSelected ? 3 : 0,
                        borderColor: 'primary.main',
                    }}
                >
                    <ListItemText
                        primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {category.icon && <span>{category.icon}</span>}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: isSelected ? 'bold' : 'normal',
                                        color: category.color || 'text.primary',
                                    }}
                                >
                                    {category.name}
                                </Typography>
                                {category.videoCount > 0 && (
                                    <Typography variant="caption" color="text.secondary">
                                        ({category.videoCount})
                                    </Typography>
                                )}
                            </Box>
                        }
                    />
                    {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
            </ListItem>

            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {category.children.map((child) => (
                            <CategoryTreeItem
                                key={child._id}
                                category={child}
                                onSelect={onSelect}
                                selectedId={selectedId}
                                level={level + 1}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

/**
 * CategoryTree Component
 * Displays categories in a hierarchical tree structure
 */
const CategoryTree = ({ categories = [], onSelect, selectedId }) => {
    if (categories.length === 0) {
        return (
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    No hay categorías disponibles
                </Typography>
            </Box>
        );
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {categories.map((category) => (
                <CategoryTreeItem
                    key={category._id}
                    category={category}
                    onSelect={onSelect}
                    selectedId={selectedId}
                    level={0}
                />
            ))}
        </List>
    );
};

export default CategoryTree;
