'use client';

import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Timeframe, TIMEFRAME_CONFIG } from '@/lib/data';
import { Clock, BarChart2, Calendar } from 'lucide-react';

export const TimeframeSelector = () => {
    const { setSettings, initializeGame } = useGameStore();

    const handleSelect = (timeframe: Timeframe) => {
        setSettings({ timeframe });
        initializeGame();
    };

    const options: { value: Timeframe; label: string; icon: React.ReactNode; desc: string }[] = [
        {
            value: '1m',
            label: '1 Minute',
            icon: <Clock className="w-6 h-6 text-primary" />,
            desc: 'Fast-paced action'
        },
        {
            value: '15m',
            label: '15 Minutes',
            icon: <BarChart2 className="w-6 h-6 text-secondary" />,
            desc: 'Balanced gameplay'
        },
        {
            value: '1d',
            label: '1 Day',
            icon: <Calendar className="w-6 h-6 text-accent" />,
            desc: 'Strategic view'
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 bg-card-bg">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Select Timeframe</h2>
            <p className="text-xs sm:text-base text-gray-500 mb-4 sm:mb-8 text-center">Choose your trading pace to start</p>

            <div className="w-full space-y-2 sm:space-y-4">
                {options.map((opt) => {
                    const config = TIMEFRAME_CONFIG[opt.value];
                    return (
                        <button
                            key={opt.value}
                            onClick={() => handleSelect(opt.value)}
                            className="cursor-pointer w-full p-2 sm:p-4 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-primary/20 hover:shadow-md transition-all flex items-center gap-2 sm:gap-4 group text-left"
                        >
                            <div className="p-1.5 sm:p-3 bg-gray-50 rounded-xl group-hover:bg-primary/10 transition-colors flex-shrink-0">
                                {opt.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm sm:text-lg text-gray-800">{opt.label}</div>
                                <div className="text-xs sm:text-sm text-gray-400 hidden sm:block">{opt.desc}</div>
                                <div className="text-xs text-gray-300 mt-1 hidden sm:block">
                                    Visible: {config.visible} | Prediction: {config.prediction}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 sm:mt-6 p-2 sm:p-4">
                <p className="text-[10px] sm:text-sm text-gray-500 text-center">
                    Win rate statistics by position will be shown after 30 rounds
                </p>
            </div>
        </div>
    );
};
