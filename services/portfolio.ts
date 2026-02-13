import { BASE_URL } from "@/constants/api";

export const getPortfolioApi = async () => {
  const res = await fetch(`${BASE_URL}/profile/portfolio/`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};
export const getPortfolioBreakdownApi = async () => {
  try {
    const res = await fetch(
      "http://10.0.2.2:3001/api/v1/profile/portfolio/new",
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await res.json();
    console.log("BREAKDOWN API 🔥", json);
    return json;
  } catch (err) {
    console.log("BREAKDOWN ERROR", err);
    return null;
  }
};
