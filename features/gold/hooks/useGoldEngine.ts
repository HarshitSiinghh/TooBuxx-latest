
import { useEffect, useRef, useState } from "react";
import { getMyGoldSipApi, getLiveMetalPriceApi } from "@/services/gold";
import { getProfileApi } from "@/services/profile";
import { getPortfolioApi } from "@/services/portfolio";

export type Bucket = "instant" | "daily" | "weekly" | "monthly";
export type Karat = "18K" | "22K" | "24K";

export const useGoldEngine = () => {
  const [tab, setTab] = useState<Bucket>("instant");
  const [karat, setKarat] = useState<Karat>("24K");

  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(false);

  const [engine, setEngine] = useState<any>({
    pricePerGram: 0,
    walletBalance: 0,
    totalGoldGrams: 0,
    totalGoldValue: 0,
    portfolio: {},
    engines: {
      instant: { savedGrams: 0 },
      daily: { isActive: false, isPaused: false, amount: 0, savedGrams: 0, data: null },
      weekly: { isActive: false, isPaused: false, amount: 0, savedGrams: 0, data: null },
      monthly: { isActive: false, isPaused: false, amount: 0, savedGrams: 0, data: null },
    },
  });

  /* ================= LOAD ENGINE ================= */
  const loadEngine = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {

      /* ================= ⚡ PARALLEL FAST API ================= */
      const [
        priceRes,
        sipRes,
        profileRes,
        portfolioRes
      ] = await Promise.all([
        getLiveMetalPriceApi(),
        getMyGoldSipApi(),
        getProfileApi(),
        getPortfolioApi()
      ]);

      console.log("⚡ ALL GOLD API DONE");

      /* ================= PRICE ================= */
      const gold = priceRes?.data?.GOLD || {};

      const price18k = Number(gold?.["18K"]?.buy || 0);
      const price22k = Number(gold?.["22K"]?.buy || 0);
      const price24k = Number(gold?.["24K"]?.buy || 0);

      let selectedPrice = price24k;
      if (karat === "22K") selectedPrice = price22k;
      if (karat === "18K") selectedPrice = price18k;

      /* ================= SIP ================= */
      const sipData = sipRes?.data || {};

      const karatKey =
        karat === "24K"
          ? "gold24k"
          : karat === "22K"
          ? "gold22k"
          : "gold18k";

      const karatData = sipData?.[karatKey] || {};

      const dailyArr = karatData?.DAILY || [];
      const weeklyArr = karatData?.WEEKLY || [];
      const monthlyArr = karatData?.MONTHLY || [];

      /* ================= PROFILE ================= */
      const wallet = profileRes?.data?.wallet || {};

      /* ================= PORTFOLIO ================= */
      const portfolio = portfolioRes || {};

      const totalGoldGrams =
        Number(portfolio?.gold_24K?.grams || 0) +
        Number(portfolio?.gold_22K?.grams || 0) +
        Number(portfolio?.gold_18K?.grams || 0);

      const totalGoldValue =
        Number(portfolio?.gold_24K?.current_value || 0) +
        Number(portfolio?.gold_22K?.current_value || 0) +
        Number(portfolio?.gold_18K?.current_value || 0);

      /* ================= FIND LATEST SIP ================= */
      const getLatestSip = (arr: any[]) => {
        if (!arr?.length) return null;

        const filtered = arr.filter((s: any) => {
          const sipKarat =
            s.caret ||
            s.karat ||
            s.purity ||
            s.gold_caret ||
            s.gold_karat;

          return sipKarat?.toString().toUpperCase() === karat.toUpperCase();
        });

        if (!filtered.length) return null;

        const running = filtered.filter((s: any) => {
          const st = s.status?.toUpperCase();
          return st === "ACTIVE" || st === "PAUSED";
        });

        if (!running.length) return null;

        return running.sort(
          (a: any, b: any) =>
            new Date(b.created_at || b.start_date || 0).getTime() -
            new Date(a.created_at || a.start_date || 0).getTime()
        )[0];
      };

      const dailySip = getLatestSip(dailyArr);
      const weeklySip = getLatestSip(weeklyArr);
      const monthlySip = getLatestSip(monthlyArr);

      /* ================= FINAL ENGINE ================= */
      const newEngine = {
        pricePerGram: selectedPrice,
        price18k,
        price22k,
        price24k,
        walletBalance: Number(wallet?.deposit_balance || 0),
        totalGoldGrams,
        totalGoldValue,

        portfolio: {
          gold_18K_value: Number(portfolio?.gold_18K?.current_value || 0),
          gold_22K_value: Number(portfolio?.gold_22K?.current_value || 0),
          gold_24K_value: Number(portfolio?.gold_24K?.current_value || 0),
          gold_18K_grams: Number(portfolio?.gold_18K?.grams || 0),
          gold_22K_grams: Number(portfolio?.gold_22K?.grams || 0),
          gold_24K_grams: Number(portfolio?.gold_24K?.grams || 0),
        },

        engines: {
          instant: {
            savedGrams: Number(wallet?.instant_gold_grams || 0),
          },

          daily: {
            isActive: !!dailySip,
            isPaused: dailySip?.status?.toUpperCase() === "PAUSED",
            amount: dailySip?.amount_per_cycle || 0,
            savedGrams: Number(wallet?.daily_gold_grams || 0),
            streak: Number(dailySip?.current_streak || 0),
            data: dailySip || null,
          },

          weekly: {
            isActive: !!weeklySip,
            isPaused: weeklySip?.status?.toUpperCase() === "PAUSED",
            amount: weeklySip?.amount_per_cycle || 0,
            savedGrams: Number(wallet?.weekly_gold_grams || 0),
            streak: Number(weeklySip?.current_streak || 0),
            data: weeklySip || null,
          },

          monthly: {
            isActive: !!monthlySip,
            isPaused: monthlySip?.status?.toUpperCase() === "PAUSED",
            amount: monthlySip?.amount_per_cycle || 0,
            savedGrams: Number(wallet?.monthly_gold_grams || 0),
            streak: Number(monthlySip?.current_streak || 0),
            data: monthlySip || null,
          },
        },
      };

      console.log("🔥 FINAL GOLD ENGINE", newEngine);
      setEngine(newEngine);

    } catch (e) {
      console.log("GOLD ENGINE ERROR", e);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  /* ===== AUTO LOAD ===== */
  useEffect(() => {
    loadEngine();
  }, [karat]);

  return {
    tab,
    setTab,
    karat,
    setKarat,
    engine,
    loading,
    setEngine,
    loadEngine,
  };
};
