import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const StartSaving = () => {
  const router = useRouter();
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Left Section */}
        <View style={styles.left}>
          <Text style={styles.title}>
            Start saving in <Text style={styles.yellow}>24K Gold</Text>
          </Text>

          <Text style={styles.desc}>
            Auto starting from ₹500 daily toward your future goals
          </Text>

          <Pressable style={styles.button}   onPress={()=>router.push("/savings/daily-saving",)}>
            <Text style={styles.buttonText}>Save Now</Text>
            <Feather name="arrow-right" size={14} color="#5b21b6" />
          </Pressable>
        </View>

        {/* Right Section */}
        <View style={styles.right}>
          <Image
            source={require("../../../images/box.webp")}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#2f2360",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    maxWidth: "60%",
    gap: 8,
  },

  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 22,
  },

  yellow: {
    color: "#facc15",
  },

  desc: {
    color: "#9ca3af",
    fontSize: 12,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fffbeb",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 13,
  },

  right: {
    width: "40%",
    alignItems: "flex-end",
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
