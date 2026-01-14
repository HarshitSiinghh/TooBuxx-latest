import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Navigation, ShowEditMenu, View as ViewType } from "@/store/store";

type MenuItem = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  to: ViewType;
};

export const EditMenu = () => {
  const { setOpen } = Navigation();
  const { showEditMenu, menu } = ShowEditMenu();

  if (!menu) return null;

  const data: MenuItem[] = [
    { icon: "user", label: "Edit Profile", to: "userProfile" },
    { icon: "phone", label: "Contact Us", to: "contactUs" },
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Menu Options</Text>
          <Pressable onPress={() => showEditMenu(false)}>
            <Feather name="x" size={20} color="#9CA3AF" />
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={styles.list}>
          {data.map((item, i) => (
            <Pressable
              key={i}
              style={styles.item}
              onPress={() => {
                setOpen(item.to);
                showEditMenu(false);
              }}
            >
              <Feather name={item.icon} size={18} color="#9CA3AF" />
              <Text style={styles.label}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  container: {
    backgroundColor: "#2f2360",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  list: {
    gap: 6,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
  },

  label: {
    color: "#D1D5DB",
    fontSize: 13,
    fontWeight: "500",
  },
});
