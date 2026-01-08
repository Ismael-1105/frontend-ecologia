import React from 'react';
import { Stack } from '@mui/material';
import BadgeIcon from './BadgeIcon';

/**
 * BadgeList Component
 * Displays badges in a horizontal list
 */
const BadgeList = ({ badges = [], size = 'small', maxDisplay = 5 }) => {
    if (badges.length === 0) {
        return null;
    }

    const displayBadges = badges.slice(0, maxDisplay);
    const remainingCount = badges.length - maxDisplay;

    return (
        <Stack direction="row" spacing={0.5} alignItems="center">
            {displayBadges.map((badge) => (
                <BadgeIcon
                    key={badge._id || badge.id || badge}
                    badge={typeof badge === 'string' ? { _id: badge, icon: '🏆', name: 'Badge' } : badge}
                    size={size}
                />
            ))}
            {remainingCount > 0 && (
                <span style={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                    +{remainingCount}
                </span>
            )}
        </Stack>
    );
};

export default BadgeList;
