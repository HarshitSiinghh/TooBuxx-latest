// import { BASE_URL } from "@/constants/api";

// export interface ChartPoint {
//   price: number;
//   time: string; // backend jo bhej raha (date/time)
// }

// export interface ChartResponse {
//   success: boolean;
//   data: ChartPoint[];
// }

// export const getMetalChartApi = async (
//   metal: string,
//   range: string
// ): Promise<ChartResponse> => {

//   let endpoint = "";

//   if (metal === "GOLD") endpoint = "gold24k";
//   else if (metal === "SILVER") endpoint = "silver";
//   else if (metal === "PLATINUM") endpoint = "platinum";

//   const res = await fetch(
//     `${BASE_URL}/metals/${endpoint}/price-chart?range=${range}`,
//     {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const text = await res.text();

//   try {
//     return JSON.parse(text);
//   } catch {
//     console.log("❌ CHART RAW RESPONSE 👉", text);
//     throw new Error("Chart API not returning JSON");
//   }
// };



import { BASE_URL } from "@/constants/api";

export interface ChartItem {
  day: string;
  price: number;
}

// backend returns dynamic keys like 1W,1M,1Y
export interface ChartResponse {
  [key: string]: ChartItem[];
}

export const getMetalChartApi = async (
  metal: string,
  range: string
): Promise<ChartResponse> => {

  let endpoint = "";

  if (metal === "GOLD") endpoint = "gold24k";
  else if (metal === "SILVER") endpoint = "silver";
  else if (metal === "PLATINUM") endpoint = "platinum";

  const res = await fetch(
    `${BASE_URL}/metals/${endpoint}/price-chart?range=${range}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.log("❌ CHART RAW RESPONSE 👉", text);
    throw new Error("Chart API not returning JSON");
  }
};
