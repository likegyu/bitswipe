import React from 'react';
import { getTranslations } from 'next-intl/server';
import { RankingClient } from '@/components/RankingClient';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'RankingPage' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords') ? t('keywords').split(',') : [],
        openGraph: {
            title: t('title'),
            description: t('ogDescription') || t('description'),
            url: `https://bitswipe.xyz/${locale}/ranking`,
            siteName: 'BitSwipe',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: t('ogImageAlt') || t('title'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('ogDescription') || t('description'),
            images: ['/og-image.png'],
            creator: '@bitswipe',
        },
    };
}

export default function RankingPage() {
    return <RankingClient />;
}
