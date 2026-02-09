// constants/withdraw.ts

/**
 * Metal tabs
 */
export const METALS = [
  {
    key: "gold",
    label: "Gold",
  },
  {
    key: "silver",
    label: "Silver",
  },
  {
    key: "platinum",
    label: "Platinum",
  },
] as const;

/**
 * Gold karat options
 */
export const GOLD_KARATS = [
  {
    value: 24,
    label: "24K Gold",
    // purity: "99.9%",
  },
  {
    value: 22,
    label: "22K Gold",
    // purity: "91.6%",
  },
  {
    value: 18,
    label: "18K Gold",
    // purity: "75%",
  },
] as const;

/**
 * Withdrawal plans
 */
export const WITHDRAW_PLANS = [
  {
    key: "instant",
    label: "Instant",
    // description: "Immediate settlement at current price",
  },
  {
    key: "daily",
    label: "Daily",
    // description: "Processed once every day",
  },
  {
    key: "weekly",
    label: "Weekly",
    // description: "Processed every week",
  },
  {
    key: "monthly",
    label: "Monthly",
    // description: "Processed once a month",
  },
] as const;

/**
 * Payout methods
 */
export const PAYOUT_METHODS = [
  {
    key: "bank",
    label: "Bank Account",
    subLabel: "NEFT / IMPS",
  },
  {
    key: "upi",
    label: "UPI",
    subLabel: "Instant transfer",
  },
] as const;

/**
 * Limits & rules (dummy for now)
 */
export const WITHDRAW_RULES = {
  MIN_AMOUNT: 100,        // ₹
  MAX_AMOUNT: 1000000,    // ₹
  MIN_GRAMS: 0.001,
};
