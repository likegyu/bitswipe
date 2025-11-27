'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { format, subDays, eachDayOfInterval, isSameDay, getDay, startOfWeek } from 'date-fns';

interface SentimentData {
    date: string;
    sentiment: 'very_positive' | 'positive' | 'neutral' | 'negative' | 'very_negative';
}

interface Props {
    data: SentimentData[];
}

export function SentimentCalendar({ data }: Props) {
    const t = useTranslations('MarketPage');

    // Generate 5 weeks (35 days) aligned to weeks
    const today = new Date();
    // Start from the Sunday of 4 weeks ago to get 5 full weeks
    const startDate = startOfWeek(subDays(today, 28));

    const days = Array.from({ length: 35 }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return d;
    });

    // Get color based on sentiment - with light/dark mode support (5 levels)
    const getColor = (sentiment?: string) => {
        switch (sentiment) {
            case 'very_positive':
                return 'bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-800 dark:hover:bg-emerald-700';
            case 'positive':
                return 'bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500';
            case 'neutral':
                return 'bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400';
            case 'negative':
                return 'bg-rose-500 dark:bg-rose-600 hover:bg-rose-600 dark:hover:bg-rose-500';
            case 'very_negative':
                return 'bg-rose-700 dark:bg-rose-800 hover:bg-rose-800 dark:hover:bg-rose-700';
            default:
                return 'bg-gray-200 dark:bg-gray-700'; // Empty/No data state
        }
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xs">
            <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {t('calendar_title')}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t('calendar_desc')}
                </p>
            </div>

            <div className="w-full">
                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-3">
                    {weekDays.map(day => (
                        <div key={day} className="text-center text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid - 35 days (5 rows x 7 cols) */}
                <div className="grid grid-cols-7 gap-2 sm:gap-3">
                    {days.map((day) => {
                        const dateStr = format(day, 'yyyy-MM-dd');
                        const dayData = data.find(d => d.date === dateStr);
                        const isToday = isSameDay(day, today);
                        const isFuture = day > today;

                        return (
                            <div
                                key={dateStr}
                                className={`
                                    w-full h-6 sm:h-7 md:h-8
                                    rounded-md transition-all duration-200
                                    ${isFuture ? 'bg-gray-100 dark:bg-gray-700/50' : getColor(dayData?.sentiment)}
                                    ${isToday ? 'ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-gray-800 z-10' : ''}
                                    ${!isFuture ? 'hover:scale-[1.02] hover:shadow-sm cursor-pointer' : ''}
                                `}
                                title={!isFuture ? `${format(day, 'MMM d, yyyy')}: ${dayData?.sentiment || 'No data'}` : ''}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Legend - Simplified Groups */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                {/* Negative Group */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-rose-700 dark:bg-rose-800" />
                        <div className="w-3 h-3 rounded-sm bg-rose-500 dark:bg-rose-600" />
                    </div>
                    <span className="font-medium">{t('sentiment_negative')}</span>
                </div>

                {/* Neutral Group */}
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gray-300 dark:bg-gray-500" />
                    <span className="font-medium">{t('sentiment_neutral')}</span>
                </div>

                {/* Positive Group */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-600" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-700 dark:bg-emerald-800" />
                    </div>
                    <span className="font-medium">{t('sentiment_positive')}</span>
                </div>
            </div>
        </div>
    );
}
