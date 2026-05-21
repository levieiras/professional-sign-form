"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StepSuccess({ onReset }) {
  return (
    <div className="py-16 text-center">
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
      >
        <CheckCircle2
          className="mx-auto mb-6"
          size={72}
          style={{ color: "#D4AF37" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-3xl font-bold mb-3">Solicitação enviada!</h2>
        <p className="text-muted-foreground mb-10 max-w-sm mx-auto leading-relaxed">
          Recebemos o seu pedido. Entraremos em contato em breve via email ou
          WhatsApp.
        </p>

        <Button
          onClick={onReset}
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 px-8"
        >
          Nova solicitação
        </Button>
      </motion.div>
    </div>
  );
}
