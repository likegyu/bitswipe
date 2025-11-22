'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Header } from './Header';
import { ChartCard } from './ChartCard';
import { Controls } from './Controls';
import { SettingsModal } from './SettingsModal';
import { ResultModal } from './ResultModal';
import { Ad } from './Ad';
import { TimeframeSelector } from './TimeframeSelector';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

export const GameLayout = () => {
    const {
        status,
        revealNextCandle,
        nextRound,
        round,
        isGameStarted,
        completeRound
    } = useGameStore();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showEmoji, setShowEmoji] = useState<'win' | 'loss' | 'hold' | null>(null);

    // Game Loop: Reveal candles
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (status === 'REVEALING') {
            interval = setInterval(() => {
                const hasMore = revealNextCandle();
                if (!hasMore) {
                    clearInterval(interval);
                    finishRound();
                }
            }, 500); // 0.5s per candle
        }

        return () => clearInterval(interval);
    }, [status]);

    const finishRound = () => {
        completeRound();
        const lastResult = useGameStore.getState().history[useGameStore.getState().history.length - 1];

        if (lastResult) {
            // Determine emoji based on position and result
            if (lastResult.position === 'hold') {
                setShowEmoji('hold');
            } else {
                setShowEmoji(lastResult.win ? 'win' : 'loss');
            }

            // Wait for emoji, then swipe/next
            setTimeout(() => {
                setShowEmoji(null);

                // Here we should trigger the swipe animation on the card
                // For now, we just proceed to next round which updates the data
                // Ideally, we'd have a 'SWIPING' state in store to coordinate

                nextRound();
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-background relative overflow-hidden">

            <Header onOpenSettings={() => setIsSettingsOpen(true)} />

            <main className="flex-1 w-full flex flex-col items-center justify-start pt-4 sm:justify-center sm:pt-0 relative z-10 px-2 sm:px-4">
                <div className="relative w-full max-w-md flex justify-center">
                    <ChartCard />

                    {/* Emoji Feedback */}
                    <AnimatePresence>
                        {showEmoji && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                            >
                                <span className="text-9xl filter drop-shadow-lg">
                                    {showEmoji === 'win' ? '🤑' : showEmoji === 'loss' ? '💸' : '👀'}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Controls moved closer to card */}
                <div className="mt-2 sm:mt-4 w-full max-w-md">
                    <Controls />
                </div>
            </main>

            <Footer />

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <ResultModal />

        </div>
    );
};
