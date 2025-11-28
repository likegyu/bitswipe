'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Trophy } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from '@/i18n/navigation';
import { useGameStore } from '@/store/gameStore';

interface RankingRegistrationModalProps {
    onClose: () => void;
    gameData: {
        profitPercent: string;
        totalRounds: number;
        winRate: number;
        longWinRate: number;
        shortWinRate: number;
        bestTrade: number;
        avgProfit: number;
        history: any[];
    };
}

export const RankingRegistrationModal = ({ onClose, gameData }: RankingRegistrationModalProps) => {
    const t = useTranslations('ResultModal');
    const router = useRouter();
    const { setRankingRegistered } = useGameStore();
    const [nickname, setNickname] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async () => {
        if (!nickname.trim()) return;

        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('rankings')
                .insert({
                    nickname: nickname.trim(),
                    message: comment.trim(),
                    profit_rate: parseFloat(gameData.profitPercent),
                    rounds: gameData.totalRounds,
                    investment_style: {
                        winRate: gameData.winRate,
                        longWinRate: gameData.longWinRate,
                        shortWinRate: gameData.shortWinRate,
                        bestTrade: gameData.bestTrade,
                        avgProfit: gameData.avgProfit,
                        history: gameData.history.map(h => ({
                            win: h.win,
                            position: h.position,
                            profitPercent: h.profitPercent,
                            indicators: h.indicators
                        }))
                    }
                });

            setRankingRegistered(true);
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('isRankingRegistered', 'true');
            }
            alert(t('ranking_registered'));
            onClose();
            router.push('/ranking');
        } catch (error) {
            console.error('Error registering ranking:', error);
            alert(t('ranking_registration_failed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                        <Trophy size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                        {t('register_ranking')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('can_you_beat_my_score')}
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 ml-1">
                            {t('nickname_label')}
                        </label>
                        <input
                            type="text"
                            placeholder={t('nickname_placeholder')}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            maxLength={10}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 ml-1">
                            {t('comment_label')}
                        </label>
                        <input
                            type="text"
                            placeholder={t('comment_placeholder')}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            maxLength={20}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !nickname.trim()}
                        className={`w-full py-4 font-bold text-lg rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer ${isSubmitting || !nickname.trim()
                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-primary text-white hover:bg-primary-hover'
                            }`}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Trophy size={18} />
                                {t('register_ranking')}
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
