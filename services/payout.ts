import { BASE_URL } from "../constants/api";

export interface PayoutDetails {
  method: "BANK" | "UPI";
  upi_id?: string;
  account_holder_name: string;
  bank_name?: string;
  account_number?: string;
  ifsc_code?: string;
}

export const getPayoutApi = async () => {
  const res = await fetch(`${BASE_URL}/wallet/payout-method`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  return res.json();
};

export const updatePayoutApi = async (data: PayoutDetails) => {
  const res = await fetch(`${BASE_URL}/wallet/payout-method`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
