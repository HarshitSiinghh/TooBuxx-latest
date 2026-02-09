// // gold/data/constants.ts
// import { GoldTab, Karat } from "../types";

// export const GOLD_TABS: GoldTab[] = [
//   "instant",
//   "daily",
//   "weekly",
//   "monthly",
// ];

// export const KARATS: Karat[] = ["18K", "22K", "24K"];



// export const COLORS = {
//   BG: "#062530",         // Common Teal Background
//   CARD: "#0b3a46",       
//   CARD_DARK: "#08303a",  
  
//   // ALAG ACCENTS
//   SILVER_ACCENT: "#FFD700",   // Yellow (Silver ke liye)
//   // SILVER_ACCENT: "#facc15",   // Yellow (Silver ke liye)
//   // PLATINUM_ACCENT: "#00D2FF", // Metallic Blue (Platinum ke liye)
//   PLATINUM_ACCENT: "#E5E4E2", // Metallic Blue (Platinum ke liye)
  
//   SUCCESS: "#22c55e",
//   DANGER: "#ef4444",
//   TEXT_PRIMARY: "#ffffff",
//   TEXT_MUTED: "#94a3b8",
// };
// /* ================= HELPERS ================= */

// export const calculateGrams = (
//   amount: number,
//   pricePerGram: number
// ): number => {
//   if (!amount || pricePerGram <= 0) return 0;
//   return Number((amount / pricePerGram).toFixed(6));
// };


import { GoldTab, Karat } from "../types";

/* ================= TABS ================= */

// Gold specific tabs with labels
export const GOLD_TABS: { key: GoldTab; label: string }[] = [
  { key: "instant", label: "Instant" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

export const KARATS: Karat[] = ["18K", "22K", "24K"];

/* ================= PRICE RULES ================= */

export const PRICE_CONFIG = {
  MIN_AMOUNT: 10,
  MAX_AMOUNT: 100000,
  DECIMAL_LIMIT: 6,
  PURITY_TAX: 0.03, // Gold investment par 3% GST standard hota hai
};

/* ================= QUICK AMOUNTS ================= */

export const QUICK_AMOUNTS = [100, 500, 1000, 5000]; // Gold ke liye thode high amounts

/* ================= COLORS ================= */

export const COLORS = {
  // Deep Premium Backgrounds
  BG: "#042B30",         // Deep Teal/Dark Greenish (Jo tum use kar rahe ho)
  CARD: "#0E3A40",       // Lighter card for depth
  CARD_DARK: "#082428",  // Darker card for mini-stats
  
  // GOLD THEME ACCENTS
  GOLD_ACCENT: "#FFD700",      // Pure Golden Yellow
  GOLD_BRIGHT: "#FFF0A5",      // For light reflections/highlights
  GOLD_MUTED: "rgba(255, 215, 0, 0.15)", // For badges/backgrounds
  
  // SYSTEM COLORS
  SUCCESS: "#22c55e",
  DANGER: "#ef4444",
  TEXT_PRIMARY: "#ffffff",
  TEXT_MUTED: "#94a3b8",
};

/* ================= HELPERS ================= */

/**
 * Calculates grams based on amount and current gold price.
 */
export const calculateGrams = (
  amount: number,
  pricePerGram: number
): number => {
  if (!amount || pricePerGram <= 0) return 0;
  return Number((amount / pricePerGram).toFixed(6));
};

/**
 * Formats amount to Indian Currency style
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};