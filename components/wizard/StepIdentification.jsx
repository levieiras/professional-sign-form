"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { identificationSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function maskWhatsApp(value) {
  const digits = value.replace(/\D/g, "");
  if (!digits.length) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export default function StepIdentification({ data, onUpdate, onNext }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(identificationSchema),
    defaultValues: {
      nome: data.nome || "",
      email: data.email || "",
      whatsapp: data.whatsapp || "",
    },
  });

  const nome = watch("nome");

  const onSubmit = (values) => {
    onUpdate(values);
    onNext();
  };

  return (
    <div className="pb-28 lg:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Monte sua Placa
          </h1>
          <p className="text-muted-foreground">
            Olá{" "}
            <span className="text-gold font-medium">{nome || "visitante"}</span>
            , preencha seus dados para começar.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nome */}
          <div className="space-y-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              {...register("nome")}
              placeholder="Seu nome"
              className="py-5"
              autoComplete="name"
            />
            {errors.nome && (
              <p className="text-destructive text-sm">{errors.nome.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="seu@email.com"
              className="py-5"
              autoComplete="email"
              inputMode="email"
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-1.5">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={watch("whatsapp")}
              onChange={(e) => {
                const masked = maskWhatsApp(e.target.value);
                setValue("whatsapp", masked, { shouldValidate: true });
              }}
              placeholder="(11) 99999-9999"
              className="py-5"
              maxLength={16}
              inputMode="tel"
              autoComplete="tel"
            />
            {errors.whatsapp && (
              <p className="text-destructive text-sm">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          <div className="fixed bottom-0 inset-x-0 z-50 px-4 pt-4 pb-safe sm:pb-4 bg-background/95 backdrop-blur-sm border-t border-border/50 lg:sticky lg:bottom-0 lg:-mx-4 lg:left-auto lg:right-auto lg:z-auto">
            <Button
              type="submit"
              className="w-full py-6 text-base font-semibold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Continuar
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
