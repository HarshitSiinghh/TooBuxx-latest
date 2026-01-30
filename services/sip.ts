import { BASE_URL } from "../constants/api";

export type SipStatus = "ACTIVE" | "PAUSED" | "STOPPED";
export type SipType = "DAILY" | "WEEKLY" | "MONTHLY";

export interface SipItem {
  sip_id: number;
  sip_type: SipType;
  amount_per_cycle: number;
  start_date: string;
  next_run_date: string;
  end_date: string | null;
  total_gold_grams: number;
  status: SipStatus;
  created_at: string;
}

/* ================= CREATE ================= */

export const createSipApi = async (
  sip_type: SipType,
  amount_per_cycle: number
) => {
  const res = await fetch(`${BASE_URL}/gold/sip/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sip_type, amount_per_cycle }),
  });

  return res.json();
};

/* ================= MY SIPs ================= */

export const getMySipsApi = async (status?: SipStatus) => {
  const url = status
    ? `${BASE_URL}/gold/sip/my?status=${status}`
    : `${BASE_URL}/gold/sip/my`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};

/* ================= ACTIONS ================= */

export const pauseSipApi = async (sip_id: number) => {
  const res = await fetch(`${BASE_URL}/gold/sip/pause`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sip_id }),
  });

  return res.json();
};

export const resumeSipApi = async (sip_id: number) => {
  const res = await fetch(`${BASE_URL}/gold/sip/resume`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sip_id }),
  });

  return res.json();
};

export const stopSipApi = async (sip_id: number) => {
  const res = await fetch(`${BASE_URL}/gold/sip/stop`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sip_id }),
  });

  return res.json();
};
