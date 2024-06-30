'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface BadgeProps {
    label?: string;
    icon: IconType,
}

const Badge: React.FC<BadgeProps> = ({ label, icon: Icon, }) => {
    return (
        <Icon size={30} className="inline-block bg-rose-500 text-white font-semibold text-xs rounded-full shadow-lg" />
    );
}

export default Badge;
