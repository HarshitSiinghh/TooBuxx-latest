import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Navigation, View as ViewType } from "@/store/store";

type HelpItem = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  trigger: ViewType;
};

export const GetHelpSection = () => {
  const { setOpen } = Navigation();

  const helpItems: HelpItem[] = [
    { icon: "help-circle", label: "FAQs", trigger: null },
    { icon: "message-circle", label: "Contact Us", trigger: "contactUs" },
    { icon: "file-text", label: "Terms & Conditions", trigger: null },
    { icon: "shield", label: "Privacy Policy", trigger: null },
    { icon: "phone", label: "Support Hotline", trigger: null },
  ];

  const handlePress = (trigger: ViewType) => {
    if (trigger) setOpen(trigger);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Get Help</Text>

      <View style={styles.list}>
        {helpItems.map((item, i) => (
          <Pressable
            key={i}
            style={styles.item}
            onPress={() => handlePress(item.trigger)}
          >
            <Feather name={item.icon} size={18} color="#9CA3AF" />
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

/* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#1a003d",
//     padding: 12,
//     borderRadius: 28
//   },

//   heading: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "800",
//     marginBottom: 8,
//   },

//   list: {
//     gap: 4,
//   },

//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//   },

//   label: {
//     color: "#d1d5db",
//     fontSize: 13,
//     fontWeight: "500",
//   },
// });




const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b3442",
    padding: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  heading: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.6,
    marginBottom: 12,
  },

  list: {
    gap: 6,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  label: {
    color: "#8fbac4",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
