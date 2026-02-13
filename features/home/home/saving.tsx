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
            Auto starting from ₹10 daily toward your future goals
          </Text>

          <Pressable style={styles.button}   onPress={()=>router.push("/metals/gold/engine",)}>
            <Text style={styles.buttonText}>Save Now</Text>
            <Feather name="arrow-right" size={14} color="#5b21b6" />
          </Pressable>
        </View>

        {/* Right Section */}
        <View style={styles.right}>
          <Image
            source={require("../../../images/latest-images/New folder (2)/box.png")}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 24,
    backgroundColor: "#062530",
  },

  card: {
    backgroundColor: "#104e64",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    // subtle depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  left: {
    maxWidth: "60%",
    gap: 8,
  },

  title: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 22,
  },

  yellow: {
    color: "#facc15", // gold
  },

  desc: {
    color: "#c7e4ec", // muted teal
    fontSize: 12,
    lineHeight: 16,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#facc15", // gold CTA
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#062530", // dark teal text
    fontWeight: "800",
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
    opacity: 0.95,
  },
});
