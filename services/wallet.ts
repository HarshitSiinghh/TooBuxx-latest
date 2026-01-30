import { BASE_URL } from "@/constants/api";

export const depositApi = async (amount: string, image: any) => {
  const formData = new FormData();

  formData.append("deposit_amount", amount);

  formData.append("payment_screenshot", {
    uri: image.uri,
    name: "payment.jpg",
    type: "image/jpeg",
  } as any);

  const res = await fetch(`${BASE_URL}/wallet/deposit`, {
    method: "POST",
    body: formData,
    credentials: "include", // 🔥 agar cookies/session use ho rahi hai
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return await res.json();
};
