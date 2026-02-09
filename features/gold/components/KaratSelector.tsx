import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Karat } from "../types";
// import { COLORS } from "../constants";
 import { COLORS } from "../data/constants";

interface Props {
  value: Karat;
  onChange: (k: Karat) => void;
}

export default function KaratSelector({ value, onChange }: Props) {
  const karats: Karat[] = ["18K", "22K", "24K"];
  const GOLD_ACCENT = "#FFD700";

  return (
    <View style={styles.container}>
      {karats.map((k) => {
        const isActive = value === k;
        return (
          <Pressable
            key={k}
            onPress={() => onChange(k)}
            style={[
              styles.option,
              isActive && { backgroundColor: GOLD_ACCENT, shadowColor: GOLD_ACCENT },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: isActive ? "#000" : COLORS.TEXT_MUTED || "#A0A0A0" },
              ]}
            >
              {k}
            </Text>
            {isActive && <View style={styles.activeDot} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 2,
    backgroundColor: "rgba(255, 255, 255, 0.05)", // Dark glass effect
    borderRadius: 24,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  option: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // Shadow for active state
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  activeDot: {
    position: "absolute",
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});