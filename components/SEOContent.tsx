import React from 'react';
import { useTranslations } from 'next-intl';
import { ExternalLink, ChevronRight, Quote, Trophy, Gauge, Calendar, CheckCircle, TrendingUp } from 'lucide-react';

export const SEOContent = () => {
    const t = useTranslations('SEOContent');

    // --- Custom SVG Icons (Monochrome & Premium) ---
    const Icons = {
        Leverage: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        RSI: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-gray-400">
                {/* 메인 그래프: text-rose-500 (진한 핑크/레드) */}
                <path className="text-rose-500" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h2l3-6 4 12 3-9h4" />
                {/* 배경 눈금: 부모의 text-gray-400을 상속받음 */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} strokeDasharray="4 4" d="M2 16h20M2 8h20" className="opacity-40" />
            </svg>
        ),
        MA: () => (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                {/* 메인: Indigo-600 */}
                <path className="text-indigo-600" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 18l5-5 4 4 9-9" />
                {/* 보조: Indigo-300 (투명도 조절 대신 색상을 연하게) */}
                <path className="text-indigo-300" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} strokeDasharray="4 4" d="M3 14l5-5 4 4 9-9" />
            </svg>
        ),
        BB: () => (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                {/* 밴드 영역 */}
                <path
                    d="M3 12c0-3 5-6 9-6s9 3 9 6 c0 3 -5 6 -9 6s-9 -3 -9 -6"
                    fill="#10B981"
                    className="opacity-20"
                    stroke="none"
                />
                {/* 상단/하단선 */}
                <path stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12c0-3 5-6 9-6s9 3 9 6" />
                <path stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12c0 3 5 6 9 6s9-3 9-6" />
                {/* 중심선 */}
                <path stroke="#064E3B" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2 12h20" className="opacity-60" />
            </svg>
        ),
        WinRate: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12h-9v-9" />
            </svg>
        ),
        ProfitFactor: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 12 4-5 4 5 7-15" />
            </svg>
        ),
        Target: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <circle cx="12" cy="12" r="6" strokeWidth={2} />
                <circle cx="12" cy="12" r="2" strokeWidth={2} />
            </svg>
        ),
        Chart: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V10M18 20V4M6 20v-4" />
            </svg>
        )
    };

    // --- Components ---

    const Section = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
        <section className={`mb-24 last:mb-0 ${className}`}>
            {children}
        </section>
    );

    const SectionHeader = ({ title, description }: { title: string, description?: string }) => (
        <div className="mb-10 word-break-keep-all">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                {title}
            </h2>
            {description && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                    {description}
                </p>
            )}
            <div className="h-1 w-20 bg-gray-200 dark:bg-gray-700 mt-6 rounded-full"></div>
        </div>
    );

    const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
        <div className={`
            bg-gray-50 dark:bg-gray-700/30
            p-6 rounded-2xl
            border border-transparent hover:border-gray-200 dark:hover:border-gray-600
            transition-all duration-300 ease-out
            hover:bg-white dark:hover:bg-gray-700
            hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/30
            ${className}
        `}>
            {children}
        </div>
    );

    return (
        <div className="w-full py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 word-break-keep-all">
            {/* Main Container */}
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-8 sm:p-12 lg:p-16">

                    {/* 1. Mission */}
                    <Section className="text-center">
                        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-tight">
                            {t('Mission.title')}
                        </h1>
                        <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>{t('Mission.p1')}</p>
                            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {t('Mission.p2_part1')}
                                    <span className="inline-block px-2 py-0.5 mx-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded font-bold">
                                        {t('Mission.p2_data')}
                                    </span>
                                    {t('Mission.p2_part2')}
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* 1.5 Market Analysis */}
                    <Section>
                        <SectionHeader
                            title={t('MarketAnalysis.title')}
                            description={t('MarketAnalysis.p1')}
                        />
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <Card className="flex flex-col items-center text-center p-8">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {t('MarketAnalysis.card1_title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('MarketAnalysis.card1_text')}
                                </p>
                            </Card>
                            <Card className="flex flex-col items-center text-center p-8">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                                    <Calendar className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {t('MarketAnalysis.card2_title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('MarketAnalysis.card2_text')}
                                </p>
                            </Card>
                        </div>
                        <div className="text-center">
                            <a
                                href="/market"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl hover:bg-gray-800 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                            >
                                {t('MarketAnalysis.cta_button')}
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </a>
                        </div>
                    </Section>

                    {/* 2. Ranking & Community (Moved) */}
                    <Section>
                        <SectionHeader
                            title={t('RankingSection.title')}
                            description={t('RankingSection.p1')}
                        />
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <Card className="flex flex-col items-center text-center p-8">
                                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4 text-yellow-600 dark:text-yellow-400">
                                    <Trophy className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {t('RankingSection.card1_title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('RankingSection.card1_text')}
                                </p>
                            </Card>
                            <Card className="flex flex-col items-center text-center p-8">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {t('RankingSection.card2_title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('RankingSection.card2_text')}
                                </p>
                            </Card>
                        </div>
                        <div className="text-center">
                            <a
                                href="/ranking"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl hover:bg-gray-800 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                            >
                                {t('RankingSection.cta_button')}
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </a>
                        </div>
                    </Section>

                    {/* 2. Psychology */}
                    <Section>
                        <SectionHeader
                            title={t('Psychology.title')}
                            description={t('Psychology.p1')}
                        />
                        <div className="grid md:grid-cols-2 gap-8 mb-6">
                            <div className="space-y-4">
                                <p className="text-gray-900 dark:text-white font-bold text-lg leading-relaxed">
                                    Bitswipe{t('Psychology.p2_part1')}
                                </p>
                                <ul className="space-y-3">
                                    {[1, 2, 3].map((num) => (
                                        <li key={num} className="flex gap-4 items-start p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                                            </div>
                                            <div>
                                                <strong className="block text-gray-900 dark:text-white mb-1">{t(`Psychology.list${num}_bold`)}</strong>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">{t(`Psychology.list${num}_text`)}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-700/20 rounded-2xl">
                                <p className="text-center italic text-gray-600 dark:text-gray-400 font-medium text-lg leading-relaxed">
                                    <Quote className="w-8 h-8 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                                    "{t('Psychology.p3')}"
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* 3. Basics */}
                    <Section>
                        <SectionHeader
                            title={t('Basics.title')}
                            description={t('Basics.p1')}
                        />
                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((num) => (
                                <Card key={num}>
                                    <div className="text-4xl font-black text-gray-200 dark:text-gray-700 mb-4">{num}</div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3">
                                        {t(`Basics.concept${num}_title`)}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {t(`Basics.concept${num}_text`)}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </Section>

                    {/* 4. Chart Patterns */}
                    <Section>
                        <SectionHeader title={t('ChartPatterns.title')} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <Card key={num} className="!p-0 overflow-hidden">
                                    {/* SVG Container */}
                                    <div className="aspect-[16/10] bg-white dark:bg-gray-900 p-6 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
                                        <div className="w-full h-full text-gray-800 dark:text-gray-200">
                                            {/* Original SVG Logic with Red/Green Colors */}
                                            {num === 1 && <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <rect x="20" y="70" width="8" height="20" fill="#22c55e" rx="1" />
                                                <line x1="24" y1="65" x2="24" y2="95" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="35" y="60" width="8" height="25" fill="#22c55e" rx="1" />
                                                <line x1="39" y1="55" x2="39" y2="90" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="50" y="75" width="8" height="15" fill="#ef4444" rx="1" />
                                                <line x1="54" y1="70" x2="54" y2="95" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="65" y="50" width="8" height="30" fill="#22c55e" rx="1" />
                                                <line x1="69" y1="40" x2="69" y2="85" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="80" y="30" width="8" height="40" fill="#22c55e" rx="1" />
                                                <line x1="84" y1="20" x2="84" y2="75" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="95" y="45" width="8" height="35" fill="#ef4444" rx="1" />
                                                <line x1="99" y1="40" x2="99" y2="85" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="110" y="70" width="8" height="15" fill="#ef4444" rx="1" />
                                                <line x1="114" y1="65" x2="114" y2="90" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="125" y="65" width="8" height="20" fill="#22c55e" rx="1" />
                                                <line x1="129" y1="60" x2="129" y2="90" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="140" y="75" width="8" height="25" fill="#ef4444" rx="1" />
                                                <line x1="144" y1="70" x2="144" y2="105" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="155" y="90" width="8" height="25" fill="#ef4444" rx="1" />
                                                <line x1="159" y1="85" x2="159" y2="115" stroke="#ef4444" strokeWidth="1" />
                                                <path d="M10 95 L190 95" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern1_neckline')}</text>
                                            </svg>}
                                            {num === 2 && <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                                <line x1="0" y1="40" x2="200" y2="40" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="70" x2="200" y2="70" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="100" x2="200" y2="100" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <rect x="20" y="40" width="8" height="20" fill="#ef4444" rx="1" />
                                                <line x1="24" y1="35" x2="24" y2="65" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="35" y="45" width="8" height="25" fill="#ef4444" rx="1" />
                                                <line x1="39" y1="40" x2="39" y2="75" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="50" y="40" width="8" height="15" fill="#22c55e" rx="1" />
                                                <line x1="54" y1="35" x2="54" y2="60" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="65" y="50" width="8" height="30" fill="#ef4444" rx="1" />
                                                <line x1="69" y1="45" x2="69" y2="85" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="80" y="60" width="8" height="40" fill="#ef4444" rx="1" />
                                                <line x1="84" y1="55" x2="84" y2="105" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="95" y="50" width="8" height="35" fill="#22c55e" rx="1" />
                                                <line x1="99" y1="45" x2="99" y2="90" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="110" y="45" width="8" height="15" fill="#22c55e" rx="1" />
                                                <line x1="114" y1="40" x2="114" y2="65" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="125" y="45" width="8" height="20" fill="#ef4444" rx="1" />
                                                <line x1="129" y1="40" x2="129" y2="70" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="140" y="30" width="8" height="25" fill="#22c55e" rx="1" />
                                                <line x1="144" y1="25" x2="144" y2="60" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="155" y="15" width="8" height="25" fill="#22c55e" rx="1" />
                                                <line x1="159" y1="10" x2="159" y2="45" stroke="#22c55e" strokeWidth="1" />
                                                <path d="M10 35 L190 35" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                                <text x="100" y="20" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern2_neckline')}</text>
                                            </svg>}
                                            {num === 3 && <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <rect x="30" y="40" width="8" height="30" fill="#22c55e" rx="1" />
                                                <line x1="34" y1="35" x2="34" y2="75" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="45" y="25" width="8" height="25" fill="#22c55e" rx="1" />
                                                <line x1="49" y1="20" x2="49" y2="55" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="60" y="30" width="8" height="20" fill="#ef4444" rx="1" />
                                                <line x1="64" y1="25" x2="64" y2="55" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="75" y="50" width="8" height="25" fill="#ef4444" rx="1" />
                                                <line x1="79" y1="45" x2="79" y2="80" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="90" y="55" width="8" height="15" fill="#22c55e" rx="1" />
                                                <line x1="94" y1="50" x2="94" y2="75" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="105" y="40" width="8" height="25" fill="#22c55e" rx="1" />
                                                <line x1="109" y1="35" x2="109" y2="70" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="120" y="25" width="8" height="25" fill="#ef4444" rx="1" />
                                                <line x1="124" y1="20" x2="124" y2="55" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="135" y="35" width="8" height="20" fill="#ef4444" rx="1" />
                                                <line x1="139" y1="30" x2="139" y2="60" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="150" y="60" width="8" height="30" fill="#ef4444" rx="1" />
                                                <line x1="154" y1="55" x2="154" y2="95" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="165" y="80" width="8" height="25" fill="#ef4444" rx="1" />
                                                <line x1="169" y1="75" x2="169" y2="110" stroke="#ef4444" strokeWidth="1" />
                                                <path d="M10 20 L190 20" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                                <path d="M10 80 L190 80" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern3_neckline')}</text>
                                            </svg>}
                                            {num === 4 && <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <rect x="20" y="30" width="8" height="30" fill="#ef4444" rx="1" />
                                                <line x1="24" y1="25" x2="24" y2="65" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="35" y="60" width="8" height="30" fill="#ef4444" rx="1" />
                                                <line x1="39" y1="55" x2="39" y2="95" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="50" y="55" width="8" height="20" fill="#22c55e" rx="1" />
                                                <line x1="54" y1="50" x2="54" y2="80" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="65" y="40" width="8" height="25" fill="#22c55e" rx="1" />
                                                <line x1="69" y1="35" x2="69" y2="70" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="80" y="35" width="8" height="15" fill="#ef4444" rx="1" />
                                                <line x1="84" y1="30" x2="84" y2="55" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="95" y="50" width="8" height="30" fill="#ef4444" rx="1" />
                                                <line x1="99" y1="45" x2="99" y2="85" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="110" y="65" width="8" height="25" fill="#ef4444" rx="1" />
                                                <line x1="114" y1="60" x2="114" y2="95" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="125" y="55" width="8" height="25" fill="#22c55e" rx="1" />
                                                <line x1="129" y1="50" x2="129" y2="85" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="140" y="40" width="8" height="30" fill="#22c55e" rx="1" />
                                                <line x1="144" y1="35" x2="144" y2="75" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="155" y="20" width="8" height="30" fill="#22c55e" rx="1" />
                                                <line x1="159" y1="15" x2="159" y2="55" stroke="#22c55e" strokeWidth="1" />
                                                <path d="M10 35 L190 35" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern4_resistance')}</text>
                                            </svg>}
                                            {num === 5 && <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <rect x="30" y="20" width="8" height="40" fill="#ef4444" rx="1" />
                                                <line x1="34" y1="15" x2="34" y2="65" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="45" y="50" width="8" height="30" fill="#ef4444" rx="1" />
                                                <line x1="49" y1="45" x2="49" y2="85" stroke="#ef4444" strokeWidth="1" />
                                                <line x1="60" y1="85" x2="130" y2="55" stroke="#e5e7eb" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4" />
                                                <line x1="60" y1="55" x2="130" y2="25" stroke="#e5e7eb" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4" />
                                                <rect x="65" y="65" width="8" height="15" fill="#22c55e" rx="1" />
                                                <line x1="69" y1="60" x2="69" y2="85" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="80" y="55" width="8" height="15" fill="#22c55e" rx="1" />
                                                <line x1="84" y1="50" x2="84" y2="75" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="95" y="50" width="8" height="10" fill="#ef4444" rx="1" />
                                                <line x1="99" y1="45" x2="99" y2="65" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="110" y="40" width="8" height="15" fill="#22c55e" rx="1" />
                                                <line x1="114" y1="35" x2="114" y2="60" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="135" y="40" width="8" height="30" fill="#ef4444" rx="1" />
                                                <line x1="139" y1="35" x2="139" y2="75" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="150" y="60" width="8" height="40" fill="#ef4444" rx="1" />
                                                <line x1="154" y1="55" x2="154" y2="105" stroke="#ef4444" strokeWidth="1" />
                                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern5_breakout')}</text>
                                            </svg>}
                                            {num === 6 && <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                                <rect x="30" y="50" width="8" height="40" fill="#22c55e" rx="1" />
                                                <line x1="34" y1="45" x2="34" y2="95" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="45" y="30" width="8" height="30" fill="#22c55e" rx="1" />
                                                <line x1="49" y1="25" x2="49" y2="65" stroke="#22c55e" strokeWidth="1" />
                                                <line x1="60" y1="25" x2="130" y2="55" stroke="#e5e7eb" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4" />
                                                <line x1="60" y1="55" x2="130" y2="85" stroke="#e5e7eb" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4" />
                                                <rect x="65" y="35" width="8" height="15" fill="#ef4444" rx="1" />
                                                <line x1="69" y1="30" x2="69" y2="55" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="80" y="45" width="8" height="15" fill="#ef4444" rx="1" />
                                                <line x1="84" y1="40" x2="84" y2="65" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="95" y="50" width="8" height="10" fill="#22c55e" rx="1" />
                                                <line x1="99" y1="45" x2="99" y2="65" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="110" y="60" width="8" height="15" fill="#ef4444" rx="1" />
                                                <line x1="114" y1="55" x2="114" y2="80" stroke="#ef4444" strokeWidth="1" />
                                                <rect x="135" y="40" width="8" height="30" fill="#22c55e" rx="1" />
                                                <line x1="139" y1="35" x2="139" y2="75" stroke="#22c55e" strokeWidth="1" />
                                                <rect x="150" y="20" width="8" height="40" fill="#22c55e" rx="1" />
                                                <line x1="154" y1="15" x2="154" y2="65" stroke="#22c55e" strokeWidth="1" />
                                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern6_breakout')}</text>
                                            </svg>}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                                            {t(`ChartPatterns.pattern${num}_title`)}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {t(`ChartPatterns.pattern${num}_text`)}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Section>

                    {/* 5. Getting Started & How to Play */}
                    <Section>
                        <SectionHeader
                            title={t('GettingStarted.title')}
                            description={t('GettingStarted.p1')}
                        />
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Steps */}
                            <div className="space-y-6">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} className="flex gap-5 group">
                                        <div className="flex-shrink-0 flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full border-2 border-gray-900 dark:border-gray-100 flex items-center justify-center font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 z-10 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors">
                                                {num}
                                            </div>
                                            {num !== 5 && <div className="w-px h-full bg-gray-200 dark:bg-gray-700 my-2 group-hover:bg-gray-300 transition-colors" />}
                                        </div>
                                        <div className="pb-6">
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                                                {t(`GettingStarted.step${num}_title`)}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {t(`GettingStarted.step${num}_text`)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Side Panel */}
                            <div className="space-y-6">
                                {/* Bonus Tip */}
                                <Card className="bg-gray-100 dark:bg-gray-800 border-none">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Quote className="w-5 h-5" />
                                        {t('GettingStarted.bonus_title')}
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {t('GettingStarted.bonus_text')}
                                    </p>
                                </Card>

                                {/* How to Play */}
                                <Card>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg border-b border-gray-100 dark:border-gray-700 pb-2">
                                        {t('HowToPlay.title')}
                                    </h3>
                                    <ul className="space-y-4">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <li key={num} className="text-sm text-gray-600 dark:text-gray-400 flex gap-3">
                                                <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                <span>
                                                    <span className="font-bold text-gray-900 dark:text-white mr-1">
                                                        {t(`HowToPlay.step${num}_bold`)}
                                                    </span>
                                                    {t(`HowToPlay.step${num}_text`)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    </Section>

                    {/* 6. Advanced Tools (Educational) */}
                    <Section>
                        <SectionHeader
                            title={t('Advanced.title')}
                            description={`${t('Advanced.p1_part1')} ${t('Advanced.p1_strong')} ${t('Advanced.p1_part2')}`}
                        />
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* 1. Leverage (1열) */}
                            <Card>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-amber-400">
                                        <Icons.Leverage />
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                                        {t('Advanced.tool1_title')}
                                    </h3>
                                </div>
                                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <p><strong>{t('Advanced.tool1_lever_bold')}:</strong> {t('Advanced.tool1_lever_text')}</p>
                                    <p><strong>{t('Advanced.tool1_liq_bold')}:</strong> {t('Advanced.tool1_liq_text')}</p>
                                    <p className="pt-2 text-gray-900 dark:text-gray-200 font-medium">{t('Advanced.tool1_rule_text')}</p>
                                </div>
                            </Card>

                            {/* 2. Candle Reveal Speed (2열) */}
                            <Card>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-white">
                                        <Gauge className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                        {t('Advanced.tool5_title')}
                                    </h3>
                                </div>
                                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <p>{t('Advanced.tool5_text')}</p>
                                </div>
                            </Card>

                            {/* 3. RSI & MA & BB (Combined Concept Intro) - 여기서 md:col-span-2 추가! */}
                            <div className="space-y-6 md:col-span-2">
                                <Card className="!p-5 flex gap-4 items-start">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 shrink-0"><Icons.RSI /></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('Advanced.tool2_title')}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('Advanced.tool2_text')}</p>
                                    </div>
                                </Card>
                                <Card className="!p-5 flex gap-4 items-start">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 shrink-0"><Icons.MA /></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('Advanced.tool3_title')}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('Advanced.tool3_text')}</p>
                                    </div>
                                </Card>
                                <Card className="!p-5 flex gap-4 items-start">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 shrink-0"><Icons.BB /></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('Advanced.tool4_title')}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('Advanced.tool4_text')}</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Section>

                    {/* 7. Tips & Mistakes (Grid) */}
                    <Section>
                        {/* 변경 1: 4:6 비율을 위해 grid-cols-5로 설정 (왼쪽 2칸: 오른쪽 3칸) */}
                        <div className="grid md:grid-cols-5 gap-12">

                            {/* Tips: 왼쪽 영역 (40% - col-span-2) */}
                            <div className="md:col-span-2">
                                <SectionHeader title={t('Tips.title')} description={t('Tips.p1')} />

                                {/* 변경 2: 모바일에서는 가로정렬(grid-cols-2), PC에서는 세로정렬(md:grid-cols-1) */}
                                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                                    {[1, 2, 3, 4].map((num) => (
                                        <Card key={num} className="!p-4">
                                            <div className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                                                {t(`Tips.tip${num}_bold`)}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {t(`Tips.tip${num}_text`)}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Mistakes: 오른쪽 영역 (60% - col-span-3) */}
                            <div className="md:col-span-3">
                                <SectionHeader title={t('CommonMistakes.title')} description={t('CommonMistakes.p1')} />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <div key={num} className="flex gap-3 items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                                            <span className="text-gray-300 dark:text-gray-600 font-bold text-lg select-none">{num}.</span>
                                            <div>
                                                {/* 변경 3: 제목 크기 증가 (text-sm -> text-base) */}
                                                <h4 className="font-bold text-gray-900 dark:text-white text-base">
                                                    {t(`CommonMistakes.mistake${num}_title`)}
                                                </h4>
                                                {/* 변경 3: 본문 크기 증가 (text-xs -> text-sm) */}
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    {t(`CommonMistakes.mistake${num}_text`)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* 8. Performance Analysis (Interpretation) */}
                    <Section>
                        <SectionHeader
                            title={t('PerformanceAnalysis.title')}
                            description={t('PerformanceAnalysis.p1')}
                        />

                        {/* Metrics Grid (Correct Hierarchy: Bold Title, Normal Content) */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {[
                                { id: 1, icon: Icons.WinRate },
                                { id: 2, icon: Icons.Target },
                                { id: 3, icon: Icons.ProfitFactor },
                                { id: 4, icon: Icons.Chart },
                                { id: 5, icon: Icons.Leverage }, // Best Trade
                                { id: 6, icon: Icons.WinRate }, // Total Return
                            ].map((item) => (
                                <Card key={item.id} className="flex flex-col justify-between h-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-gray-400 dark:text-gray-500">
                                            <item.icon />
                                        </div>
                                        {/* Title: Prominent and Bold */}
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {t(`PerformanceAnalysis.metric${item.id}_title`)}
                                        </h4>
                                    </div>
                                    {/* Content: Distinct but secondary */}
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {t(`PerformanceAnalysis.metric${item.id}_text`)}
                                    </p>
                                </Card>
                            ))}
                        </div>

                        {/* Indicator Analysis */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
                            {t('PerformanceAnalysis.indicator_title')}
                        </h3>
                        <p className="mb-8 text-gray-600 dark:text-gray-400">{t('PerformanceAnalysis.indicator_intro')}</p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* RSI Analysis */}
                            <Card>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gray-200 dark:bg-white text-white dark:text-gray-900 rounded-lg dark:bg-gray-800">
                                        <Icons.RSI />
                                    </div>
                                    <h4 className="font-bold text-xl text-gray-900 dark:text-white">RSI</h4>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{t('PerformanceAnalysis.rsi_oversold')}</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{t('PerformanceAnalysis.rsi_oversold_text')}</p>
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{t('PerformanceAnalysis.rsi_neutral')}</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{t('PerformanceAnalysis.rsi_neutral_text')}</p>
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{t('PerformanceAnalysis.rsi_overbought')}</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{t('PerformanceAnalysis.rsi_overbought_text')}</p>
                                    </div>
                                </div>
                            </Card>

                            {/* MA Analysis */}
                            <Card>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gray-200 dark:bg-white text-white dark:text-gray-900 rounded-lg dark:bg-gray-800">
                                        <Icons.MA />
                                    </div>
                                    <h4 className="font-bold text-xl text-gray-900 dark:text-white">MA</h4>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{t('PerformanceAnalysis.ma_uptrend')}</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{t('PerformanceAnalysis.ma_uptrend_text')}</p>
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{t('PerformanceAnalysis.ma_downtrend')}</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{t('PerformanceAnalysis.ma_downtrend_text')}</p>
                                    </div>
                                </div>
                            </Card>

                            {/* BB Analysis */}
                            <Card>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gray-200 dark:bg-white text-white dark:text-gray-900 rounded-lg dark:bg-gray-800">
                                        <Icons.BB />
                                    </div>
                                    <h4 className="font-bold text-xl text-gray-900 dark:text-white">Bollinger</h4>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{t('PerformanceAnalysis.bb_upper')}</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{t('PerformanceAnalysis.bb_upper_text')}</p>
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{t('PerformanceAnalysis.bb_lower')}</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{t('PerformanceAnalysis.bb_lower_text')}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Analysis Tips */}
                        <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('PerformanceAnalysis.analysis_tip_title')}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{t('PerformanceAnalysis.analysis_tip_text')}</p>
                            </div>
                            <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('PerformanceAnalysis.tip_title')}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{t('PerformanceAnalysis.tip_text')}</p>
                            </div>
                        </div>
                    </Section>



                    {/* 10. FAQ & Resources */}
                    <Section className="mb-0">
                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <SectionHeader title={t('FAQ.title')} />
                                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <div key={num} className="py-6 first:pt-0">
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3">
                                                {t(`FAQ.q${num}_question`)}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {t(`FAQ.q${num}_answer`)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="sticky top-8 bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-xl">
                                        {t('Resources.title')}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">{t('Resources.p1')}</p>
                                    <ul className="space-y-4">
                                        {[1, 2].map((num) => (
                                            <li key={num}>
                                                <a
                                                    href={num === 1 ? "https://www.binance.com/en/academy/articles/tags/technical-analysis" : "https://www.okx.com/learn"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group block p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-base font-bold text-gray-900 dark:text-white">
                                                            {t(`Resources.link${num}_bold`)}
                                                        </span>
                                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {t(`Resources.link${num}_text`)}
                                                    </p>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Disclaimer */}
                    <div className="mt-24 pt-10 border-t border-gray-100 dark:border-gray-700 text-center">
                        <p className="text-sm text-gray-400 dark:text-gray-500 italic max-w-4xl mx-auto leading-relaxed">
                            {t('Disclaimer')}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};