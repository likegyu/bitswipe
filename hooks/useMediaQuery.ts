// useMediaQuery.ts
import { useState, useEffect } from 'react';

const MD_BREAKPOINT = 768;

export function useMediaQuery() {
    const [isMdUp, setIsMdUp] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMdUp(window.innerWidth >= MD_BREAKPOINT);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return isMdUp;
}