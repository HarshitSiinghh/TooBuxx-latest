// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { SilverEngineState } from "../types";
// import { COLORS } from "../constants";

// interface Props {
//   engine: SilverEngineState;
// }

// export default function SilverHeader({ engine }: Props) {
//   const totalSavedGrams =
//     engine.engines.instant.savedGrams +
//     engine.engines.daily.savedGrams +
//     engine.engines.weekly.savedGrams +
//     engine.engines.monthly.savedGrams;

//   const portfolioValue = totalSavedGrams * engine.pricePerGram;

//   return (
//     <View style={styles.wrapper}>
//       {/* LIVE RATE CHIP */}
//       <View style={styles.rateRow}>
//         <View style={styles.liveIndicator} />
//         <Text style={styles.rateText}>
//           LIVE SILVER: <Text style={styles.boldRate}>₹{engine.pricePerGram}/gm</Text>
//         </Text>
//       </View>

//       {/* MAIN PORTFOLIO CARD (The Hero) */}
//       <View style={styles.heroCard}>
//         <Text style={styles.heroLabel}>TOTAL PORTFOLIO VALUE</Text>
//         <View style={styles.heroValueRow}>
//           <Text style={styles.heroCurrency}>₹</Text>
//           <Text style={styles.heroValue}>
//             {portfolioValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//           </Text>
//         </View>
//         {/* <View style={styles.silverBadge}>
//           <Text style={styles.silverBadgeText}>
//             {totalSavedGrams.toFixed(3)} g Pure Silver
//           </Text>
//         </View> */}
//       </View>

//       {/* SECONDARY STATS */}
//       <View style={styles.statsGrid}>
//         <View style={styles.miniCard}>
//           <Text style={styles.miniLabel}>WALLET BALANCE</Text>
//           <Text style={styles.miniValue}>₹{engine.walletBalance}</Text>
//         </View>

//         <View style={styles.miniCard}>
//           <Text style={styles.miniLabel}>NET GROWTH</Text>
//           <Text style={[styles.miniValue, { color: COLORS.SUCCESS }]}>+2.4%</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { 
//     paddingVertical: 10,
//     gap: 16 
//   },
//   rateRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 100,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   liveIndicator: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: COLORS.SUCCESS,
//     marginRight: 8,
//     // Add shadow to make it look like it's glowing
//     shadowColor: COLORS.SUCCESS,
//     shadowRadius: 4,
//     shadowOpacity: 0.8,
//   },
//   rateText: {
//     color: COLORS.TEXT_MUTED,
//     fontSize: 11,
//     letterSpacing: 0.5,
//   },
//   boldRate: {
//     color: COLORS.ACCENT,
//     fontWeight: '700',
//   },
//   heroCard: {
//     backgroundColor: COLORS.CARD,
//     padding: 20,
//     borderRadius: 30,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.08)',
//     // Subtle elevation
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.2,
//     shadowRadius: 15,
//   },
//   heroLabel: {
//     color: COLORS.TEXT_MUTED,
//     fontSize: 12,
//     fontWeight: '700',
//     letterSpacing: 1.2,
//     marginBottom: 8,
//   },
//   heroValueRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   heroCurrency: {
//     color: COLORS.TEXT_PRIMARY,
//     fontSize: 24,
//     fontWeight: '400',
//     marginRight: 4,
//     marginTop: 4,
//   },
//   heroValue: {
//     color: COLORS.TEXT_PRIMARY,
//     fontSize: 38,
//     fontWeight: '800',
//     letterSpacing: -0.5,
//   },
//   silverBadge: {
//     backgroundColor: 'rgba(255, 255, 255, 0.08)',
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   silverBadgeText: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: '600',
//     opacity: 0.9,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   miniCard: {
//     flex: 1,
//     backgroundColor: COLORS.CARD_DARK,
//     padding: 16,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.03)',
//   },
//   miniLabel: {
//     color: COLORS.TEXT_MUTED,
//     fontSize: 10,
//     fontWeight: '700',
//     marginBottom: 6,
//   },
//   miniValue: {
//     color: COLORS.TEXT_PRIMARY,
//     fontSize: 18,
//     fontWeight: '700',
//   },
// });




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