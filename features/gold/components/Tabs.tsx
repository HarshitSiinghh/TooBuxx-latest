import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GoldTab } from "../types";
import { COLORS } from "../data/constants";

const GOLD_TABS: { key: GoldTab; label: string }[] = [
  { key: "instant", label: "Instant" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

interface Props {
  value: GoldTab;
  onChange: (t: GoldTab) => void;
}

export default function GoldTabs({ value, onChange }: Props) {
  // Rich Gold Accent
  const GOLD_ACCENT = "#FFD700";

  return (
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        {GOLD_TABS.map((t) => {
          const isActive = t.key === value;
          return (
            <TouchableOpacity
              key={t.key}
              activeOpacity={0.7}
              onPress={() => onChange(t.key)}
              style={[
                styles.tab,
                isActive && { 
                  backgroundColor: GOLD_ACCENT,
                  shadowColor: GOLD_ACCENT,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                  elevation: 6,
                } 
              ]}
            >
              <Text 
                style={[
                  styles.text, 
                  isActive && { color: "#000", fontWeight: "900" } 
                ]}
              >
                {t.label}
              </Text>
              
              {/* Subtle bottom indicator for depth */}
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 5,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)", 
    padding: 5,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
  },
  text: {
    color: COLORS.TEXT_MUTED || "#A0A0A0",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
  }
});