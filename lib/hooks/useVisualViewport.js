"use client";

import { useState, useEffect } from "react";

/**
 * Detecta se o teclado virtual está aberto no mobile.
 * Retorna `isKeyboardOpen` para esconder elementos fixos
 * e `viewportHeight` para ajustes de layout.
 */
export function useVisualViewport() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const handler = () => {
      const keyboardOpen = vv.height < window.screen.height * 0.8;
      setIsKeyboardOpen(keyboardOpen);
      setViewportHeight(vv.height);
    };

    vv.addEventListener("resize", handler);
    handler();
    return () => vv.removeEventListener("resize", handler);
  }, []);

  return { isKeyboardOpen, viewportHeight };
}
