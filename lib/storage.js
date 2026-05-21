const STORAGE_KEY = "logo_wizard_data";

export function saveWizardData(data) {
  try {
    // Never persist File objects or blob preview URLs
    const { imagem_referencia_preview, ...rest } = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch (e) {
    console.warn("Failed to save wizard data:", e);
  }
}

export function loadWizardData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function clearWizardData() {
  localStorage.removeItem(STORAGE_KEY);
}
