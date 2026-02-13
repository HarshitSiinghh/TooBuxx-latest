import { BASE_URL } from "@/constants/api";

let LIVE_RATES: any = null;

// ================= FETCH LIVE =================
export const fetchLiveRates = async () => {
  try {
    const res = await fetch(`${BASE_URL}/metals/live`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    console.log("🔥 FULL RATE API 👉", json);

    // 🔥 IMPORTANT FIX
    LIVE_RATES = json?.data || null;

    console.log("🔥 LIVE_RATES SET 👉", LIVE_RATES);
  } catch (err) {
    console.log("❌ RATE API ERROR", err);
  }
};

// ================= GET PRICE =================
export const getMetalPricePerGram = (
  metal: "gold" | "silver" | "platinum",
  karat?: number
) => {
  if (!LIVE_RATES) {
    console.log("❌ NO LIVE RATE YET");
    return 0;
  }

  // 🥇 GOLD
  if (metal === "gold") {
    if (!karat) return 0;
    const key = `${karat}K`;

    const price = LIVE_RATES?.GOLD?.[key]?.sell || 0;
    console.log("🥇 GOLD SELL PRICE 👉", price);
    return price;
  }

  // 🥈 SILVER
  if (metal === "silver") {
    const price = LIVE_RATES?.SILVER?.["999"]?.sell || 0;
    console.log("🥈 SILVER SELL PRICE 👉", price);
    return price;
  }

  // 🪙 PLATINUM
  if (metal === "platinum") {
    const price = LIVE_RATES?.PLATINUM?.["999"]?.sell || 0;
    console.log("🪙 PLAT SELL PRICE 👉", price);
    return price;
  }

  return 0;
};
