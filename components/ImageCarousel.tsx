"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
    images?: string[];
    alt: string;
    className?: string;
    aspectRatio?: string; // e.g., 'aspect-video', 'aspect-[9/16]'
    placeholder?: React.ReactNode;
}

export function ImageCarousel({
    images = [],
    alt,
    className,
    aspectRatio = 'aspect-video',
    placeholder
}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className={cn("w-full bg-gray-100 dark:bg-gray-700/50 rounded-xl overflow-hidden flex items-center justify-center", aspectRatio, className)}>
                {placeholder || <span className="text-gray-400">No images provided</span>}
            </div>
        );
    }

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <div className={cn("relative group w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800", className)}>
            <div className={cn("relative w-full overflow-hidden", aspectRatio)}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                handleNext();
                            } else if (swipe > swipeConfidenceThreshold) {
                                handlePrev();
                            }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${alt} - ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            priority={currentIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls - Only show if more than 1 image */}
            {images.length > 1 && (
                <>
                    {/* Arguments for navigation arrows: "very small" */}
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        onClick={handlePrev}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all shadow-sm",
                                    idx === currentIndex
                                        ? "bg-white w-3"
                                        : "bg-white/50 hover:bg-white/80"
                                )}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
