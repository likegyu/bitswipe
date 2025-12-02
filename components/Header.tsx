'use client';

import React from 'react';
import { Settings, Trophy, Newspaper } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export const Header = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
    const t = useTranslations('Header');
    const { balance, initialBalance, round, maxRounds } = useGameStore();

    const profit = balance - initialBalance;
    const profitPercent = ((profit / initialBalance) * 100).toFixed(2);
    const isProfit = profit >= 0;

    return (
        <header className="w-full max-w-md sm:max-w-4xl flex items-center justify-between p-2 sm:p-4 z-50">
            {/* Left: Stats */}
            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 sm:gap-2">
                    <Trophy className={isProfit ? "text-success" : "text-error"} size={18} />
                    <span className={`text-md font-bold ${isProfit ? "text-success" : "text-error"}`}>
                        {isProfit ? "+" : ""}{profitPercent}%
                    </span>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                    {t('selected_rounds')} {round}/{maxRounds}
                </span>
            </div>

            {/* Center: Logo */}
            <div className="flex-shrink-0 mx-4">
                <Link href="/" className="block">
                    <Image
                        src="/bitswipe-icon.png"
                        alt="Bitswipe Logo - Bitcoin Trading Game"
                        width={40}
                        height={40}
                        className="mix-blend-multiply hover:opacity-80 transition-opacity cursor-pointer shadow-md"
                    />
                </Link>
            </div>

            {/* Right: Navigation */}
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

                <button
                    onClick={onOpenSettings}
                    className="cursor-pointer p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                >
                    <Settings size={24} />
                </button>
            </div>
        </header>
    );
};
