"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { saveWizardData, loadWizardData, clearWizardData } from "@/lib/storage";
import { Progress } from "@/components/ui/progress";
import StepIdentification from "./StepIdentification";
import StepLogoType from "./StepLogoType";
import StepEconomicGallery from "./StepEconomicGallery";
import StepCustomUpload from "./StepCustomUpload";
import StepMainImage from "./StepMainImage";
import StepColorPicker from "./StepColorPicker";
import StepTextInput from "./StepTextInput";
import StepSummary from "./StepSummary";
import StepSuccess from "./StepSuccess";
import LogoPreview from "@/components/LogoPreview";

const INITIAL_DATA = {
  nome: "",
  email: "",
  whatsapp: "",
  tipo_logo: null,
  modelo_escolhido: null,
  imagem_logo: null,
  cor_principal: "#D4AF37",
  texto_base: "",
  cor_texto_base: "#F8F8F8",
  texto_interno: "",
  cor_texto_interno: "#F8F8F8",
  imagem_referencia: null,
};

// 8 steps inside the wizard (indices 0–7)
// Steps 0–1 = display "1/7" (logo type + selection sub-step)
// Steps 2–7 = display "2/7" through "7/7"
const TOTAL_VISIBLE_STEPS = 7;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
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
    if (phase === "identification") {
      setPhase("wizard");
      setWizardStep(0);
    } else if (phase === "wizard") {
      if (wizardStep < 7) {
        setWizardStep(wizardStep + 1);
      } else {
        setPhase("summary");
      }
    }
  }, [phase, wizardStep]);

  const goBack = useCallback(() => {
    setDirection(-1);
    if (phase === "wizard" && wizardStep === 0) {
      setPhase("identification");
    } else if (phase === "wizard") {
      setWizardStep((s) => s - 1);
    } else if (phase === "summary") {
      setPhase("wizard");
      setWizardStep(7);
    }
  }, [phase, wizardStep]);

  const handleSuccess = useCallback(() => {
    clearWizardData();
    setData({ ...INITIAL_DATA, nome: clienteParam });
    setUploadFile(null);
    setPhase("identification");
    setWizardStep(0);
  }, [clienteParam]);

  // Visual step number for display (1–7)
  const visibleStep = wizardStep <= 1 ? 1 : wizardStep;
  const progressValue =
    phase === "identification"
      ? 0
      : phase === "success"
      ? 100
      : (visibleStep / TOTAL_VISIBLE_STEPS) * 100;

  const showPreview =
    phase === "wizard" || phase === "summary";
  const showProgress =
    phase !== "identification" && phase !== "success";

  const stepKey = `${phase}-${wizardStep}`;

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <header className="border-b border-border/50 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-gold font-bold text-xl tracking-[0.3em]">
            LE ART
          </span>
          {showProgress && (
            <span className="text-muted-foreground text-sm tabular-nums">
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
              className="h-[2px] rounded-none bg-muted"
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
                ? "flex-1 min-w-0 py-8"
                : "w-full max-w-md py-12"
            }
          >
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
                  <StepMainImage
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                  />
                )}

                {phase === "wizard" && wizardStep === 3 && (
                  <StepColorPicker
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title="Cor principal"
                    field="cor_principal"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                  />
                )}

                {phase === "wizard" && wizardStep === 4 && (
                  <StepTextInput
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title="Texto base"
                    field="texto_base"
                    placeholder="Ex: LE ART"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                  />
                )}

                {phase === "wizard" && wizardStep === 5 && (
                  <StepColorPicker
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title="Cor do texto base"
                    field="cor_texto_base"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                  />
                )}

                {phase === "wizard" && wizardStep === 6 && (
                  <StepTextInput
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title="Texto interno"
                    field="texto_interno"
                    placeholder="Ex: Personalizados"
                    stepLabel={`${wizardStep}/${TOTAL_VISIBLE_STEPS}`}
                  />
                )}

                {phase === "wizard" && wizardStep === 7 && (
                  <StepColorPicker
                    data={data}
                    onUpdate={updateData}
                    onNext={goNext}
                    onBack={goBack}
                    title="Cor do texto interno"
                    field="cor_texto_interno"
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
                  <StepSuccess onReset={handleSuccess} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Preview sidebar (desktop) ── */}
          {showPreview && (
            <aside className="hidden lg:block w-72 shrink-0 py-8">
              <div className="sticky top-8">
                <LogoPreview data={data} />
              </div>
            </aside>
          )}
        </div>

        {/* ── Preview (mobile) ── */}
        {showPreview && (
          <div className="lg:hidden pb-10">
            <LogoPreview data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
