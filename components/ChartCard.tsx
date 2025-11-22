'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { TradingChart } from './TradingChart';
import { useGameStore } from '@/store/gameStore';
import { TimeframeSelector } from './TimeframeSelector';
import { Ad } from './Ad';
import { LoadingIndicator } from './LoadingIndicator';

const variants: Variants = {
    front: {
        zIndex: 20,
        scale: 1,
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 300, damping: 50 }
    },
    back: {
        zIndex: 10,
        scale: 0.95,
        y: -70, // Peeking out from top (adjusted for bottom transform origin)
        opacity: 0.6,
        rotate: 0,
        transition: { type: 'spring', stiffness: 300, damping: 50 }
    },
    exit: (custom: { direction: 'left' | 'right' | 'up' }) => ({
        zIndex: 30,
        x: custom.direction === 'left' ? -1000 : custom.direction === 'right' ? 1000 : 0,
        y: custom.direction === 'up' ? -1000 : 0,
        opacity: 0,
        rotate: custom.direction === 'left' ? -45 : custom.direction === 'right' ? 45 : 0,
        transition: { duration: 0.5, ease: "easeIn" }
    }),
    enter: {
        zIndex: 5,
        scale: 0.9,
        y: -200,
        opacity: 0,
    }
};

export const ChartCard = () => {
    const {
        frontChart,
        backChart,
        placeBet,
        status,
        isGameStarted,
        isLoading,
        settings,
        history
    } = useGameStore();

    const [overlay, setOverlay] = useState<'long' | 'short' | 'hold' | null>(null);

    // Determine exit direction based on the last history item
    // We need to know this for the EXITING card.
    const lastResult = history[history.length - 1];
    const exitDirection = lastResult?.position === 'short' ? 'left' : lastResult?.position === 'long' ? 'right' : 'up';

    const handleInteraction = (position: 'long' | 'short' | 'hold') => {
        if (status !== 'PLAYING') return;
        setOverlay(position);
        placeBet(position);
    };

    // Reset overlay when round changes (new front chart appears)
    useEffect(() => {
        setOverlay(null);
    }, [frontChart?.id]);

    const cards = [
        { type: 'back', data: backChart },
        { type: 'front', data: frontChart }
    ].filter(c => c.data !== null);

    return (
        <div className="relative w-full max-w-md min-h-[60vh] sm:h-[60vh] perspective-1000 flex items-center justify-center">

            {/* Pre-Game / Loading State */}
            {(!isGameStarted || isLoading) && (
                <div className="absolute w-full h-full bg-card-bg rounded-3xl overflow-hidden card-shadow border border-gray-100 z-50">
                    {isLoading ? (
                        <LoadingIndicator timeframe={settings.timeframe} />
                    ) : (
                        <TimeframeSelector />
                    )}
                </div>
            )}

            {isGameStarted && !isLoading && (
                <AnimatePresence custom={{ direction: exitDirection }} mode='popLayout'>
                    {cards.map((card) => (
                        <motion.div
                            key={card.data!.id}
                            custom={{ direction: exitDirection, type: card.type }}
                            variants={variants}
                            initial="enter"
                            animate={card.type === 'front' ? 'front' : 'back'}
                            exit="exit"
                            className="absolute w-full h-full bg-card-bg rounded-3xl overflow-hidden card-shadow border border-gray-100"
                            style={{
                                transformOrigin: 'bottom center',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                            }}
                        >
                            {/* Ad Overlay - Only on front */}
                            {card.type === 'front' && status === 'AD' && (
                                <div className="absolute inset-0 z-50">
                                    <Ad />
                                </div>
                            )}

                            {/* Interaction Layer - Only on Front Card */}
                            {card.type === 'front' && status === 'PLAYING' && !overlay && (
                                <>
                                    <div
                                        onClick={() => handleInteraction('short')}
                                        className="absolute left-0 top-0 w-1/3 h-full z-30 cursor-pointer hover:bg-error/5 transition-colors group"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-error font-bold text-4xl -rotate-12">SHORT</span>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => handleInteraction('hold')}
                                        className="absolute left-1/3 top-0 w-1/3 h-full z-30 cursor-pointer hover:bg-gray-500/5 transition-colors group"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-gray-500 font-bold text-4xl">HOLD</span>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => handleInteraction('long')}
                                        className="absolute right-0 top-0 w-1/3 h-full z-30 cursor-pointer hover:bg-success/5 transition-colors group"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-success font-bold text-4xl rotate-12">LONG</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Result Overlays - Only on Front Card */}
                            {card.type === 'front' && overlay === 'short' && (
                                <div className="absolute inset-0 bg-error/10 z-20 flex items-center justify-center pointer-events-none">
                                    <span className="text-error font-bold text-6xl -rotate-12">SHORT</span>
                                </div>
                            )}
                            {card.type === 'front' && overlay === 'hold' && (
                                <div className="absolute inset-0 bg-gray-500/10 z-20 flex items-center justify-center pointer-events-none">
                                    <span className="text-gray-500 font-bold text-6xl">HOLD</span>
                                </div>
                            )}
                            {card.type === 'front' && overlay === 'long' && (
                                <div className="absolute inset-0 bg-success/10 z-20 flex items-center justify-center pointer-events-none">
                                    <span className="text-success font-bold text-6xl rotate-12">LONG</span>
                                </div>
                            )}

                            {/* Chart Component */}
                            <div className="w-full h-full p-2 sm:p-4 relative">
                                <TradingChart
                                    candles={card.data!.candles}
                                    warmupCandles={card.data!.warmupCandles}
                                    entryPrice={card.data!.entryPrice}
                                    settings={settings}
                                />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
};
