import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import { Sidebar } from "@/store/store"; // only UI state, not navigation

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  // const { toggleSidebar } = Sidebar();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <View style={styles.header}>
      {/* Left */}
      <View style={styles.left}>
        {/* <Pressable onPress={toggleSidebar} style={styles.iconBtn}>
          <Feather name="menu" size={22} color="white" />
        </Pressable> */}

        <Pressable
          onPress={() => router.push("/(tabs)/settings")}
          style={styles.avatarBtn}
        >
          <Feather name="user" size={18} color="white" />
        </Pressable>
      </View>

      {/* Center */}
        <Pressable   onPress={() => router.push("/profile/goldPrice")}>
      <View style={styles.centerBox}>
        <View style={styles.liveRow}>
          <MaterialCommunityIcons
            name="access-point"
            size={18}
            color="#e26a75"
          />
          <Text style={styles.liveText}>Live</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.goldLabel}>Gold Price</Text>
          <Text style={styles.goldPrice}>12000/gm</Text>
        </View>
      </View>
        </Pressable>

      {/* Right */}
      <View style={styles.right}>

        <Pressable
          onPress={() => {
            toggleMenu();
            router.push("/profile/notifications");
          }}
          style={styles.iconBtn}
        >
          <Feather name="bell" size={18} color="white" />
        </Pressable>

        <Pressable
          onPress={() => {
            toggleMenu();
            router.push("/profile/my-point");
          }}
          style={styles.iconBtn}
        >
          <Feather name="shield" size={18} color="white" />
        </Pressable>
      </View>
    </View>
  );
};



export default Header;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a003d",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 50,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconBtn: {
    backgroundColor: "#2a0055",
    padding: 8,
    borderRadius: 999,
  },

  avatarBtn: {
    backgroundColor: "#2a0055",
    padding: 6,
    borderRadius: 999,
  },

  centerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#30055a",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  liveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  liveText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  goldLabel: {
    color: "white",
    fontSize: 11,
  },

  goldPrice: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
});