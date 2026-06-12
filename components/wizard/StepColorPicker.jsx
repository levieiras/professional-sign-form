"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "./BackButton";

const PRESET_COLORS = [
  // Neutros
  "#FFFFFF", "#D9D9D9", "#B4B4B4", "#737373", "#1A1A1A", "#0E1114",
  // Marrons e terrosos
  "#A56A45", "#8A4B2D", "#B77452", "#6C3929", "#5A2F22",
  // Claros e rosados
  "#F2E9B6", "#F3DDB1", "#F6C9B8", "#F2AFAF", "#DE5E8B", "#EF4D90",
  // Roxos e azuis
  "#D7C1F2", "#A990D6", "#5E2A86", "#2A2F8F", "#163FB7", "#2E79D1", "#4EA7F2",
  // Verdes e ciano
  "#2C6A4E", "#1D8A77", "#4EAD9F", "#56C5A5", "#83D47A", "#B8F442", "#06B6D4",
  // Quentes fortes
  "#FFD200", "#FFAA00", "#FF6A00", "#DC2626", "#FF4D4D", "#E43B2F", "#B31919", "#7B1E1E", "#D4AF37",
];

const QUICK_COLORS = [
  "#F2AFAF", "#DC2626", "#FFFFFF", "#1A1A1A", "#D7C1F2", "#2E79D1",
  "#D9D9D9", "#A56A45", "#F2E9B6", "#6DC9A4", "#83D47A", "#FFD200",
];

const COLOR_NAMES = {
  "#FFFFFF": "Branco",
  "#D9D9D9": "Prata",
  "#B4B4B4": "Cinza",
  "#737373": "Grafite",
  "#1A1A1A": "Preto",
  "#0E1114": "Preto carbono",
  "#A56A45": "Marrom caramelo",
  "#8A4B2D": "Marrom tabaco",
  "#B77452": "Terracota",
  "#6C3929": "Marrom café",
  "#5A2F22": "Chocolate",
  "#F2E9B6": "Baunilha",
  "#F3DDB1": "Areia clara",
  "#F6C9B8": "Pêssego",
  "#F2AFAF": "Rosa claro",
  "#DC2626": "Vermelho",
  "#FF4D4D": "Vermelho claro",
  "#DE5E8B": "Rosa escuro",
  "#EF4D90": "Magenta",
  "#D7C1F2": "Lilás",
  "#A990D6": "Lavanda",
  "#5E2A86": "Roxo",
  "#2A2F8F": "Índigo",
  "#163FB7": "Azul royal",
  "#2E79D1": "Azul médio",
  "#4EA7F2": "Azul claro",
  "#2C6A4E": "Verde floresta",
  "#1D8A77": "Verde petróleo",
  "#4EAD9F": "Verde água",
  "#6DC9A4": "Verde menta",
  "#56C5A5": "Menta intensa",
  "#83D47A": "Verde limão suave",
  "#B8F442": "Verde limão",
  "#06B6D4": "Ciano",
  "#FFD200": "Amarelo vivo",
  "#FFAA00": "Âmbar",
  "#FF6A00": "Laranja",
  "#E43B2F": "Vermelho vivo",
  "#B31919": "Vermelho escuro",
  "#7B1E1E": "Vinho",
  "#D4AF37": "Dourado",
};

export default function StepColorPicker({
  data,
  onUpdate,
  onNext,
  onBack,
  onReset,
  title,
  field,
  stepLabel,
  previewImage,
}) {
  const [showAllColors, setShowAllColors] = useState(false);
  const value = data[field] || "#6DC9A4";
  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(value);
  const selectedColor = isValidHex ? value.toUpperCase() : "#6DC9A4";
  const quickPalette = QUICK_COLORS.includes(selectedColor)
    ? QUICK_COLORS
    : [...QUICK_COLORS.slice(0, QUICK_COLORS.length - 1), selectedColor];
  const extendedPalette = PRESET_COLORS.filter((color) => !quickPalette.includes(color));

  const handleColorPick = (color) => {
    onUpdate({ [field]: color });
  };

  return (
    <div className="pb-28 lg:pb-0">
      <BackButton onClick={onBack} onReset={onReset} />

      <p className="text-primary text-xs font-semibold tracking-widest mb-2 uppercase">
        Passo {stepLabel}
      </p>
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-muted-foreground text-sm mb-5 sm:mb-8">
        Escolha a cor desejada. Nós utilizaremos o tom mais próximo possível da cor escolhida.
      </p>

      {previewImage && (
        <div className="flex items-center gap-3 mb-5 sm:mb-8 -mt-2">
          <img
            src={previewImage}
            alt="Modelo selecionado"
            className="w-14 h-14 rounded-lg object-cover border border-border/60 shrink-0"
          />
          <p className="text-xs text-muted-foreground leading-snug">
            Este é o modelo que você escolheu.
            <br />Escolha a cor que ele terá.
          </p>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-full max-w-sm">
          <p className="text-xs text-muted-foreground mb-2">
            Cores mais escolhidas
          </p>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mb-3">
            {quickPalette.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleColorPick(preset)}
                aria-label={`Selecionar ${COLOR_NAMES[preset] ?? preset}`}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg border-2 transition-all active:scale-90"
                style={{
                  background: preset,
                  borderColor:
                    selectedColor === preset ? "#6DC9A4" : "rgba(255,255,255,0.15)",
                  boxShadow:
                    selectedColor === preset
                      ? "0 0 0 2px rgba(109,201,164,0.35)"
                      : "none",
                }}
              />
            ))}
          </div>

          {!!extendedPalette.length && (
            <div className="mb-2">
              <button
                type="button"
                onClick={() => setShowAllColors((prev) => !prev)}
                className="text-xs font-medium text-primary underline underline-offset-4"
              >
                {showAllColors ? "Mostrar menos" : "Mostrar mais cores"}
              </button>
            </div>
          )}

          {showAllColors && (
            <>
              <p className="text-xs text-muted-foreground mb-2">Mais opções</p>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mb-1">
                {extendedPalette.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleColorPick(preset)}
                    aria-label={`Selecionar ${COLOR_NAMES[preset] ?? preset}`}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg border-2 transition-all active:scale-90"
                    style={{
                      background: preset,
                      borderColor:
                        selectedColor === preset ? "#6DC9A4" : "rgba(255,255,255,0.15)",
                      boxShadow:
                        selectedColor === preset
                          ? "0 0 0 2px rgba(109,201,164,0.35)"
                          : "none",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 w-full max-w-sm">
          <div
            className="w-11 h-11 rounded-lg border border-border shrink-0 shadow-sm"
            style={{ background: selectedColor }}
          />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Cor selecionada</p>
            <p className="text-sm font-semibold text-primary">
              {COLOR_NAMES[selectedColor] ?? "Cor personalizada"}
            </p>
            <p className="text-xs font-mono tracking-wide text-muted-foreground">
              {selectedColor}
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-50 px-4 pt-4 pb-safe sm:pb-4 bg-background/95 backdrop-blur-sm border-t border-border/50 lg:sticky lg:bottom-0 lg:-mx-4 lg:left-auto lg:right-auto lg:z-auto">
        <Button
          onClick={onNext}
          disabled={!isValidHex}
          className="w-full py-6 text-base font-semibold"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
