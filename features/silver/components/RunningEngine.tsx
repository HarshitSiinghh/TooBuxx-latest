// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Bucket, SilverEngineState } from "../types";
// import { COLORS } from "../constants";
// import StreakCard from "./StreakCard";

// interface Props {
//   bucket: Bucket;
//   engine: SilverEngineState;
//   setEngine: React.Dispatch<React.SetStateAction<SilverEngineState>>;
// }

// export default function RunningEngine({ bucket, engine, setEngine }: Props) {
//   const currentEngine = engine.engines[bucket];

//   const pause = () => {
//     setEngine({
//       ...engine,
//       engines: {
//         ...engine.engines,
//         [bucket]: { ...currentEngine, isPaused: true },
//       },
//     });
//   };

//   const stop = () => {
//     setEngine({
//       ...engine,
//       engines: {
//         ...engine.engines,
//         [bucket]: {
//           isActive: false,
//           amount: 0,
//           savedGrams: 0,
//           streak: 0,
//         },
//       },
//     });
//   };

//   return (
//     <View style={styles.card}>
//       {/* Header with Status Indicator */}
//       <View style={styles.header}>
//         <View style={styles.statusBadge}>
//           <View style={styles.pulseDot} />
//           <Text style={styles.statusText}>ACTIVE SIP</Text>
//         </View>
//         <Text style={styles.bucketType}>{bucket.toUpperCase()}</Text>
//       </View>

//       {/* Amount Display */}
//       <View style={styles.amountContainer}>
//         <Text style={styles.currencySymbol}>₹</Text>
//         <Text style={styles.amountText}>{currentEngine.amount}</Text>
//         <Text style={styles.perCycle}>/ cycle</Text>
//       </View>

//       {/* Divider */}
//       <View style={styles.divider} />

//       {/* Streak Section */}
//       <View style={styles.streakWrapper}>
//         <StreakCard streak={currentEngine.streak || 0} />
//       </View>

//       {/* Actions */}
//       <View style={styles.row}>
//         <TouchableOpacity 
//           activeOpacity={0.7} 
//           onPress={pause} 
//           style={styles.pauseBtn}
//         >
//           <Text style={styles.pauseText}>Pause Plan</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           activeOpacity={0.7} 
//           onPress={stop} 
//           style={styles.stopBtn}
//         >
//           <Text style={styles.stopText}>Stop</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: COLORS.CARD,
//     padding: 20,
//     borderRadius: 24,
//     marginTop: 12,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.05)",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   statusBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 200, 150, 0.1)",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   pulseDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: COLORS.SUCCESS,
//     marginRight: 6,
//   },
//   statusText: {
//     color: COLORS.SUCCESS,
//     fontSize: 10,
//     fontWeight: "800",
//     letterSpacing: 0.5,
//   },
//   bucketType: {
//     color: COLORS.TEXT_MUTED,
//     fontSize: 10,
//     fontWeight: "700",
//     letterSpacing: 1,
//   },
//   amountContainer: {
//     flexDirection: "row",
//     alignItems: "baseline",
//     marginBottom: 20,
//   },
//   currencySymbol: {
//     color: COLORS.TEXT_PRIMARY,
//     fontSize: 20,
//     fontWeight: "600",
//     marginRight: 4,
//   },
//   amountText: {
//     color: COLORS.TEXT_PRIMARY,
//     fontSize: 36,
//     fontWeight: "800",
//   },
//   perCycle: {
//     color: COLORS.TEXT_MUTED,
//     fontSize: 14,
//     marginLeft: 6,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "rgba(255,255,255,0.05)",
//     marginBottom: 20,
//   },
//   streakWrapper: {
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   pauseBtn: {
//     flex: 2,
//     backgroundColor: "rgba(255,255,255,0.08)",
//     height: 48,
//     borderRadius: 14,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   pauseText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   stopBtn: {
//     flex: 1,
//     backgroundColor: "rgba(255, 59, 48, 0.15)", // Subtle DANGER background
//     height: 48,
//     borderRadius: 14,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255, 59, 48, 0.2)",
//   },
//   stopText: {
//     color: COLORS.DANGER,
//     fontWeight: "700",
//     fontSize: 14,
//   },
// });




import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Bucket, SilverEngineState } from "../types";
import { COLORS } from "../constants";
import StreakCard from "./StreakCard";

interface Props {
  bucket: Bucket;
  engine: SilverEngineState;
  setEngine: React.Dispatch<React.SetStateAction<SilverEngineState>>;
}

export default function RunningEngine({ bucket, engine, setEngine }: Props) {
  const currentEngine = engine.engines[bucket];
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    type: "pause" | "stop";
  }>({ visible: false, type: "pause" });

  const confirmAction = () => {
    if (alertConfig.type === "pause") {
      setEngine({
        ...engine,
        engines: {
          ...engine.engines,
          [bucket]: { ...currentEngine, isPaused: true },
        },
      });
    } else {
      setEngine({
        ...engine,
        engines: {
          ...engine.engines,
          [bucket]: {
            isActive: false,
            amount: 0,
            savedGrams: 0,
            streak: 0,
          },
        },
      });
    }
    setAlertConfig({ ...alertConfig, visible: false });
  };

  return (
    <View style={styles.card}>
      {/* --- CUSTOM ALERT MODAL --- */}
      <Modal visible={alertConfig.visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertEmoji}>
              {alertConfig.type === "pause" ? "⏸️" : "🛑"}
            </Text>
            <Text style={styles.alertTitle}>
              {alertConfig.type === "pause" ? "Pause SIP?" : "Stop SIP?"}
            </Text>
            <Text style={styles.alertDesc}>
              {alertConfig.type === "pause" 
                ? "Your streak will be preserved, but no silver will be bought until you resume."
                : "This will permanently stop your SIP and reset your streak. Are you sure?"}
            </Text>
            
            <View style={styles.modalRow}>
              <TouchableOpacity 
                onPress={() => setAlertConfig({ ...alertConfig, visible: false })}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelBtnText}>Keep Running</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={confirmAction}
                style={[
                  styles.confirmBtn, 
                  { backgroundColor: alertConfig.type === 'stop' ? COLORS.DANGER : COLORS.ACCENT }
                ]}
              >
                <Text style={[styles.confirmBtnText, { color: alertConfig.type === 'stop' ? '#fff' : '#000' }]}>
                  {alertConfig.type === "pause" ? "Yes, Pause" : "Yes, Stop"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.statusBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.statusText}>ACTIVE SIP</Text>
        </View>
        <Text style={styles.bucketType}>{bucket.toUpperCase()}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>₹</Text>
        <Text style={styles.amountText}>{currentEngine.amount}</Text>
        <Text style={styles.perCycle}>/ cycle</Text>
      </View>

      <View style={styles.divider} />
      <View style={styles.streakWrapper}>
        <StreakCard streak={currentEngine.streak || 0} />
      </View>

      <View style={styles.row}>
        <TouchableOpacity 
          onPress={() => setAlertConfig({ visible: true, type: "pause" })} 
          style={styles.pauseBtn}
        >
          <Text style={styles.pauseText}>Pause Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setAlertConfig({ visible: true, type: "stop" })} 
          style={styles.stopBtn}
        >
          <Text style={styles.stopText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (Apne purane styles yahan rakhein)
  card: {
    backgroundColor: COLORS.CARD,
    padding: 20,
    borderRadius: 24,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  statusBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0, 200, 150, 0.1)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.SUCCESS, marginRight: 6 },
  statusText: { color: COLORS.SUCCESS, fontSize: 10, fontWeight: "800" },
  bucketType: { color: COLORS.TEXT_MUTED, fontSize: 10, fontWeight: "700" },
  amountContainer: { flexDirection: "row", alignItems: "baseline", marginBottom: 20 },
  currencySymbol: { color: COLORS.TEXT_PRIMARY, fontSize: 20, fontWeight: "600", marginRight: 4 },
  amountText: { color: COLORS.TEXT_PRIMARY, fontSize: 36, fontWeight: "800" },
  perCycle: { color: COLORS.TEXT_MUTED, fontSize: 14, marginLeft: 6 },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginBottom: 20 },
  streakWrapper: { marginBottom: 20 },
  row: { flexDirection: "row", gap: 12 },
  pauseBtn: { flex: 2, backgroundColor: "rgba(255,255,255,0.08)", height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  pauseText: { color: "#fff", fontWeight: "600" },
  stopBtn: { flex: 1, backgroundColor: "rgba(255, 59, 48, 0.15)", height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255, 59, 48, 0.2)" },
  stopText: { color: COLORS.DANGER, fontWeight: "700" },

  // --- NEW MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertBox: {
    width: '100%',
    backgroundColor: COLORS.CARD,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  alertEmoji: { fontSize: 40, marginBottom: 16 },
  alertTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 8 },
  alertDesc: { color: COLORS.TEXT_MUTED, textAlign: 'center', fontSize: 14, lineHeight: 20, marginBottom: 24 },
  modalRow: { flexDirection: 'row', gap: 12 },
  cancelBtn: { flex: 1, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)' },
  cancelBtnText: { color: '#fff', fontWeight: '600' },
  confirmBtn: { flex: 1, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 16 },
  confirmBtnText: { fontWeight: '700' },
});