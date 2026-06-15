import { Suspense } from "react";
import WizardContainer from "@/components/wizard/WizardContainer";

export const metadata = {
  title: "Solicitação de Logo — Levieira's",
  description: "Preencha o formulário para solicitar sua logo personalizada",
};

function SkeletonBlock({ className }) {
  return (
    <div
      className={`rounded-xl bg-muted/60 animate-skeleton-pulse ${className}`}
    />
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="border-b border-border/50 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <SkeletonBlock className="h-10 w-28" />
        </div>
      </div>

      {/* Stepper dots skeleton */}
      <div className="px-4 border-b border-border/20 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-muted-foreground/20"
              />
            ))}
          </div>
          <SkeletonBlock className="h-3 w-20" />
        </div>
      </div>

      {/* Form skeleton */}
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2">
          <SkeletonBlock className="h-8 w-48" />
          <SkeletonBlock className="h-4 w-64" />
        </div>
        <div className="space-y-4 mt-8">
          <SkeletonBlock className="h-5 w-12" />
          <SkeletonBlock className="h-14 w-full" />
          <SkeletonBlock className="h-5 w-12" />
          <SkeletonBlock className="h-14 w-full" />
          <SkeletonBlock className="h-5 w-20" />
          <SkeletonBlock className="h-14 w-full" />
        </div>
        <SkeletonBlock className="h-14 w-full mt-6" />
      </div>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WizardContainer />
    </Suspense>
  );
}
