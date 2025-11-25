import React from 'react';
import { useTranslations } from 'next-intl';

export const SEOContent = () => {
    // next-intl을 사용하여 'SEOContent' 네임스페이스의 번역을 가져옵니다.
    const t = useTranslations('SEOContent');

    // 이 컴포넌트의 HTML 구조와 Tailwind CSS 클래스는 원본과 동일합니다.
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-12 #fdfbf7 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
            <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert mx-auto">

                {/* Psychology of Trading */}
                <div className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        {t('Psychology.title')}
                    </h2>
                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <p className="mb-4">
                            {t('Psychology.p1')}
                        </p>
                        <p className="mb-4">
                            <strong>BitSwipe</strong> {t('Psychology.p2_part1')}
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>{t('Psychology.list1_bold')}</strong>: {t('Psychology.list1_text')}</li>
                            <li><strong>{t('Psychology.list2_bold')}</strong>: {t('Psychology.list2_text')}</li>
                            <li><strong>{t('Psychology.list3_bold')}</strong>: {t('Psychology.list3_text')}</li>
                        </ul>
                        <p>
                            {t('Psychology.p3')}
                        </p>
                    </div>
                </div>

                {/* Mission Statement */}
                <div className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t('Mission.title')}</h2>
                    <p className="mb-4 text-md text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t('Mission.p1')}
                    </p>
                    <p className="mb-0 text-md text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t('Mission.p2_part1')} <strong>{t('Mission.p2_data')}</strong> {t('Mission.p2_part2')}
                    </p>
                </div>

                {/* Basic Trading Skills */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        {t('Basics.title')}
                    </h2>
                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <p className="mb-4">
                            {t('Basics.p1')}
                        </p>
                        <div className="grid sm:grid-cols-3 gap-6 mt-6">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <h3 className="font-bold text-gray-800 dark:text-white mb-2">{t('Basics.concept1_title')}</h3>
                                <p className="text-sm">
                                    {t('Basics.concept1_text')}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <h3 className="font-bold text-gray-800 dark:text-white mb-2">{t('Basics.concept2_title')}</h3>
                                <p className="text-sm">
                                    {t('Basics.concept2_text')}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <h3 className="font-bold text-gray-800 dark:text-white mb-2">{t('Basics.concept3_title')}</h3>
                                <p className="text-sm">
                                    {t('Basics.concept3_text')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('ChartPatterns.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Head and Shoulders */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {/* SVG remains static as it's a visual representation */}
                        <div className="h-40 mb-4 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                            <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                {/* Grid Lines */}
                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />

                                {/* Left Shoulder */}
                                <rect x="20" y="70" width="8" height="20" fill="#22c55e" rx="1" /> {/* Green */}
                                <line x1="24" y1="65" x2="24" y2="95" stroke="#22c55e" strokeWidth="1" />
                                <rect x="35" y="60" width="8" height="25" fill="#22c55e" rx="1" />
                                <line x1="39" y1="55" x2="39" y2="90" stroke="#22c55e" strokeWidth="1" />
                                <rect x="50" y="75" width="8" height="15" fill="#ef4444" rx="1" /> {/* Red */}
                                <line x1="54" y1="70" x2="54" y2="95" stroke="#ef4444" strokeWidth="1" />

                                {/* Head */}
                                <rect x="65" y="50" width="8" height="30" fill="#22c55e" rx="1" />
                                <line x1="69" y1="40" x2="69" y2="85" stroke="#22c55e" strokeWidth="1" />
                                <rect x="80" y="30" width="8" height="40" fill="#22c55e" rx="1" /> {/* Peak */}
                                <line x1="84" y1="20" x2="84" y2="75" stroke="#22c55e" strokeWidth="1" />
                                <rect x="95" y="45" width="8" height="35" fill="#ef4444" rx="1" />
                                <line x1="99" y1="40" x2="99" y2="85" stroke="#ef4444" strokeWidth="1" />

                                {/* Right Shoulder */}
                                <rect x="110" y="70" width="8" height="15" fill="#ef4444" rx="1" />
                                <line x1="114" y1="65" x2="114" y2="90" stroke="#ef4444" strokeWidth="1" />
                                <rect x="125" y="65" width="8" height="20" fill="#22c55e" rx="1" />
                                <line x1="129" y1="60" x2="129" y2="90" stroke="#22c55e" strokeWidth="1" />
                                <rect x="140" y="75" width="8" height="25" fill="#ef4444" rx="1" />
                                <line x1="144" y1="70" x2="144" y2="105" stroke="#ef4444" strokeWidth="1" />

                                {/* Breakdown */}
                                <rect x="155" y="90" width="8" height="25" fill="#ef4444" rx="1" />
                                <line x1="159" y1="85" x2="159" y2="115" stroke="#ef4444" strokeWidth="1" />

                                {/* Neckline */}
                                <path d="M10 95 L190 95" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern1_neckline')}</text>
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{t('ChartPatterns.pattern1_title')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('ChartPatterns.pattern1_text')}
                        </p>
                    </div>

                    {/* Double Bottom */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {/* SVG remains static as it's a visual representation */}
                        <div className="h-40 mb-4 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                            <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                {/* Grid Lines */}
                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />

                                {/* First Bottom */}
                                <rect x="20" y="30" width="8" height="30" fill="#ef4444" rx="1" />
                                <line x1="24" y1="25" x2="24" y2="65" stroke="#ef4444" strokeWidth="1" />
                                <rect x="35" y="60" width="8" height="30" fill="#ef4444" rx="1" />
                                <line x1="39" y1="55" x2="39" y2="95" stroke="#ef4444" strokeWidth="1" /> {/* Low 1 */}
                                <rect x="50" y="55" width="8" height="20" fill="#22c55e" rx="1" />
                                <line x1="54" y1="50" x2="54" y2="80" stroke="#22c55e" strokeWidth="1" />

                                {/* Middle Peak */}
                                <rect x="65" y="40" width="8" height="25" fill="#22c55e" rx="1" />
                                <line x1="69" y1="35" x2="69" y2="70" stroke="#22c55e" strokeWidth="1" />
                                <rect x="80" y="35" width="8" height="15" fill="#ef4444" rx="1" />
                                <line x1="84" y1="30" x2="84" y2="55" stroke="#ef4444" strokeWidth="1" />

                                {/* Second Bottom */}
                                <rect x="95" y="50" width="8" height="30" fill="#ef4444" rx="1" />
                                <line x1="99" y1="45" x2="99" y2="85" stroke="#ef4444" strokeWidth="1" />
                                <rect x="110" y="65" width="8" height="25" fill="#ef4444" rx="1" />
                                <line x1="114" y1="60" x2="114" y2="95" stroke="#ef4444" strokeWidth="1" /> {/* Low 2 */}
                                <rect x="125" y="55" width="8" height="25" fill="#22c55e" rx="1" />
                                <line x1="129" y1="50" x2="129" y2="85" stroke="#22c55e" strokeWidth="1" />

                                {/* Breakout */}
                                <rect x="140" y="40" width="8" height="30" fill="#22c55e" rx="1" />
                                <line x1="144" y1="35" x2="144" y2="75" stroke="#22c55e" strokeWidth="1" />
                                <rect x="155" y="20" width="8" height="30" fill="#22c55e" rx="1" />
                                <line x1="159" y1="15" x2="159" y2="55" stroke="#22c55e" strokeWidth="1" />

                                {/* Resistance Line */}
                                <path d="M10 35 L190 35" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern2_resistance')}</text>
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{t('ChartPatterns.pattern2_title')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('ChartPatterns.pattern2_text')}
                        </p>
                    </div>

                    {/* Bull Flag */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {/* SVG remains static as it's a visual representation */}
                        <div className="h-40 mb-4 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                            <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                {/* Grid Lines */}
                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />

                                {/* Pole */}
                                <rect x="30" y="50" width="8" height="40" fill="#22c55e" rx="1" />
                                <line x1="34" y1="45" x2="34" y2="95" stroke="#22c55e" strokeWidth="1" />
                                <rect x="45" y="30" width="8" height="30" fill="#22c55e" rx="1" />
                                <line x1="49" y1="25" x2="49" y2="65" stroke="#22c55e" strokeWidth="1" />

                                {/* Flag Channel */}
                                <line x1="60" y1="25" x2="130" y2="55" stroke="#e5e7eb" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4" />
                                <line x1="60" y1="55" x2="130" y2="85" stroke="#e5e7eb" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4" />

                                {/* Flag Candles */}
                                <rect x="65" y="35" width="8" height="15" fill="#ef4444" rx="1" />
                                <line x1="69" y1="30" x2="69" y2="55" stroke="#ef4444" strokeWidth="1" />
                                <rect x="80" y="45" width="8" height="15" fill="#ef4444" rx="1" />
                                <line x1="84" y1="40" x2="84" y2="65" stroke="#ef4444" strokeWidth="1" />
                                <rect x="95" y="50" width="8" height="10" fill="#22c55e" rx="1" />
                                <line x1="99" y1="45" x2="99" y2="65" stroke="#22c55e" strokeWidth="1" />
                                <rect x="110" y="60" width="8" height="15" fill="#ef4444" rx="1" />
                                <line x1="114" y1="55" x2="114" y2="80" stroke="#ef4444" strokeWidth="1" />

                                {/* Breakout */}
                                <rect x="135" y="40" width="8" height="30" fill="#22c55e" rx="1" />
                                <line x1="139" y1="35" x2="139" y2="75" stroke="#22c55e" strokeWidth="1" />
                                <rect x="150" y="20" width="8" height="40" fill="#22c55e" rx="1" />
                                <line x1="154" y1="15" x2="154" y2="65" stroke="#22c55e" strokeWidth="1" />

                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern3_breakout')}</text>
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{t('ChartPatterns.pattern3_title')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('ChartPatterns.pattern3_text')}
                        </p>
                    </div>

                    {/* Double Top */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {/* SVG remains static as it's a visual representation */}
                        <div className="h-40 mb-4 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                            <svg viewBox="0 0 200 130" className="w-full h-full" fill="none">
                                {/* Grid Lines */}
                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />

                                {/* Peak 1 */}
                                <rect x="30" y="40" width="8" height="30" fill="#22c55e" rx="1" />
                                <line x1="34" y1="35" x2="34" y2="75" stroke="#22c55e" strokeWidth="1" />
                                <rect x="45" y="25" width="8" height="25" fill="#22c55e" rx="1" />
                                <line x1="49" y1="20" x2="49" y2="55" stroke="#22c55e" strokeWidth="1" />
                                <rect x="60" y="30" width="8" height="20" fill="#ef4444" rx="1" />
                                <line x1="64" y1="25" x2="64" y2="55" stroke="#ef4444" strokeWidth="1" />

                                {/* Neckline Dip */}
                                <rect x="75" y="50" width="8" height="25" fill="#ef4444" rx="1" />
                                <line x1="79" y1="45" x2="79" y2="80" stroke="#ef4444" strokeWidth="1" />
                                <rect x="90" y="55" width="8" height="15" fill="#22c55e" rx="1" />
                                <line x1="94" y1="50" x2="94" y2="75" stroke="#22c55e" strokeWidth="1" />

                                {/* Peak 2 */}
                                <rect x="105" y="40" width="8" height="25" fill="#22c55e" rx="1" />
                                <line x1="109" y1="35" x2="109" y2="70" stroke="#22c55e" strokeWidth="1" />
                                <rect x="120" y="25" width="8" height="25" fill="#ef4444" rx="1" />
                                <line x1="124" y1="20" x2="124" y2="55" stroke="#ef4444" strokeWidth="1" />
                                <rect x="135" y="35" width="8" height="20" fill="#ef4444" rx="1" />
                                <line x1="139" y1="30" x2="139" y2="60" stroke="#ef4444" strokeWidth="1" />

                                {/* Breakdown */}
                                <rect x="150" y="60" width="8" height="30" fill="#ef4444" rx="1" />
                                <line x1="154" y1="55" x2="154" y2="95" stroke="#ef4444" strokeWidth="1" />
                                <rect x="165" y="80" width="8" height="25" fill="#ef4444" rx="1" />
                                <line x1="169" y1="75" x2="169" y2="110" stroke="#ef4444" strokeWidth="1" />

                                {/* Resistance & Support */}
                                <path d="M10 20 L190 20" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                <path d="M10 80 L190 80" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">{t('ChartPatterns.pattern4_neckline')}</text>
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{t('ChartPatterns.pattern4_title')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('ChartPatterns.pattern4_text')}
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('Advanced.title')}</h2>
                <p className="mb-6">
                    {t('Advanced.p1_part1')} <strong>{t('Advanced.p1_strong')}</strong> {t('Advanced.p1_part2')}
                </p>

                <div className="space-y-6 mb-12">

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{t('Advanced.tool1_title')}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <strong>{t('Advanced.tool1_goal_bold')}</strong>: {t('Advanced.tool1_goal_text')}
                                <br />• <strong>{t('Advanced.tool1_lever_bold')}</strong>: {t('Advanced.tool1_lever_text')}
                                <br />• <strong>{t('Advanced.tool1_liq_bold')}</strong>: {t('Advanced.tool1_liq_text')}
                                <br />• <em>{t('Advanced.tool1_rule_text')}</em>
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{t('Advanced.tool2_title')}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {t('Advanced.tool2_text')}
                                <br />• <strong>{t('Advanced.tool2_overbought_bold')}</strong>: {t('Advanced.tool2_overbought_text')}
                                <br />• <strong>{t('Advanced.tool2_oversold_bold')}</strong>: {t('Advanced.tool2_oversold_text')}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{t('Advanced.tool3_title')}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {t('Advanced.tool3_text')}
                                <br />• <strong>{t('Advanced.tool3_up_bold')}</strong>: {t('Advanced.tool3_up_text')}
                                <br />• <strong>{t('Advanced.tool3_down_bold')}</strong>: {t('Advanced.tool3_down_text')}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{t('Advanced.tool4_title')}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {t('Advanced.tool4_text')}
                                <br />• <strong>{t('Advanced.tool4_squeeze_bold')}</strong>: {t('Advanced.tool4_squeeze_text')}
                                <br />• <strong>{t('Advanced.tool4_touch_bold')}</strong>: {t('Advanced.tool4_touch_text')}
                            </p>
                        </div>
                    </div>

                </div>

                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t('HowToPlay.title')}</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>{t('HowToPlay.step1_bold')}</strong>: {t('HowToPlay.step1_text')}</li>
                    <li><strong>{t('HowToPlay.step2_bold')}</strong>: {t('HowToPlay.step2_text')}</li>
                    <li><strong>{t('HowToPlay.step3_bold')}</strong>: {t('HowToPlay.step3_text')}</li>
                    <li><strong>{t('HowToPlay.step4_bold')}</strong>: {t('HowToPlay.step4_text')}</li>
                    <li><strong>{t('HowToPlay.step5_bold')}</strong>: {t('HowToPlay.step5_text')}</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t('Tips.title')}</h2>
                <p className="mb-4">
                    {t('Tips.p1')}
                </p>
                <ol className="list-decimal pl-6 mb-6 space-y-2">
                    <li><strong>{t('Tips.tip1_bold')}</strong>: {t('Tips.tip1_text')}</li>
                    <li><strong>{t('Tips.tip2_bold')}</strong>: {t('Tips.tip2_text')}</li>
                    <li><strong>{t('Tips.tip3_bold')}</strong>: {t('Tips.tip3_text')}</li>
                    <li><strong>{t('Tips.tip4_bold')}</strong>: {t('Tips.tip4_text')}</li>
                </ol>

                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t('Resources.title')}</h2>
                <p className="mb-4">
                    {t('Resources.p1')}
                </p>
                <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>
                        <a href="https://www.binance.com/en/academy/articles/tags/technical-analysis" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            <strong>{t('Resources.link1_bold')}</strong>
                        </a> {t('Resources.link1_text')}
                    </li>
                    <li>
                        <a href="https://www.okx.com/learn" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            <strong>{t('Resources.link2_bold')}</strong>
                        </a> {t('Resources.link2_text')}
                    </li>
                </ul>

                <p className="text-sm text-gray-500 mt-8 italic">
                    {t('Disclaimer')}
                </p>
            </div>
        </section>
    );
};