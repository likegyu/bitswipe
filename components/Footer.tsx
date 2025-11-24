import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="w-full py-4 px-4 text-center text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 flex flex-col gap-3">
            <div className="flex justify-center gap-4 text-gray-500 dark:text-gray-400">
                <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 hover:underline">
                    Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 hover:underline">
                    Terms of Service
                </Link>
                <a href="mailto:gyu@likegyu.com" className="hover:text-gray-700 dark:hover:text-gray-300 hover:underline">
                    Contact
                </a>
            </div>
            <div>
                <p className="text-[10px] sm:text-[10px] text-gray-500 dark:text-gray-400">© 2025 Bitswipe. This is a simulation game.</p>
                <p className="text-[10px] sm:text-[10px] text-gray-500 dark:text-gray-400">
                    This site uses Google Analytics to collect behavioral data.
                </p>
            </div>
        </footer>
    );
};
