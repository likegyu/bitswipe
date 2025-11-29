'use client';

import React from 'react';
import { useGameStore, calculateGameStats } from '@/store/gameStore';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { useTranslations } from 'next-intl';
import { Trophy, Share2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';



import { AnalysisModal } from './AnalysisModal';
import { RankingRegistrationModal } from './RankingRegistrationModal';

export const ResultModal = () => {
    const { status, history, balance, initialBalance, resetGame, isRankingRegistered } = useGameStore();
    const [isCopied, setIsCopied] = React.useState(false);
    const [showAnalysis, setShowAnalysis] = React.useState(false);
    const [showRegistration, setShowRegistration] = React.useState(false);
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [isMobileHeight, setIsMobileHeight] = React.useState(false);
    const t = useTranslations('ResultModal');

    // Check sessionStorage for persistence
    const isActuallyRegistered = isRankingRegistered || (typeof window !== 'undefined' && sessionStorage.getItem('isRankingRegistered') === 'true');

    React.useEffect(() => {
        const checkHeight = () => {
            setIsMobileHeight(window.innerHeight <= 600);
        };
        checkHeight();
        window.addEventListener('resize', checkHeight);
        return () => window.removeEventListener('resize', checkHeight);
    }, []);
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

    const {
        totalRounds,
        wins,
        losses,
        winRate,
        longWinRate,
        longWins,
        longTotal,
        shortWinRate,
        shortWins,
        shortTotal,
        profitFactor,
        avgProfit,
        bestTrade
    } = React.useMemo(() => calculateGameStats(history), [history]);

    const profit = balance - initialBalance;
    const profitPercent = ((profit / initialBalance) * 100).toFixed(2);

    const data = [
        { name: 'Wins', value: wins },
        { name: 'Losses', value: losses },
    ];

    const COLORS = ['#88d8b0', '#ff6b6b'];

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
        const shareText = `${t('bit_swipe_results')} 🚀\n\n${t('total_return')}: ${profit >= 0 ? '+' : ''}${profitPercent}%\n${t('win_rate')}: ${Math.round(winRate)}%\n${t('best_trade')}: +${bestTrade.toFixed(2)}%\n\n${t('can_you_beat_my_score')} #BitSwipe #CryptoTrading\n${shareUrl}`;

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

    const isLiquidationLoss = parseFloat(profitPercent) <= -100.00;
    const isRegistrationDisabled = isActuallyRegistered || isLiquidationLoss;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[80] flex items-center justify-center p-2 sm:p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`bg-card dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto ${isMobileHeight ? 'p-3 max-h-[95vh]' : 'p-4 sm:p-6 max-h-[90vh]'}`}
            >
                {/* Main Win Rate */}
                <div className={`flex flex-col items-center ${isMobileHeight ? 'mb-2' : 'mb-6 sm:mb-8'}`}>
                    <h3 className={`font-bold text-gray-800 dark:text-white ${isMobileHeight ? 'text-base mb-1' : 'text-lg sm:text-lg mb-2'}`}>{t('win_rate')}</h3>
                    <div className={`${isMobileHeight ? 'w-20 h-20' : 'w-28 h-28 sm:w-48 sm:h-48'} relative`}>
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
                <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${isMobileHeight ? 'mb-2' : 'mb-2 sm:mb-4'}`}>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-2xl text-center shadow-sm">
                        <h4 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">{t('long_win_rate')}</h4>
                        <span className="text-base sm:text-xl font-bold text-success">{Math.round(longWinRate)}%</span>
                        <div className="text-xs text-gray-400">{longWins}/{longTotal}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-2xl text-center shadow-sm">
                        <h4 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">{t('short_win_rate')}</h4>
                        <span className="text-base sm:text-xl font-bold text-error">{Math.round(shortWinRate)}%</span>
                        <div className="text-xs text-gray-400">{shortWins}/{shortTotal}</div>
                    </div>
                </div>

                {/* Advanced Stats */}
                <div className={`grid grid-cols-3 gap-2 sm:gap-3 ${isMobileHeight ? 'mb-2' : 'mb-2 sm:mb-4'}`}>
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-xl text-center shadow-sm">
                        <h4 className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">{t('profit_factor')}</h4>
                        <span className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200">{profitFactor.toFixed(2)}</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-xl text-center shadow-sm">
                        <h4 className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">{t('avg_profit')}</h4>
                        <span className={`text-sm sm:text-base font-bold ${avgProfit >= 0 ? 'text-success' : 'text-error'}`}>
                            {avgProfit >= 0 ? '+' : ''}{avgProfit.toFixed(1)}%
                        </span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-xl text-center shadow-sm">
                        <h4 className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">{t('best_trade')}</h4>
                        <span className="text-sm sm:text-base font-bold text-success">+{bestTrade.toFixed(1)}%</span>
                    </div>
                </div>

                {/* Final Profit */}
                <div className={`text-center ${isMobileHeight ? 'mb-2' : 'mb-2 sm:mb-4'}`}>
                    <h3 className="text-sm sm:text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">{t('total_return')}</h3>
                    <span className={`text-xl sm:text-4xl font-bold ${profit >= 0 ? 'text-success' : 'text-error'}`}>
                        {profit >= 0 ? '+' : ''}{profitPercent}%
                    </span>
                </div>

                <div className={`flex flex-col ${isMobileHeight ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
                    <div className="flex gap-2 sm:gap-4">
                        <button
                            onClick={handleShare}
                            className={`cursor-pointer flex-1 py-3 sm:py-4 font-bold text-sm sm:text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${isCopied
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-gray-100 dark:bg-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            <Share2 size={18} />
                            {isCopied ? t('copied') : t('share')}
                        </button>
                        <button
                            onClick={() => setShowRegistration(true)}
                            disabled={isRegistrationDisabled}
                            className={`flex-1 py-3 sm:py-4 font-bold text-sm sm:text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${isRegistrationDisabled
                                ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-500'
                                : 'cursor-pointer bg-gray-100 dark:bg-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            <Trophy size={18} />
                            {isActuallyRegistered ? t('ranking_registered') : t('register_ranking')}
                        </button>
                    </div>

                    <button
                        onClick={handleAnalysisClick}
                        className="cursor-pointer w-full py-3 sm:py-4 bg-gray-500 dark:bg-gray-600 text-white font-bold text-sm sm:text-base rounded-xl hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                    >
                        {t('view_analysis')}
                    </button>

                    <button
                        onClick={resetGame}
                        className="cursor-pointer w-full py-3 sm:py-4 bg-primary text-white font-bold text-sm sm:text-base rounded-xl hover:bg-primary-hover transition-colors shadow-md hover:scale-[1.02] active:scale-95"
                    >
                        {t('play_again')}
                    </button>
                </div>
            </motion.div >

            {showAnalysis && (
                <AnalysisModal
                    history={history}
                    onClose={() => setShowAnalysis(false)}
                />
            )}

            {
                showRegistration && (
                    <RankingRegistrationModal
                        onClose={() => setShowRegistration(false)}
                        gameData={{
                            profitPercent,
                            totalRounds,
                            winRate,
                            longWinRate,
                            shortWinRate,
                            bestTrade,
                            avgProfit,
                            profitFactor,
                            history,
                            timeframe: useGameStore.getState().settings.timeframe
                        }}
                    />
                )
            }
        </div >
    );
};
