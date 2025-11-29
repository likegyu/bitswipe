'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Timeframe } from '@/lib/data';

interface LoadingIndicatorProps {
    timeframe?: Timeframe;
}

export const LoadingIndicator = ({ timeframe }: LoadingIndicatorProps) => {
    return (
        <div className="absolute inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center">
            <motion.div
                className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};
