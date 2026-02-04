import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants";

export default function PlatinumStreakCard({ streak }: { streak: number }) {
  // Streak zero ho toh neutral color, warna Platinum/Cyan theme
  const hasStreak = streak > 0;
  const PLATINUM_GLOW = "#00D2FF"; // Cool Cyan glow for Platinum momentum

  return (
    <View style={styles.container}>
      <View style={[styles.card, hasStreak && styles.activeBorder]}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>SAVING STREAK</Text>
          <Text style={styles.subLabel}>Maintaining your Platinum momentum!</Text>
        </View>

        <View style={styles.streakBadge}>
          <Text style={[styles.value, !hasStreak && { color: COLORS.TEXT_MUTED }]}>
            {streak}
          </Text>
          <Text style={styles.icon}>{hasStreak ? "⚡" : "❄️"}</Text>
        </View>
      </View>
      
      {/* Platinum Glow Effect */}
      {hasStreak && <View style={[styles.glowEffect, { backgroundColor: PLATINUM_GLOW }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.CARD_DARK,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    zIndex: 2,
  },
  activeBorder: {
    borderColor: "rgba(0, 210, 255, 0.2)", // Platinum Cyan tint
  },
  infoColumn: {
    flex: 1,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  subLabel: {
    color: COLORS.TEXT_MUTED,
    fontSize: 11,
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  value: {
    color: "#00D2FF", // Electric Platinum Cyan
    fontSize: 24,
    fontWeight: "900",
    marginRight: 4,
  },
  icon: {
    fontSize: 20,
  },
  glowEffect: {
    position: 'absolute',
    right: 20,
    top: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.15,
  }
});