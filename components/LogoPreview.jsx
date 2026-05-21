"use client";

export default function LogoPreview({ data }) {
  const {
    imagem_logo,
    cor_principal,
    texto_base,
    cor_texto_base,
    texto_interno,
    cor_texto_interno,
  } = data;

  return (
    <div>
      <p className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
        Preview ao vivo
      </p>

      <div className="rounded-xl border border-border overflow-hidden shadow-lg">
        {/* Canvas */}
        <div
          className="relative flex flex-col items-center justify-center gap-3 p-8"
          style={{
            background: cor_principal || "#1A1A1A",
            minHeight: 220,
            transition: "background 0.3s ease",
          }}
        >
          {/* Image slot */}
          {imagem_logo ? (
            <img
              src={`https://placehold.co/96x96/ffffff/000000?text=${imagem_logo}`}
              alt="Imagem logo"
              className="w-20 h-20 object-contain opacity-90 rounded"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
              <span className="text-white/30 text-[10px]">imagem</span>
            </div>
          )}

          {/* Text overlay */}
          <div className="text-center space-y-1">
            <p
              className="text-lg font-bold tracking-[0.2em] transition-all duration-200"
              style={{ color: cor_texto_base || "rgba(255,255,255,0.25)" }}
            >
              {texto_base || (
                <span style={{ opacity: 0.2 }}>TEXTO BASE</span>
              )}
            </p>
            <p
              className="text-sm tracking-widest transition-all duration-200"
              style={{ color: cor_texto_interno || "rgba(255,255,255,0.2)" }}
            >
              {texto_interno || (
                <span style={{ opacity: 0.2 }}>texto interno</span>
              )}
            </p>
          </div>
        </div>

        {/* Color legend */}
        <div className="bg-card px-4 py-3 space-y-1.5 border-t border-border">
          {[
            { label: "Principal", color: cor_principal },
            { label: "Texto base", color: cor_texto_base },
            { label: "Texto interno", color: cor_texto_interno },
          ].map(({ label, color }) =>
            color ? (
              <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className="w-3 h-3 rounded-sm shrink-0 border border-white/10"
                  style={{ background: color }}
                />
                <span>{label}:</span>
                <code className="font-mono">{color}</code>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
