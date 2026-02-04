import { Bucket } from "./types";

/* ================= TABS ================= */

export const SILVER_TABS: { key: Bucket; label: string }[] = [
  { key: "instant", label: "Instant" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

// Platinum Tabs (Same structure, but kept separate for scalability)
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

/* ================= COLORS ================= */
export const COLORS = {
  BG: "#062530",         // Common Teal Background
  CARD: "#0b3a46",       
  CARD_DARK: "#08303a",  
  
  // ALAG ACCENTS
  SILVER_ACCENT: "#FFD700",   // Yellow (Silver ke liye)
  // SILVER_ACCENT: "#facc15",   // Yellow (Silver ke liye)
  // PLATINUM_ACCENT: "#00D2FF", // Metallic Blue (Platinum ke liye)
  PLATINUM_ACCENT: "#E5E4E2", // Metallic Blue (Platinum ke liye)
  
  SUCCESS: "#22c55e",
  DANGER: "#ef4444",
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