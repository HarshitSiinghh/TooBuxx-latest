import { BASE_URL } from "@/constants/api";

export const getLivePriceApi = async () => {
  const res = await fetch(`${BASE_URL}/metals/live`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};
