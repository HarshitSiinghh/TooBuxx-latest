import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Carousel } from "../ui/carousel";
import { Navigation, PromoModel } from "@/store/store";
import type { ModalType } from "@/store/store";
 import { useRouter } from "expo-router";

type SettingCardItem = {
  id: number;
  title: string;
  time: string;
  icon: keyof typeof Feather.glyphMap;
  trigger: ModalType | null;
  route: string;
};

export const NomineeSection: React.FC = () => {
  const { setSetting } = PromoModel();
  const { setOpen } = Navigation();
   const router = useRouter();

  const cards: SettingCardItem[] = [
    {
      id: 1,
      title: "Add a nominee to your account",
      time: "Safeguard your saving for the future",
      icon: "user",
      trigger: "Add a Nominee",
      route: " /profile/nominee",
    },
    {
      id: 2,
      title: "Get verified",
      time: "Complete your KYC to unlock more features",
      icon: "shield",
      trigger: null,
      route: " /spin-and-win/verifyKYC",
    },
  ];

  const handleClick = (trigger: ModalType | null) => {
    if (trigger) {
      setSetting(trigger);
      setOpen(null);
    } else {
      setOpen("profile");
    }
  };

  return (
    <View style={styles.wrapper}>
      <Carousel
        data={cards}
        height={120}
        renderItem={(item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.iconWrap}>
              <Feather name={item.icon} size={26} color="white" />
            </View>

            <View style={styles.textWrap}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.time} numberOfLines={2}>
                {item.time}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
    borderRadius: 14,
    overflow: "hidden",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2f2360",
    borderRadius: 14,
    marginHorizontal: 8,
    padding: 14,
  },

  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  textWrap: {
    flex: 1,
  },

  title: {
    color: "#4ade80",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },

  time: {
    color: "#e5e7eb",
    fontSize: 12,
  },
});

export default NomineeSection;



