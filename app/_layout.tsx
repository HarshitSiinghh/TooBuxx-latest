import LottieView from "lottie-react-native";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { meApi } from "@/services/auth";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import { View, ActivityIndicator } from "react-native";
import { useWalletStore } from "@/store/walletStore";
import { getReferralApi } from "@/services/profile";
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
  const { user, setUser, clearUser, loading, setLoading } = useAuthStore();
  const { setWallet, clearWallet } = useWalletStore();
  const { setProfile, clearProfile, setReferral } = useProfileStore();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const data = await meApi();

        if (data.success && data.user) {
          setUser(data.user);
          setProfile(data.user);
          setWallet(data.wallet);

          // 🔥 LOAD REFERRAL
          try {
            const refRes = await getReferralApi();
            if (refRes.success) {
              setReferral(refRes.data);
            }
          } catch {
            console.log("Referral API failed");
          }

        } else {
          clearUser();
          clearProfile();
          clearWallet();
        }
      } catch (e) {
        clearUser();
        clearProfile();
        clearWallet();
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);




if (loading) {
  return (

   <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#062530",
      }}
    >
      <LottieView
        source={require("../assets/gold.json")}
        autoPlay
        loop
        style={{ width: 180, height: 180 }}
      />
    </View>

  );
}


  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="auth" />
        )}
      </Stack>
    </SafeAreaProvider>
  );
}
