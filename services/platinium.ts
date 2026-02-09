import { BASE_URL } from "@/constants/api";

/* ================= BUY PLATINUM ================= */
export const buyPlatinumApi = async (amount: number) => {
  const res = await fetch(`${BASE_URL}/metals/platinum/instant-buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 session cookie
    body: JSON.stringify({
      amount: amount,
      purity: "999",
    }),
  });

  return res.json();
};

/* ================= WITHDRAW ================= */
export const withdrawPlatinumApi = async (grams: number) => {
  const res = await fetch(`${BASE_URL}/metals/platinum/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      bucket: "instant",
      platinum_grams: grams,
    }),
  });

  return res.json();
};

/* ================= CREATE SIP ================= */
export const createPlatinumSipApi = async (data:{
  amount_per_cycle:number;
  sip_type:"DAILY"|"WEEKLY"|"MONTHLY";
})=>{
  console.log("📡 PLATINUM CREATE BODY",data);

  const res = await fetch(`${BASE_URL}/metals/platinum/sip/create`,{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    credentials:"include",
    body:JSON.stringify({
      sip_type:data.sip_type,
      amount_per_cycle:data.amount_per_cycle,
      purity:"999"
    })
  });

  return res.json();
};


/* ================= PAUSE SIP ================= */
export const pausePlatinumSipApi = async (sip_id: number) => {
  const res = await fetch(`${BASE_URL}/metals/platinum/sip/pause`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ sip_id }),
  });

  return res.json();
};

/* ================= RESUME SIP ================= */
export const resumePlatinumSipApi = async (sip_id: number) => {
  const res = await fetch(`${BASE_URL}/metals/platinum/sip/resume`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ sip_id }),
  });

  return res.json();
};

/* ================= STOP SIP ================= */
export const stopPlatinumSipApi = async (sip_id: number) => {
  const res = await fetch(`${BASE_URL}/metals/platinum/sip/stop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      sip_id,
      requested_method: "BANK",
    }),
  });

  return res.json();
};

/* ================= MY SIP LIST ================= */
export const getMyPlatinumSipApi = async () => {
  const res = await fetch(`${BASE_URL}/metals/platinum/sip/my`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};

/* ================= SIP HISTORY ================= */
export const getSipHistoryApi = async (sip_id: number) => {
  const res = await fetch(`${BASE_URL}/metals/platinum/sip/history/${sip_id}`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};
