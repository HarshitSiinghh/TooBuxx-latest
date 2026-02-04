// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { PlatinumEngineState } from "../types"; // Silver ki jagah Platinum types
// import { COLORS } from "../constants";

// interface Props {
//   engine: PlatinumEngineState;
// }

// export default function PlatinumHeader({ engine }: Props) {
//   // Saare buckets se total platinum calculate ho raha hai
//   const totalSavedGrams =
//     engine.engines.instant.savedGrams +
//     engine.engines.daily.savedGrams +
//     engine.engines.weekly.savedGrams +
//     engine.engines.monthly.savedGrams;

//   const portfolioValue = totalSavedGrams * engine.pricePerGram;
  
//   // Platinum specific accent color (E5E4E2 ya jo bhi aapka constant ho)
//   const PLATINUM_COLOR = COLORS.PLATINUM_ACCENT || "#E5E4E2";

//   return (
//     <View style={styles.wrapper}>
//       {/* LIVE RATE CHIP */}
//       <View style={styles.rateRow}>
//         <View style={[styles.liveIndicator, { backgroundColor: PLATINUM_COLOR, shadowColor: PLATINUM_COLOR }]} />
//         <Text style={styles.rateText}>
//           LIVE PLATINUM: <Text style={[styles.boldRate, { color: PLATINUM_COLOR }]}>₹{engine.pricePerGram}/gm</Text>
//         </Text>
//       </View>

//       {/* MAIN PORTFOLIO CARD (The Hero) */}
//       <View style={styles.heroCard}>
//         <Text style={styles.heroLabel}>TOTAL PLATINUM VALUE</Text>
//         <View style={styles.heroValueRow}>
//           <Text style={styles.heroCurrency}>₹</Text>
//           <Text style={styles.heroValue}>
//             {portfolioValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//           </Text>
//         </View>
//         <View style={styles.platinumBadge}>
//           <Text style={styles.platinumBadgeText}>
//             {totalSavedGrams.toFixed(3)} g Pure Platinum
//           </Text>
//         </View>
//       </View>

//       {/* SECONDARY STATS */}
//       <View style={styles.statsGrid}>
//         <View style={styles.miniCard}>
//           <Text style={styles.miniLabel}>WALLET BALANCE</Text>
//           <Text style={styles.miniValue}>₹{engine.walletBalance}</Text>
//         </View>

//         <View style={styles.miniCard}>
//           <Text style={styles.miniLabel}>PLATINUM GROWTH</Text>
//           {/* Aap stats ko condition ke basis par red/green kar sakte hain */}
//           <Text style={[styles.miniValue, { color: COLORS.SUCCESS }]}>+1.8%</Text>
//         </View>
//       </View>
//     </View>
//   );
// }



import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PlatinumEngineState } from "../types"; 
import { COLORS } from "../constants";

interface Props {
  engine: PlatinumEngineState;
}

export default function PlatinumHeader({ engine }: Props) {
  // Total Platinum calculation
  const totalSavedGrams =
    engine.engines.instant.savedGrams +
    engine.engines.daily.savedGrams +
    engine.engines.weekly.savedGrams +
    engine.engines.monthly.savedGrams;

  const portfolioValue = totalSavedGrams * engine.pricePerGram;
  
  // Naya Logic: Direct Platinum Accent use ho raha hai
  const PLATINUM_COLOR = COLORS.PLATINUM_ACCENT;

  return (
    <View style={styles.wrapper}>
      {/* LIVE RATE CHIP - Blue Indicator and Text */}
      <View style={styles.rateRow}>
        <View style={[styles.liveIndicator, { backgroundColor: PLATINUM_COLOR, shadowColor: PLATINUM_COLOR }]} />
        <Text style={styles.rateText}>
          LIVE PLATINUM: <Text style={[styles.boldRate, { color: PLATINUM_COLOR }]}>₹{engine.pricePerGram}/gm</Text>
        </Text>
      </View>

      {/* MAIN PORTFOLIO CARD */}
      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>TOTAL PLATINUM VALUE</Text>
        <View style={styles.heroValueRow}>
          <Text style={styles.heroCurrency}>₹</Text>
          <Text style={styles.heroValue}>
            {portfolioValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </Text>
        </View>

        {/* Badge with a subtle blue tint */}
        <View style={[styles.platinumBadge, { backgroundColor: 'rgba(0, 210, 255, 0.12)' }]}>
          <Text style={[styles.platinumBadgeText, { color: PLATINUM_COLOR }]}>
            {totalSavedGrams.toFixed(3)} g Pure Platinum
          </Text>
        </View>
      </View>

      {/* SECONDARY STATS */}
      <View style={styles.statsGrid}>
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>WALLET BALANCE</Text>
          <Text style={styles.miniValue}>₹{engine.walletBalance}</Text>
        </View>

        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>PLATINUM GROWTH</Text>
          <Text style={[styles.miniValue, { color: COLORS.SUCCESS }]}>+1.8%</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: { 
    paddingVertical: 10,
    gap: 16 
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
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
    shadowRadius: 4,
    shadowOpacity: 0.8,
  },
  rateText: {
    color: COLORS.TEXT_MUTED,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  boldRate: {
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: COLORS.CARD,
    padding: 24,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  heroLabel: {
    color: COLORS.TEXT_MUTED,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  heroValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroCurrency: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 24,
    fontWeight: '400',
    marginRight: 4,
    marginTop: 4,
  },
  heroValue: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  platinumBadge: {
    backgroundColor: 'rgba(229, 228, 226, 0.15)', // Light platinum tint
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  platinumBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  miniCard: {
    flex: 1,
    backgroundColor: COLORS.CARD_DARK,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  miniLabel: {
    color: COLORS.TEXT_MUTED,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 6,
  },
  miniValue: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: '700',
  },
});