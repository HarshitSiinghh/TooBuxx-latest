



// import { useMemo, useState } from "react";
// import { getMetalPricePerGram } from "../services/metalPrice";

// export type Metal = "gold" | "silver" | "platinum";
// export type Plan = "instant" | "daily" | "weekly" | "monthly";
// export type Karat = 24 | 22 | 18;
// export type PayoutMethod = "bank" | "upi";

// export const useWithdraw = () => {

//   // 🔥 metal initially none
//   const [metal, setMetal] = useState<Metal | null>(null);

//   const [karat, setKarat] = useState<Karat | null>(null);
//   const [plan, setPlan] = useState<Plan>("instant");

//   // 🔥 dummy wallet
//   // const walletBalances = {
//   //   gold: 0.45802,
//   //   silver: 12.25,
//   //   platinum: 0,
//   // };


//   // 🔥 metal + plan wise wallet (dummy API)
// const walletBalances = {
//   gold: {
//     instant: 0.45,
//     daily: 0.80,
//     weekly: 1.2,
//     monthly: 2.5,
//   },
//   silver: {
//     instant: 10,
//     daily: 25,
//     weekly: 40,
//     monthly: 60,
//   },
//   platinum: {
//     instant: 0,
//     daily: 0,
//     weekly: 0,
//     monthly: 0,
//   },
// };


//   const [amount, setAmount] = useState<number>(0);
//   const [payoutMethod, setPayoutMethod] =
//     useState<PayoutMethod | null>(null);

//   // -----------------------
//   // PRICE
//   // -----------------------
//   const pricePerGram = useMemo(() => {
//     if (!metal) return 0;
//     if (metal === "gold" && !karat) return 0;

//     return getMetalPricePerGram(metal, karat ?? undefined);
//   }, [metal, karat]);
  

//   // -----------------------
//   // BALANCE
//   // -----------------------
//   const availableBalance = metal
//     ? walletBalances[metal]
//     : 0;

//   // -----------------------
//   // GRAMS
//   // -----------------------
//   const grams = useMemo(() => {
//     if (!amount || !pricePerGram) return 0;
//     return amount / pricePerGram;
//   }, [amount, pricePerGram]);

//   // -----------------------
//   // VALIDATION
//   // -----------------------
//   const canWithdraw =
//     amount > 0 &&
//     payoutMethod !== null &&
//     metal !== null &&
//     (metal !== "gold" || karat !== null);

//   // -----------------------
//   // METAL CHANGE
//   // -----------------------
//   const onMetalChange = (newMetal: Metal) => {
//     setMetal(newMetal);
//     setAmount(0);
//     setPayoutMethod(null);
//     setKarat(null);
//   };

//   // -----------------------
//   // RESET FORM 🔥
//   // -----------------------
//   const resetWithdraw = () => {
//     // setMetal(null);
//     //  setMetal("gold");
//     setKarat(null);
//     setPlan("instant");
//     setAmount(0);
//     setPayoutMethod(null);
//   };

//   return {
//     metal,
//     karat,
//     plan,
//     amount,
//     payoutMethod,

//     setMetal: onMetalChange,
//     setKarat,
//     setPlan,
//     setAmount,
//     setPayoutMethod,

//     availableBalance,
//     pricePerGram,
//     grams,
//     canWithdraw,
//     resetWithdraw,
//   };
// };



import { useMemo, useState } from "react";
import { getMetalPricePerGram } from "../services/metalPrice";

export type Metal = "gold" | "silver" | "platinum";
export type Plan = "instant" | "daily" | "weekly" | "monthly";
export type Karat = 24 | 22 | 18;
export type PayoutMethod = "bank" | "upi";

export const useWithdraw = () => {

  // -----------------------
  // STATES
  // -----------------------
  // const [metal, setMetal] = useState<Metal | null>(null);

const [metal, setMetal] = useState<Metal>("silver");


  const [karat, setKarat] = useState<Karat | null>(null);
  const [plan, setPlan] = useState<Plan>("instant");

  const [amount, setAmount] = useState<number>(0);
  const [payoutMethod, setPayoutMethod] =
    useState<PayoutMethod | null>(null);

  // -----------------------
  // 🔥 METAL + PLAN WALLET
  // (dummy api data)
  // -----------------------
  const walletBalances = {
    gold: {
      instant: 0.45,
      daily: 0.80,
      weekly: 1.2,
      monthly: 2.5,
    },
    silver: {
      instant: 10,
      daily: 25,
      weekly: 40,
      monthly: 60,
    },
    platinum: {
      instant: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
    },
  };

  // -----------------------
  // PRICE
  // -----------------------
  const pricePerGram = useMemo(() => {
    if (!metal) return 0;
    if (metal === "gold" && !karat) return 0;

    return getMetalPricePerGram(metal, karat ?? undefined);
  }, [metal, karat]);

  // -----------------------
  // AVAILABLE BALANCE (MOST IMPORTANT)
  // -----------------------
  const availableBalance =
    metal && plan
      ? walletBalances[metal][plan]
      : 0;


      // 🔥 available metal ki ₹ value
const availableAmountValue =
  availableBalance && pricePerGram
    ? availableBalance * pricePerGram
    : 0;

  // -----------------------
  // GRAMS CALCULATION
  // -----------------------
  const grams = useMemo(() => {
    if (!amount || !pricePerGram) return 0;
    return amount / pricePerGram;
  }, [amount, pricePerGram]);

  // -----------------------
  // EXCEED CHECK
  // -----------------------
  const exceedsBalance = grams > availableBalance;

  // -----------------------
  // VALIDATION
  // -----------------------
  const canWithdraw =
    amount > 0 &&
    payoutMethod !== null &&
    metal !== null &&
    !exceedsBalance &&
    (metal !== "gold" || karat !== null);

  // -----------------------
  // METAL CHANGE
  // -----------------------
  const onMetalChange = (newMetal: Metal) => {
    setMetal(newMetal);
    setAmount(0);
    setPayoutMethod(null);
    setKarat(null);
  };

  // -----------------------
  // RESET FORM (same page stay)
  // -----------------------
  const resetWithdraw = () => {
    setKarat(null);
    setPlan("instant");
    setAmount(0);
    setPayoutMethod(null);
  };

  // -----------------------
  // RETURN
  // -----------------------
  return {
    metal,
    karat,
    plan,
    amount,
    payoutMethod,

    setMetal: onMetalChange,
    setKarat,
    setPlan,
    setAmount,
    setPayoutMethod,

    availableBalance,
    availableAmountValue,
    exceedsBalance,
    pricePerGram,
    grams,
    canWithdraw,
    resetWithdraw,
  };
};
