'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';

export const Ad = () => {
    const { status, skipAd } = useGameStore();
    const adInitialized = useRef(false);

    useEffect(() => {
        if (status === 'AD' && !adInitialized.current) {
            // Delay to ensure DOM is fully rendered
            const timer = setTimeout(() => {
                try {
                    // @ts-ignore
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    adInitialized.current = true;
                } catch (err) {
                    console.error('AdSense error:', err);
                }
            }, 100);

            return () => clearTimeout(timer);
        }

        // Reset when leaving AD status
        if (status !== 'AD' && adInitialized.current) {
            adInitialized.current = false;
        }
    }, [status]);

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
                <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden min-h-[250px]">
                    <ins className="adsbygoogle"
                        style={{ display: 'block', textAlign: 'center', minWidth: '300px', minHeight: '250px' }}
                        data-ad-layout="in-article"
                        data-ad-format="fluid"
                        data-ad-client="ca-pub-3860360352476148"
                        data-ad-slot="3782671210"
                    />
                </div>

                {/* Footer */}
                <div className="py-1 px-4 text-center border-t border-gray-200">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Advertisement</span>
                </div>
            </div>
        </motion.div>
    );
};
