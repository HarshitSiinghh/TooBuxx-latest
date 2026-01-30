

import { BASE_URL } from "../constants/api";

export const getProfileApi = async () => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};

/* 🔥 CHANGED: now accepts FormData */
export const updateProfileApi = async (data: FormData) => {
  const res = await fetch(`${BASE_URL}/profile/update`, {
    method: "PUT",
    credentials: "include",
    body: data, // multipart/form-data
  });

  return res.json();
};

export const getReferralApi = async () => {
  const res = await fetch(`${BASE_URL}/profile/referral-url`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  return res.json();
};



export const changePasswordApi = async (data: {
  old_password: string;
  new_password: string;
}) => {
  const res = await fetch(`${BASE_URL}/profile/change-password`, {
    method: "PUT",
    credentials: "include", // ✅ same as your other APIs
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};