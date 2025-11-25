import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { GameLayout } from "@/components/GameLayout";
import { SharedResultModal } from "@/components/SharedResultModal";
import { SEOContent } from "@/components/SEOContent";

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
        openGraph: {
            title: t('title'),
            description: t('ogDescription'),
            url: 'https://bitswipe.xyz',
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

export default function Home() {
    return (
        <main>
            <Suspense fallback={null}>
                <SharedResultModal />
            </Suspense>
            <GameLayout />
            <SEOContent />
        </main>
    );
}
