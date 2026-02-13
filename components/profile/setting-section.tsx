import { logoutApi } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";
import { Feather } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

// 🔹 Ensure this is the correct hook name
// import { usePromoStore } from "@/store/store";
import NotificationPage from "./notifications";

/* ================= TYPES ================= */

type SettingAction = "notification" | "logout";    

type SettingItem = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  danger?: boolean;
  // 🔹 Use Href directly for better type safety
  route?: Href;
  action?: SettingAction;
};

/* ================= COMPONENT ================= */

export const SettingSection = () => {
  const clearUser = useAuthStore((s) => s.clearUser);
  const clearWallet = useWalletStore((s) => s.clearWallet);
  const router = useRouter();

  // 🔹 Local state for UI toggles
  const [notification, setNotification] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 🔹 Define items inside or outside; if inside, move below all other hooks
  const settingItems: SettingItem[] = [
   
    {
      icon: "user",
      label: "Nominee Details ",
      route: "/profile/nominee" as Href,
    },
    {
      icon: "code",
      label: "Promo Code",
      route: "/profile/prome-code" as Href,
    },
    {
      icon: "bell",
      label: "Notification Settings",
      route: "/profile/notification-settings" as Href, // Changed to action to toggle hovercard
    },
    {
      icon: "credit-card",
      label: "Payment Details",
      route: "/profile/paymentdetails", // Changed to action to toggle hovercard
    },
    // {
    //   icon: "globe",
    //   label: "Change App Language",
    //   route: "/profile/language" as Href,
    // },
    {
      icon: "log-out",
      label: "Logout",
      danger: true,
      action: "logout",
    },
  ];

  const showNotification = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setNotification(true);
  };

  const hideNotification = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setNotification(false);
    }, 200);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const handlePress = async (item: SettingItem) => {
    if (item.action === "notification") {
      notification ? hideNotification() : showNotification();
      return;
    }

    if (item.action === "logout") {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logoutApi();
            } catch (e) {
              console.log("Logout error:", e);
            } finally {
              clearUser();
              clearWallet();
              // router.replace("/auth/login");
               router.replace("/auth/login")
              // router.replace("/auth/login");
            }
          },
        },
      ]);
      return;
    }

    if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.list}>
        {settingItems.map((item, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [
              styles.item,
              pressed && { backgroundColor: "#1e293b" },
            ]}
            onPress={() => handlePress(item)}
          >
            <View style={styles.left}>
              <Feather
                name={item.icon}
                size={20}
                color={item.danger ? "#f87171" : "#facc15"}
              />
              <Text style={[styles.label, item.danger && { color: "#fca5a5" }]}>
                {item.label}
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9ca3af" />
          </Pressable>
        ))}
      </View>

      {/* The Hovercard */}
      {notification && <NotificationPage />}
    </View>
  );
};



const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#0b3442",
    padding: 14,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  heading: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
    letterSpacing: 1,
  },

  list: {
    gap: 6,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: "800",
    color: "#8fbac4",
    letterSpacing: 0.3,
  },
});
