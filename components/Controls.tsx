'use client';

import React from 'react';
import { ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import clsx from 'clsx';

export const Controls = () => {
    const { placeBet, closePosition, status, isPositionOpen } = useGameStore();

    const disabled = status !== 'PLAYING' && !isPositionOpen;

    if (isPositionOpen) {
        return (
            <div className="w-full max-w-md sm:max-w-4xl flex gap-2 sm:gap-3 p-2 sm:p-1 z-50">
                <button
                    onClick={closePosition}
                    className="w-full py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg text-white bg-blue-500 hover:bg-blue-600 hover:scale-[1.02] cursor-pointer active:scale-95 transition-all animate-slow-pulse"
                >
                    <span className="uppercase">Close Position</span>
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md sm:max-w-4xl flex gap-2 sm:gap-3 p-2 sm:p-1 z-50">
            <button
                onClick={() => placeBet('short')}
                disabled={disabled}
                className={clsx(
                    "flex-1 py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-1 sm:gap-2 font-bold text-sm sm:text-base text-white transition-all transform active:scale-95 shadow-sm",
                    disabled ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50" : "bg-error hover:bg-error/90 cursor-pointer shadow-error/40 hover:scale-[1.02]"
                )}
            >
                <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden xs:inline">SHORT</span>
                <span className="xs:hidden">S</span>
            </button>

            <button
                onClick={() => placeBet('hold')}
                disabled={disabled}
                className={clsx(
                    "flex-1 py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-1 sm:gap-2 font-bold text-sm sm:text-base text-white transition-all transform active:scale-95 shadow-sm",
                    disabled ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50" : "bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer shadow-gray-500/40 hover:scale-[1.02]"
                )}
            >
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden xs:inline">HOLD</span>
                <span className="xs:hidden">H</span>
            </button>

            <button
                onClick={() => placeBet('long')}
                disabled={disabled}
                className={clsx(
                    "flex-1 py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-1 sm:gap-2 font-bold text-sm sm:text-base text-white transition-all transform active:scale-95 shadow-sm",
                    disabled ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50" : "bg-success hover:bg-success/90 cursor-pointer shadow-success/40 hover:scale-[1.02]"
                )}
            >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden xs:inline">LONG</span>
                <span className="xs:hidden">L</span>
            </button>
        </div>
    );
};
