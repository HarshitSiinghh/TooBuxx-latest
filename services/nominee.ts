
 import { BASE_URL } from "@/constants/api";
  export const uploadNomineeApi = async (formData: FormData) =>{
     const res = await fetch(`${BASE_URL}/nominee/upload`, {
         method:"Post",
         body: formData,
         credentials : "include"

     })
      return  await  res.json()
  }
  




/* -------- CHECK STATUS -------- */
export const getNomineeStatusApi = async () => {
  const res = await fetch(`${BASE_URL}/nominee/status`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};

/* -------- GET APPROVED NOMINEE DETAILS -------- */
export const getNomineeDetailsApi = async () => {
  const res = await fetch(`${BASE_URL}/nominee`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
