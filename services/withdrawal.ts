import { BASE_URL } from "@/constants/api";
// services/gold.ts

// const BASE_URL = "http://192.168.1.6:3001/api/v1";

// export async function getProfile() {
//   const res = await fetch(`${BASE_URL}/profile`, { credentials: "include" });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data?.message || "Profile fetch failed");
//   return data;
// }

// export async function getLiveGoldPrice() {
//   const res = await fetch(`${BASE_URL}/gold/price`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data?.message || "Price fetch failed");
//   return data;
// }

// export async function processWithdrawal(bucket: string, gold_grams: number) {
//   const res = await fetch(`${BASE_URL}/gold/withdraw`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify({ bucket, gold_grams }),
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(data?.message || "Withdraw failed");
//   return data;
// }


// services/gold.ts  (MOBILE APP)

// const BASE_URL = "http://192.168.1.6:3001/api/v1";

/* ================= EXISTING ================= */
// const BASE_URL = "http://192.168.1.6:3001/api/v1";
// services/withdrawal.ts

// const BASE_URL = "http://10.0.2.2:3001/api/v1"; 
// ⚠️ Android emulator localhost

async function safeFetch(url: string, options?: any) {
  const res = await fetch(url, options);
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.log("❌ NOT JSON RESPONSE FROM:", url);
    console.log("❌ RAW RESPONSE:", text);
    throw new Error("Server did not return JSON. Check backend or auth.");
  }
}

/* ================= PROFILE ================= */

export async function getProfile() {
  return safeFetch(`${BASE_URL}/profile`, {
    credentials: "include",
  });
}

/* ================= GOLD PRICE ================= */

export async function getLiveGoldPrice() {
  return safeFetch(`${BASE_URL}/gold/price`);
}

/* ================= PAYOUT METHODS ================= */

export async function getPayoutMethods() {
  return safeFetch(`${BASE_URL}/wallet/payout-method`, {
    credentials: "include",
  });
}

/* ================= WITHDRAW ================= */

export async function processWithdrawal(
  bucket: string,
  gold_grams: number,
  payout_method: "bank" | "upi",
  payout_id: number
) {
  return safeFetch(`${BASE_URL}/gold/withdraw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      bucket,
      gold_grams,
      payout_method,
      payout_id,
    }),
  });
}
