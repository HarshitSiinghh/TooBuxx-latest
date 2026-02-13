

export type GoldTab = "instant" | "daily" | "weekly" | "monthly";
export type Karat = "18K" | "22K" | "24K";
export type PlanStatus = "active" | "paused" | "stopped";

/* ================= BACKEND SIP DATA ================= */

export interface GoldSipData {
  sip_id: number;
  amount_per_cycle: number;
  sip_type: "DAILY" | "WEEKLY" | "MONTHLY";
  status: "ACTIVE" | "PAUSED" | "STOPPED";
  caret: Karat;
  streak?: number;
  next_run_date?: string;
}


export interface GoldEngineState {
  pricePerGram: number;
  walletBalance: number;

  // 🔥 ADD THESE (IMPORTANT)
  price18k?: number;
  price22k?: number;
  price24k?: number;

  selectedGoldGrams: number;
  selectedGoldValue: number;
  totalGoldGrams: number;
  totalGoldValue: number;

  engines: {
    [key in GoldTab]: {
      savedGrams: number;
      isActive: boolean;
      isPaused: boolean;
      amount: number;
      streak?: number;
      data?: GoldSipData | null;
    };
  };
}
