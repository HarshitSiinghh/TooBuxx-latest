import { BASE_URL } from "@/constants/api";

export const instantBuyGoldApi = async (moneyAmount: number) => {
  const res = await fetch(`${BASE_URL}/gold/instant-buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ if you are using cookies/session
    body: JSON.stringify({
      money_amount: moneyAmount,
    }),
  });

  return await res.json();
};
