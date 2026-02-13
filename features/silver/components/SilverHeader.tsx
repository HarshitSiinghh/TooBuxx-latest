
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SilverEngineState } from "../types";
import { COLORS } from "../constants";

interface Props {
  engine: SilverEngineState;
}

export default function SilverHeader({ engine }: Props) {
  // Total Silver calculation
  const totalSavedGrams =
    engine.engines.instant.savedGrams +
    engine.engines.daily.savedGrams +
    engine.engines.weekly.savedGrams +
    engine.engines.monthly.savedGrams;

  const portfolioValue = totalSavedGrams * engine.pricePerGram;

  return (
    <View style={styles.wrapper}>
      {/* LIVE RATE CHIP */}
      <View style={styles.rateRow}>
        <View style={styles.liveIndicator} />
        <Text style={styles.rateText}>
          LIVE SILVER: <Text style={styles.boldRate}>₹{engine.pricePerGram}/gm</Text>
        </Text>
      </View>

      {/* STATS ROW: Total Value and Wallet Balance in one row */}
      <View style={styles.statsGrid}>
        {/* Total Portfolio Value Card */}
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>PORTFOLIO VALUE</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.miniValue}>
              {portfolioValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </Text>
          </View>
        </View>

        {/* Wallet Balance Card */}
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>WALLET BALANCE</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.miniValue}>{engine.walletBalance}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    paddingVertical: 10,
    gap: 12 
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 4,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.SUCCESS,
    marginRight: 8,
    shadowColor: COLORS.SUCCESS,
    shadowRadius: 4,
    shadowOpacity: 0.8,
  },
  rateText: {
    color: COLORS.TEXT_MUTED,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  boldRate: {
    color: COLORS.ACCENT,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  miniCard: {
    flex: 1,
    backgroundColor: COLORS.CARD,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    elevation: 2,
  },
  miniLabel: {
    color: COLORS.TEXT_MUTED,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencySymbol: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    marginRight: 2,
    fontWeight: '600',
  },
  miniValue: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: '800',
  },
});