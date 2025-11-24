import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="w-full py-8 px-4 text-center text-[11px] sm:text-xs text-gray-400 flex flex-col gap-3">
            <div className="flex justify-center gap-4 text-gray-500">
                <Link href="/privacy" className="hover:text-gray-700 hover:underline">
                    Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-gray-700 hover:underline">
                    Terms of Service
                </Link>
                <a href="mailto:gyu@likegyu.com" className="hover:text-gray-700 hover:underline">
                    Contact
                </a>
            </div>
            <div>
                <p>© 2025 Bitswipe. This is a simulation game.</p>
                <p className="mt-1 text-[10px] sm:text-[10px] text-gray-500">
                    This site uses Google Analytics to collect behavioral data.
                </p>
            </div>
        </footer>
    );
};
