import { getTranslations } from 'next-intl/server';

export async function SoftwareAppJsonLd({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'HomePage' });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': ['WebApplication', 'GameApplication', 'FinanceApplication'],
        name: 'Bitswipe',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Web Browser',
        browserRequirements: 'Requires JavaScript. Optimized for Chrome, Safari, Firefox, Edge.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: t('description'),
        keywords: `${t('keywords')}`,
        featureList: 'AI Market Analysis, Bitcoin Futures Simulation, Risk-free Trading',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
