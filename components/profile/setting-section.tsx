

import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";

import { PromoModel } from "@/store/store";
import  NotificationPage  from "./notification-hovercard";

/* ================= TYPES ================= */

type SettingAction = "notification" | "logout";

type SettingItem = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  danger?: boolean;
  route?: string | Href;
  action?: SettingAction;
};

/* ================= COMPONENT ================= */

export const SettingSection = () => {
  const { setSetting } = PromoModel();
  const router = useRouter();

  const [notification, setNotification] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const settingItems: SettingItem[] = [
    {
      icon: "user",
      label: "Add a Nominee",
      route: "/profile/nominee",
    },
    {
      icon: "code",
      label: "Promo Code",
      route: "/profile/prome-code",
    },
    {
      icon: "bell",
      label: "Notification Settings",
      route: "/profile/notifications",
    }, 
    {
      icon: "globe",
      label: "Change App Language",
      route: "/profile/language",
    },
    {
      icon: "log-out",
      label: "Logout",
      danger: true,
      route :"/auth/login",
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
      hideTimeoutRef.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const handlePress = (item: SettingItem) => {
    if (item.action === "notification") {
      notification ? hideNotification() : showNotification();
      return;
    }

    if (item.action === "logout") {
      setSetting("Logout");
      return;
    }

    if (item.route) {
      router.push(item.route as Href);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.list}>
        {settingItems.map((item, i) => (
          <Pressable
            key={i}
            style={styles.item}
            onPress={() => handlePress(item)}
          >
            <View style={styles.left}>
              <Feather
                name={item.icon}
                size={20}
                color={item.danger ? "#f87171" : "#c084fc"}
              />

              <Text
                style={[
                  styles.label,
                  item.danger && { color: "#fca5a5" },
                ]}
              >
                {item.label}
              </Text>
            </View>

            <Feather name="chevron-right" size={18} color="#9ca3af" />
          </Pressable>
        ))}
      </View>

      {/* {notification && <NotificationPage visible={notification} />}
       */}
       {notification && <NotificationPage />}

    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#2d1b4e",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },

  heading: {
    color: "white",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  list: {
    gap: 6,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 12,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#d1d5db",
  },
});
