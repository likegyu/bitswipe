import React from 'react';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
    const t = useTranslations('PrivacyPolicy');

    return (
        <div className="w-full min-h-screen flex justify-center px-4 py-12 bg-white dark:bg-gray-900">
            {/* 중앙 박스 */}
            <div className="w-full max-w-2xl p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">

                <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none leading-relaxed">

                    {/* Title */}
                    <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
                        {t('title')}
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">
                        {t('lastUpdated')}
                    </p>

                    {/* Intro */}
                    <section className="mt-4 mb-10">
                        <p className="text-gray-700 dark:text-gray-300">
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