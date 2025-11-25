'use client';

import React from 'react';
import { X, RefreshCw } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
    const t = useTranslations('Settings');
    const { settings, setSettings, resetGame } = useGameStore();

    // Local state for immediate UI feedback without triggering global re-renders
    const [localSettings, setLocalSettings] = React.useState(settings);

    // Sync local state when modal opens
    React.useEffect(() => {
        if (isOpen) {
            setLocalSettings(settings);
        }
    }, [isOpen, settings]);

    const handleClose = () => {
        // Commit changes to global store on close
        setSettings(localSettings);
        onClose();
    };

    const handleReset = () => {
        if (confirm(t("reset_confirm"))) {
            resetGame();
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl p-4 sm:p-6 z-[70] max-w-md mx-auto shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{t('title')}</h2>
                            <button onClick={handleClose} className="cursor-pointer p-3 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {/* Leverage */}
                            <div className="mb-6 sm:mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('leverage_label')}</label>
                                    <span className="text-primary font-bold text-sm sm:text-base">{localSettings.leverage}x</span>
                                </div>
                                <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-primary rounded-full"
                                        style={{ width: `${(localSettings.leverage / 100) * 100}%` }}
                                    />
                                    {/* Thumb */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md pointer-events-none"
                                        style={{ left: `calc(${(localSettings.leverage / 100) * 100}% - 8px)` }}
                                    />
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={localSettings.leverage}
                                        onChange={(e) => setLocalSettings({ ...localSettings, leverage: parseInt(e.target.value) })}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>1x</span>
                                    <span>100x</span>
                                </div>
                            </div>

                            {/* Indicators */}
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                                    {t('indicators_label')}
                                </label>
                                <div className="space-y-3">
                                    {[
                                        { id: 'rsi', label: t('indicator_rsi') },
                                        { id: 'ma', label: t('indicator_ma') },
                                        { id: 'bb', label: t('indicator_bb') },
                                    ].map((indicator) => (
                                        <div key={indicator.id} className="flex items-center justify-between py-1">
                                            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{indicator.label}</span>
                                            <button
                                                onClick={() => setLocalSettings({
                                                    ...localSettings,
                                                    indicators: {
                                                        ...localSettings.indicators,
                                                        [indicator.id]: !localSettings.indicators[indicator.id as keyof typeof localSettings.indicators]
                                                    }
                                                })}
                                                className={`w-14 h-7 sm:w-12 sm:h-6 rounded-full transition-colors relative cursor-pointer ${localSettings.indicators[indicator.id as keyof typeof localSettings.indicators]
                                                    ? 'bg-primary'
                                                    : 'bg-gray-200 dark:bg-gray-700'
                                                    }`}
                                            >
                                                <div className={`absolute top-1 w-5 h-5 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${localSettings.indicators[indicator.id as keyof typeof localSettings.indicators]
                                                    ? 'left-8 sm:left-7'
                                                    : 'left-1'
                                                    }`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reset */}
                            <button
                                onClick={handleReset}
                                className="cursor-pointer w-full py-3 sm:py-4 mt-3 sm:mt-4 bg-red-50 dark:bg-red-400 text-error dark:text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-500 transition-colors"
                            >
                                <RefreshCw size={18} />
                                {t('reset_button')}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
