// // gold/data/mock.ts
// import { GoldPlan } from "../types";

// export const GOLD_PLANS: GoldPlan[] = [
//   {
//     id: "gold-22-instant",
//     tab: "instant",
//     karat: "22K",
//     amount: 0,
//     returnRate: 0,
//     duration: "Instant",
//     status: "active",
//     savedGrams: 0.125, // Missing field add kar di
//   },
//   {
//     id: "gold-22-daily",
//     tab: "daily",
//     karat: "22K",
//     amount: 1000,
//     returnRate: 2.4,
//     duration: "Daily SIP",
//     status: "active",
//     savedGrams: 2.500, // Missing field add kar di
//   },
// ];


// gold/data/mock.ts
import { GoldPlan, GoldEngineState } from "../types";

export const GOLD_PLANS: GoldPlan[] = [
  {
    id: "gold-22-instant",
    tab: "instant",
    karat: "22K",
    amount: 0,
    returnRate: 0,
    duration: "Instant",
    status: "active",
    savedGrams: 0.125,
  },
  {
    id: "gold-22-daily",
    tab: "daily",
    karat: "22K",
    amount: 1000,
    returnRate: 2.4,
    duration: "Daily SIP",
    status: "active",
    savedGrams: 2.500,
  },
];
// gold/data/mock.ts mein ye update karo
export const GOLD_ENGINE_MOCK: GoldEngineState = {
  pricePerGram: 7250, 
  walletBalance: 25000, 
  engines: {
    instant: {
      isActive: false, // Instant hamesha false rakho, ye sirf one-time buy hai
      isPaused: false,
      amount: 0,
      savedGrams: 0,
    },
    daily: {
      isActive: false, // Ise false karo taaki bina SIP ke card na dikhe
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