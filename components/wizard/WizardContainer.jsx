"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, BookOpen, X } from "lucide-react";
import { saveWizardData, loadWizardData, clearWizardData } from "@/lib/storage";
import { Progress } from "@/components/ui/progress";
import StepIdentification from "./StepIdentification";
import StepLogoType from "./StepLogoType";
import StepEconomicGallery from "./StepEconomicGallery";
import StepCustomUpload from "./StepCustomUpload";
import StepColorPicker from "./StepColorPicker";
import StepTextInput from "./StepTextInput";
import StepSummary from "./StepSummary";
import StepSuccess from "./StepSuccess";

const INITIAL_DATA = {
  nome: "",
  email: "",
  whatsapp: "",
  tipo_logo: null,
  modelo_escolhido: null,
  imagem_logo: null,
  cor_objeto: "#6DC9A4",
  cor_principal: "#6DC9A4",
  texto_base: "",
  cor_texto_base: "#F8F8F8",
  texto_interno: "",
  cor_texto_interno: "#F8F8F8",
  tipo_texto_interno: null,
  imagem_referencia: null,
};

// 8 steps inside the wizard (indices 0–7)
// Steps 0–1 = display "1/7" (logo type + selection sub-step)
// Steps 2–7 = display "2/7" through "7/7"
const TOTAL_VISIBLE_STEPS = 7;

const slideVariants = {
  enter: (dir) => ({ opacity: 0, y: dir > 0 ? 14 : -14 }),
  center: { opacity: 1, y: 0 },
  exit: (dir) => ({ opacity: 0, y: dir > 0 ? -14 : 14 }),
};

export default function WizardContainer() {
  const searchParams = useSearchParams();
  const clienteParam = searchParams.get("cliente") || "";

  const [phase, setPhase] = useState("identification");
  const [wizardStep, setWizardStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState({ ...INITIAL_DATA, nome: clienteParam });
  const [uploadFile, setUploadFile] = useState(null);
  const [ready, setReady] = useState(false);
  const [mobileRefFull, setMobileRefFull] = useState(false);

  // Restore session from localStorage
  useEffect(() => {
    const saved = loadWizardData();
    if (saved) {
      setData({
        ...INITIAL_DATA,
        ...saved,
        nome: saved.nome || clienteParam,
      });
      if (saved._phase) setPhase(saved._phase);
      if (saved._wizardStep !== undefined) setWizardStep(saved._wizardStep);
    } else if (clienteParam) {
      setData((prev) => ({ ...prev, nome: clienteParam }));
    }
    setReady(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist on every change
  useEffect(() => {
    if (!ready) return;
    saveWizardData({ ...data, _phase: phase, _wizardStep: wizardStep });
  }, [data, phase, wizardStep, ready]);

  const updateData = useCallback((updates) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (phase === "identification") {
      setPhase("wizard");
      setWizardStep(0);
    } else if (phase === "wizard") {
      if (wizardStep === 5 && data.tipo_texto_interno === "negativo") {
        setWizardStep(7);
      } else if (wizardStep < 7) {
        setWizardStep(wizardStep + 1);
      } else {
        setPhase("summary");
      }
    }
  }, [phase, wizardStep, data.tipo_texto_interno]);

  const goBack = useCallback(() => {
    setDirection(-1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (phase === "wizard" && wizardStep === 0) {
      setPhase("identification");
    } else if (phase === "wizard") {
      if (wizardStep === 7 && data.tipo_texto_interno === "negativo") {
        setWizardStep(5);
      } else {
        setWizardStep((s) => s - 1);
      }
    } else if (phase === "summary") {
      setPhase("wizard");
      setWizardStep(7);
    }
  }, [phase, wizardStep, data.tipo_texto_interno]);

  const handleSuccess = useCallback(() => {
    clearWizardData();
    setData({ ...INITIAL_DATA, nome: clienteParam });
    setUploadFile(null);
    setPhase("identification");
    setWizardStep(0);
  }, [clienteParam]);

  // Reference image per step (mobile guide)
  const STEP_REFERENCE_IMAGES = {
    "wizard-0": "/Logo-Reference.png",
    "wizard-1": "/Logo-Reference.png",
    "wizard-2": "/Logo-Reference.png",
    "wizard-3": "/TextUp-Reference.png",
    "wizard-4": "/TextUp-Reference.png",
    "wizard-5": "/TextDown-Reference.png",
    "wizard-6": "/TextDown-Reference.png",
    "wizard-7": "/TextDown-Reference.png",
  };
  const referenceImage =
    STEP_REFERENCE_IMAGES[`${phase}-${wizardStep}`] ?? "/Reference-Image.png";

  // Visual step number for display (1–7)
  const visibleStep = wizardStep <= 1 ? 1 : wizardStep;
  const progressValue =
    phase === "identification"
      ? 0
      : phase === "success"
      ? 100
      : (visibleStep / TOTAL_VISIBLE_STEPS) * 100;

  const showPreview =
    phase === "wizard";
  const showProgress =
    phase !== "identification" && phase !== "success";

  const stepKey = `${phase}-${wizardStep}`;

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <header className="border-b border-border/50 px-4 py-2 sm:py-4">
        <div className="max-w-6xl mx-auto relative flex items-center justify-center">
          <img src="/logo.png" alt="Levieira's" className="h-10 sm:h-16 w-auto" />
          {showProgress && (
            <span className="absolute right-0 text-muted-foreground text-sm tabular-nums">
              {phase === "summary"
                ? "Resumo"
                : `Passo ${visibleStep}/${TOTAL_VISIBLE_STEPS}`}
            </span>
          )}
        </div>
      </header>

      {/* ── Progress bar ── */}
      {showProgress && (
        <div className="px-4 border-b border-border/20">
          <div className="max-w-6xl mx-auto">
            <Progress
              value={progressValue}
              className="h-[3px] rounded-none bg-muted"
            />
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={
            showPreview
              ? "flex gap-10 items-start"
              : "flex justify-center"
          }
        >
          {/* Main panel */}
          <div
            className={
              showPreview
                ? "flex-1 min-w-0 py-4 sm:py-8"
                : "w-full max-w-md py-6 sm:py-12"
            }
          >
            {/* Mobile guide — always visible compact strip */}
            {showPreview && (
              <div className="lg:hidden mb-5">
                <div className="relative rounded-xl overflow-hidden border border-border/60">
                  <p className="text-xs text-muted-foreground px-3 py-2 border-b border-border/40 flex items-center gap-1.5">
                    <BookOpen size={12} className="text-primary" />
                    Guia visual — partes do logo
                  </p>
                  <img
                    src={referenceImage}
                    alt="Guia das partes do logo"
                    className="w-1/2 mx-auto block py-1"
                  />
                  <button
                    onClick={() => setMobileRefFull(true)}
                    className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm text-xs text-foreground px-2.5 py-1.5 rounded-lg border border-border/60 active:opacity-70"
                  >
                    <Maximize2 size={11} />
                    ver completo
                  </button>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={stepKey}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                {phase === "identification" && (
                  <StepIdentification
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                  />
                )}

                {phase === "wizard" && wizardStep === 0 && (
                  <StepLogoType
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    stepLabel={`${visibleStep}/${TOTAL_VISIBLE_STEPS}`}
                  />
                )}

                {phase === "wizard" &&
                  wizardStep === 1 &&
                  data.tipo_logo === "economica" && (
                    <StepEconomicGallery
                      data={data}
                      onUpdate={updateData}
                      onNext={goNext}
                      onBack={goBack}
                      stepLabel={`${visibleStep}/${TOTAL_VISIBLE_STEPS}`}
                    />
                  )}

                {phase === "wizard" &&
                  wizardStep === 1 &&
                  data.tipo_logo === "customizada" && (
                    <StepCustomUpload
                      data={data}
                      onUpdate={updateData}
                      onNext={goNext}
                      onBack={goBack}
                      uploadFile={uploadFile}
                      setUploadFile={setUploadFile}
                      stepLabel={`${visibleStep}/${TOTAL_VISIBLE_STEPS}`}
                    />
                  )}

                {phase === "wizard" && wizardStep === 2 && (
                  <StepColorPicker
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title={<>Escolha a <span className="text-primary">COR</span> do logo</>}
                    field="cor_objeto"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                    previewImage={data.modelo_escolhido ? `/models/${data.modelo_escolhido}` : undefined}
                  />
                )}

                {phase === "wizard" && wizardStep === 3 && (
                  <StepTextInput
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title={<><span className="text-primary">TEXTO</span> sobre a base</>}
                    field="texto_base"
                    placeholder="Ex: Levieira's"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                    description="Este é o texto que fica sobre a base"
                  />
                )}

                {phase === "wizard" && wizardStep === 4 && (
                  <StepColorPicker
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title={<><span className="text-primary">COR</span> do texto sobre a base</>}
                    field="cor_texto_base"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                  />
                )}

                {phase === "wizard" && wizardStep === 5 && (
                  <StepTextInput
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title={<><span className="text-primary">TEXTO</span> dentro da base</>}
                    field="texto_interno"
                    placeholder="Ex: Personalizados"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                    description="Este é o texto dentro da base, pode ser negativo ou positivo."
                    tipoField="tipo_texto_interno"
                  />
                )}

                {phase === "wizard" && wizardStep === 6 && (
                  <StepColorPicker
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title={<><span className="text-primary">COR</span> do texto dentro da base</>}
                    field="cor_texto_interno"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                  />
                )}

                {phase === "wizard" && wizardStep === 7 && (
                  <StepColorPicker
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title={<><span className="text-primary">COR</span> da base</>}
                    field="cor_principal"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                  />
                )}

                {phase === "summary" && (
                  <StepSummary
                    data={data}
                    uploadFile={uploadFile}
                    onBack={goBack}
                    onSuccess={() => setPhase("success")}
                  />
                )}

                {phase === "success" && (
                  <StepSuccess onReset={handleSuccess} data={data} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Guide sidebar (desktop) ── */}
          {showPreview && (
            <aside className="hidden lg:block w-72 shrink-0 py-8">
              <div className="sticky top-8">
                <div className="rounded-xl overflow-hidden border border-border/60">
                  <p className="text-xs text-muted-foreground px-3 py-2 border-b border-border/40 flex items-center gap-1.5">
                    <BookOpen size={12} />
                    Guia visual — partes do logo
                  </p>
                  <img
                    src={referenceImage}
                    alt="Guia das partes do logo"
                    className="w-full"
                  />
                </div>
              </div>
            </aside>
          )}
        </div>

      </div>

      {/* Fullscreen guide overlay (mobile) */}
      {mobileRefFull && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
            <span className="text-sm font-medium flex items-center gap-2">
              <BookOpen size={14} className="text-primary" />
              Guia visual — partes do logo
            </span>
            <button
              onClick={() => setMobileRefFull(false)}
              className="text-muted-foreground hover:text-foreground p-1 active:opacity-70"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <img
              src={referenceImage}
              alt="Guia das partes do logo"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
