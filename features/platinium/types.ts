export type Bucket = "instant" | "daily" | "weekly" | "monthly";

// Base interface for properties common to all buckets
export interface BucketEngine {
  isActive: boolean;
  isPaused?: boolean;   // Optional because 'instant' doesn't use it
  amount: number;
  savedGrams: number;
  streak?: number;      // Optional because 'instant' doesn't use it
}

/* ================= SILVER TYPES ================= */

export interface SilverEngineState {
  pricePerGram: number;
  walletBalance: number;
  engines: Record<Bucket, BucketEngine>;
}

/* ================= PLATINUM TYPES ================= */

// Agar Platinum ke liye future mein alag fields chahiye toh yahan define kar sakte hain
export interface PlatinumEngineState {
  pricePerGram: number;
  walletBalance: number;
  engines: Record<Bucket, BucketEngine>;
}

/* ================= SHARED ENGINE TYPE ================= */
// Yeh type tab kaam aayega jab aap koi generic component banayenge
export type MetalEngineState = SilverEngineState | PlatinumEngineState;