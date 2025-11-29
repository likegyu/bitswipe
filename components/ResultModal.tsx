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
            // Apply mobile layout when height is compact (regardless of width)
            const shouldBeMobile = window.innerHeight < 900;
            console.log('Height check:', {
                innerHeight: window.innerHeight,
                shouldBeMobile,
                currentIsMobileHeight: isMobileHeight
            });
            setIsMobileHeight(shouldBeMobile);
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

    // Calculate stats before early return to maintain hooks order
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

    if (status !== 'FINISHED') return null;

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

    // Helper function to conditionally apply responsive classes
    const cn = (mobile: string, desktop: string) => isMobileHeight ? mobile : desktop;

    return (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-md z-[80] flex items-center justify-center ${cn('p-2', 'p-2 sm:p-4')}`}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`bg-card dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto ${cn('p-3 max-h-[95vh]', 'p-4 sm:p-6 max-h-[90vh]')}`}
            >
                {/* Main Win Rate */}
                <div className={`flex flex-col items-center ${cn('mb-2', 'mb-6 sm:mb-8')}`}>
                    <h3 className={`font-bold text-gray-800 dark:text-white ${cn('text-base mb-1', 'text-lg sm:text-lg mb-2')}`}>{t('win_rate')}</h3>
                    <div className={`${cn('w-32 h-32', 'w-32 h-32 sm:w-56 sm:h-56')} relative`}>
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
                            <span className={`font-bold ${isMobileHeight ? 'text-lg' : 'text-lg sm:text-2xl'}`} style={{ color: winRate >= 50 ? COLORS[0] : COLORS[1] }}>
                                {Math.round(winRate)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sub Stats - Win Rates */}
                <div className={`grid grid-cols-2 ${isMobileHeight ? 'gap-3 mb-2' : 'gap-3 sm:gap-4 mb-2 sm:mb-4'}`}>
                    <div className={`bg-gray-50 dark:bg-gray-700 rounded-2xl text-center shadow-sm ${isMobileHeight ? 'p-3' : 'p-3 sm:p-4'}`}>
                        <h4 className={`text-gray-500 dark:text-gray-400 mb-1 ${isMobileHeight ? 'text-xs' : 'text-xs sm:text-sm'}`}>{t('long_win_rate')}</h4>
                        <span className={`font-bold text-success ${isMobileHeight ? 'text-base' : 'text-base sm:text-xl'}`}>{Math.round(longWinRate)}%</span>
                        <div className="text-xs text-gray-400">{longWins}/{longTotal}</div>
                    </div>
                    <div className={`bg-gray-50 dark:bg-gray-700 rounded-2xl text-center shadow-sm ${isMobileHeight ? 'p-3' : 'p-3 sm:p-4'}`}>
                        <h4 className={`text-gray-500 dark:text-gray-400 mb-1 ${isMobileHeight ? 'text-xs' : 'text-xs sm:text-sm'}`}>{t('short_win_rate')}</h4>
                        <span className={`font-bold text-error ${isMobileHeight ? 'text-base' : 'text-base sm:text-xl'}`}>{Math.round(shortWinRate)}%</span>
                        <div className="text-xs text-gray-400">{shortWins}/{shortTotal}</div>
                    </div>
                </div>

                {/* Advanced Stats */}
                <div className={`grid grid-cols-3 ${isMobileHeight ? 'gap-2 mb-2' : 'gap-2 sm:gap-3 mb-2 sm:mb-4'}`}>
                    <div className={`bg-gray-50 dark:bg-gray-700 rounded-xl text-center shadow-sm ${isMobileHeight ? 'p-2' : 'p-2 sm:p-3'}`}>
                        <h4 className={`text-gray-500 dark:text-gray-400 mb-1 ${isMobileHeight ? 'text-[10px]' : 'text-[10px] sm:text-xs'}`}>{t('profit_factor')}</h4>
                        <span className={`font-bold text-gray-800 dark:text-gray-200 ${isMobileHeight ? 'text-sm' : 'text-sm sm:text-base'}`}>{typeof profitFactor === 'number' ? profitFactor.toFixed(2) : profitFactor}</span>
                    </div>
                    <div className={`bg-gray-50 dark:bg-gray-700 rounded-xl text-center shadow-sm ${isMobileHeight ? 'p-2' : 'p-2 sm:p-3'}`}>
                        <h4 className={`text-gray-500 dark:text-gray-400 mb-1 ${isMobileHeight ? 'text-[10px]' : 'text-[10px] sm:text-xs'}`}>{t('avg_profit')}</h4>
                        <span className={`font-bold ${avgProfit >= 0 ? 'text-success' : 'text-error'} ${isMobileHeight ? 'text-sm' : 'text-sm sm:text-base'}`}>
                            {avgProfit >= 0 ? '+' : ''}{avgProfit.toFixed(1)}%
                        </span>
                    </div>
                    <div className={`bg-gray-50 dark:bg-gray-700 rounded-xl text-center shadow-sm ${isMobileHeight ? 'p-2' : 'p-2 sm:p-3'}`}>
                        <h4 className={`text-gray-500 dark:text-gray-400 mb-1 ${isMobileHeight ? 'text-[10px]' : 'text-[10px] sm:text-xs'}`}>{t('best_trade')}</h4>
                        <span className={`font-bold text-success ${isMobileHeight ? 'text-sm' : 'text-sm sm:text-base'}`}>+{bestTrade.toFixed(1)}%</span>
                    </div>
                </div>

                {/* Final Profit */}
                <div className={`text-center ${isMobileHeight ? 'mb-2' : 'mb-2 sm:mb-4'}`}>
                    <h3 className={`font-medium text-gray-500 dark:text-gray-400 mb-2 ${isMobileHeight ? 'text-sm' : 'text-sm sm:text-lg'}`}>{t('total_return')}</h3>
                    <span className={`font-bold ${profit >= 0 ? 'text-success' : 'text-error'} ${isMobileHeight ? 'text-xl' : 'text-xl sm:text-4xl'}`}>
                        {profit >= 0 ? '+' : ''}{profitPercent}%
                    </span>
                </div>

                <div className={`flex flex-col ${isMobileHeight ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
                    <div className={`flex ${isMobileHeight ? 'gap-2' : 'gap-2 sm:gap-4'}`}>
                        <button
                            onClick={handleShare}
                            className={`cursor-pointer flex-1 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${isMobileHeight ? 'py-3 text-sm' : 'py-3 sm:py-4 text-sm sm:text-base'} ${isCopied
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
                            className={`flex-1 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${isMobileHeight ? 'py-3 text-sm' : 'py-3 sm:py-4 text-sm sm:text-base'} ${isRegistrationDisabled
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
                        className={`cursor-pointer w-full bg-gray-500 dark:bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 ${isMobileHeight ? 'py-3 text-sm' : 'py-3 sm:py-4 text-sm sm:text-base'}`}
                    >
                        {t('view_analysis')}
                    </button>

                    <button
                        onClick={resetGame}
                        className={`cursor-pointer w-full bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-md hover:scale-[1.02] active:scale-95 ${isMobileHeight ? 'py-3 text-sm' : 'py-3 sm:py-4 text-sm sm:text-base'}`}
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
