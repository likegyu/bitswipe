'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface RoundResultOverlayProps {
    type: 'win' | 'loss' | 'hold' | null;
}

export const RoundResultOverlay = ({ type }: RoundResultOverlayProps) => {
    useEffect(() => {
        if (type === 'win') {
            const duration = 2000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            const randomInRange = (min: number, max: number) => {
                return Math.random() * (max - min) + min;
            }

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 30 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 400);

            return () => clearInterval(interval);
        }
    }, [type]);

    return (
        <AnimatePresence>
            {type && (
                <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center">

                    {/* WIN: Big Text + Confetti (handled in effect) */}
                    {type === 'win' && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            className="text-9xl filter drop-shadow-2xl"
                        >
                            🤑
                        </motion.div>
                    )}

                    {/* LOSS: Flying Money */}
                    {type === 'loss' && (
                        <>
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className="text-9xl filter drop-shadow-2xl relative z-10"
                            >
                                💸
                            </motion.div>
                            {/* Flying bills */}
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        opacity: 0,
                                        scale: 0.5
                                    }}
                                    animate={{
                                        x: (Math.random() - 0.5) * 400,
                                        y: -400 - Math.random() * 200,
                                        opacity: [0, 1, 0],
                                        scale: Math.random() * 0.5 + 0.5,
                                        rotate: Math.random() * 360
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        ease: "easeOut",
                                        delay: i * 0.1
                                    }}
                                    className="absolute text-6xl"
                                >
                                    💸
                                </motion.div>
                            ))}
                        </>
                    )}

                    {/* HOLD: Blinking Eye */}
                    {type === 'hold' && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-9xl filter drop-shadow-2xl"
                        >
                            <motion.div
                                animate={{
                                    scaleY: [1, 0.1, 1, 1, 0.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    times: [0, 0.05, 0.1, 0.8, 0.85, 0.9],
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            >
                                👀
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
};
