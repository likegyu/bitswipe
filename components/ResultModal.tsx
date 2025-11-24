'use client';

import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';



import { AnalysisModal } from './AnalysisModal';

export const ResultModal = () => {
    const { status, history, balance, initialBalance, resetGame } = useGameStore();
    const [isCopied, setIsCopied] = React.useState(false);
    const [showAnalysis, setShowAnalysis] = React.useState(false);

    // Scroll Lock
    React.useEffect(() => {
        if (status === 'FINISHED') {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [status]);

    if (status !== 'FINISHED') return null;

    const totalRounds = history.length;
    const wins = history.filter(h => h.win).length;
    const losses = totalRounds - wins;
    const winRate = totalRounds > 0 ? (wins / totalRounds) * 100 : 0;

    const longBets = history.filter(h => h.position === 'long');
    const longWins = longBets.filter(h => h.win).length;
    const longWinRate = longBets.length > 0 ? (longWins / longBets.length) * 100 : 0;

    const shortBets = history.filter(h => h.position === 'short');
    const shortWins = shortBets.filter(h => h.win).length;
    const shortWinRate = shortBets.length > 0 ? (shortWins / shortBets.length) * 100 : 0;

    const profit = balance - initialBalance;
    const profitPercent = ((profit / initialBalance) * 100).toFixed(2);

    const data = [
        { name: 'Wins', value: wins },
        { name: 'Losses', value: losses },
    ];

    const COLORS = ['#88d8b0', '#ff6b6b'];

    // Advanced Metrics Calculation
    const grossProfit = history.reduce((acc, h) => {
        return acc + (h.actualPnL > 0 ? h.actualPnL : 0);
    }, 0);
    const grossLoss = history.reduce((acc, h) => {
        return acc + (h.actualPnL < 0 ? Math.abs(h.actualPnL) : 0);
    }, 0);
    const profitFactor = grossLoss === 0 ? (grossProfit > 0 ? 99.9 : 0) : (grossProfit / grossLoss);

    const profits = history.map(h => h.profitPercent);
    const avgProfit = profits.length > 0 ? profits.reduce((a, b) => a + b, 0) / profits.length : 0;
    // Fix: If all trades are losses (e.g. liquidation), max profit is still negative.
    // However, if liquidated in round 1, profit is -100%. User wants to avoid showing "-100.0%".
    // If best trade is -100%, it means only loss occurred. We can show 0% or just show the actual best trade.
    // User request: "Best Trade +-100.0% correction".
    // If the best trade is -100% (liquidation), we should probably show 0% or handle it gracefully.
    // Let's show 0% if the best trade is <= -100% (liquidation).
    const rawBestTrade = profits.length > 0 ? Math.max(...profits) : 0;
    const bestTrade = rawBestTrade <= -100 ? 0 : rawBestTrade;

    const handleShare = async () => {
        const baseUrl = window.location.origin;
        const params = new URLSearchParams({
            w: Math.round(winRate).toString(),
            p: profitPercent,
            r: totalRounds.toString(),
            bt: bestTrade.toFixed(2)
        });

        // GTM Tracking
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: 'share_click'
            });
        }

        const shareUrl = `${baseUrl}?${params.toString()}`;
        const shareText = `BitSwipe Results 🚀\n\nReturn: ${profit >= 0 ? '+' : ''}${profitPercent}%\nWin Rate: ${Math.round(winRate)}%\nBest Trade: +${bestTrade.toFixed(2)}%\n\nCan you beat my score? #BitSwipe #CryptoTrading\n${shareUrl}`;

        try {
            await navigator.clipboard.writeText(shareText);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleAnalysisClick = () => {
        // GTM Tracking
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: 'analysis_click'
            });
        }
        setShowAnalysis(true);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[80] flex items-center justify-center p-2 sm:p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-4 sm:p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                {/* Main Win Rate */}
                <div className="flex flex-col items-center mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-lg font-bold text-gray-800 dark:text-white mb-2">Total Win Rate</h3>
                    <div className="w-28 h-28 sm:w-48 sm:h-48 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[data[0]]}
                                    innerRadius={30}
                                    outerRadius={50}
                                    startAngle={90}
                                    endAngle={90 - (360 * (data[0].value / (data[0].value + data[1].value)))}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell fill={COLORS[0]} />
                                </Pie>
                                <Pie
                                    data={[data[1]]}
                                    innerRadius={30}
                                    outerRadius={45}
                                    startAngle={90 - (360 * (data[0].value / (data[0].value + data[1].value)))}
                                    endAngle={-270}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell fill={COLORS[1]} />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-lg sm:text-2xl font-bold" style={{ color: winRate >= 50 ? COLORS[0] : COLORS[1] }}>
                                {Math.round(winRate)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sub Stats - Win Rates */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-2 sm:mb-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-2xl text-center shadow-sm">
                        <h4 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Long Win Rate</h4>
                        <span className="text-base sm:text-xl font-bold text-success">{Math.round(longWinRate)}%</span>
                        <div className="text-xs text-gray-400">{longWins}/{longBets.length}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-2xl text-center shadow-sm">
                        <h4 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Short Win Rate</h4>
                        <span className="text-base sm:text-xl font-bold text-error">{Math.round(shortWinRate)}%</span>
                        <div className="text-xs text-gray-400">{shortWins}/{shortBets.length}</div>
                    </div>
                </div>

                {/* Advanced Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-xl text-center shadow-sm">
                        <h4 className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">Profit Factor</h4>
                        <span className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200">{profitFactor.toFixed(2)}</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-xl text-center shadow-sm">
                        <h4 className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Profit</h4>
                        <span className={`text-sm sm:text-base font-bold ${avgProfit >= 0 ? 'text-success' : 'text-error'}`}>
                            {avgProfit >= 0 ? '+' : ''}{avgProfit.toFixed(1)}%
                        </span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-xl text-center shadow-sm">
                        <h4 className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">Best Trade</h4>
                        <span className="text-sm sm:text-base font-bold text-success">+{bestTrade.toFixed(1)}%</span>
                    </div>
                </div>

                {/* Final Profit */}
                <div className="text-center mb-2 sm:mb-4">
                    <h3 className="text-sm sm:text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">Total Return</h3>
                    <span className={`text-xl sm:text-4xl font-bold ${profit >= 0 ? 'text-success' : 'text-error'}`}>
                        {profit >= 0 ? '+' : ''}{profitPercent}%
                    </span>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                    <button
                        onClick={handleAnalysisClick}
                        className="cursor-pointer w-full py-3 sm:py-4 bg-gray-500 dark:bg-gray-700 text-white font-bold text-sm sm:text-base rounded-xl hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                        View Trading Analysis
                    </button>

                    <div className="flex gap-3 sm:gap-4">
                        <button
                            onClick={handleShare}
                            className={`cursor-pointer flex-1 py-3 sm:py-4 font-bold text-sm sm:text-base rounded-xl transition-all shadow-md ${isCopied
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {isCopied ? 'Copied!' : 'Share'}
                        </button>
                        <button
                            onClick={resetGame}
                            className="cursor-pointer flex-[2] py-3 sm:py-4 bg-primary text-white font-bold text-sm sm:text-base rounded-xl hover:bg-primary-hover transition-colors shadow-md"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            </motion.div>

            {showAnalysis && (
                <AnalysisModal
                    history={history}
                    onClose={() => setShowAnalysis(false)}
                />
            )}
        </div>
    );
};
