"use client";

import { useState } from "react";
import { ChevronLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const TIPO_LABEL = { economica: "Econômica", customizada: "Customizada" };

function ColorSwatch({ color }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block w-4 h-4 rounded border border-border"
        style={{ background: color }}
      />
      <code className="font-mono text-xs">{color}</code>
    </span>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2.5 gap-0.5 sm:gap-4 text-sm">
      <span className="text-muted-foreground text-xs sm:text-sm shrink-0">{label}</span>
      <span className="font-medium sm:text-right break-all">{children}</span>
    </div>
  );
}

export default function StepSummary({ data, uploadFile, onBack, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      const fieldsToSend = [
        "nome", "email", "whatsapp", "tipo_logo",
        "modelo_escolhido", "imagem_referencia",
        "cor_objeto", "cor_principal", "texto_base", "cor_texto_base",
        "texto_interno", "cor_texto_interno",
      ];

      fieldsToSend.forEach((key) => {
        const val = data[key];
        if (val !== null && val !== undefined) {
          formData.append(key, String(val));
        }
      });

      if (uploadFile) {
        formData.append("upload", uploadFile);
      }

      const res = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro desconhecido");

      toast.success("Solicitação enviada com sucesso!");
      onSuccess();
    } catch (err) {
      toast.error(`Erro ao enviar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-5 text-sm transition-colors min-h-[44px] -ml-1 pr-3"
      >
        <ChevronLeft size={15} /> Voltar
      </button>

      <h2 className="text-2xl font-bold mb-1">Resumo da solicitação</h2>
      <p className="text-muted-foreground text-sm mb-5 sm:mb-6">
        Confira tudo antes de enviar
      </p>

      <div className="bg-card rounded-xl border border-border px-5 mb-6 divide-y divide-border/60">
        <Row label="Nome">{data.nome}</Row>
        <Row label="Email">{data.email}</Row>
        <Row label="WhatsApp">{data.whatsapp}</Row>
        <Separator className="my-0 opacity-0" />
        <Row label="Tipo de logo">{TIPO_LABEL[data.tipo_logo]}</Row>

        {data.tipo_logo === "economica" && (
          <Row label="Modelo escolhido">Modelo {data.modelo_escolhido}</Row>
        )}
        {data.tipo_logo === "customizada" && (
          <Row label="Referência">
            {uploadFile?.name || data.imagem_referencia || "—"}
          </Row>
        )}

        <Row label="Cor do objeto">
          <ColorSwatch color={data.cor_objeto} />
        </Row>
        <Row label="Texto da base">{data.texto_base}</Row>
        <Row label="Cor do texto da base">
          <ColorSwatch color={data.cor_texto_base} />
        </Row>
        <Row label="Texto dentro da base">{data.texto_interno}</Row>
        <Row label="Cor do texto dentro da base">
          <ColorSwatch color={data.cor_texto_interno} />
        </Row>
        <Row label="Cor da base">
          <ColorSwatch color={data.cor_principal} />
        </Row>
      </div>

      <div className="sticky bottom-0 -mx-4 px-4 pt-4 pb-safe sm:pb-4 bg-background/95 backdrop-blur-sm border-t border-border/50">
        <Button
          onClick={handleSend}
          disabled={loading}
          className="w-full py-6 text-base font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2" size={18} />
              ENVIAR SOLICITAÇÃO
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
