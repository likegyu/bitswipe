import React from 'react';
import { getTranslations } from 'next-intl/server';
import { supabase } from '@/lib/supabaseClient';
import { SentimentCalendar } from '@/components/SentimentCalendar';
import { SentimentList } from '@/components/SentimentList';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MarketPage' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords').split(','),
        alternates: {
            canonical: `https://bitswipe.xyz/${locale}/market`,
            languages: {
                'en': 'https://bitswipe.xyz/en/market',
                'ko': 'https://bitswipe.xyz/ko/market',
                'es': 'https://bitswipe.xyz/es/market',
                'ja': 'https://bitswipe.xyz/ja/market',
            },
        },
        openGraph: {
            title: t('title'),
            description: t('ogDescription'),
            url: `https://bitswipe.xyz/${locale}/market`,
            siteName: 'BitSwipe',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: t('ogImageAlt'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('ogDescription'),
            images: ['/og-image.png'],
            creator: '@bitswipe',
        },
    };
}

// Force dynamic rendering so we get fresh data
export const dynamic = 'force-dynamic';

export default async function MarketPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MarketPage' });

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', item: `https://bitswipe.xyz/${locale}` },
                    { name: 'Market', item: `https://bitswipe.xyz/${locale}/market` },
                ]}
            />
            <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Game
                    </Link>
                    <div className="mb-12 text-center">
                        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                            {t('description')}
                        </p>
                    </div>

                    <SentimentCalendar data={sentimentData} />

                    <SentimentList data={sentimentData} />
                </div>
            </div>
        </div>
    );
}
