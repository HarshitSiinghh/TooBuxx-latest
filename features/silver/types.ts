export type Bucket = "instant" | "daily" | "weekly" | "monthly";

export interface BucketEngine {
  isActive: boolean;
  isPaused?: boolean;   // ❌ instant me use nahi hoga
  amount: number;
  savedGrams: number;
  streak?: number;      // ❌ instant me use nahi hoga
}

export interface SilverEngineState {
  pricePerGram: number;
  walletBalance: number;
  engines: Record<Bucket, BucketEngine>;
}
