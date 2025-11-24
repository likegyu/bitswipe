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
            <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading data...</p>
            {timeframe === '1m' && (
                <p className="mt-2 text-sm text-gray-400 text-center px-6">
                    1-minute data may take a moment to load due to large volume
                </p>
            )}
        </div>
    );
};
