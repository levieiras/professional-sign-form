"use client";

import { HexColorPicker } from "react-colorful";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HEX_REGEX = /^#[0-9A-Fa-f]{0,6}$/;

export default function StepColorPicker({
  data,
  onUpdate,
  onNext,
  onBack,
  title,
  field,
  stepLabel,
}) {
  const value = data[field] || "#6DC9A4";
  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(value);

  const handlePickerChange = (color) => {
    onUpdate({ [field]: color });
  };

  const handleHexInput = (e) => {
    const val = e.target.value;
    if (HEX_REGEX.test(val)) {
      onUpdate({ [field]: val });
    }
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
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-muted-foreground text-sm mb-5 sm:mb-8">
        Escolha a cor desejada. Nós utilizaremos o tom mais próximo possível da cor escolhida.
      </p>

      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-full max-w-xs">
          <p className="text-xs text-muted-foreground mb-2">Cores rápidas</p>
          <div className="flex flex-wrap gap-2 mb-1">
            {["#FFFFFF", "#1A1A1A", "#6DC9A4", "#D4AF37", "#F5F0E0", "#1E3A5F", "#8B4513", "#C0392B"].map((preset) => (
              <button
                key={preset}
                onClick={() => handlePickerChange(preset)}
                className="w-9 h-9 rounded-lg border-2 transition-all active:scale-90"
                style={{
                  background: preset,
                  borderColor: value === preset ? "#6DC9A4" : "rgba(255,255,255,0.15)",
                  boxShadow: value === preset ? "0 0 0 2px rgba(109,201,164,0.35)" : "none",
                }}
              />
            ))}
          </div>
        </div>

        <HexColorPicker
          color={isValidHex ? value : "#6DC9A4"}
          onChange={handlePickerChange}
          style={{ width: "100%", maxWidth: "min(320px, 100%)", height: "clamp(150px, 38vw, 210px)" }}
        />

        <div className="flex items-center gap-3 w-full max-w-xs">
          <div
            className="w-11 h-11 rounded-lg border border-border shrink-0 shadow-sm"
            style={{ background: isValidHex ? value : "#6DC9A4" }}
          />
          <div className="flex-1 space-y-1">
            <Label htmlFor={`color-${field}`} className="text-xs">
              Código HEX
            </Label>
            <Input
              id={`color-${field}`}
              value={value}
              onChange={handleHexInput}
              className="font-mono tracking-widest"
              maxLength={7}
              spellCheck={false}
            />
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
