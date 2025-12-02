import { getTranslations } from 'next-intl/server';

export async function HowToJsonLd({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'SEOContent.HowToPlay' });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: t('title'),
        step: [
            {
                '@type': 'HowToStep',
                name: t('step1_bold'),
                text: t('step1_text'),
                position: 1,
            },
            {
                '@type': 'HowToStep',
                name: t('step2_bold'),
                text: t('step2_text'),
                position: 2,
            },
            {
                '@type': 'HowToStep',
                name: t('step3_bold'),
                text: t('step3_text'),
                position: 3,
            },
            {
                '@type': 'HowToStep',
                name: t('step4_bold'),
                text: t('step4_text'),
                position: 4,
            },
            {
                '@type': 'HowToStep',
                name: t('step5_bold'),
                text: t('step5_text'),
                position: 5,
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
