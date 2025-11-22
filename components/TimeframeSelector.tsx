'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Timeframe, TIMEFRAME_CONFIG } from '@/lib/data';
import { Zap, TrendingUp, Sun, Clock, BarChart2, Calendar, ArrowLeft, Target, Trophy, Medal, Eye, ArrowRight } from 'lucide-react';

type Step = 'timeframe' | 'rounds';

export const TimeframeSelector = () => {
    const { setSettings, initializeGame } = useGameStore();
    const [step, setStep] = useState<Step>('timeframe');
    const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe | null>(null);

    const handleTimeframeSelect = (timeframe: Timeframe) => {
        setSelectedTimeframe(timeframe);
        setSettings({ timeframe });
        setStep('rounds');
    };

    const handleRoundSelect = (rounds: number) => {
        setSettings({ maxRounds: rounds });
        initializeGame();
    };

    const handleBack = () => {
        setStep('timeframe');
        setSelectedTimeframe(null);
    };

    const timeframeSections = [
        {
            title: 'Short Term',
            description: 'Fast-paced action',
            icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
            color: 'text-rose-500',
            bg: 'bg-rose-50',
            border: 'group-hover:border-rose-200',
            options: [
                { value: '1m', label: '1m', sub: 'Turbo', icon: <Zap className="w-4 h-4 sm:w-6 sm:h-6" /> },
                { value: '5m', label: '5m', sub: 'Blitz', icon: <Clock className="w-4 h-4 sm:w-6 sm:h-6" /> },
                { value: '15m', label: '15m', sub: 'Rapid', icon: <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6" /> },
            ] as const
        },
        {
            title: 'Middle Term',
            description: 'Strategic analysis',
            icon: <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5" />,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50',
            border: 'group-hover:border-indigo-200',
            options: [
                { value: '30m', label: '30m', sub: 'Intra', icon: <BarChart2 className="w-4 h-4 sm:w-6 sm:h-6" /> },
                { value: '1h', label: '1h', sub: 'Hourly', icon: <Clock className="w-4 h-4 sm:w-6 sm:h-6" /> },
            ] as const
        },
        {
            title: 'Day Term',
            description: 'Macro trends',
            icon: <Sun className="w-4 h-4 sm:w-5 sm:h-5" />,
            color: 'text-amber-500',
            bg: 'bg-amber-50',
            border: 'group-hover:border-amber-200',
            options: [
                { value: '1d', label: '1d', sub: 'Daily', icon: <Calendar className="w-4 h-4 sm:w-6 sm:h-6" /> },
            ] as const
        }
    ];

    const roundOptions = [
        { value: 10, label: '10 Rounds', sub: 'Quick Match', icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'group-hover:border-emerald-200' },
        { value: 25, label: '25 Rounds', sub: 'Standard', icon: <Medal className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'text-blue-500', bg: 'bg-blue-50', border: 'group-hover:border-blue-200' },
        { value: 50, label: '50 Rounds', sub: 'Marathon', icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'text-purple-500', bg: 'bg-purple-50', border: 'group-hover:border-purple-200' },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full p-3 sm:p-6 bg-card-bg w-full">
            <div className="w-full max-w-[360px] sm:max-w-4xl flex flex-col h-full">

                {/* Header */}
                <div className="relative text-center mb-2 sm:mb-4 flex-shrink-0">
                    {step === 'rounds' && (
                        <button
                            onClick={handleBack}
                            className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                        >
                            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    )}
                    <h2 className="text-xl sm:text-3xl font-black text-foreground tracking-tight mb-1 sm:mb-2">
                        {step === 'timeframe' ? 'Select Pace' : 'Select Length'}
                    </h2>
                    <p className="text-xs sm:text-base text-gray-400 font-medium">
                        {step === 'timeframe' ? 'Choose your trading timeframe' : 'How many rounds to play?'}
                    </p>
                </div>

                {/* Content */}
                <div className="flex-1 px-2 pb-2 sm:pb-3 flex flex-col justify-center w-full">
                    {step === 'timeframe' ? (
                        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                            {timeframeSections.map((section) => (
                                <div key={section.title} className="space-y-2 sm:space-y-3 flex flex-col">
                                    <div className={`flex items-center gap-2 ${section.color} opacity-80 ml-1 sm:justify-center sm:mb-1`}>
                                        {section.icon}
                                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">{section.title}</h3>
                                    </div>

                                    <div className={`grid ${section.options.length === 3 ? 'grid-cols-3 sm:grid-cols-1' : section.options.length === 2 ? 'grid-cols-2 sm:grid-cols-1' : 'grid-cols-1'} gap-2 sm:gap-2 flex-1`}>
                                        {section.options.map((opt) => {
                                            const config = TIMEFRAME_CONFIG[opt.value as Timeframe];
                                            const isMultiOption = section.options.length > 1;
                                            return (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => handleTimeframeSelect(opt.value as Timeframe)}
                                                    className={`cursor-pointer group relative flex flex-col items-center sm:justify-center p-2 sm:p-3 bg-white rounded-2xl shadow-sm border border-gray-100 ${section.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95 overflow-hidden`}
                                                >
                                                    {/* Background Decoration */}
                                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${section.bg}`} />

                                                    {/* Main content area with icon and text */}
                                                    <div className={`relative z-10 flex flex-col ${isMultiOption ? 'sm:flex-row' : 'sm:flex-col'} items-center gap-1 sm:gap-3 w-full ${isMultiOption ? '' : 'sm:mb-2'}`}>
                                                        <div className={`${isMultiOption ? 'p-2' : 'p-3'} rounded-full bg-gray-50 group-hover:bg-white/80 transition-colors ${section.color} flex-shrink-0`}>
                                                            {opt.icon}
                                                        </div>
                                                        <div className={`text-center ${isMultiOption ? 'sm:text-left sm:flex-1' : 'sm:text-center'}`}>
                                                            <div className={`text-base ${isMultiOption ? 'sm:text-base' : 'sm:text-xl'} font-black text-gray-800 group-hover:text-gray-900`}>
                                                                {opt.label}
                                                            </div>
                                                            <div className="text-[10px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-wide group-hover:text-gray-500">
                                                                {opt.sub}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Desktop Stats Bar - Inside button */}
                                                    <div className="hidden sm:flex relative z-10 items-center justify-between w-full px-3 py-1.5 mt-2 text-[9px] text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Eye size={10} />
                                                            <span className="font-semibold">{config.visible}</span>
                                                        </div>
                                                        <div className="w-px h-3 bg-gray-300" />
                                                        <div className="flex items-center gap-1">
                                                            <ArrowRight size={10} />
                                                            <span className="font-semibold">{config.prediction}</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 pt-2">
                            {roundOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleRoundSelect(opt.value)}
                                    className={`cursor-pointer group relative w-full flex sm:flex-col items-center sm:justify-center p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 ${opt.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] overflow-hidden`}
                                >
                                    {/* Background Decoration */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${opt.bg}`} />

                                    <div className="relative z-10 flex sm:flex-col items-center w-full gap-4 sm:gap-4">
                                        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 group-hover:bg-white/80 transition-colors ${opt.color}`}>
                                            {opt.icon}
                                        </div>
                                        <div className="flex-1 text-left sm:text-center">
                                            <div className="text-xl sm:text-2xl font-black text-gray-800 group-hover:text-gray-900">
                                                {opt.label}
                                            </div>
                                            <div className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide group-hover:text-gray-500 mt-1">
                                                {opt.sub}
                                            </div>
                                        </div>
                                        <div className={`text-2xl sm:hidden font-black opacity-10 group-hover:opacity-20 ${opt.color}`}>
                                            {opt.value}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 sm:pt-4 text-center flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                        {step === 'timeframe' ? 'Detailed statistics available after game completion' : `Selected: ${selectedTimeframe?.toUpperCase()} Candle`}
                    </p>
                </div>
            </div>
        </div>
    );
};
