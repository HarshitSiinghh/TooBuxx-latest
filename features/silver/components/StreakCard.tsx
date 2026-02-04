import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants";

export default function StreakCard({ streak }: { streak: number }) {
  // Streak zero ho toh neutral color, warna orange/fire theme
  const hasStreak = streak > 0;

  return (
    <View style={styles.container}>
      <View style={[styles.card, hasStreak && styles.activeBorder]}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>SAVING STREAK</Text>
          <Text style={styles.subLabel}>Don't break the momentum!</Text>
        </View>

        <View style={styles.streakBadge}>
          <Text style={[styles.value, !hasStreak && { color: COLORS.TEXT_MUTED }]}>
            {streak}
          </Text>
          <Text style={styles.fireIcon}>{hasStreak ? "🔥" : "❄️"}</Text>
        </View>
      </View>
      
      {/* Subtle Progress Hint (Decorative) */}
      {hasStreak && <View style={styles.glowEffect} />}
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
    borderColor: "rgba(249, 115, 22, 0.2)", // Orange tint border
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
    color: "#f97316", // Premium Orange
    fontSize: 24,
    fontWeight: "900",
    marginRight: 4,
  },
  fireIcon: {
    fontSize: 20,
  },
  glowEffect: {
    position: 'absolute',
    right: 20,
    top: 10,
    width: 40,
    height: 40,
    backgroundColor: '#f97316',
    borderRadius: 20,
    opacity: 0.15,
    // blurRadius: 20, // Note: standard RN doesn't support blurRadius on View, but looks good even as a soft circle
  }
});