"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="mr-2 shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "5547992786706";

const COLOR_NAMES = {
  "#FFFFFF": "Branco",
  "#F8F8F8": "Branco suave",
  "#1A1A1A": "Preto",
  "#000000": "Preto",
  "#6DC9A4": "Verde menta",
  "#D4AF37": "Dourado",
  "#F5F0E0": "Creme",
  "#1E3A5F": "Azul marinho",
  "#8B4513": "Marrom",
  "#C0392B": "Vermelho",
};

function colorLabel(hex) {
  if (!hex) return "-";
  const name = COLOR_NAMES[hex.toUpperCase()] ?? COLOR_NAMES[hex];
  return name || "-";
}

function LogoPreview({ data }) {
  const objColor = data.cor_objeto || "#6DC9A4";
  const baseColor = data.cor_principal || "#6DC9A4";
  const textBaseColor = data.cor_texto_base || "#F8F8F8";
  const textInnerColor =
    data.tipo_texto_interno === "negativo"
      ? "transparent"
      : data.cor_texto_interno || "#F8F8F8";
  const textBase = data.texto_base || "TEXTO";
  const textInner = data.texto_interno || "texto";
  const isNegativo = data.tipo_texto_interno === "negativo";

  return (
    <div className="w-full max-w-[200px] mx-auto">
      <svg viewBox="0 0 400 320" className="w-full h-auto drop-shadow-lg">
        {/* Objeto decorativo (losangos) */}
        <circle cx="200" cy="45" r="12" fill={objColor} opacity="0.9" />
        <circle cx="170" cy="30" r="8" fill={objColor} opacity="0.7" />
        <circle cx="230" cy="30" r="8" fill={objColor} opacity="0.7" />
        <circle cx="150" cy="55" r="6" fill={objColor} opacity="0.5" />
        <circle cx="250" cy="55" r="6" fill={objColor} opacity="0.5" />

        {/* Texto sobre a base */}
        <rect x="40" y="75" width="320" height="60" rx="8" fill={objColor} />
        <text
          x="200"
          y="113"
          textAnchor="middle"
          fill={textBaseColor}
          fontSize="26"
          fontWeight="bold"
          fontFamily="sans-serif"
          letterSpacing="2"
        >
          {textBase}
        </text>

        {/* Base inferior */}
        <rect x="60" y="150" width="280" height="100" rx="12" fill={baseColor} />

        {/* Texto dentro da base */}
        {isNegativo ? (
          <foreignObject x="80" y="170" width="240" height="60">
            <div
              style={{
                color: "transparent",
                fontSize: "22px",
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "sans-serif",
                letterSpacing: "1px",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundImage: `linear-gradient(180deg, ${baseColor} 0%, ${baseColor} 100%)`,
                color: "transparent",
                mixBlendMode: "difference",
                filter: "invert(1)",
              }}
            >
              {textInner}
            </div>
          </foreignObject>
        ) : (
          <text
            x="200"
            y="205"
            textAnchor="middle"
            fill={textInnerColor}
            fontSize="22"
            fontWeight="bold"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            {textInner}
          </text>
        )}

        {/* Detalhe decorativo */}
        <line x1="100" y1="280" x2="300" y2="280" stroke={objColor} strokeWidth="2" opacity="0.3" />
      </svg>
    </div>
  );
}

function buildSummaryMessage(data) {
  const tipo = data.tipo_logo === "economica" ? "Econômica" : "Customizada";

  const cleanModelo = data.modelo_escolhido
    ? data.modelo_escolhido.replace(/\.[^.]+$/, "").replace(/^\d+-/, "")
    : null;

  const tipoTextoLabel =
    data.tipo_texto_interno === "negativo"
      ? "Negativo (recortado na base)"
      : data.tipo_texto_interno === "positivo"
      ? "Positivo (com cor própria)"
      : null;

  const showCorTextoInterno =
    data.tipo_texto_interno !== "negativo" && data.cor_texto_interno;

  const lines = [
    `*Solicitação de Logo — Levieira's*`,
    ``,
    `*CLIENTE*`,
    `Nome: ${data.nome}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    ``,
    `*TIPO DE LOGO*`,
    `Tipo: ${tipo}`,
    data.tipo_logo === "economica" && cleanModelo
      ? `Modelo: ${cleanModelo}`
      : null,
    data.tipo_logo === "customizada"
      ? `Referência: (arquivo enviado por email)`
      : null,
    ``,
    `*CORES E TEXTOS*`,
    `Cor do logo: ${colorLabel(data.cor_objeto)}`,
    `Texto sobre a base: ${data.texto_base || "—"}`,
    `Cor do texto sobre a base: ${colorLabel(data.cor_texto_base)}`,
    `Texto dentro da base: ${data.texto_interno || "—"}`,
    tipoTextoLabel ? `Tipo do texto interno: ${tipoTextoLabel}` : null,
    showCorTextoInterno ? `Cor do texto interno: ${colorLabel(data.cor_texto_interno)}` : null,
    `Cor da base: ${colorLabel(data.cor_principal)}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return encodeURIComponent(lines);
}

export default function StepSuccess({ onReset, data }) {
  const confettiDone = useRef(false);

  useEffect(() => {
    if (confettiDone.current) return;
    confettiDone.current = true;

    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#6DC9A4", "#FFD200", "#4EA7F2", "#DE5E8B"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#6DC9A4", "#FFD200", "#4EA7F2", "#DE5E8B"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }, []);

  const summaryUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildSummaryMessage(data)}`;
  const contactUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Acabei de enviar uma solicitação de logo e tenho uma dúvida.")}`;

  return (
    <div className="py-8 sm:py-12 text-center">
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
      >
        <CheckCircle2
          className="mx-auto mb-4"
          size={64}
          style={{ color: "#6DC9A4" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex flex-col items-center"
      >
        <img
          src="/logo.png"
          alt="Levieira's"
          className="w-36 sm:w-48 mb-4 object-contain"
        />

        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Solicitação enviada!
        </h2>
        <p className="text-muted-foreground text-sm mb-5 max-w-xs mx-auto leading-relaxed">
          Obrigado pela preferência! 🙏 Recebemos o seu pedido e entraremos em
          contato em breve.
        </p>

        {/* Preview do logo */}
        <div className="w-full max-w-xs bg-card border border-border/60 rounded-2xl p-5 mb-6">
          <p className="text-xs text-muted-foreground mb-4 text-center font-medium tracking-wide uppercase">
            Preview do seu logo
          </p>
          <LogoPreview data={data} />
          <div className="mt-4 pt-3 border-t border-border/30 space-y-1 text-xs text-muted-foreground text-left">
            <div className="flex justify-between">
              <span>Tipo</span>
              <span className="font-medium text-foreground capitalize">
                {data.tipo_logo === "economica" ? "Econômica" : "Customizada"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Texto</span>
              <span className="font-medium text-foreground truncate ml-2">
                {data.texto_base || "—"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <a
            href={summaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#18a84f] text-white font-bold text-base py-5 px-6 transition-colors"
          >
            <WhatsAppIcon size={28} />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-base font-bold">Enviar resumo pelo WhatsApp</span>
              <span className="text-xs font-normal opacity-85">Toque para abrir a conversa</span>
            </span>
          </a>

          <a
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full rounded-xl border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 active:bg-[#25D366]/20 font-semibold text-sm py-4 px-6 transition-colors"
          >
            <WhatsAppIcon size={20} />
            Falar diretamente conosco
          </a>
        </div>

        <button
          onClick={onReset}
          className="mt-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          <RotateCcw size={13} />
          Nova solicitação
        </button>
      </motion.div>
    </div>
  );
}
