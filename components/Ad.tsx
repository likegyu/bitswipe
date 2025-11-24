'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';

export const Ad = () => {
    const { status, skipAd } = useGameStore();
    const adInitialized = useRef(false);

    // AdSense initialization logic removed for custom banner
    // useEffect(() => {
    //     if (status === 'AD' && !adInitialized.current) {
    //         // ...
    //     }
    // }, [status]);

    if (status !== 'AD') return null;

    return (
        <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="absolute inset-0 z-40 flex justify-center"
        >
            <div className="bg-white w-full h-full max-w-md sm:max-w-4xl rounded-3xl flex flex-col">
                {/* Header */}
                <div className="p-4 flex justify-end items-center flex-shrink-0">
                    <button
                        onClick={skipAd}
                        className="cursor-pointer p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                        aria-label="close"
                    >
                        <X size={18} className="text-gray-600" />
                    </button>
                </div>

                {/* Ad Content */}
                <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden min-h-[250px] relative">
                    <a
                        href="https://gall.dcinside.com/mgallery/board/lists?id=chartanalysis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full h-full min-h-[250px] block group overflow-hidden rounded-xl"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/ad-banner-m.jpg"
                            alt="Chart Minor Gallery"
                            className="sm:hidden absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/ad-banner.png"
                            alt="Chart Minor Gallery"
                            className="hidden sm:block absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold transition-opacity duration-300">
                                Visit Gallery
                            </span>
                        </div>
                    </a>
                </div>

                {/* Footer */}
                <div className="py-1 px-4 text-center border-t border-gray-200">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Advertisement</span>
                </div>
            </div>
        </motion.div>
    );
};
