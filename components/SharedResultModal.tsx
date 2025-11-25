'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const SharedResultModal = () => {
    const t = useTranslations('SharedResultModal');
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const winRate = searchParams.get('w');
    const profitPercent = searchParams.get('p');
    const rounds = searchParams.get('r');
    const bestTrade = searchParams.get('bt');

    useEffect(() => {
        if (winRate && profitPercent && rounds) {
            setIsVisible(true);
        }
    }, [winRate, profitPercent, rounds]);

    const handleClose = () => {
        setIsVisible(false);
        // Clear params without refreshing
        router.replace('/', { scroll: false });
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden"
            >
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-orange-400" />

                <button
                    onClick={handleClose}
                    className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-6 pt-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-500 mb-3">
                        <Trophy size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                        {t('challenger_score')}
                    </h2>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        {t('can_you_beat_this_record')}
                    </p>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-sm font-bold text-gray-500">{t('win_rate')}</span>
                        <span className="text-lg font-black text-gray-800">{winRate}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-sm font-bold text-gray-500">{t('return')}</span>
                        <span className={`text-lg font-black ${Number(profitPercent) >= 0 ? 'text-success' : 'text-error'}`}>
                            {Number(profitPercent) >= 0 ? '+' : ''}{profitPercent}%
                        </span>
                    </div>
                    {bestTrade && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-sm font-bold text-gray-500">{t('best_trade')}</span>
                            <span className="text-lg font-black text-success">+{bestTrade}%</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-sm font-bold text-gray-500">{t('rounds')}</span>
                        <span className="text-lg font-black text-gray-800">{rounds}</span>
                    </div>
                </div>

                <button
                    onClick={handleClose}
                    className="cursor-pointer w-full py-4 bg-primary text-white font-bold text-md rounded-xl hover:bg-primary-hover transition-all shadow-md shadow-orange-200 flex items-center justify-center gap-1 group"
                >
                    {t('accept_challenge')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </div>
    );
};
