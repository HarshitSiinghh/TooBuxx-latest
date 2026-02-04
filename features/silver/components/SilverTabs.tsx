import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Bucket } from "../types";
import { COLORS, SILVER_TABS } from "../constants";

interface Props {
  active: Bucket;
  onChange: (b: Bucket) => void;
}

export default function SilverTabs({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        {SILVER_TABS.map((t) => {
          const isActive = t.key === active;
          return (
            <TouchableOpacity
              key={t.key}
              activeOpacity={0.7}
              onPress={() => onChange(t.key)}
              style={[
                styles.tab,
                isActive && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  isActive && styles.activeText,
                ]}
              >
                {t.label}
              </Text>
              {/* Subtle dot for active state (optional, adds premium feel) */}
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
    marginVertical: 8,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: COLORS.CARD_DARK, // Background container
    padding: 6,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
  },
  activeTab: {
    backgroundColor: COLORS.ACCENT,
    // Soft glow for the active tab
    shadowColor: COLORS.ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    color: COLORS.TEXT_MUTED,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  activeText: {
    color: "#000",
    fontWeight: "800",
  },
  activeDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
  }
});
