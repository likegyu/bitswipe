import { Suspense } from 'react';
import { GameLayout } from "@/components/GameLayout";
import { SharedResultModal } from "@/components/SharedResultModal";
import { SEOContent } from "@/components/SEOContent";

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <SharedResultModal />
      </Suspense>
      <GameLayout />
      <SEOContent />
    </main>
  );
}
