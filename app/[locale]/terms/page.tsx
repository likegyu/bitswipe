import React from 'react';
import { useTranslations } from 'next-intl';

export default function TermsOfService() {
    const t = useTranslations('TermsOfService');

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

                    {/* Section 1 */}
                    <section className="mt-4 mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t('section1.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
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

                        <div className="mt-4 pl-4">
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
        </div>
    );
}
