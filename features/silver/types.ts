// export type Bucket = "instant" | "daily" | "weekly" | "monthly";

// // export interface BucketEngine {
  
// //   isActive: boolean;
// //   isPaused?: boolean;   // ❌ instant me use nahi hoga
// //   amount: number;
// //   savedGrams: number;
// //   streak?: number;      // ❌ instant me use nahi hoga
// // }

// export interface BucketEngine {
//   isActive: boolean;
//   status: "ACTIVE" | "PAUSED" | "STOPPED" | "NONE"; // 👈 Yeh add karein
//   isPaused?: boolean;
//   amount: number;
//   savedGrams: number;
//   streak?: number;
//   sip_id?: string; // 👈 Backend connectivity ke liye zaroori
// }

// export interface SilverEngineState {
//   pricePerGram: number;
//   walletBalance: number;
//   engines: Record<Bucket, BucketEngine>;
// }


export type Bucket = "instant" | "daily" | "weekly" | "monthly";

export interface BucketEngine {
  isActive: boolean;
  status: "ACTIVE" | "PAUSED" | "STOPPED" | "NONE"; 
  isPaused?: boolean; // Derived from status === "PAUSED"
  amount: number;
  savedGrams: number;
  streak?: number;
  sip_id?: string; 
}

export interface SilverEngineState {
  pricePerGram: number;
  walletBalance: number;
  engines: Record<Bucket, BucketEngine>;
}