import React from 'react';
import { getTranslations } from 'next-intl/server';
import { RankingClient } from '@/components/RankingClient';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

// For SEO: Generate metadata using server-side translations
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'RankingPage' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords').split(','),
        alternates: {
            canonical: `https://www.bitswipe.xyz/${locale}/ranking`,
            languages: {
                'en': 'https://www.bitswipe.xyz/en/ranking',
                'ko': 'https://www.bitswipe.xyz/ko/ranking',
                'es': 'https://www.bitswipe.xyz/es/ranking',
                'ja': 'https://www.bitswipe.xyz/ja/ranking',
            },
        },
        openGraph: {
            title: t('title'),
            description: t('ogDescription'),
            url: `https://www.bitswipe.xyz/${locale}/ranking`,
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

export default async function RankingPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', item: `https://www.bitswipe.xyz/${locale}` },
                    { name: 'Ranking', item: `https://www.bitswipe.xyz/${locale}/ranking` },
                ]}
            />
            <RankingClient />
        </>
    );
}
