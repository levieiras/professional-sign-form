"use client";

import { motion } from "framer-motion";
import { Check, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const MODELS = [1, 2, 3, 4, 5, 6];

export default function StepEconomicGallery({
  data,
  onUpdate,
  onNext,
  onBack,
  stepLabel,
}) {
  const handleSelect = (num) => {
    onUpdate({ modelo_escolhido: num });
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6 text-sm transition-colors"
      >
        <ChevronLeft size={15} /> Voltar
      </button>

      <p className="text-primary text-xs font-semibold tracking-widest mb-2 uppercase">
        Passo {stepLabel}
      </p>
      <h2 className="text-2xl font-bold mb-1">Escolha um modelo</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Selecione o modelo que mais combina com você
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {MODELS.map((num) => {
          const isSelected = data.modelo_escolhido === num;
          return (
            <motion.button
              key={num}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(num)}
              className={`
                relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-primary shadow-[0_0_16px_rgba(212,175,55,0.25)]"
                    : "border-border hover:border-primary/40"
                }
              `}
            >
              <img
                src={`https://placehold.co/400x400/141414/D4AF37?text=Modelo+${num}`}
                alt={`Modelo ${num}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-background/85 py-1.5 text-center text-xs font-medium tracking-wide">
                Modelo {num}
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Check size={16} className="text-primary-foreground" />
                  </div>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <Button
        onClick={onNext}
        disabled={!data.modelo_escolhido}
        className="w-full py-6 text-base font-semibold"
      >
        Continuar
      </Button>
    </div>
  );
}
