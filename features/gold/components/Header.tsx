
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../data/constants";
import { GoldEngineState, Karat } from "../types";

interface Props {
  engine: GoldEngineState;
  karat: Karat;
}

export default function GoldHeader({ engine, karat }: Props) {
  const GOLD_ACCENT = "#FFD700";

  /* 🔥 KARAT BASED VALUE */
  let portfolioValue = 0;
  let price = 0;

  if (karat === "18K") {
    portfolioValue = (engine as any)?.portfolio?.gold_18K_value || 0;
    price = (engine as any)?.price18k || engine?.pricePerGram || 0;
  }

  if (karat === "22K") {
    portfolioValue = (engine as any)?.portfolio?.gold_22K_value || 0;
    price = (engine as any)?.price22k || engine?.pricePerGram || 0;
  }

  if (karat === "24K") {
    portfolioValue = (engine as any)?.portfolio?.gold_24K_value || 0;
    price = (engine as any)?.price24k || engine?.pricePerGram || 0;
  }

  // Fallback to values on the engine if external priceRes is not available
  const price18k = Number((engine as any)?.price18k || engine?.pricePerGram || 0);
  const price22k = Number((engine as any)?.price22k || engine?.pricePerGram || 0);
  const price24k = Number((engine as any)?.price24k || engine?.pricePerGram || 0);

/* selected karat price */
let selectedPrice = price24k;
if (karat === "22K") selectedPrice = price22k;
if (karat === "18K") selectedPrice = price18k;

  return (
    <View style={styles.wrapper}>
      {/* LIVE PRICE */}
      <View style={styles.rateRow}>
        <View
          style={[styles.liveIndicator, { backgroundColor: GOLD_ACCENT }]}
        />
        <Text style={styles.rateText}>
          LIVE {karat} GOLD:{" "}
          <Text style={[styles.boldRate, { color: GOLD_ACCENT }]}>
       ₹{engine.pricePerGram}/gm
          </Text>
        </Text>
      </View>

      {/* GRID */}
      <View style={styles.statsGrid}>
        {/* VALUE */}
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>{karat} GOLD VALUE</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.miniValue}>
              {Number(portfolioValue).toLocaleString("en-IN")}
            </Text>
          </View>
        </View>

        {/* WALLET */}
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
