'use client';

import React from 'react';
import { Settings, Trophy } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

export const Header = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
    const { balance, initialBalance, round, maxRounds } = useGameStore();

    const profit = balance - initialBalance;
    const profitPercent = ((profit / initialBalance) * 100).toFixed(2);
    const isProfit = profit >= 0;

    return (
        <header className="w-full max-w-md sm:max-w-4xl flex items-center justify-between p-2 sm:p-4 z-50">
            <div className="flex flex-col">
                <div className="flex items-center gap-1 sm:gap-2">
                    <Trophy className={isProfit ? "text-success" : "text-error"} size={18} />
                    <span className={`text-lg font-bold ${isProfit ? "text-success" : "text-error"}`}>
                        {isProfit ? "+" : ""}{profitPercent}%
                    </span>
                </div>
                <span className="text-sm text-gray-400 font-medium">
                    Round {round}/{maxRounds}
                </span>
            </div>

            <button
                onClick={onOpenSettings}
                className="cursor-pointer p-3 sm:p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
            >
                <Settings size={24} />
            </button>
        </header>
    );
};
