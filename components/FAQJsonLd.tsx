import { getTranslations } from 'next-intl/server';

export async function FAQJsonLd({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'SEOContent.FAQ' });

    const faqs = [1, 2, 3, 4, 5, 6].map((num) => ({
        "@type": "Question",
        "name": t(`q${num}_question`),
        "acceptedAnswer": {
            "@type": "Answer",
            "text": t(`q${num}_answer`)
        }
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
