import { Suspense } from "react";
import WizardContainer from "@/components/wizard/WizardContainer";

export const metadata = {
  title: "Solicitação de Logo — LE ART",
  description: "Preencha o formulário para solicitar sua logo personalizada",
};

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground text-sm tracking-widest animate-pulse">
        Carregando...
      </div>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WizardContainer />
    </Suspense>
  );
}
