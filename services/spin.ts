// import { BASE_URL } from "@/constants/api";

// export interface Reward {
//   id: number;
//   label: string;
//   image: string;
// }

// /* -------- Fetch wheel items -------- */
// export const fetchSpinRewardsApi = async (): Promise<Reward[]> => {
//   const res = await fetch(`${BASE_URL}/rewards/spin-rewards`, {
//     method: "GET",
//     credentials: "include",
//   });

//   const text = await res.text();
//   try {
//     const json = JSON.parse(text);
//     return json.data;
//   } catch {
//     console.log("❌ SPIN REWARDS RAW 👉", text);
//     throw new Error("Server not returning JSON");
//   }
// };

// /* -------- Claim spin -------- */
// export const claimSpinRewardApi = async () => {
//   const res = await fetch(`${BASE_URL}/rewards/spin`, {
//     method: "POST",
//     credentials: "include",
//   });

//   const text = await res.text();
//   try {
//     return JSON.parse(text);
//   } catch {
//     console.log("❌ SPIN CLAIM RAW 👉", text);
//     throw new Error("Server not returning JSON");
//   }
// };




// services/spin.ts
import { BASE_URL } from "@/constants/api";

export interface Reward {
  id: number;
  label: string;
  image: string;
}

/* -------- Fetch wheel items (SAME AS WEB) -------- */
export const fetchSpinRewardsApi = async (): Promise<Reward[]> => {
  const res = await fetch(`${BASE_URL}/rewards`, {
    method: "GET",
    credentials: "include",
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);
    return json.data;
  } catch {
    console.log("❌ SPIN REWARDS RAW 👉", text);
    throw new Error("Server not returning JSON");
  }
};

/* -------- Claim spin (SAME AS WEB) -------- */
export const claimSpinRewardApi = async () => {
  const res = await fetch(`${BASE_URL}/rewards/spin`, {
    method: "GET", // 👈 keep GET if your web uses GET
    credentials: "include",
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.log("❌ SPIN CLAIM RAW 👉", text);
    throw new Error("Server not returning JSON");
  }
};