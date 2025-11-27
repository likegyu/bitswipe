'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface SentimentData {
    id: string;
    date: string;
    sentiment: 'very_positive' | 'positive' | 'neutral' | 'negative' | 'very_negative';
    summary: string;
}

interface Props {
    data: SentimentData[];
}

export function SentimentList({ data }: Props) {
    const t = useTranslations('MarketPage');

    const getSentimentLabel = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return t('sentiment_positive');
            case 'negative': return t('sentiment_negative');
            case 'neutral': return t('sentiment_neutral');
            default: return sentiment;
        }
    };

    const getSentimentStyles = (sentiment: string) => {
        switch (sentiment) {
            case 'very_positive':
                return {
                    text: 'text-emerald-700 dark:text-emerald-300'
                };
            case 'positive':
                return {
                    text: 'text-emerald-600 dark:text-emerald-400'
                };
            case 'neutral':
                return {
                    text: 'text-gray-600 dark:text-gray-400'
                };
            case 'negative':
                return {
                    text: 'text-rose-600 dark:text-rose-400'
                };
            case 'very_negative':
                return {
                    text: 'text-rose-700 dark:text-rose-300'
                };
            default:
                return {
                    text: 'text-gray-600 dark:text-gray-400'
                };
        }
    };

    return (
        <div className="space-y-6 mt-12">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('history_title')}</h3>
            </div>

            <div className="grid gap-4">
                {data.map((item) => {
                    const styles = getSentimentStyles(item.sentiment);
                    return (
                        <div
                            key={item.id}
                            className={`
                    shadow-sm group relative p-5 rounded-2xl transition-all duration-300 bg-white dark:bg-gray-700
                    hover:shadow-md hover:translate-y-[-2px]
                `}
                        >
                            <div className="flex flex-row sm:items-center gap-3 mb-3">
                                <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{item.date}</span>
                                <span className={`
                    self-start px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide shadow-sm bg-white dark:bg-gray-800 ${styles.text}`}>
                                    {getSentimentLabel(item.sentiment)}
                                </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed font-medium">
                                {item.summary}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
