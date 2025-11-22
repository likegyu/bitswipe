'use client';

import React from 'react';
import { X, RefreshCw } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
    const { settings, setSettings, resetGame } = useGameStore();

    const handleReset = () => {
        if (confirm("Are you sure you want to reset your progress?")) {
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
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 sm:p-6 z-[70] max-w-md mx-auto shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Settings</h2>
                            <button onClick={onClose} className="cursor-pointer p-2 bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {/* Leverage */}
                            <div className="mb-6 sm:mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="font-bold text-sm sm:text-base text-gray-700">Leverage</label>
                                    <span className="text-primary font-bold text-sm sm:text-base">{settings.leverage}x</span>
                                </div>
                                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-primary rounded-full"
                                        style={{ width: `${(settings.leverage / 100) * 100}%` }}
                                    />
                                    {/* Thumb */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md pointer-events-none"
                                        style={{ left: `calc(${(settings.leverage / 100) * 100}% - 8px)` }}
                                    />
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={settings.leverage}
                                        onChange={(e) => setSettings({ leverage: parseInt(e.target.value) })}
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
                                <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-3">
                                    Indicators
                                </label>
                                <div className="space-y-2 sm:space-y-3">
                                    {[
                                        { id: 'rsi', label: 'RSI (Relative Strength Index)' },
                                        { id: 'ma', label: 'MA (Moving Average)' },
                                        { id: 'bb', label: 'Bollinger Bands' },
                                    ].map((indicator) => (
                                        <div key={indicator.id} className="flex items-center justify-between">
                                            <span className="text-sm sm:text-base text-gray-700">{indicator.label}</span>
                                            <button
                                                onClick={() => setSettings({
                                                    indicators: {
                                                        ...settings.indicators,
                                                        [indicator.id]: !settings.indicators[indicator.id as keyof typeof settings.indicators]
                                                    }
                                                })}
                                                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${settings.indicators[indicator.id as keyof typeof settings.indicators]
                                                    ? 'bg-primary'
                                                    : 'bg-gray-200'
                                                    }`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.indicators[indicator.id as keyof typeof settings.indicators]
                                                    ? 'left-7'
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
                                className="cursor-pointer w-full py-3 sm:py-4 mt-3 sm:mt-4 bg-red-50 text-error font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                            >
                                <RefreshCw size={18} />
                                Reset Game
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
