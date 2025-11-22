'use client';

import React from 'react';
import { ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import clsx from 'clsx';

export const Controls = () => {
    const { placeBet, status } = useGameStore();

    const disabled = status !== 'PLAYING';

    return (
        <div className="w-full max-w-md sm:max-w-4xl flex gap-2 sm:gap-3 p-2 sm:p-4 z-50">
            <button
                onClick={() => placeBet('short')}
                disabled={disabled}
                className={clsx(
                    "flex-1 py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-1 sm:gap-2 font-bold text-sm sm:text-base text-white transition-all transform active:scale-95 cursor-pointer shadow-lg",
                    disabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-error hover:bg-error/90 cursor-pointer shadow-error/40"
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
                    "flex-1 py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-1 sm:gap-2 font-bold text-sm sm:text-base text-white transition-all transform active:scale-95 shadow-lg",
                    disabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-gray-500 hover:bg-gray-600 cursor-pointer shadow-gray-500/40"
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
                    "flex-1 py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-1 sm:gap-2 font-bold text-sm sm:text-base text-white transition-all transform active:scale-95 shadow-lg",
                    disabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-success hover:bg-success/90 cursor-pointer shadow-success/40"
                )}
            >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden xs:inline">LONG</span>
                <span className="xs:hidden">L</span>
            </button>
        </div>
    );
};
