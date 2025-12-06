import React from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Trophy, Newspaper } from 'lucide-react';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import Image from 'next/image';
import { Footer } from '@/components/Footer';

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
                'x-default': 'https://bitswipe.xyz/ko/privacy'
            },
        },
        openGraph: {
            title: t('title'),
            description: t('ogDescription'),
            url: `https://bitswipe.xyz/${locale}/privacy`,
            siteName: 'Bitswipe',
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
            {/* Header */}
            <header className="w-full bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
                <div className="w-full max-w-md sm:max-w-4xl mx-auto flex items-center justify-between p-2 sm:p-4 relative">
                    <div className="flex items-center gap-1 flex-1">
                        <Link
                            href="/"
                            className="p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer"
                        >
                            <ArrowLeft size={24} />
                        </Link>
                    </div>

                    <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                        <Image
                            src="/bitswipe-icon.png"
                            alt="Bitswipe"
                            width={40}
                            height={40}
                            className="block dark:hidden hover:opacity-80 transition-opacity cursor-pointer shadow-md rounded-[10%]"
                        />
                        <Image
                            src="/bitswipe-icon-dark.png"
                            alt="Bitswipe"
                            width={40}
                            height={40}
                            className="hidden dark:block hover:opacity-80 transition-opacity cursor-pointer shadow-md rounded-[10%]"
                        />
                    </Link>

                    <div className="flex items-center gap-1 flex-1 justify-end">
                        <Link
                            href="/market"
                            className="relative p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer"
                        >
                            <Newspaper size={24} />
                            <span className="absolute top-1 right-1 sm:top-1 sm:right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </Link>
                        <Link
                            href="/ranking"
                            className="p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer"
                        >
                            <Trophy size={24} />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
                <div className="mb-8">
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
            <Footer />
        </div>
    );
}