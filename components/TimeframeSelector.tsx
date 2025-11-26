'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Timeframe, TIMEFRAME_CONFIG } from '@/lib/data';
import { Zap, TrendingUp, Sun, Clock, BarChart2, Calendar, ArrowLeft, Target, Trophy, Medal, Eye, ArrowRight, Timer } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Step = 'timeframe' | 'rounds';

export const TimeframeSelector = () => {
    const t = useTranslations('GameSetup');
    const { setSettings, initializeGame } = useGameStore();
    const [step, setStep] = useState<Step>('timeframe');
    const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe | null>(null);
    const [selectedTimeframeLabel, setSelectedTimeframeLabel] = useState<string>('');
    const [isCompactHeight, setIsCompactHeight] = useState(false);

    React.useEffect(() => {
        const checkHeight = () => {
            // 70dvh <= 600px implies 100dvh <= 857px. Using 860px as a safe threshold.
            setIsCompactHeight(window.innerHeight <= 1000);
        };

        // Initial check
        checkHeight();

        window.addEventListener('resize', checkHeight);
        return () => window.removeEventListener('resize', checkHeight);
    }, []);

    const handleTimeframeSelect = (timeframe: Timeframe) => {
        // 1. 선택된 레이블을 찾습니다.
        const allOptions = timeframeSections.flatMap(section => section.options);
        const selectedOption = allOptions.find(opt => opt.value === timeframe);
        const label = selectedOption?.label || timeframe.toUpperCase(); // 레이블이 없다면 value 사용

        // 2. 상태를 업데이트합니다.
        setSelectedTimeframe(timeframe);
        setSelectedTimeframeLabel(label); // 번역된 레이블을 저장

        setSettings({ timeframe });
        setStep('rounds');
    };

    const handleRoundSelect = (rounds: number) => {
        // GTM Tracking
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: 'game_start',
                timeframe: selectedTimeframe,
                rounds: rounds
            });
        }

        setSettings({ maxRounds: rounds });
        initializeGame();
    };

    const handleBack = () => {
        setStep('timeframe');
        setSelectedTimeframe(null);
    };

    // Define a type for timeframe options to ensure compatibility with all Timeframe values
    type TimeframeOption = {
        value: Timeframe;
        label: string;
        sub: string;
        icon: React.ReactNode;
    };

    const timeframeSections: Array<{
        title: string;
        description: string;
        icon: React.ReactNode;
        color: string;
        bg: string;
        border: string;
        options: readonly TimeframeOption[];
    }> = [
            {
                title: t('section_short_title'),
                description: t('section_short_desc'),
                icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
                color: 'text-rose-500 dark:text-rose-400',
                bg: 'bg-rose-50 dark:bg-rose-900/20',
                border: 'group-hover:border-rose-200',
                options: [
                    { value: '1m', label: t('option_1m_label'), sub: t('option_1m_sub'), icon: <Zap className="w-4 h-4 sm:w-6 sm:h-6" /> },
                    { value: '5m', label: t('option_5m_label'), sub: t('option_5m_sub'), icon: <Timer className="w-4 h-4 sm:w-6 sm:h-6" /> },
                    { value: '15m', label: t('option_15m_label'), sub: t('option_15m_sub'), icon: <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6" /> },
                ]
            },
            {
                title: t('section_middle_title'),
                description: t('section_middle_desc'),
                icon: <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5" />,
                color: 'text-indigo-500 dark:text-indigo-400',
                bg: 'bg-indigo-50 dark:bg-indigo-900/20',
                border: 'group-hover:border-indigo-200',
                options: [
                    { value: '30m', label: t('option_30m_label'), sub: t('option_30m_sub'), icon: <BarChart2 className="w-4 h-4 sm:w-6 sm:h-6" /> },
                    { value: '1h', label: t('option_1h_label'), sub: t('option_1h_sub'), icon: <Clock className="w-4 h-4 sm:w-6 sm:h-6" /> },
                ]
            },
            {
                title: t('section_day_title'),
                description: t('section_day_desc'),
                icon: <Sun className="w-4 h-4 sm:w-5 sm:h-5" />,
                color: 'text-amber-500 dark:text-amber-400',
                bg: 'bg-amber-50 dark:bg-amber-900/20',
                border: 'group-hover:border-amber-200',
                options: [
                    { value: '1d', label: t('option_1d_label'), sub: t('option_1d_sub'), icon: <Calendar className="w-4 h-4 sm:w-6 sm:h-6" /> },
                ]
            }
        ];

    const roundOptions = [
        { value: 10, label: t('rounds_10_label'), sub: t('rounds_10_sub'), icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'group-hover:border-emerald-200' },
        { value: 25, label: t('rounds_25_label'), sub: t('rounds_25_sub'), icon: <Medal className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'group-hover:border-blue-200' },
        { value: 50, label: t('rounds_50_label'), sub: t('rounds_50_sub'), icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'group-hover:border-purple-200' },
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
                                <h2 className="text-lg sm:text-3xl font-black text-foreground dark:text-white tracking-tight sm:mb-2">
                                    {t('step_timeframe_title')}
                                </h2>
                                <p className="text-xs sm:text-base text-gray-400 font-medium">
                                    {t('step_timeframe_desc')}
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-400/60 font-medium mt-1">
                                    {t('step_timeframe_sub_desc')}
                                </p>
                            </div>

                            <div className={`${isCompactHeight ? '' : 'space-y-2'} sm:space-y-0 ${isCompactHeight ? 'grid grid-cols-3 gap-2' : 'sm:grid sm:grid-cols-3 sm:gap-4'}`}>
                                {timeframeSections.map((section) => (
                                    <div key={section.title} className={`${isCompactHeight ? 'contents' : 'space-y-2 sm:space-y-2 flex flex-col'}`}>
                                        <div className={`${isCompactHeight ? 'hidden' : 'hidden sm:flex'} items-center gap-2 ${section.color} opacity-80 ml-1 sm:justify-center sm:mb-3`}>
                                            {section.icon}
                                            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">{section.title}</h3>
                                        </div>

                                        <div className={`${isCompactHeight ? 'contents' : `grid ${section.options.length === 3 ? 'grid-cols-3 sm:grid-cols-1' : section.options.length === 2 ? 'grid-cols-2 sm:grid-cols-1' : 'grid-cols-1'} gap-2 sm:gap-4 flex-1`}`}>
                                            {section.options.map((opt) => {
                                                const config = TIMEFRAME_CONFIG[opt.value as Timeframe];
                                                const isMultiOption = section.options.length > 1;
                                                return (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => handleTimeframeSelect(opt.value as Timeframe)}
                                                        className={`cursor-pointer group relative flex flex-col items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-100 dark:border-gray-700 ${section.border} hover:shadow-md hover:-translate-y-1 transition-all duration-300 active:scale-95 overflow-hidden`}
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
                                                            <div className={`p-2.5 sm:p-3 rounded-xl bg-gray-50 dark:bg-gray-700 group-hover:bg-white/80 dark:group-hover:bg-gray-600 transition-colors ${section.color} shadow-sm`}>
                                                                {opt.icon}
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-base sm:text-2xl font-black text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100 tracking-tight leading-none mb-1">
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
                                <h2 className="text-xl sm:text-3xl font-black text-foreground dark:text-white tracking-tight mb-2 sm:mb-4">
                                    {t('step_rounds_title')}
                                </h2>
                                <p className="text-xs sm:text-base text-gray-400 font-medium">
                                    {t('step_rounds_desc')}
                                </p>
                            </div>

                            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 pt-2">
                                {roundOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleRoundSelect(opt.value)}
                                        className={`cursor-pointer group relative w-full flex sm:flex-col items-center sm:justify-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-100 dark:border-gray-700 ${opt.border} hover:shadow-md hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] overflow-hidden`}
                                    >
                                        {/* Background Decoration */}
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${opt.bg}`} />

                                        <div className="relative z-10 flex sm:flex-col items-center w-full gap-4 sm:gap-4">
                                            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-gray-700 group-hover:bg-white/80 dark:group-hover:bg-gray-600 transition-colors ${opt.color} shadow-sm`}>
                                                {opt.icon}
                                            </div>
                                            <div className="flex-1 text-left sm:text-center">
                                                <div className="text-xl sm:text-2xl font-black text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100">
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
                <div className="mt-auto pt-1 sm:pt-3 text-center flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                        {step === 'timeframe' ? (
                            t('footer_timeframe')
                        ) : (
                            // [수정된 코드]: selectedTimeframeLabel을 사용합니다.
                            t('footer_rounds', {
                                timeframe: selectedTimeframeLabel || selectedTimeframe?.toUpperCase() || ''
                            })
                            // 이제 푸터에 '1분' (ko) 또는 '1分' (ja)이 표시됩니다.
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};
