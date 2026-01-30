// import { BASE_URL } from "@/constants/api";

// export interface MyPointsResponse {
//   success: boolean;
//   data: {
//     total_points: number;
//   };
// }

// export const getMyPointsApi = async (): Promise<MyPointsResponse> => {
//   const res = await fetch(`${BASE_URL}/rewards/my-points`, {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const text = await res.text();

//   try {
//     return JSON.parse(text);
//   } catch {
//     console.log("❌ MY POINTS RAW RESPONSE 👉", text);
//     throw new Error("Server is not returning JSON");
//   }
// };




import { BASE_URL } from "@/constants/api";

/* ================= TYPES ================= */

export interface RewardNotification {
  id: number;
  title: string;
  message: string;
  points: number;
  created_at: string;
}

export interface MyPointsResponse {
  success: boolean;
  data: {
    total_points: number;
    percentage_increase: number;
    latest_notifications: RewardNotification[];
  };
}

/* ================= API ================= */

export const getMyPointsApi = async (): Promise<MyPointsResponse> => {
  const res = await fetch(`${BASE_URL}/rewards/my-points`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.log("❌ MY POINTS RAW RESPONSE 👉", text);
    throw new Error("Server is not returning JSON");
  }
};

