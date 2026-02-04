import { PlatinumEngineState } from "./types";

export const MOCK_PLATINUM_ENGINE: PlatinumEngineState = {
  // Platinum ki current market price (Approximate)
  pricePerGram: 950, 
  walletBalance: 25000, // Platinum users ke liye thoda zyada balance mock kiya hai

  engines: {
    instant: {
      isActive: false,
      amount: 0,
      savedGrams: 0,
    },
    daily: {
      isActive: false,
      isPaused: false,
      amount: 0,
      savedGrams: 0,
      streak: 0,
    },
    weekly: {
      isActive: false,
      isPaused: false,
      amount: 0,
      savedGrams: 0,
      streak: 0,
    },
    monthly: {
      isActive: false,
      isPaused: false,
      amount: 0,
      savedGrams: 0,
      streak: 0,
    },
  },
};