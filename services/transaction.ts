// import { BASE_URL } from "@/constants/api";

// export const getMoneyTransactionsApi = async () => {
//   const res = await fetch(`${BASE_URL}/transactions/money`, {
//     method: "GET",
//     credentials: "include", // ✅ important (session / cookies)
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return await res.json();
// };



import { BASE_URL } from "@/constants/api";

export const getMoneyTransactionsApi = async () => {
  const res = await fetch(`${BASE_URL}/transactions/money`, {
    method: "GET",
    credentials: "include",
  });

  const text = await res.text();   // 👈 get raw response first
  console.log("🌐 RAW TRANSACTION RESPONSE 👉", text);

  try {
    return JSON.parse(text);       // try JSON
  } catch {
    throw new Error("Server is not returning JSON");
  }
};
