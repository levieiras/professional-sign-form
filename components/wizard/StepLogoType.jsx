"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import BackButton from "./BackButton";
import { useHaptic } from "@/lib/hooks/useHaptic";

const TYPES = [
  {
    id: "economica",
    label: "ECONÔMICA",
    description: "Escolha um modelo pronto da nossa galeria",
    icon: "◆",
  },
  {
    id: "customizada",
    label: "CUSTOMIZADA",
    description: "Envie uma referência para criação exclusiva",
    icon: "✦",
  },
];

export default function StepLogoType({
  data,
  onUpdate,
  onNext,
  onBack,
  onReset,
  stepLabel,
}) {
  const { trigger: haptic } = useHaptic();

  const handleSelect = (tipo) => {
    haptic(10);
    onUpdate({ tipo_logo: tipo });
    onNext();
  };

  return (
    <div>
      <BackButton onClick={onBack} onReset={onReset} />

      <p className="text-primary text-xs font-semibold tracking-widest mb-2 uppercase">
        Passo {stepLabel}
      </p>
      <h2 className="text-2xl font-bold mb-1">Qual <span className="text-primary">TIPO</span> de logo deseja?</h2>
      <p className="text-muted-foreground text-sm mb-5 sm:mb-8">
        Selecione uma opção para continuar
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {TYPES.map((type) => {
          const isSelected = data.tipo_logo === type.id;
          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(type.id)}
              className={`
                relative p-5 sm:p-8 rounded-xl border-2 text-left transition-all duration-200
                ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/40 bg-card"
                }
              `}
            >
              <div className="text-2xl mb-3 text-primary">{type.icon}</div>
              <div className="font-bold text-base tracking-wider mb-1.5">
                {type.label}
              </div>
              <div className="text-muted-foreground text-sm mb-4">
                {type.description}
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold tracking-wide transition-colors ${
                isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              }`}>
                <ChevronRight size={13} />
                Selecionar
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-[10px] font-bold">
                    ✓
                  </span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
