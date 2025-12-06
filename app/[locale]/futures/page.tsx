import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Trophy, Newspaper, ExternalLink, AlertTriangle, Lightbulb, TrendingUp, TrendingDown, ArrowRightLeft, Target, Shield, Gamepad2, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { HowToJsonLd } from '@/components/HowToJsonLd';
import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { ResponsiveKakaoAd } from '@/components/ResponsiveKakaoAd';
import { ImageCarousel } from '@/components/ImageCarousel';

const BINANCE_REFERRAL_LINK = 'https://accounts.binance.com/register?ref=723658289';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FuturesPage' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords').split(','),
        alternates: {
            canonical: `https://bitswipe.xyz/${locale}/futures`,
            languages: {
                'en': 'https://bitswipe.xyz/en/futures',
                'ko': 'https://bitswipe.xyz/ko/futures',
                'es': 'https://bitswipe.xyz/es/futures',
                'ja': 'https://bitswipe.xyz/ja/futures',
                'x-default': 'https://bitswipe.xyz/ko/futures'
            },
        },
        openGraph: {
            title: t('title'),
            description: t('ogDescription'),
            url: `https://bitswipe.xyz/${locale}/futures`,
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
            type: 'article',
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

export default async function FuturesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FuturesPage' });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', item: `https://bitswipe.xyz/${locale}` },
                    { name: 'Futures Guide', item: `https://bitswipe.xyz/${locale}/futures` },
                ]}
            />
            <HowToJsonLd locale={locale} />

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
            {/* ✅ Kakao Ad - Top (반응형 적용) */}
            <ResponsiveKakaoAd
                // 상단 광고의 PC 설정
                pcUnit="DAN-92yroeiWlsAYpiqb"
                pcWidth={728}
                pcHeight={90}
                // 상단 광고의 모바일 설정
                mobileUnit="DAN-Wm3BkuGJ9IQERMEc"
                mobileWidth={320}
                mobileHeight={50}
            />
            <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        {t('hero.subtitle')}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        {t('hero.description')}
                    </p>
                    <a
                        href={BINANCE_REFERRAL_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl transition-colors shadow-sm whitespace-nowrap"
                    >
                        {t('hero.cta')}
                        <ExternalLink size={18} />
                    </a>
                </section>

                {/* Table of Contents */}
                <nav className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('toc.title')}</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li><a href="#signup" className="hover:text-yellow-500 transition-colors">{t('toc.signup')}</a></li>
                        <li><a href="#deposit" className="hover:text-yellow-500 transition-colors">{t('toc.deposit')}</a></li>
                        <li><a href="#futures-intro" className="hover:text-yellow-500 transition-colors">{t('toc.futures_intro')}</a></li>
                        <li><a href="#transfer" className="hover:text-yellow-500 transition-colors">{t('toc.transfer')}</a></li>
                        <li><a href="#open-position" className="hover:text-yellow-500 transition-colors">{t('toc.open_position')}</a></li>
                        <li><a href="#order-types" className="hover:text-yellow-500 transition-colors">{t('toc.order_types')}</a></li>
                        <li><a href="#tpsl" className="hover:text-yellow-500 transition-colors">{t('toc.tpsl')}</a></li>
                        <li><a href="#leverage" className="hover:text-yellow-500 transition-colors">{t('toc.leverage')}</a></li>
                        <li><a href="#practice" className="hover:text-yellow-500 transition-colors">{t('toc.practice')}</a></li>
                    </ul>
                </nav>

                {/* Section 1: Signup */}
                <section id="signup" className="scroll-mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <a
                            href={BINANCE_REFERRAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-500 transition-colors flex items-center gap-2"
                        >
                            {t('signup.title')}
                            <ExternalLink size={20} />
                        </a>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t('signup.intro')}</p>

                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('signup.step1_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {t.rich('signup.step1_text', {
                                    link: (chunks) => (
                                        <a
                                            href={BINANCE_REFERRAL_LINK}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-bold inline-flex items-center gap-0.5"
                                        >
                                            {chunks}
                                            <ExternalLink size={14} className="inline" />
                                        </a>
                                    )
                                })}
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('signup.step2_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('signup.step2_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('signup.step3_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('signup.step3_text')}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
                        <Lightbulb className="text-blue-500 flex-shrink-0" size={20} />
                        <div><p className="text-blue-600 dark:text-blue-300 text-sm">{t('signup.tip_text')}</p></div>
                    </div>


                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-xl">
                        <div className="flex items-start gap-3">
                            <Newspaper className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" size={24} />
                            <div>
                                <h3 className="font-bold text-yellow-800 dark:text-yellow-300 text-lg mb-1">{t('signup.discount_alert_title')}</h3>
                                <p className="text-yellow-700 dark:text-yellow-200 font-medium">{t('signup.discount_alert_text')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <a
                            href={BINANCE_REFERRAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl transition-colors shadow-sm whitespace-nowrap mb-6"
                        >
                            {t('signup.cta')}
                            <ExternalLink size={18} />
                        </a>
                    </div>
                    {/* Image Carousel - Responsive */}
                    <div className="mb-6">
                        <div className="hidden sm:block">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1920x1080/png?text=Signup+PC+1',
                                    'https://placehold.co/1920x1080/png?text=Signup+PC+2',
                                    'https://placehold.co/1920x1080/png?text=Signup+PC+3',
                                ]}
                                alt="Signup Step"
                                aspectRatio="aspect-video"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('signup.image_placeholder_pc')}</p>}
                            />
                        </div>
                        <div className="block sm:hidden">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1080x1920/png?text=Signup+Mobile+1',
                                    'https://placehold.co/1080x1920/png?text=Signup+Mobile+2',
                                    'https://placehold.co/1080x1920/png?text=Signup+Mobile+3',
                                ]}
                                alt="Signup Step Mobile"
                                aspectRatio="aspect-[9/16]"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('signup.image_placeholder_mobile')}</p>}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 2: Deposit */}
                <section id="deposit" className="scroll-mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('deposit.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t('deposit.intro')}</p>

                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('deposit.step1_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('deposit.step1_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('deposit.step2_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('deposit.step2_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('deposit.step3_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('deposit.step3_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('deposit.step4_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('deposit.step4_text')}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-xl p-4 mb-6">
                        <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="font-semibold text-red-700 dark:text-red-400 text-sm">{t('deposit.warning_title')}</p>
                            <p className="text-red-600 dark:text-red-300 text-sm">{t('deposit.warning_text')}</p>
                        </div>
                    </div>

                    {/* Image Carousel - Responsive */}
                    <div>
                        <div className="hidden sm:block">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1920x1080/png?text=Deposit+PC+1',
                                    'https://placehold.co/1920x1080/png?text=Deposit+PC+2',
                                    'https://placehold.co/1920x1080/png?text=Deposit+PC+3',
                                ]}
                                alt="Deposit Step"
                                aspectRatio="aspect-video"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('deposit.image_placeholder_pc')}</p>}
                            />
                        </div>
                        <div className="block sm:hidden">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1080x1920/png?text=Deposit+Mobile+1',
                                    'https://placehold.co/1080x1920/png?text=Deposit+Mobile+2',
                                    'https://placehold.co/1080x1920/png?text=Deposit+Mobile+3',
                                ]}
                                alt="Deposit Step Mobile"
                                aspectRatio="aspect-[9/16]"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('deposit.image_placeholder_mobile')}</p>}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 3: Futures Intro */}
                <section id="futures-intro" className="scroll-mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('futures_intro.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t('futures_intro.intro')}</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('futures_intro.spot_vs_futures_title')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('futures_intro.spot_title')}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('futures_intro.spot_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('futures_intro.futures_title')}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('futures_intro.futures_text')}</p>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('futures_intro.long_short_title')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex items-start gap-3">
                            <TrendingUp className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">{t('futures_intro.long_title')}</h4>
                                <p className="text-green-600 dark:text-green-300 text-sm">{t('futures_intro.long_text')}</p>
                            </div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 flex items-start gap-3">
                            <TrendingDown className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-1">{t('futures_intro.short_title')}</h4>
                                <p className="text-red-600 dark:text-red-300 text-sm">{t('futures_intro.short_text')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <ArrowRightLeft className="text-gray-500 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{t('futures_intro.transfer_title')}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('futures_intro.transfer_text')}</p>
                        </div>
                    </div>

                    {/* Image Carousel - Responsive */}
                    <div>
                        <div className="hidden sm:block">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1920x1080/png?text=Futures+Intro+PC+1',
                                    'https://placehold.co/1920x1080/png?text=Futures+Intro+PC+2',
                                    'https://placehold.co/1920x1080/png?text=Futures+Intro+PC+3',
                                ]}
                                alt="Futures Intro"
                                aspectRatio="aspect-video"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('futures_intro.image_placeholder_pc')}</p>}
                            />
                        </div>
                        <div className="block sm:hidden">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1080x1920/png?text=Futures+Intro+Mobile+1',
                                    'https://placehold.co/1080x1920/png?text=Futures+Intro+Mobile+2',
                                    'https://placehold.co/1080x1920/png?text=Futures+Intro+Mobile+3',
                                ]}
                                alt="Futures Intro Mobile"
                                aspectRatio="aspect-[9/16]"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('futures_intro.image_placeholder_mobile')}</p>}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 3.5: Transfer to Futures Wallet */}
                <section id="transfer" className="scroll-mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <ArrowRightLeft className="text-indigo-500" size={28} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('transfer.title')}</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t('transfer.intro')}</p>

                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 mb-6">
                        <h3 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">{t('transfer.why_title')}</h3>
                        <p className="text-indigo-600 dark:text-indigo-300 text-sm">{t('transfer.why_text')}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('transfer.step1_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('transfer.step1_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('transfer.step2_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('transfer.step2_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('transfer.step3_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('transfer.step3_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('transfer.step4_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('transfer.step4_text')}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
                        <Lightbulb className="text-blue-500 flex-shrink-0" size={20} />
                        <div><p className="text-blue-600 dark:text-blue-300 text-sm">{t('transfer.tip_text')}</p>
                        </div>
                    </div>

                    {/* Image Carousel - Responsive */}
                    <div>
                        <div className="hidden sm:block">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1920x1080/png?text=Transfer+PC+1',
                                    'https://placehold.co/1920x1080/png?text=Transfer+PC+2',
                                    'https://placehold.co/1920x1080/png?text=Transfer+PC+3',
                                ]}
                                alt="Transfer Step"
                                aspectRatio="aspect-video"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('transfer.image_placeholder_pc')}</p>}
                            />
                        </div>
                        <div className="block sm:hidden">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1080x1920/png?text=Transfer+Mobile+1',
                                    'https://placehold.co/1080x1920/png?text=Transfer+Mobile+2',
                                    'https://placehold.co/1080x1920/png?text=Transfer+Mobile+3',
                                ]}
                                alt="Transfer Step Mobile"
                                aspectRatio="aspect-[9/16]"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('transfer.image_placeholder_mobile')}</p>}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 4: Open Position */}
                <section id="open-position" className="scroll-mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('open_position.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t('open_position.intro')}</p>

                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('open_position.step1_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('open_position.step1_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('open_position.step2_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('open_position.step2_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('open_position.step3_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('open_position.step3_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('open_position.step4_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('open_position.step4_text')}</p>
                        </div>
                    </div>

                    {/* Image Carousel - Responsive */}
                    <div>
                        <div className="hidden sm:block">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1920x1080/png?text=Open+Position+PC+1',
                                    'https://placehold.co/1920x1080/png?text=Open+Position+PC+2',
                                    'https://placehold.co/1920x1080/png?text=Open+Position+PC+3',
                                ]}
                                alt="Open Position Step"
                                aspectRatio="aspect-video"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('open_position.image_placeholder_pc')}</p>}
                            />
                        </div>
                        <div className="block sm:hidden">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1080x1920/png?text=Open+Position+Mobile+1',
                                    'https://placehold.co/1080x1920/png?text=Open+Position+Mobile+2',
                                    'https://placehold.co/1080x1920/png?text=Open+Position+Mobile+3',
                                ]}
                                alt="Open Position Step Mobile"
                                aspectRatio="aspect-[9/16]"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('open_position.image_placeholder_mobile')}</p>}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 5: Order Types */}
                <section id="order-types" className="scroll-mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('order_types.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t('order_types.intro')}</p>

                    <div className="space-y-6 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('order_types.market_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('order_types.market_text')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500"><span className="font-semibold">{t('order_types.market_when')}</span> {t('order_types.market_when_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('order_types.limit_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('order_types.limit_text')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500"><span className="font-semibold">{t('order_types.limit_when')}</span> {t('order_types.limit_when_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('order_types.stop_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('order_types.stop_text')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500"><span className="font-semibold">{t('order_types.stop_when')}</span> {t('order_types.stop_when_text')}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('order_types.post_only_title')}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('order_types.post_only_text')}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('order_types.reduce_only_title')}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('order_types.reduce_only_text')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Carousel - Responsive */}
                    <div>
                        <div className="hidden sm:block">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1920x1080/png?text=Order+Types+PC+1',
                                    'https://placehold.co/1920x1080/png?text=Order+Types+PC+2',
                                    'https://placehold.co/1920x1080/png?text=Order+Types+PC+3',
                                ]}
                                alt="Order Types"
                                aspectRatio="aspect-video"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('order_types.image_placeholder_pc')}</p>}
                            />
                        </div>
                        <div className="block sm:hidden">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1080x1920/png?text=Order+Types+Mobile+1',
                                    'https://placehold.co/1080x1920/png?text=Order+Types+Mobile+2',
                                    'https://placehold.co/1080x1920/png?text=Order+Types+Mobile+3',
                                ]}
                                alt="Order Types Mobile"
                                aspectRatio="aspect-[9/16]"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('order_types.image_placeholder_mobile')}</p>}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 6: TP/SL */}
                <section id="tpsl" className="scroll-mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('tpsl.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t('tpsl.intro')}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex items-start gap-3">
                            <Target className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-1">{t('tpsl.tp_title')}</h3>
                                <p className="text-green-600 dark:text-green-300 text-sm">{t('tpsl.tp_text')}</p>
                            </div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 flex items-start gap-3">
                            <Shield className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-red-700 dark:text-red-400 mb-1">{t('tpsl.sl_title')}</h3>
                                <p className="text-red-600 dark:text-red-300 text-sm">{t('tpsl.sl_text')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('tpsl.how_to_title')}</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm mb-3">
                            <li>{t('tpsl.how_to_step1')}</li>
                            <li>{t('tpsl.how_to_step2')}</li>
                            <li>{t('tpsl.how_to_step3')}</li>
                        </ol>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">{t('tpsl.how_to_after')}</p>
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
                        <Lightbulb className="text-blue-500 flex-shrink-0" size={20} />
                        <div><p className="text-blue-600 dark:text-blue-300 text-sm">{t('tpsl.tip_text')}</p>
                        </div>
                    </div>

                    {/* Image Carousel - Responsive */}
                    <div>
                        <div className="hidden sm:block">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1920x1080/png?text=TP+SL+PC+1',
                                    'https://placehold.co/1920x1080/png?text=TP+SL+PC+2',
                                    'https://placehold.co/1920x1080/png?text=TP+SL+PC+3',
                                ]}
                                alt="TP/SL Step"
                                aspectRatio="aspect-video"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('tpsl.image_placeholder_pc')}</p>}
                            />
                        </div>
                        <div className="block sm:hidden">
                            <ImageCarousel
                                images={[
                                    'https://placehold.co/1080x1920/png?text=TP+SL+Mobile+1',
                                    'https://placehold.co/1080x1920/png?text=TP+SL+Mobile+2',
                                    'https://placehold.co/1080x1920/png?text=TP+SL+Mobile+3',
                                ]}
                                alt="TP/SL Step Mobile"
                                aspectRatio="aspect-[9/16]"
                                placeholder={<p className="text-gray-400 dark:text-gray-500 text-sm p-8 text-center">{t('tpsl.image_placeholder_mobile')}</p>}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 7: Leverage */}
                <section id="leverage" className="scroll-mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('leverage.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t('leverage.intro')}</p>

                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('leverage.what_is_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('leverage.what_is_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('leverage.margin_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('leverage.margin_text')}</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                            <h3 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">{t('leverage.liquidation_title')}</h3>
                            <p className="text-orange-600 dark:text-orange-300 text-sm">{t('leverage.liquidation_text')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('leverage.example_title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('leverage.example_text')}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('leverage.tips_title')}</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                                {t('leverage.tip1')}
                            </li>
                            <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                                {t('leverage.tip2')}
                            </li>
                            <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                                {t('leverage.tip3')}
                            </li>
                            <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                                {t('leverage.tip4')}
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                        <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="font-semibold text-red-700 dark:text-red-400 text-sm">{t('leverage.warning_title')}</p>
                            <p className="text-red-600 dark:text-red-300 text-sm">{t('leverage.warning_text')}</p>
                        </div>
                    </div>
                </section>

                {/* Section 8: Practice */}
                <section id="practice" className="scroll-mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Gamepad2 className="text-indigo-500" size={28} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('practice.title')}</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t('practice.intro')}</p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors"
                    >
                        {t('practice.cta')}
                    </Link>
                </section>

                {/* Final CTA */}
                <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('final_cta.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{t('final_cta.description')}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={BINANCE_REFERRAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl transition-colors shadow-sm whitespace-nowrap"
                        >
                            {t('final_cta.signup_button')}
                            <ExternalLink size={18} />
                        </a>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl transition-colors"
                        >
                            {t('final_cta.practice_button')}
                        </Link>
                    </div>
                </section>

                {/* Disclaimer */}
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    {t('disclaimer')}
                </p>
            </div>

            <Footer />
        </div>
    );
}
