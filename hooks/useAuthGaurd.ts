import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { meApi } from "@/services/auth";

export const useAuthGuard = () => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await meApi();

        if (res?.success) {
          setAllowed(true); // ✅ user logged in
        } else {
          router.replace("/auth/register"); // ❌ not logged in
        }
      } catch (err) {
        router.replace("/auth/register");
      }
    };

    checkAuth();
  }, []);

  return allowed;
};
