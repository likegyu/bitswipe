// @/components/ResponsiveKakaoAd.tsx (Client Component)
'use client';

import React from 'react';
import KakaoAdFit from './KakaoAd'; // 기존 KakaoAdFit 컴포넌트 임포트
import { useMediaQuery } from '@/hooks/useMediaQuery'; // 클라이언트 훅 임포트

interface ResponsiveAdProps {
    // PC 환경에서 사용할 광고 유닛 ID와 크기
    pcUnit: string;
    pcWidth: number;
    pcHeight: number;

    // 모바일 환경에서 사용할 광고 유닛 ID와 크기
    mobileUnit: string;
    mobileWidth: number;
    mobileHeight: number;
}

export const ResponsiveKakaoAd = ({
    pcUnit, pcWidth, pcHeight,
    mobileUnit, mobileWidth, mobileHeight
}: ResponsiveAdProps) => {
    // Client 훅 사용: MD(768px) 이상인지 확인
    const isMdUp = useMediaQuery();

    // 현재 뷰포트에 따라 사용할 광고 설정 결정
    const adConfig = isMdUp
        ? { unit: pcUnit, width: pcWidth, height: pcHeight } // PC 환경
        : { unit: mobileUnit, width: mobileWidth, height: mobileHeight }; // 모바일 환경

    // 조건부 렌더링으로 광고 표시
    return (
        <div className="w-full flex justify-center">
            <KakaoAdFit
                unit={adConfig.unit}
                width={adConfig.width}
                height={adConfig.height}
            />
        </div>
    );
};