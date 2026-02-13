import { BASE_URL } from "@/constants/api";

// async function safeFetch(url: string, options?: any) {
//   const res = await fetch(url, options);
//   const text = await res.text();

//   try {
//     return JSON.parse(text);
//   } catch (e) {
//     console.log("❌ NOT JSON RESPONSE FROM:", url);
//     console.log("❌ RAW RESPONSE:", text);
//     throw new Error("Server did not return JSON. Check backend or auth.");
//   }
// }

// /* ================= PROFILE ================= */

// export async function getProfile() {
//   return safeFetch(`${BASE_URL}/profile`, {
//     credentials: "include",
//   });
// }

// /* ================= GOLD PRICE ================= */

// export async function getLiveGoldPrice() {
//   return safeFetch(`${BASE_URL}/gold/price`);
// }

// /* ================= PAYOUT METHODS ================= */

// export async function getPayoutMethods() {
//   return safeFetch(`${BASE_URL}/wallet/payout-method`, {
//     credentials: "include",
//   });
// }

// /* ================= WITHDRAW ================= */

// export async function processWithdrawal(
//   bucket: string,
//   gold_grams: number,
//   payout_method: "bank" | "upi",
//   payout_id: number
// ) {
//   return safeFetch(`${BASE_URL}/gold/withdraw`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify({
//       bucket,
//       gold_grams,
//       payout_method,
//       payout_id,
//     }),
//   });
// }


// import { BASE_URL } from "@/constants/api";

// ==============================
// 📊 GET PORTFOLIO (most important)
// ==============================
export const getPortfolioApi = async () => {
  const res = await fetch(`${BASE_URL}/profile/portfolio/new`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};

// ==============================
// 🏦 GET PAYOUT METHOD (bank + upi)
// ==============================
export const getPayoutMethodApi = async () => {
  const res = await fetch(`${BASE_URL}/wallet/payout-method`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};

// ==============================
// 🥇 GOLD WITHDRAW
// ==============================
export const withdrawGoldApi = async (body: {
  bucket: "instant" | "daily" | "weekly" | "monthly";
  gold_grams: number;
  caret: "24K" | "22K" | "18K";
}) => {
  const res = await fetch(`${BASE_URL}/metals/gold/withdraw`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};

// ==============================
// 🥈 SILVER WITHDRAW
// ==============================
export const withdrawSilverApi = async (body: {
  bucket: "instant" | "daily" | "weekly" | "monthly";
  silver_grams: number;
}) => {
  const res = await fetch(`${BASE_URL}/metals/silver/withdraw`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};

// ==============================
// 🪙 PLATINUM WITHDRAW
// ==============================
export const withdrawPlatinumApi = async (body: {
  bucket: "instant" | "daily" | "weekly" | "monthly";
  platinum_grams: number;
}) => {
  const res = await fetch(`${BASE_URL}/metals/platinum/withdraw`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};
