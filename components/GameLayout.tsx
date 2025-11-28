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
import { RoundResultOverlay } from './RoundResultOverlay';
import { motion, AnimatePresence } from 'framer-motion';

// Force rebuild
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

                // Check if game is finished (e.g., liquidation occurred)
                const currentStatus = useGameStore.getState().status;
                if (currentStatus !== 'FINISHED') {
                    // Here we should trigger the swipe animation on the card
                    // For now, we just proceed to next round which updates the data
                    // Ideally, we'd have a 'SWIPING' state in store to coordinate

                    nextRound();
                }
            }, 2000);
        }
    };

    return (
        <div className="h-[100dvh] w-full flex flex-col items-center bg-background relative overflow-hidden">

            <Header onOpenSettings={() => setIsSettingsOpen(true)} />

            <main className="flex-1 w-full flex flex-col items-center justify-start pt-4 sm:justify-center sm:pt-0 relative z-10 px-2 sm:px-4">
                <div className="relative w-full max-w-md sm:max-w-4xl flex justify-center">
                    <ChartCard />

                    {/* Emoji Feedback */}
                    <RoundResultOverlay type={showEmoji} />
                </div>

                {/* Controls moved closer to card */}
                <div className="my-auto sm:my-0 sm:mt-4 w-full max-w-md sm:max-w-4xl">
                    <Controls />
                </div>
            </main>

            <Footer />

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <ResultModal />

        </div>
    );
};
