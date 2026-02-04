import { SilverEngineState } from "./types";

export const MOCK_ENGINE: SilverEngineState = {
  pricePerGram: 75,
  walletBalance: 10000,

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
