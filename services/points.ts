// import { BASE_URL } from "@/constants/api";

// /* ================= TYPES ================= */

// export interface RewardNotification {
//   id: number;
//   title: string;
//   message: string;
//   points: number;
//   created_at: string;
// }

// export interface MyPointsResponse {
//   success: boolean;
//   data: {
//     total_points: number;
//     percentage_increase: number;
//     latest_notifications: RewardNotification[];
//   };
// }

// /* ================= API ================= */

// export const getMyPointsApi = async (): Promise<MyPointsResponse> => {
//   const res = await fetch(`${BASE_URL}/rewards/my-points`, {
//     method: "GET",
//     credentials: "include", // 🔥 important if you use cookies/session
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const text = await res.text();

//   // 🛡 safety check (prevents JSON parse crash)
//   try {
//     return JSON.parse(text);
//   } catch (e) {
//     console.log("❌ POINTS RAW RESPONSE 👉", text);
//     throw new Error("Server is not returning JSON");
//   }
// };



import { BASE_URL } from "@/constants/api";

/* ================= TYPES ================= */

export interface PointsBalanceResponse {
  success: boolean;
  data: {
    points: {
      total: number;
    };
    conversion: {
      points_per_rupee: number;
      rupee_per_point: number;
    };
  };
}

export interface UsePointsResponse {
  success: boolean;
  message: string;
  data: {
    used_points: number;
    credited_rupees: number;
    remaining_points: number;
  };
}

/* ================= API ================= */

export const getPointsBalanceApi = async (): Promise<PointsBalanceResponse> => {
  const res = await fetch(`${BASE_URL}/rewards/points`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    console.log("❌ POINTS BALANCE RAW 👉", text);
    throw new Error("Server not returning JSON");
  }
};

export const convertPointsToWalletApi = async (
  points: number
): Promise<UsePointsResponse> => {
  const res = await fetch(`${BASE_URL}/rewards/use-points`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ points }),
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    console.log("❌ CONVERT POINTS RAW 👉", text);
    throw new Error("Server not returning JSON");
  }
};
