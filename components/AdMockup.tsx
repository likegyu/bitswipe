'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';

export const AdMockup = () => {
    const { status, skipAd } = useGameStore();

    if (status !== 'AD') return null;

    return (
        <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-4"
        >
            <div className="bg-white w-full max-w-md h-[60vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative border-4 border-yellow-100">
                <div className="bg-yellow-50 p-2 flex justify-end">
                    <button
                        onClick={skipAd}
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-yellow-50 to-orange-50">
                    <div className="w-20 h-20 bg-yellow-200 rounded-2xl mb-6 flex items-center justify-center text-4xl">
                        📢
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Ad Space</h3>
                    <p className="text-gray-500 mb-8">
                        This is a mockup for Google AdSense.
                        <br />
                        Support the developer!
                    </p>
                    <button
                        onClick={skipAd}
                        className="px-6 py-3 bg-white border-2 border-yellow-200 text-yellow-600 font-bold rounded-xl hover:bg-yellow-50 transition-colors"
                    >
                        Close Ad
                    </button>
                </div>

                <div className="bg-gray-50 p-2 text-center text-xs text-gray-400">
                    Advertisement
                </div>
            </div>
        </motion.div>
    );
};
