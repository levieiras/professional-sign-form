"use client";

import { ChevronLeft } from "lucide-react";
import { useHaptic } from "@/lib/hooks/useHaptic";

export default function BackButton({ onClick, onReset }) {
  const { trigger: haptic } = useHaptic();

  const handleBack = () => {
    haptic(6);
    onClick();
  };

  const handleReset = () => {
    if (!onReset) return;
    haptic(10);
    const confirmed = window.confirm("Deseja recomeçar? Todo o progresso atual será apagado.");
    if (confirmed) onReset();
  };

  return (
    <div className="sticky top-2 z-20 mb-5 sm:mb-6 flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border bg-card/95 px-3 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <ChevronLeft size={16} />
        <span className="text-sm font-semibold">Voltar</span>
      </button>

      {onReset && (
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex min-h-[44px] items-center rounded-lg border border-border bg-background/80 px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          Recomeçar
        </button>
      )}
    </div>
  );
}