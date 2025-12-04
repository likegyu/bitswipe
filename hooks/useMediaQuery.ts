// useMediaQuery.ts
import { useState, useEffect } from 'react';

const LG_BREAKPOINT = 1024;

export function useMediaQuery() {
    const [isMdUp, setIsMdUp] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMdUp(window.innerWidth >= LG_BREAKPOINT);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return isMdUp;
}