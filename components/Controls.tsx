'use client';

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import clsx from 'clsx';

export const Controls = () => {
    const { placeBet, status } = useGameStore();

    const disabled = status !== 'PLAYING';

    return (
        <div className="w-full max-w-md flex gap-4 p-4 z-50">
            <button
                onClick={() => placeBet('short')}
                disabled={disabled}
                className={clsx(
                    "flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition-all transform active:scale-95 cursor-pointershadow-lg",
                    disabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-rose-400 hover:bg-rose-500 cursor-pointer shadow-rose-100"
                )}
            >
                <ArrowDown size={24} />
                SHORT
            </button>

            <button
                onClick={() => placeBet('long')}
                disabled={disabled}
                className={clsx(
                    "flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition-all transform active:scale-95 shadow-lg",
                    disabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-emerald-400 hover:bg-emerald-500 cursor-pointer shadow-emerald-100"
                )}
            >
                <ArrowUp size={24} />
                LONG
            </button>
        </div>
    );
};
