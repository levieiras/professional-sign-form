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
  const value = data[field] || "#D4AF37";
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
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Escolha no seletor ou insira o código HEX
      </p>

      <div className="flex flex-col items-center gap-6">
        <HexColorPicker
          color={isValidHex ? value : "#D4AF37"}
          onChange={handlePickerChange}
          style={{ width: "100%", maxWidth: 320, height: 220 }}
        />

        <div className="flex items-center gap-3 w-full max-w-xs">
          <div
            className="w-11 h-11 rounded-lg border border-border shrink-0 shadow-sm"
            style={{ background: isValidHex ? value : "#D4AF37" }}
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

      <Button
        onClick={onNext}
        disabled={!isValidHex}
        className="w-full mt-8 py-6 text-base font-semibold"
      >
        Continuar
      </Button>
    </div>
  );
}
