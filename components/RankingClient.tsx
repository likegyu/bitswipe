'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabaseClient';
import { Trophy, TrendingUp, TrendingDown, Activity, ChevronDown, ChevronUp, Quote, ArrowLeft, Newspaper } from 'lucide-react';
import { AnalysisModal } from '@/components/AnalysisModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Footer } from '@/components/Footer';
import KakaoAdFit from '@/components/KakaoAd';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Ranking {
    id: string;
    nickname: string;
    message: string;
    profit_rate: number;
    rounds: number;
    investment_style: {
        winRate?: number;
        win_rate?: number;
        longWinRate?: number;
        long_win_rate?: number;
        shortWinRate?: number;
        short_win_rate?: number;
        bestTrade?: number;
        best_trade?: number;
        avgProfit?: number;
        avg_profit?: number;
        profitFactor?: number;
        profit_factor?: number;
        history?: any[];
        timeframe?: string;
    };
    created_at: string;
}

export function RankingClient() {
    const t = useTranslations('RankingPage');
    const tSEO = useTranslations('SEOContent');
    const [rankings, setRankings] = React.useState<Ranking[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [expandedId, setExpandedId] = React.useState<string | null>(null);
    const [selectedHistory, setSelectedHistory] = React.useState<any[] | null>(null);
    const isMdUp = useMediaQuery();

    React.useEffect(() => {
        fetchRankings();
    }, []);

    const fetchRankings = async () => {
        try {
            const { data, error } = await supabase
                .from('rankings')
                .select('*')
                .order('profit_rate', { ascending: false })
                .limit(50);

            if (error) throw error;
            setRankings(data || []);
        } catch (error) {
            console.error('Error fetching rankings:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getRankStyle = (index: number) => {
        switch (index) {
            case 0: return 'text-yellow-500';
            case 1: return 'text-gray-400';
            case 2: return 'text-amber-600';
            default: return 'text-gray-500';
        }
    };

    const getRankIcon = (index: number) => {
        if (index < 3) return <Trophy size={20} className={getRankStyle(index)} fill="currentColor" />;
        return <span className="font-bold text-gray-500 w-5 text-center">{index + 1}</span>;
    };

    const formatTimeframe = (timeframe: string) => {
        // Convert timeframe to English abbreviation (e.g., "1m", "1h", "1d")
        const timeframeMap: { [key: string]: string } = {
            '1m': '1m',
            '5m': '5m',
            '15m': '15m',
            '1h': '1h',
        };
        return timeframeMap[timeframe] || timeframe;
    };

    return (
        <div className="min-h-screen bg-[var(--background)] pb-20">
            {/* Header */}
            <header className="w-full bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
                <div className="w-full max-w-md sm:max-w-4xl mx-auto flex items-center justify-between p-2 sm:p-4 relative">
                    <div className="flex items-center gap-1 flex-1">
                        <Link
                            href="/"
                            className="p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer"
                        >
                            <ArrowLeft size={24} />
                        </Link>
                    </div>

                    <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                        <Image
                            src="/bitswipe-icon.png"
                            alt="Bitswipe"
                            width={40}
                            height={40}
                            className="block dark:hidden hover:opacity-80 transition-opacity cursor-pointer shadow-md rounded-[10%]"
                        />
                        <Image
                            src="/bitswipe-icon-dark.png"
                            alt="Bitswipe"
                            width={40}
                            height={40}
                            className="hidden dark:block hover:opacity-80 transition-opacity cursor-pointer shadow-md rounded-[10%]"
                        />
                    </Link>

                    <div className="flex items-center gap-1 flex-1 justify-end">
                        <Link
                            href="/market"
                            className="relative p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer"
                        >
                            <Newspaper size={24} />
                            <span className="absolute top-1 right-1 sm:top-1 sm:right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </Link>
                        <Link
                            href="/ranking"
                            className="p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer"
                        >
                            <Trophy size={24} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Kakao Ad - Top (반응형 적용) */}
            <div className="w-full flex justify-center">
                {isMdUp ? (
                    // PC 광고 (MD 이상)
                    <KakaoAdFit
                        unit="DAN-92yroeiWlsAYpiqb" // 👈 PC용 상단 광고 ID로 변경하세요
                        width={728}
                        height={90}
                    />
                ) : (
                    // 모바일 광고 (MD 미만)
                    <KakaoAdFit
                        unit="DAN-Wm3BkuGJ9IQERMEc" // 👈 모바일용 상단 광고 ID로 변경하세요
                        width={320}
                        height={50} // 모바일 표준 크기로 변경
                    />
                )}
            </div>

            <div className="max-w-4xl mx-auto p-4">

                <div className="text-center mb-10 pt-6 relative word-break-keep-all">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                    >
                        <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-2xl mb-4 ring-1 ring-yellow-500/20">
                            <Trophy className="text-yellow-500" size={32} />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                            {t('title')}
                        </h1>
                        <div className="space-y-2 max-w-md mx-auto word-break-keep-all">
                            <p className="text-primary font-bold text-sm sm:text-base uppercase tracking-wider">
                                {t('header_subtitle')}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                {t('header_description')}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-card dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3 text-yellow-600 dark:text-yellow-400">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {tSEO('RankingSection.card1_title')}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {tSEO('RankingSection.card1_text')}
                        </p>
                    </div>
                    <div className="bg-card dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {tSEO('RankingSection.card2_title')}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {tSEO('RankingSection.card2_text')}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : rankings.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        {t('no_rankings')}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {rankings.map((ranking, index) => (
                            <motion.div
                                key={ranking.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-card dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 dark:border-gray-700"
                            >
                                <div
                                    onClick={() => toggleExpand(ranking.id)}
                                    className="p-4 flex items-center gap-4 cursor-pointer"
                                >
                                    <div className="flex-shrink-0 w-10 flex justify-center">
                                        {getRankIcon(index)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-bold text-gray-900 dark:text-white truncate text-lg">
                                                {ranking.nickname}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                                {ranking.rounds}R
                                            </span>
                                            {ranking.investment_style.timeframe && (
                                                <>
                                                    <span>•</span>
                                                    <span>{formatTimeframe(ranking.investment_style.timeframe)}</span>
                                                </>
                                            )}
                                        </div>
                                        {ranking.message && (
                                            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
                                                <Quote size={14} className="text-gray-400 fill-gray-400 flex-shrink-0" />
                                                <span className="truncate italic">
                                                    "{ranking.message}"
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-right">
                                        <div className={`font-bold text-lg ${ranking.profit_rate >= 0 ? 'text-success' : 'text-error'}`}>
                                            {ranking.profit_rate >= 0 ? '+' : ''}{ranking.profit_rate}%
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {t('win_rate')} {Math.round(ranking.investment_style.winRate ?? ranking.investment_style.win_rate ?? 0)}%
                                        </div>
                                    </div>

                                    <div className="text-gray-300 dark:text-gray-600">
                                        {expandedId === ranking.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>

                                <AnimatePresence initial={false}>
                                    {expandedId === ranking.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800"
                                        >
                                            <div className="p-4">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Activity size={16} className="text-primary" />
                                                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">{t('investment_style')}</h4>
                                                </div>

                                                {ranking.message && (
                                                    <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-xl relative">
                                                        <Quote className="absolute top-2 left-2 text-gray-300 dark:text-gray-700 w-6 h-6 -z-0" />
                                                        <p className="ml-4 text-sm text-gray-600 dark:text-gray-300 relative z-10 pl-4 italic">
                                                            "{ranking.message}"
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center shadow-sm border border-gray-100 dark:border-gray-700 transform-gpu">
                                                        <div className="text-xs text-gray-400 mb-1">{t('win_rate')}</div>
                                                        <div className="font-bold text-gray-800 dark:text-white text-lg">
                                                            {Math.round(ranking.investment_style.winRate ?? ranking.investment_style.win_rate ?? 0)}%
                                                        </div>
                                                    </div>
                                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center shadow-sm border border-gray-100 dark:border-gray-700">
                                                        <div className="text-xs text-gray-400 mb-1">{t('avg_profit')}</div>
                                                        <div className={`font-bold text-lg ${(ranking.investment_style.avgProfit ?? ranking.investment_style.avg_profit ?? 0) >= 0 ? 'text-success' : 'text-error'}`}>
                                                            {(ranking.investment_style.avgProfit ?? ranking.investment_style.avg_profit ?? 0) >= 0 ? '+' : ''}
                                                            {(ranking.investment_style.avgProfit ?? ranking.investment_style.avg_profit ?? 0).toFixed(1)}%
                                                        </div>
                                                    </div>
                                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center shadow-sm border border-gray-100 dark:border-gray-700">
                                                        <div className="text-xs text-gray-400 mb-1">{t('profit_factor')}</div>
                                                        <div className={`font-bold text-lg ${(ranking.investment_style.profitFactor ?? ranking.investment_style.profit_factor ?? 0) >= 1 ? 'text-success' : 'text-error'}`}>
                                                            {(() => {
                                                                const pf = ranking.investment_style.profitFactor ?? ranking.investment_style.profit_factor ?? 0;
                                                                return pf >= 99.9 ? t('no_loss') : pf.toFixed(2);
                                                            })()}
                                                        </div>
                                                    </div>
                                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center shadow-sm border border-gray-100 dark:border-gray-700">
                                                        <div className="text-xs text-gray-400 mb-1">{t('best_label')}</div>
                                                        <div className="font-bold text-success text-lg">
                                                            +{(ranking.investment_style.bestTrade ?? ranking.investment_style.best_trade ?? 0).toFixed(1)}%
                                                        </div>
                                                    </div>
                                                </div>

                                                {ranking.investment_style.history && (
                                                    <button
                                                        onClick={() => setSelectedHistory(ranking.investment_style.history!)}
                                                        className="w-full py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl transition-colors shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 text-sm cursor-pointer"
                                                    >
                                                        <Activity size={16} />
                                                        {t('view_analysis')}
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {selectedHistory && (
                <AnalysisModal
                    history={selectedHistory}
                    onClose={() => setSelectedHistory(null)}
                />
            )}
            <Footer />
        </div>
    );
}
