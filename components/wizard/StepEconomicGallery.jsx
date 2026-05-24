"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function labelFromFilename(filename) {
  // Strip extension, then strip leading "N-" prefix if present
  return filename.replace(/\.[^.]+$/, "").replace(/^\d+-/, "");
}

export default function StepEconomicGallery({
  data,
  onUpdate,
  onNext,
  onBack,
  stepLabel,
}) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/images?folder=models")
      .then((r) => r.json())
      .then(({ files }) => { setModels(files ?? []); setLoading(false); })
      .catch(() => { setModels([]); setLoading(false); });
  }, []);

  const handleSelect = (filename) => {
    onUpdate({ modelo_escolhido: filename });
  };

  return (
    <div className="pb-28 lg:pb-0">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-5 text-sm transition-colors min-h-[44px] -ml-1 pr-3"
      >
        <ChevronLeft size={15} /> Voltar
      </button>

      <p className="text-primary text-xs font-semibold tracking-widest mb-2 uppercase">
        Passo {stepLabel}
      </p>
      <h2 className="text-2xl font-bold mb-1">Escolha o <span className="text-primary">LOGO</span> desejado</h2>
      <p className="text-muted-foreground text-sm mb-5 sm:mb-8">
        Selecione o modelo que mais combina com você
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 sm:mb-8">
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
        ))}
        {!loading && models.length === 0 && (
          <p className="col-span-2 sm:col-span-3 text-center text-muted-foreground text-sm py-8">
            Nenhum modelo encontrado na pasta.
          </p>
        )}
        {!loading && models.map((filename) => {
          const isSelected = data.modelo_escolhido === filename;
          return (
            <motion.button
              key={filename}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(filename)}
              className={`
                relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-primary shadow-[0_0_16px_rgba(109,201,164,0.25)]"
                    : "border-border hover:border-primary/40"
                }
              `}
            >
              <img
                src={`/models/${filename}`}
                alt={labelFromFilename(filename)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-background/85 py-1.5 text-center text-xs font-medium tracking-wide">
                {labelFromFilename(filename)}
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

      <div className="fixed bottom-0 inset-x-0 z-50 px-4 pt-4 pb-safe sm:pb-4 bg-background/95 backdrop-blur-sm border-t border-border/50 lg:sticky lg:bottom-0 lg:-mx-4 lg:left-auto lg:right-auto lg:z-auto">
        <Button
          onClick={onNext}
          disabled={!data.modelo_escolhido}
          className="w-full py-6 text-base font-semibold"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
