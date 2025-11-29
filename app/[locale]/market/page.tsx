import React from 'react';
import { getTranslations } from 'next-intl/server';
import { supabase } from '@/lib/supabaseClient';
import { SentimentCalendar } from '@/components/SentimentCalendar';
import { SentimentList } from '@/components/SentimentList';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Force dynamic rendering so we get fresh data
export const dynamic = 'force-dynamic';

export default async function MarketPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('MarketPage');

    // Fetch data from Supabase
    const { data: rawData, error } = await supabase
        .from('daily_market_sentiment')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error("Error fetching market sentiment:", error);
    }

    // Format data for the components
    const sentimentData = (rawData || []).map((item) => ({
        ...item,
        summary: item[`summary_${locale}`] || item.summary_en || '', // Fallback to English
    }));

    return (
        <div className="min-h-screen bg-[var(--background)] pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-6 pt-6">
                    <Link
                        href="/"
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                    </Link>
                    <h1 className="text-2xl font-bold ml-2 text-gray-900 dark:text-gray-100">{t('title')}</h1>
                </div>

                <div className="mb-12 text-center">
                    <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <SentimentCalendar data={sentimentData} />

                <SentimentList data={sentimentData} />
            </div>
        </div>
    );
}
