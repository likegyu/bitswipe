import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { GameLayout } from "@/components/GameLayout";
import { SharedResultModal } from "@/components/SharedResultModal";
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const SEOContent = dynamic(() => import('@/components/SEOContent').then(mod => mod.SEOContent), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-50 dark:bg-gray-900" />,
    ssr: true
});

// For SEO: Generate metadata using server-side translations
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'HomePage' });

    return {
        title: {
            default: t('title'),
            template: `%s | ${t('title')}`
        },
        description: t('description'),
        keywords: t('keywords').split(','),
        alternates: {
            canonical: `https://bitswipe.xyz/${locale}`,
            languages: {
                'en': 'https://bitswipe.xyz/en',
                'ko': 'https://bitswipe.xyz/ko',
                'es': 'https://bitswipe.xyz/es',
                'ja': 'https://bitswipe.xyz/ja',
                'x-default': 'https://bitswipe.xyz/en'

            },
        },
        openGraph: {
            title: t('title'),
            description: t('ogDescription'),
            url: `https://bitswipe.xyz/${locale}`,
            siteName: t('title'),
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

import { FAQJsonLd } from '@/components/FAQJsonLd';
import { HowToJsonLd } from '@/components/HowToJsonLd';
import { SoftwareAppJsonLd } from '@/components/SoftwareAppJsonLd';

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <main>
            <Suspense fallback={null}>
                <SharedResultModal />
            </Suspense>
            <FAQJsonLd locale={locale} />
            <HowToJsonLd locale={locale} />
            <SoftwareAppJsonLd locale={locale} />
            <GameLayout />
            <SEOContent />
        </main>
    );
}
