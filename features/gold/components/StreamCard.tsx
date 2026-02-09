// // gold/components/StreamCard.tsx
// import { View, Text } from "react-native";

// export default function StreamCard() {
//   return (
//     <View style={{ flexDirection: "row", margin: 16, gap: 12 }}>
//       <View style={{ flex: 1, padding: 16, borderRadius: 16, backgroundColor: "#08353B" }}>
//         <Text style={{ color: "#8FDAD1", fontSize: 12 }}>WALLET BALANCE</Text>
//         <Text style={{ color: "#fff", fontSize: 18 }}>₹10000</Text>
//       </View>

//       <View style={{ flex: 1, padding: 16, borderRadius: 16, backgroundColor: "#08353B" }}>
//         <Text style={{ color: "#8FDAD1", fontSize: 12 }}>NET GROWTH</Text>
//         <Text style={{ color: "#4CFF8F", fontSize: 18 }}>+2.4%</Text>
//       </View>
//     </View>
//   );
// }



import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../data/constants";

export default function GoldStreakCard({ streak }: { streak: number }) {
  // Streak zero ho toh neutral color, warna Gold theme
  const hasStreak = streak > 0;
  const GOLD_ACCENT = "#FFD700"; // Primary Gold
  const GOLD_GLOW = "rgba(255, 215, 0, 0.2)"; // Warm Gold glow

  return (
    <View style={styles.container}>
      <View style={[styles.card, hasStreak && { borderColor: "rgba(255, 215, 0, 0.15)" }]}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>SAVING STREAK</Text>
          <Text style={styles.subLabel}>Maintaining your Gold momentum!</Text>
        </View>

        <View style={styles.streakBadge}>
          <Text style={[styles.value, { color: hasStreak ? GOLD_ACCENT : COLORS.TEXT_MUTED }]}>
            {streak}
          </Text>
          <Text style={styles.icon}>{hasStreak ? "🔥" : "❄️"}</Text>
        </View>
      </View>
      
      {/* Gold Glow Effect - Jab streak active ho */}
      {hasStreak && (
        <View style={[styles.glowEffect, { backgroundColor: GOLD_ACCENT }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.03)", // Dark translucent background
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    zIndex: 2,
  },
  infoColumn: {
    flex: 1,
  },
  label: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  subLabel: {
    color: COLORS.TEXT_MUTED || "#999",
    fontSize: 10,
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.08)', // Very subtle gold tint
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  value: {
    fontSize: 24,
    fontWeight: "900",
    marginRight: 4,
  },
  icon: {
    fontSize: 18,
  },
  glowEffect: {
    position: 'absolute',
    right: 15,
    top: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.1, // Subtle glow
    zIndex: 1,
  }
});