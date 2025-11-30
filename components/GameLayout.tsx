'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Header } from './Header';
import { ChartCard } from './ChartCard';
import { Controls } from './Controls';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Ad } from './Ad';
import { TimeframeSelector } from './TimeframeSelector';
import { Footer } from './Footer';
import { RoundResultOverlay } from './RoundResultOverlay';

const SettingsModal = dynamic(() => import('./SettingsModal').then(mod => mod.SettingsModal), {
    ssr: false
});
const ResultModal = dynamic(() => import('./ResultModal').then(mod => mod.ResultModal), {
    ssr: false
});

// Force rebuild
export const GameLayout = () => {
    const {
        status,
        round,
        isGameStarted,
    } = useGameStore();
    const revealNextCandle = () => useGameStore.getState().revealNextCandle();
    const nextRound = () => useGameStore.getState().nextRound();
    const completeRound = () => useGameStore.getState().completeRound();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showEmoji, setShowEmoji] = useState<'win' | 'loss' | 'hold' | null>(null);

    const revealSpeed = useGameStore(state => state.settings.revealSpeed);


    // Game Loop: Reveal candles
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (status === 'REVEALING') {
            interval = setInterval(() => {
                const hasMore = useGameStore.getState().revealNextCandle();
                if (!hasMore) {
                    clearInterval(interval);
                    finishRound();
                }
            }, revealSpeed);
        }

        return () => clearInterval(interval);
    }, [status, revealSpeed]);

    useEffect(() => {
        if (status === 'RESULT') {
            const state = useGameStore.getState();
            const lastResult = state.history[state.history.length - 1];

            if (lastResult) {
                // Determine emoji based on position and result
                if (lastResult.position === 'hold') {
                    setShowEmoji('hold');
                } else {
                    setShowEmoji(lastResult.win ? 'win' : 'loss');
                }

                // Wait for emoji (2초), then proceed to next round
                setTimeout(() => {
                    setShowEmoji(null);

                    // Check if game is finished (e.g., liquidation occurred)
                    const currentStatus = useGameStore.getState().status;
                    if (currentStatus !== 'FINISHED') {
                        nextRound();
                    }
                }, 2000); // 👈 2초 이모지 표시 시간
            }
        }
    }, [status]); // 👈 status가 변경될 때마다 실행

    const finishRound = () => {
        const state = useGameStore.getState();

        // 💡 수정 1: status가 'REVEALING'이 아닐 때 중복 실행 방지
        // (수동 종료 시 이미 completeRound가 호출되어 status가 'RESULT'가 됨)
        if (state.status !== 'REVEALING') return;

        // 💡 수정 2: completeRound() 호출
        // 이 호출로 useGameStore에서 status가 'RESULT'로 변경됩니다.
        completeRound();

        // 💡 수정 3: 이모지 관련 로직 (lastResult 확인, setShowEmoji, setTimeout, nextRound)은
        // 위에서 새로 추가한 'RESULT' useEffect가 처리하므로, 여기서는 모두 제거합니다.
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
