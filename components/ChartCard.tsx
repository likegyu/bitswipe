'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { TradingChart } from './TradingChart';
import { useGameStore } from '@/store/gameStore';
import { TimeframeSelector } from './TimeframeSelector';
import { AdMockup } from './AdMockup';
import clsx from 'clsx';

export const ChartCard = () => {
    const { placeBet, status, history, isGameStarted } = useGameStore();
    const controls = useAnimation();
    const [overlay, setOverlay] = useState<'long' | 'short' | null>(null);

    // Handle swipe animation when round finishes
    useEffect(() => {
        if (status === 'PLAYING') {
            controls.set({ x: 0, opacity: 1, rotate: 0 });
            setOverlay(null);
        }
    }, [status, controls]);

    const handleInteraction = (position: 'long' | 'short') => {
        if (status !== 'PLAYING') return;
        setOverlay(position);
        placeBet(position);
    };

    return (
        <div className="relative w-full max-w-md h-[60vh] perspective-1000">
            <motion.div
                animate={controls}
                className="w-full h-full bg-card-bg rounded-3xl overflow-hidden card-shadow border border-gray-100 relative z-10"
            >
                {/* Start Screen Overlay */}
                {!isGameStarted && (
                    <div className="absolute inset-0 z-50 bg-white">
                        <TimeframeSelector />
                    </div>
                )}

                {/* Ad Overlay */}
                {status === 'AD' && (
                    <div className="absolute inset-0 z-50 bg-white">
                        <AdMockup />
                    </div>
                )}

                {/* Click Zones */}
                {status === 'PLAYING' && !overlay && (
                    <>
                        <div
                            onClick={() => handleInteraction('short')}
                            className="absolute left-0 top-0 w-1/2 h-full z-30 cursor-pointer hover:bg-error/10 transition-colors group"
                        >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-error font-bold text-4xl -rotate-12">SHORT</span>
                            </div>
                        </div>
                        <div
                            onClick={() => handleInteraction('long')}
                            className="absolute right-0 top-0 w-1/2 h-full z-30 cursor-pointer hover:bg-success/10 transition-colors group"
                        >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-success font-bold text-4xl rotate-12">LONG</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Permanent Overlay when selected */}
                {overlay === 'short' && (
                    <div className="absolute inset-0 bg-error/20 z-20 flex items-center justify-center pointer-events-none">
                        <span className="text-error font-bold text-6xl -rotate-12">SHORT</span>
                    </div>
                )}
                {overlay === 'long' && (
                    <div className="absolute inset-0 bg-success/20 z-20 flex items-center justify-center pointer-events-none">
                        <span className="text-success font-bold text-6xl rotate-12">LONG</span>
                    </div>
                )}

                {/* Chart */}
                <div className="w-full h-full p-4 relative">
                    <TradingChart />
                </div>
            </motion.div>

            {/* Background cards stack effect */}
            <div className="absolute inset-0 bg-white rounded-3xl transform scale-95 translate-y-4 -z-10 opacity-50 shadow-lg" />
        </div>
    );
};
