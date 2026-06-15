"use client";

export function useHaptic() {
  const trigger = (duration = 10) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  return { trigger };
}
