// 📁 services/gold.ts

import { BASE_URL } from "@/constants/api";

/* =====================================================
   🥇 GET GOLD PRICE
===================================================== */
export const getGoldPriceApi = async () => {
  const res = await fetch(`${BASE_URL}/gold/price`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};

/* =====================================================
   💰 INSTANT BUY GOLD
===================================================== */
export const buyGoldApi = async (amount: number, caret: string) => {
  const res = await fetch(`${BASE_URL}/gold/instant-buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      amount,
      caret,
    }),
  });

  return res.json();
};

/* =====================================================
   💸 WITHDRAW / SELL GOLD
===================================================== */
export const withdrawGoldApi = async (
  bucket: "instant" | "daily" | "weekly" | "monthly",
  gold_grams: number,
  caret: string
) => {
  const res = await fetch(`${BASE_URL}/gold/withdraw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      bucket,
      gold_grams,
      caret,
    }),
  });

  return res.json();
};

/* =====================================================
   🔁 CREATE GOLD SIP
===================================================== */
export const createGoldSipApi = async (
  amount: number,
  sip_type: "DAILY" | "WEEKLY" | "MONTHLY",
  caret: string
) => {
  const res = await fetch(`${BASE_URL}/gold/sip/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      amount_per_cycle: amount,
      sip_type,
      caret,
    }),
  });

  return res.json();
};

/* =====================================================
   ⏸️ PAUSE SIP
===================================================== */
export const pauseGoldSipApi = async (sip_id: number) => {
  const res = await fetch(`${BASE_URL}/gold/sip/pause`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      sip_id,
    }),
  });

  return res.json();
};

/* =====================================================
   ▶️ RESUME SIP
===================================================== */
export const resumeGoldSipApi = async (sip_id: number) => {
  const res = await fetch(`${BASE_URL}/gold/sip/resume`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      sip_id,
    }),
  });

  return res.json();
};

/* =====================================================
   🛑 STOP SIP
===================================================== */
export const stopGoldSipApi = async (
  sip_id: number,
  requested_method: "BANK" | "WALLET" = "BANK"
) => {
  const res = await fetch(`${BASE_URL}/gold/sip/stop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      sip_id,
      requested_method,
    }),
  });

  return res.json();
};

/* =====================================================
   📊 GET MY GOLD SIPs
===================================================== */
export const getMyGoldSipApi = async () => {
  const res = await fetch(`${BASE_URL}/gold/sip/my`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};
