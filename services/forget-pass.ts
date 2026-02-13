import { BASE_URL } from "@/constants/api";

// ==============================
// 1️⃣ SEND OTP
// ==============================
export const sendResetOtpApi = async (email: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/profile/password-reset/send-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log("SEND OTP ERROR", error);
    return {
      success: false,
      message: "Server error",
    };
  }
};

// ==============================
// 2️⃣ VERIFY OTP
// ==============================
export const verifyForgetOtpApi = async (email: string, otp: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/profile/password-reset/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          email,
          otp,
        }),
      }
    );

    const data = await res.json();
    return data; // resetToken milega
  } catch (error: any) {
    console.log("VERIFY OTP ERROR", error);
    return {
      success: false,
      message: "Invalid OTP",
    };
  }
};

// ==============================
// 3️⃣ RESET PASSWORD
// ==============================
export const resetPasswordApi = async (
  newPassword: string,
  resetToken: string
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/profile/password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          newPassword,
          resetToken,
        }),
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log("RESET PASSWORD ERROR", error);
    return {
      success: false,
      message: "Reset failed",
    };
  }
};
