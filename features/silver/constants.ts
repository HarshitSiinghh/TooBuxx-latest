import { Bucket } from "./types";

/* ================= TABS ================= */

export const SILVER_TABS: { key: Bucket; label: string }[] = [
  { key: "instant", label: "Instant" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

// Platinum ke liye bhi same structure
export const PLATINUM_TABS: { key: Bucket; label: string }[] = [
  { key: "instant", label: "Instant" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

/* ================= PRICE RULES ================= */

export const PRICE_CONFIG = {
  MIN_AMOUNT: 10,
  MAX_AMOUNT: 100000,
  DECIMAL_LIMIT: 6,
};

/* ================= QUICK AMOUNTS ================= */

export const QUICK_AMOUNTS = [10, 50, 100, 500];

/* ================= COLORS (Unified Theme) ================= */

export const COLORS = {
  // Dono Metals ke liye same Background aur Card colors
  BG: "#062530",
  CARD: "#0b3a46",
  CARD_DARK: "#08303a",
  
  // Dono ke liye same Accent (Yellowish/Gold)
  ACCENT: "#E5E7EB",
  // ACCENT: "#facc15",
  
  // Status Colors
  SUCCESS: "#22c55e",
  DANGER: "#ef4444",
  
  // Text Colors
  TEXT_PRIMARY: "#ffffff",
  TEXT_MUTED: "#94a3b8",
};

/* ================= HELPERS ================= */

export const calculateGrams = (
  amount: number,
  pricePerGram: number
): number => {
  if (!amount || pricePerGram <= 0) return 0;
  return Number((amount / pricePerGram).toFixed(6));
};