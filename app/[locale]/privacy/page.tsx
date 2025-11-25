import React from 'react';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
    // 네임스페이스를 'PrivacyPolicy'로 사용합니다.
    const t = useTranslations('PrivacyPolicy');

    // 유의: URL이나 날짜처럼 변하지 않는 텍스트는 번역 대상에서 제외할 수 있습니다.
    // 여기서는 날짜도 번역 키로 처리하여 포맷을 관리할 수 있도록 했습니다.
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
            <h1>{t('title')}</h1>
            <p>{t('lastUpdated', { date: 'November 25, 2025' })}</p>

            <p>
                {t('introP1', { url: 'https://bitswipe.xyz' })}
            </p>

            <h2>{t('logFiles.title')}</h2>
            <p>
                {t('logFiles.p1')}
            </p>

            <h2>{t('cookies.title')}</h2>
            <p>
                {t('cookies.p1')}
            </p>

            <h2>{t('googleDart.title')}</h2>
            <p>
                {t('googleDart.p1', { url: 'www.website.com' })}
                {' '}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                    https://policies.google.com/technologies/ads
                </a>
            </p>

            <h2>{t('adPolicies.title')}</h2>
            <p>
                {t('adPolicies.p1')}
            </p>
            <p>
                {t('adPolicies.p2')}
            </p>
            <p>
                {t('adPolicies.p3')}
            </p>

            <h2>{t('thirdParty.title')}</h2>
            <p>
                {t('thirdParty.p1')}
            </p>

            <h2>{t('children.title')}</h2>
            <p>
                {t('children.p1')}
            </p>
            <p>
                {t('children.p2', { age: 13 })}
            </p>

            <h2>{t('consent.title')}</h2>
            <p>
                {t('consent.p1')}
            </p>
        </div>
    );
}