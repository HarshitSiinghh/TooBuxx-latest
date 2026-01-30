import { BASE_URL } from "@/constants/api"; 

export const uploadKycApi = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/kyc/upload`, {
    method: "POST",
    body: formData,
    credentials: "include", 
  });

  return await res.json();
};
export const getKycStatusApi = async () => {
  const res = await fetch(`${BASE_URL}/kyc/status`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
