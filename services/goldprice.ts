import { BASE_URL } from "@/constants/api";

export const getGoldPriceApi = async () => {
  const res = await fetch(`${BASE_URL}/gold/price`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
