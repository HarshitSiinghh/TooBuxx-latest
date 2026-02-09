// export type GoldTab = "instant" | "daily" | "weekly" | "monthly";
// export type Karat = "18K" | "22K" | "24K";
// export type PlanStatus = "active" | "paused" | "stopped";

// export interface GoldPlan {
//   id: string;
//   tab: GoldTab;
//   karat: Karat;
//   amount: number;
//   returnRate: number;
//   duration: string;
//   status: PlanStatus;
//   savedGrams: number; 
// }

// export interface GoldEngineState {
//   pricePerGram: number;
//   walletBalance: number;
//   engines: {
//     [key in GoldTab]: {
//       savedGrams: number;
//       isActive: boolean;    // Yeh add kiya taaki STOP logic chale
//       isPaused: boolean;    // Yeh add kiya taaki PAUSE logic chale
//       amount: number;       // SIP amount track karne ke liye
//       streak?: number;      // Optional: continuous investment track karne ke liye
//     };
//   };
// }


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

/* ================= OPTIONAL PLAN ================= */
export interface GoldEngineState {
  pricePerGram: number;
  walletBalance: number;

  /* 🔥 ADD THESE TWO */
  selectedGoldGrams: number;
  selectedGoldValue: number;
  totalGoldGrams:number;
totalGoldValue:number;


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
