import { Suspense } from 'react';
import { GameLayout } from "@/components/GameLayout";
import { SharedResultModal } from "@/components/SharedResultModal";

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <SharedResultModal />
      </Suspense>
      <GameLayout />
    </main>
  );
}
