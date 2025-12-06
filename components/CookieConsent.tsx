'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations('CookieConsent');

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left">
                <p>{t('message')}</p>
            </div>
            <button
                onClick={handleAccept}
                className="cursor-pointer whitespace-nowrap px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
                {t('accept')}
            </button>
        </div>
    );
};
