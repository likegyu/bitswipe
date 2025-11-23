'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Timeframe, TIMEFRAME_CONFIG } from '@/lib/data';
import { Zap, TrendingUp, Sun, Clock, BarChart2, Calendar, ArrowLeft, Target, Trophy, Medal, Eye, ArrowRight, Timer } from 'lucide-react';

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
                { value: '5m', label: '5m', sub: 'Blitz', icon: <Timer className="w-4 h-4 sm:w-6 sm:h-6" /> },
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

                {/* Content */}
                <div className="flex-1 px-2 pb-2 sm:pb-3 flex flex-col justify-center w-full">
                    {step === 'timeframe' ? (
                        <>
                            {/* Header for timeframe step */}
                            <div className="relative text-center mb-4 sm:mb-8 flex-shrink-0">
                                <h2 className="text-lg sm:text-3xl font-black text-foreground tracking-tight sm:mb-2">
                                    Select Pace
                                </h2>
                                <p className="text-xs sm:text-base text-gray-400 font-medium">
                                    Predict the price 5 candles into the future
                                </p>
                            </div>

                            <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                                {timeframeSections.map((section) => (
                                    <div key={section.title} className="space-y-2 sm:space-y-2 flex flex-col">
                                        <div className={`hidden sm:flex items-center gap-2 ${section.color} opacity-80 ml-1 sm:justify-center sm:mb-3`}>
                                            {section.icon}
                                            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">{section.title}</h3>
                                        </div>

                                        <div className={`grid ${section.options.length === 3 ? 'grid-cols-3 sm:grid-cols-1' : section.options.length === 2 ? 'grid-cols-2 sm:grid-cols-1' : 'grid-cols-1'} gap-2 sm:gap-4 flex-1`}>
                                            {section.options.map((opt) => {
                                                const config = TIMEFRAME_CONFIG[opt.value as Timeframe];
                                                const isMultiOption = section.options.length > 1;
                                                return (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => handleTimeframeSelect(opt.value as Timeframe)}
                                                        className={`cursor-pointer group relative flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-2xl shadow-xs border border-gray-100 ${section.border} hover:shadow-md hover:-translate-y-1 transition-all duration-300 active:scale-95 overflow-hidden`}
                                                    >
                                                        {/* Background Decoration */}
                                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${section.bg}`} />

                                                        {/* Visible Candles Badge (Desktop Only) */}
                                                        <div className="hidden sm:flex absolute top-3 right-3 items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-all duration-300">
                                                            <Eye className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                                                            <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600">{config.visible}</span>
                                                        </div>

                                                        {/* Main content area */}
                                                        <div className={`relative z-10 flex flex-col items-center gap-2 w-full`}>
                                                            <div className={`p-2.5 sm:p-3 rounded-xl bg-gray-50 group-hover:bg-white/80 transition-colors ${section.color} shadow-sm`}>
                                                                {opt.icon}
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-base sm:text-2xl font-black text-gray-800 group-hover:text-gray-900 tracking-tight leading-none mb-1">
                                                                    {opt.label}
                                                                </div>
                                                                <div className="text-[8px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-600 transition-colors">
                                                                    {opt.sub}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Header for rounds step */}
                            <div className="relative text-center mb-6 sm:mb-8 flex-shrink-0">
                                <button
                                    onClick={handleBack}
                                    className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                                >
                                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                                <h2 className="text-xl sm:text-3xl font-black text-foreground tracking-tight mb-2 sm:mb-4">
                                    Select Length
                                </h2>
                                <p className="text-xs sm:text-base text-gray-400 font-medium">
                                    How many rounds to play?
                                </p>
                            </div>

                            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 pt-2">
                                {roundOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleRoundSelect(opt.value)}
                                        className={`cursor-pointer group relative w-full flex sm:flex-col items-center sm:justify-center p-4 sm:p-6 bg-white rounded-2xl shadow-xs border border-gray-100 ${opt.border} hover:shadow-md hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] overflow-hidden`}
                                    >
                                        {/* Background Decoration */}
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${opt.bg}`} />

                                        <div className="relative z-10 flex sm:flex-col items-center w-full gap-4 sm:gap-4">
                                            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 group-hover:bg-white/80 transition-colors ${opt.color} shadow-sm`}>
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
                                            <div className={`text-2xl sm:hidden font-black opacity-30 group-hover:opacity-50 ${opt.color}`}>
                                                {opt.value}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 sm:pt-4 text-center flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium hidden sm:block">
                        {step === 'timeframe' ? 'Detailed statistics available after game completion' : `Selected: ${selectedTimeframe?.toUpperCase()} Candle`}
                    </p>
                </div>
            </div>
        </div>
    );
};
