import { BASE_URL } from "@/constants/api";

export const loginApi = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 because you use session/cookies
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const meApi = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include", // 🔥 very important (session)
  });

  return res.json();
};


export const logoutApi = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return res.json();
};




export const registerApi = async (payload: {
  username: string;
  email: string;
  password: string;
  mobile: string;
  referral?: string;
}) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const verifyOtpApi = async (email: string, otp: string) => {
  const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, otp }), // 🔥 email, not mobile
  });

  return res.json();
};