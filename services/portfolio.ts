import { BASE_URL } from "@/constants/api";

export const getPortfolioApi = async () => {
  const res = await fetch(`${BASE_URL}/profile/portfolio`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};
