import { getTranslations } from 'next-intl/server';

export async function HowToJsonLd({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'HowToJsonLd' });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: t('title'),
        description: t('description'),
        step: [
            {
                '@type': 'HowToStep',
                name: t('step1_title'),
                text: t('step1_text'),
                position: 1,
            },
            {
                '@type': 'HowToStep',
                name: t('step2_title'),
                text: t('step2_text'),
                position: 2,
            },
            {
                '@type': 'HowToStep',
                name: t('step3_title'),
                text: t('step3_text'),
                position: 3,
            },
            {
                '@type': 'HowToStep',
                name: t('step4_title'),
                text: t('step4_text'),
                position: 4,
            },
            {
                '@type': 'HowToStep',
                name: t('step5_title'),
                text: t('step5_text'),
                position: 5,
            },
            {
                '@type': 'HowToStep',
                name: t('step6_title'),
                text: t('step6_text'),
                position: 6,
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
