import React from 'react';
import { getTranslations } from 'next-intl/server';
import { supabase } from '@/lib/supabaseClient';
import { SentimentCalendar } from '@/components/SentimentCalendar';
import { SentimentList } from '@/components/SentimentList';

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
        <div className="min-h-screen bg-card-bg pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                        {t('title')}
                    </h1>
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
