'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Activity, BarChart2 } from 'lucide-react';
import { RoundResult } from '@/store/gameStore';

interface AnalysisModalProps {
    history: RoundResult[];
    onClose: () => void;
}

export const AnalysisModal = ({ history, onClose }: AnalysisModalProps) => {
    const [showAd, setShowAd] = React.useState(true);
    const adInitialized = React.useRef(false);

    React.useEffect(() => {
        if (showAd && !adInitialized.current) {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                adInitialized.current = true;
            } catch (err) {
                console.error('AdSense error:', err);
            }
        }
    }, [showAd]);

    // Helper to calculate stats
    const calculateStats = (filterFn: (h: RoundResult) => boolean) => {
        const filtered = history.filter(h => h.indicators && filterFn(h));
        const total = filtered.length;
        if (total === 0) return null;

        const wins = filtered.filter(h => h.win).length;
        const winRate = (wins / total) * 100;

        const longCount = filtered.filter(h => h.position === 'long').length;
        const shortCount = filtered.filter(h => h.position === 'short').length;
        const holdCount = filtered.filter(h => h.position === 'hold').length;

        return {
            total,
            winRate,
            longRate: (longCount / total) * 100,
            shortRate: (shortCount / total) * 100,
            holdRate: (holdCount / total) * 100,
        };
    };

    // RSI Analysis
    const rsiLow = calculateStats(h => (h.indicators?.rsi ?? 50) < 30);
    const rsiHigh = calculateStats(h => (h.indicators?.rsi ?? 50) > 70);
    const rsiMid = calculateStats(h => {
        const rsi = h.indicators?.rsi ?? 50;
        return rsi >= 30 && rsi <= 70;
    });

    // MA Analysis
    const maUp = calculateStats(h => h.indicators?.maTrend === 'up');
    const maDown = calculateStats(h => h.indicators?.maTrend === 'down');

    // BB Analysis
    const bbUpper = calculateStats(h => h.indicators?.bbPosition === 'upper');
    const bbLower = calculateStats(h => h.indicators?.bbPosition === 'lower');

    const StatCard = ({ title, stats, icon: Icon, color }: { title: string, stats: any, icon: any, color: string }) => {
        if (!stats) return null;
        return (
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg ${color} text-white`}>
                        <Icon size={14} />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{title}</span>
                    <span className="text-xs text-gray-400 ml-auto">{stats.total} trades</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Win Rate</span>
                    <span className={`text-sm font-bold ${stats.winRate >= 50 ? 'text-success' : 'text-error'}`}>
                        {Math.round(stats.winRate)}%
                    </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
                    <div style={{ width: `${stats.longRate}%` }} className="bg-success h-full" />
                    <div style={{ width: `${stats.shortRate}%` }} className="bg-error h-full" />
                    <div style={{ width: `${stats.holdRate}%` }} className="bg-gray-400 h-full" />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                    <span>L: {Math.round(stats.longRate)}%</span>
                    <span>S: {Math.round(stats.shortRate)}%</span>
                    <span>H: {Math.round(stats.holdRate)}%</span>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] flex items-center justify-center p-2">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl pt-6 pb-6 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors z-50"
                >
                    <X size={20} />
                </button>

                {showAd ? (
                    <div className="flex flex-col h-[400px]">
                        <div className="flex-1 flex flex-col items-center justify-center mt-6 overflow-hidden bg-gray-50">
                            <ins className="adsbygoogle"
                                style={{ display: 'block', textAlign: 'center', width: '100%', height: '100%' }}
                                data-ad-layout="in-article"
                                data-ad-format="fluid"
                                data-ad-client="ca-pub-3860360352476148"
                                data-ad-slot="3782671210"
                            />
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={() => setShowAd(false)}
                                className="cursor-pointer w-[80%] mx-auto py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
                            >
                                Close Ad & View Analysis
                            </button>
                        </div>
                        <div className="mt-2 text-center">
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Advertisement</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-center mt-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Trading Analysis</h2>
                            <p className="text-sm text-gray-500">Your behavior patterns in different market conditions</p>
                        </div>

                        <div className="space-y-4 p-4">
                            {/* RSI Section */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Activity size={16} /> RSI Context
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {rsiLow ? <StatCard title="Oversold (<30)" stats={rsiLow} icon={TrendingDown} color="bg-blue-500" /> : <div className="text-xs text-gray-400 p-4 text-center bg-gray-50 rounded-xl">No trades in Oversold</div>}
                                    {rsiMid ? <StatCard title="Neutral (30-70)" stats={rsiMid} icon={Activity} color="bg-gray-500" /> : <div className="text-xs text-gray-400 p-4 text-center bg-gray-50 rounded-xl">No trades in Neutral</div>}
                                    {rsiHigh ? <StatCard title="Overbought (>70)" stats={rsiHigh} icon={TrendingUp} color="bg-purple-500" /> : <div className="text-xs text-gray-400 p-4 text-center bg-gray-50 rounded-xl">No trades in Overbought</div>}
                                </div>
                            </div>

                            {/* MA Section */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <TrendingUp size={16} /> MA Trend
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {maUp ? <StatCard title="Uptrend" stats={maUp} icon={TrendingUp} color="bg-success" /> : <div className="text-xs text-gray-400 p-4 text-center bg-gray-50 rounded-xl">No trades in Uptrend</div>}
                                    {maDown ? <StatCard title="Downtrend" stats={maDown} icon={TrendingDown} color="bg-error" /> : <div className="text-xs text-gray-400 p-4 text-center bg-gray-50 rounded-xl">No trades in Downtrend</div>}
                                </div>
                            </div>

                            {/* BB Section */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <BarChart2 size={16} /> Bollinger Bands
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {bbUpper ? <StatCard title="Upper Band Touch" stats={bbUpper} icon={TrendingUp} color="bg-orange-500" /> : <div className="text-xs text-gray-400 p-4 text-center bg-gray-50 rounded-xl">No trades at Upper Band</div>}
                                    {bbLower ? <StatCard title="Lower Band Touch" stats={bbLower} icon={TrendingDown} color="bg-cyan-500" /> : <div className="text-xs text-gray-400 p-4 text-center bg-gray-50 rounded-xl">No trades at Lower Band</div>}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};
