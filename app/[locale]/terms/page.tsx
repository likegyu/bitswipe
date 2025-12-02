import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Trophy, Newspaper } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import Image from 'next/image';
import { Footer } from '@/components/Footer';

// For SEO: Generate metadata using server-side translations
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'TermsOfService' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords').split(','),
        alternates: {
            canonical: `https://bitswipe.xyz/${locale}/terms`,
            languages: {
                'en': 'https://bitswipe.xyz/en/terms',
                'ko': 'https://bitswipe.xyz/ko/terms',
                'es': 'https://bitswipe.xyz/es/terms',
                'ja': 'https://bitswipe.xyz/ja/terms',
            },
        },
        openGraph: {
            title: t('title'),
            description: t('ogDescription'),
            url: `https://bitswipe.xyz/${locale}/terms`,
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

export default async function TermsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'TermsOfService' });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', item: `https://bitswipe.xyz/${locale}` },
                    { name: 'Terms', item: `https://bitswipe.xyz/${locale}/terms` },
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
                            alt="BitSwipe Logo - Bitcoin Trading Game"
                            width={40}
                            height={40}
                            className="hover:opacity-80 transition-opacity cursor-pointer shadow-md"
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
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('section1.title')}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t('section1.p1')}
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('section2.title')}
                        </h2>

                        <p className="text-gray-700 dark:text-gray-300">
                            {t('section2.p1')}
                        </p>

                        <ul className="list-disc pl-6 space-y-1.5 text-gray-700 dark:text-gray-300 mt-3">
                            <li>{t('section2.list1')}</li>
                            <li>{t('section2.list2')}</li>
                            <li>{t('section2.list3')}</li>
                            <li>{t('section2.list4')}</li>
                        </ul>

                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                            {t('section2.p2')}
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('section3.title')}
                        </h2>

                        <p className="text-gray-700 dark:text-gray-300">
                            {t('section3.p1')}
                        </p>

                        <div className="mt-4 pl-4 border-l-4 border-primary/20">
                            <p className="text-gray-800 dark:text-gray-200 font-medium">
                                {t('section3.importantBold')}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">
                                {t('section3.importantText')}
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('section4.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('section4.p1')}
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('section5.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('section5.p1')}
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('section6.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('section6.p1')}
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('section7.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('section7.p1')}
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('section8.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('section8.p1')}
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('section9.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {t('section9.p1')}
                        </p>
                    </section>
                </article>
            </div>
            <Footer />
        </div>
    );
}
