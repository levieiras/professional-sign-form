"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StepTextInput({
  data,
  onUpdate,
  onNext,
  onBack,
  title,
  field,
  placeholder,
  stepLabel,
}) {
  const schema = z.object({
    [field]: z.string().min(1, "Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { [field]: data[field] || "" },
  });

  // Sync to parent on every keystroke for live preview
  const handleChange = (e) => {
    onUpdate({ [field]: e.target.value });
  };

  const onSubmit = (values) => {
    onUpdate(values);
    onNext();
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6 text-sm transition-colors py-2"
      >
        <ChevronLeft size={15} /> Voltar
      </button>

      <p className="text-primary text-xs font-semibold tracking-widest mb-2 uppercase">
        Passo {stepLabel}
      </p>
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-muted-foreground text-sm mb-5 sm:mb-8">
        Este texto aparecerá na sua logo
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor={field}>{title}</Label>
          <Input
            id={field}
            {...register(field, {
              onChange: handleChange,
            })}
            placeholder={placeholder}
            className="py-6 text-base tracking-wide"
            autoFocus
          />
          {errors[field] && (
            <p className="text-destructive text-sm">{errors[field].message}</p>
          )}
        </div>

        <div className="sticky bottom-0 -mx-4 px-4 pt-4 pb-6 sm:pb-4 bg-background/95 backdrop-blur-sm border-t border-border/50 mt-4">
          <Button type="submit" className="w-full py-6 text-base font-semibold">
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
