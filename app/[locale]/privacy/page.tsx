import React from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

// For SEO: Generate metadata using server-side translations
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords').split(','),
        alternates: {
            canonical: `https://bitswipe.xyz/${locale}/privacy`,
            languages: {
                'en': 'https://bitswipe.xyz/en/privacy',
                'ko': 'https://bitswipe.xyz/ko/privacy',
                'es': 'https://bitswipe.xyz/es/privacy',
                'ja': 'https://bitswipe.xyz/ja/privacy',
            },
        },
        openGraph: {
            title: t('title'),
            description: t('ogDescription'),
            url: `https://bitswipe.xyz/${locale}/privacy`,
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

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', item: `https://bitswipe.xyz/${locale}` },
                    { name: 'Privacy', item: `https://bitswipe.xyz/${locale}/privacy` },
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
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                        {t('lastUpdated')}
                    </p>
                </div>

                <article className="prose prose-lg dark:prose-invert max-w-none">
                    {/* Intro */}
                    <section className="mb-10">
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t('introP1')}
                        </p>
                    </section>

                    {/* Log Files */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('logFiles.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('logFiles.p1')}
                        </p>
                    </section>

                    {/* Cookies */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('cookies.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('cookies.p1')}
                        </p>
                    </section>

                    {/* Google DART Cookie */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('googleDart.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('googleDart.p1', { url: 'www.website.com' })}
                            {' '}
                            <a
                                href="https://policies.google.com/technologies/ads"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                https://policies.google.com/technologies/ads
                            </a>
                        </p>
                    </section>

                    {/* Advertising Partners Privacy Policies */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('adPolicies.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('adPolicies.p1')}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                            {t('adPolicies.p2')}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                            {t('adPolicies.p3')}
                        </p>
                    </section>

                    {/* Third Party Privacy Policies */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('thirdParty.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('thirdParty.p1')}
                        </p>
                    </section>

                    {/* Children's Information */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('children.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('children.p1')}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                            {t('children.p2', { age: 13 })}
                        </p>
                    </section>

                    {/* Consent */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('consent.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('consent.p1')}
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}