'use client';

import React from 'react';
import { ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import clsx from 'clsx';

export const Controls = () => {
    const { placeBet, status } = useGameStore();

    const disabled = status !== 'PLAYING';

    return (
        <div className="w-full max-w-md flex gap-3 p-4 z-50">
            <button
                onClick={() => placeBet('short')}
                disabled={disabled}
                className={clsx(
                    "flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition-all transform active:scale-95 cursor-pointer shadow-lg",
                    disabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-error hover:bg-error/90 cursor-pointer shadow-error/40"
                )}
            >
                <ArrowDown size={24} />
                SHORT
            </button>

            <button
                onClick={() => placeBet('hold')}
                disabled={disabled}
                className={clsx(
                    "flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition-all transform active:scale-95 shadow-lg",
                    disabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-gray-500 hover:bg-gray-600 cursor-pointer shadow-gray-500/40"
                )}
            >
                <Eye size={24} />
                HOLD
            </button>

            <button
                onClick={() => placeBet('long')}
                disabled={disabled}
                className={clsx(
                    "flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition-all transform active:scale-95 shadow-lg",
                    disabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-success hover:bg-success/90 cursor-pointer shadow-success/40"
                )}
            >
                <ArrowUp size={24} />
                LONG
            </button>
        </div>
    );
};
