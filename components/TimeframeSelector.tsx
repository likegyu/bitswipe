'use client';

import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Timeframe } from '@/lib/data';
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
        <div className="flex flex-col items-center justify-center h-full p-6 bg-card-bg">
            <h2 className="text-2xl font-bold text-foreground mb-2">Select Timeframe</h2>
            <p className="text-gray-500 mb-8 text-center">Choose your trading pace to start</p>

            <div className="w-full space-y-4">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className="cursor-pointer w-full p-4 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-primary/20 hover:shadow-md transition-all flex items-center gap-4 group text-left"
                    >
                        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-primary/10 transition-colors">
                            {opt.icon}
                        </div>
                        <div>
                            <div className="font-bold text-lg text-gray-800">{opt.label}</div>
                            <div className="text-sm text-gray-400">{opt.desc}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
