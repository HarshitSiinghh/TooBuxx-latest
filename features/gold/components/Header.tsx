

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GoldEngineState } from "../types";
import { COLORS } from "../data/constants";

interface Props {
  engine: GoldEngineState;
}

export default function GoldHeader({ engine }: Props) {
  const portfolioValue = engine.totalGoldValue || 0;
  const GOLD_ACCENT = "#FFD700";

  return (
    <View style={styles.wrapper}>
      {/* LIVE PRICE CHIP */}
      <View style={styles.rateRow}>
        <View style={[styles.liveIndicator, { backgroundColor: GOLD_ACCENT, shadowColor: GOLD_ACCENT }]} />
        <Text style={styles.rateText}>
          LIVE GOLD:{" "}
          <Text style={[styles.boldRate, { color: GOLD_ACCENT }]}>
            ₹{engine.pricePerGram || 0}/gm
          </Text>
        </Text>
      </View>

      {/* STATS ROW: Total Value and Available Cash (Platinum Style Grid) */}
      <View style={styles.statsGrid}>
        
        {/* Total Gold Value Card */}
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>TOTAL GOLD VALUE</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.miniValue}>
              {portfolioValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </Text>
          </View>
        </View>

        {/* Available Cash Card */}
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>AVAILABLE CASH</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.miniValue}>
              {engine.walletBalance?.toLocaleString("en-IN") || 0}
            </Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  rateRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.15)",
    marginBottom: 4,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
    shadowRadius: 6,
    shadowOpacity: 0.8,
    elevation: 4,
  },
  rateText: {
    color: COLORS.TEXT_MUTED || "#A0A0A0",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  boldRate: {
    fontWeight: "800",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  miniCard: {
    flex: 1,
    backgroundColor: COLORS.CARD || "#1A1A1A",
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.1)", // Gold tinted border
    elevation: 4,
  },
  miniLabel: {
    color: COLORS.TEXT_MUTED || "#A0A0A0",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  currencySymbol: {
    color: COLORS.TEXT_PRIMARY || "#FFF",
    fontSize: 14,
    marginRight: 2,
    fontWeight: "600",
  },
  miniValue: {
    color: COLORS.TEXT_PRIMARY || "#FFF",
    fontSize: 19,
    fontWeight: "700",
  },
});