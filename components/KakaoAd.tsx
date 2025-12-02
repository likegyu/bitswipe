'use client';

import { useEffect, useRef } from 'react';

// 광고 스크립트가 로드된 후 실행될 수 있는 전역 함수가 있다면 타입 정의가 필요합니다.
declare global {
    interface Window {
        kakao_ad_area: {
            displayAll: () => void;
        };
    }
}

interface KakaoAdFitProps {
    unit: string;
    width: number;
    height: number;
    disabled?: boolean;
}

const KakaoAdFit = ({ unit, width, height, disabled }: KakaoAdFitProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (disabled || !containerRef.current) return;

        // 1. Create ins element dynamically
        const ins = document.createElement('ins');
        ins.className = 'kakao_ad_area';
        ins.style.display = 'none';
        ins.setAttribute('data-ad-unit', unit);
        ins.setAttribute('data-ad-width', width.toString());
        ins.setAttribute('data-ad-height', height.toString());

        // 2. Clear container and append ins
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(ins);

        // 3. Load script
        const script = document.createElement("script");
        script.setAttribute("src", "https://t1.daumcdn.net/kas/static/ba.min.js");
        script.setAttribute("async", "true");
        script.setAttribute("type", "text/javascript");

        document.body.appendChild(script);

        script.onload = () => {
            if (window.kakao_ad_area) {
                window.kakao_ad_area.displayAll();
            }
        };

        // If script is already loaded, try to display
        if (document.querySelector(`script[src*="ba.min.js"]`) && window.kakao_ad_area) {
            window.kakao_ad_area.displayAll();
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            // Note: We don't remove the script tag as it might be used by other ad instances
        };
    }, [unit, width, height, disabled]);

    if (disabled) return null;

    return <div ref={containerRef} className="w-full flex justify-center" />;
};

export default KakaoAdFit;