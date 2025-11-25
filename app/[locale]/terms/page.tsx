import React from 'react';
import { useTranslations } from 'next-intl';

export default function TermsOfService() {
    // 네임스페이스를 'TermsOfService'로 사용합니다.
    const t = useTranslations('TermsOfService');
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
            <h1>{t('title')}</h1>
            <p>{t('lastUpdated', { date: 'November 25, 2025' })}</p>

            <h2>{t('section1.title')}</h2>
            <p>
                {t('section1.p1', { url: 'https://bitswipe.xyz' })}
            </p>

            <h2>{t('section2.title')}</h2>
            <p>
                {t('section2.p1')}
            </p>
            <ul>
                <li>{t('section2.list1')}</li>
                <li>{t('section2.list2')}</li>
                <li>{t('section2.list3')}</li>
                <li>{t('section2.list4')}</li>
                <li>{t('section2.list5')}</li>
            </ul>
            <p>
                {t('section2.p2')}
            </p>

            <h2>{t('section3.title')}</h2>
            <p>
                {t('section3.p1')}
            </p>
            <p>
                <strong>{t('section3.importantBold')}</strong>: {t('section3.importantText')}
            </p>

            <h2>{t('section4.title')}</h2>
            <p>
                {t('section4.p1')}
            </p>

            <h2>{t('section5.title')}</h2>
            <p>
                {t('section5.p1')}
            </p>

            <h2>{t('section6.title')}</h2>
            <p>
                {t('section6.p1')}
            </p>

            <h2>{t('section7.title')}</h2>
            <p>
                {t('section7.p1')}
            </p>

            <h2>{t('section8.title')}</h2>
            <p>
                {t('section8.p1')}
            </p>

            <h2>{t('section9.title')}</h2>
            <p>
                {t('section9.p1')}
            </p>
        </div>
    );
}