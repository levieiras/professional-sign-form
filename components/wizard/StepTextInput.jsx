"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TIPO_OPTIONS = [
  {
    value: "negativo",
    label: "Negativo",
    desc: "Texto recortado na base, sem cor própria",
  },
  {
    value: "positivo",
    label: "Positivo",
    desc: "Texto com cor — você escolherá no próximo passo",
  },
];

export default function StepTextInput({
  data,
  onUpdate,
  onNext,
  onBack,
  title,
  field,
  placeholder,
  stepLabel,
  description,
  tipoField,
}) {
  const schema = z.object({
    [field]: z.string().min(1, "Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { [field]: data[field] || "" },
  });

  const tipo = tipoField ? data[tipoField] : null;
  const canSubmit = !tipoField || tipo !== null;

  const handleChange = (e) => {
    onUpdate({ [field]: e.target.value });
  };

  const handleTipo = (value) => {
    onUpdate({ [tipoField]: value });
  };

  const onSubmit = (values) => {
    onUpdate(values);
    onNext();
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
        {description ?? "Este é o texto que fica sobre a base"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor={field}>{title}</Label>
          <Input
            id={field}
            {...register(field, { onChange: handleChange })}
            placeholder={placeholder}
            className="py-6 text-base tracking-wide"
            autoFocus
          />
          {errors[field] && (
            <p className="text-destructive text-sm">{errors[field].message}</p>
          )}
        </div>

        {tipoField && (
          <div className="space-y-2">
            <Label>Tipo do texto</Label>
            <div className="grid grid-cols-2 gap-3">
              {TIPO_OPTIONS.map((opt) => {
                const selected = tipo === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleTipo(opt.value)}
                    className={`relative flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                      selected
                        ? "border-primary bg-primary/5 shadow-[0_0_12px_rgba(109,201,164,0.2)]"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    {selected && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check size={11} className="text-primary-foreground" />
                      </span>
                    )}
                    <span className="font-semibold text-sm">{opt.label}</span>
                    <span className="text-xs text-muted-foreground leading-snug">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 inset-x-0 z-50 px-4 pt-4 pb-safe sm:pb-4 bg-background/95 backdrop-blur-sm border-t border-border/50 lg:sticky lg:bottom-0 lg:-mx-4 lg:left-auto lg:right-auto lg:z-auto">
          <Button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-6 text-base font-semibold"
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}

