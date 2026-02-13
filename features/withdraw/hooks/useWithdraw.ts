import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "@/constants/api";
import {
  getPayoutMethodApi,
  withdrawGoldApi,
  withdrawPlatinumApi,
  withdrawSilverApi,
} from "@/services/withdrawal";

// ================= TYPES =================
export type Metal = "gold" | "silver" | "platinum";
export type Plan = "instant" | "daily" | "weekly" | "monthly";
export type Karat = 24 | 22 | 18;
export type PayoutMethod = "bank" | "upi";

export const useWithdraw = () => {
  // ================= STATES =================
  const [metal, setMetal] = useState<Metal>("silver");
  const [karat, setKarat] = useState<Karat | null>(null);
  const [plan, setPlan] = useState<Plan>("instant");
  const [amount, setAmount] = useState<number>(0);
  const [payoutMethod, setPayoutMethod] = useState<PayoutMethod | null>(null);

  const [portfolio, setPortfolio] = useState<any>(null);
  const [payout, setPayout] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ================= INITIAL FETCH =================
  useEffect(() => {
    fetchPortfolio();
    fetchPayout();
  }, []);

  // ================= PORTFOLIO =================
  const fetchPortfolio = async () => {
    try {
      const res = await fetch(`${BASE_URL}/profile/portfolio/new`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log("🔥 PORTFOLIO 👉", data);
      setPortfolio(data);
    } catch (err) {
      console.log("PORTFOLIO ERROR", err);
    }
  };

  // ================= PAYOUT =================
  const fetchPayout = async () => {
    try {
      const res = await getPayoutMethodApi();
      setPayout(res?.data);
    } catch (err) {
      console.log("PAYOUT ERROR", err);
    }
  };

  // ================= SELL PRICE (REAL) =================
  const sellPrice = useMemo(() => {
    if (!portfolio) return 0;

    if (metal === "silver") {
      return portfolio?.silver?.liveRate || 0;
    }

    if (metal === "platinum") {
      return portfolio?.platinum?.liveRate || 0;
    }

    if (metal === "gold" && karat) {
      const key = `${karat}K`;
      return portfolio?.gold?.[key]?.liveRate || 0;
    }

    return 0;
  }, [portfolio, metal, karat]);

  // ================= ₹ VALUE PER TAB =================
  const availableRupees = useMemo(() => {
    if (!portfolio) return 0;

    if (metal === "gold") {
      if (!karat) return 0;
      const key = `${karat}K`;
      return portfolio?.gold?.[key]?.[`${key}_Rupee`]?.[plan] || 0;
    }

    if (metal === "silver") {
      return portfolio?.silver?.silver_Rupee?.[plan] || 0;
    }

    if (metal === "platinum") {
      return portfolio?.platinum?.platinum_Rupee?.[plan] || 0;
    }

    return 0;
  }, [portfolio, metal, karat, plan]);

  // ================= AVAILABLE GRAMS =================
  const availableBalance = useMemo(() => {
    if (!sellPrice) return 0;
    return availableRupees / sellPrice;
  }, [availableRupees, sellPrice]);

  // ================= USER GRAMS =================
  const grams = useMemo(() => {
    if (!amount || !sellPrice) return 0;

    const g = amount / sellPrice;

    console.log("🔥 SELL PRICE 👉", sellPrice);
    console.log("🔥 AMOUNT 👉", amount);
    console.log("🔥 FINAL GRAMS 👉", g);

    return g;
  }, [amount, sellPrice]);

  // ================= VALIDATION =================
  const exceedsBalance = grams > availableBalance;

  const canWithdraw =
    !loading &&
    amount > 0 &&
    payoutMethod !== null &&
    !exceedsBalance &&
    (metal !== "gold" || karat !== null);

  // ================= WITHDRAW =================
  const handleWithdraw = async () => {
    try {
      setLoading(true);

      if (metal === "gold" && karat !== null) {
        const res = await withdrawGoldApi({
          bucket: plan,
          gold_grams: grams,
          caret: `${karat}K`,
        });

        if (!res?.success) throw new Error(res?.message);
      }

      if (metal === "silver") {
        const res = await withdrawSilverApi({
          bucket: plan,
          silver_grams: grams,
        });

        if (!res?.success) throw new Error(res?.message);
      }

      if (metal === "platinum") {
        const res = await withdrawPlatinumApi({
          bucket: plan,
          platinum_grams: grams,
        });

        if (!res?.success) throw new Error(res?.message);
      }

      // success
      setAmount(0);
      fetchPortfolio();
    } catch (err: any) {
      console.log("WITHDRAW ERROR", err);
      alert(err?.message || "Withdraw failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================
  const resetWithdraw = () => {
    setKarat(null);
    setPlan("instant");
    setAmount(0);
    setPayoutMethod(null);
  };

  const onMetalChange = (newMetal: Metal) => {
    setMetal(newMetal);
    setAmount(0);
    setPayoutMethod(null);
    setKarat(null);
  };

  // ================= RETURN =================
  return {
    metal,
    karat,
    plan,
    amount,
    payoutMethod,
    payout,
    loading,

    setMetal: onMetalChange,
    setKarat,
    setPlan,
    setAmount,
    setPayoutMethod,

    availableBalance,
    availableRupees,
    exceedsBalance,
    grams,
    canWithdraw,

    handleWithdraw,
    resetWithdraw,
  };
};
