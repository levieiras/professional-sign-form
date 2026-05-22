"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, ImageIcon, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MAX_SIZE = 4 * 1024 * 1024; // 4 MB (Vercel free tier limit)
const ACCEPT_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function StepCustomUpload({
  data,
  onUpdate,
  onNext,
  onBack,
  uploadFile,
  setUploadFile,
  stepLabel,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFile = (file) => {
    if (!ACCEPT_TYPES.includes(file.type)) {
      toast.error("Formato inválido. Use JPG, PNG ou WebP.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Arquivo muito grande. Máximo 4 MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setUploadFile(file);
    onUpdate({ imagem_referencia: file.name });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const removeFile = () => {
    setPreview(null);
    setUploadFile(null);
    onUpdate({ imagem_referencia: null });
  };

  const hasFile = uploadFile || data.imagem_referencia;

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
      <h2 className="text-2xl font-bold mb-1">Envie uma referência</h2>
      <p className="text-muted-foreground text-sm mb-5 sm:mb-8">
        Envie uma foto de referência — qualquer imagem que inspire o seu logo
      </p>

      {!preview && !data.imagem_referencia ? (
        <motion.div
          animate={{ borderColor: isDragging ? "#6DC9A4" : "rgba(255,255,255,0.08)" }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-8 sm:p-14 text-center cursor-pointer transition-colors hover:border-primary/50 bg-card active:bg-card/70"
        >
          <Upload className="mx-auto mb-4 text-muted-foreground" size={36} />
          <p className="font-medium mb-1">
            <span className="sm:hidden">Toque para selecionar</span>
            <span className="hidden sm:inline">Arraste ou clique para enviar</span>
          </p>
          <p className="text-muted-foreground text-sm">JPG, PNG, WebP · máx. 4 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </motion.div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-border bg-card">
          {preview ? (
            <img
              src={preview}
              alt="Referência"
              className="w-full max-h-56 object-contain"
            />
          ) : (
            <div className="w-full h-32 flex items-center justify-center bg-muted">
              <ImageIcon size={32} className="text-muted-foreground" />
            </div>
          )}
          <button
            onClick={removeFile}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors border border-border"
          >
            <X size={14} />
          </button>
          <div className="p-3 flex items-center gap-2 border-t border-border">
            <ImageIcon size={14} className="text-primary shrink-0" />
            <span className="text-sm text-muted-foreground truncate">
              {uploadFile?.name || data.imagem_referencia}
            </span>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 inset-x-0 z-50 px-4 pt-4 pb-safe sm:pb-4 bg-background/95 backdrop-blur-sm border-t border-border/50 lg:sticky lg:bottom-0 lg:-mx-4 lg:left-auto lg:right-auto lg:z-auto">
        <Button
          onClick={onNext}
          disabled={!hasFile}
          className="w-full py-6 text-base font-semibold"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
