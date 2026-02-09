

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Bucket } from "../types";
import { COLORS } from "../constants";
import StreakCard from "@/features/silver/components/StreakCard";

import {
  pausePlatinumSipApi,
  resumePlatinumSipApi,
  stopPlatinumSipApi,
} from "../../../services/platinium";

interface Props {
  bucket: Bucket;
  engine: any;
  setEngine: any;
  reloadEngine?: () => void;
}

export default function PlatinumRunningEngine({
  bucket,
  engine,
  reloadEngine,
}: Props) {

  const currentEngine = engine.engines[bucket];

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    type: "pause" as "pause" | "stop",
  });

  const PLATINUM_COLOR = COLORS.PLATINUM_ACCENT || "#00D2FF";

  /* ================= BACKEND ACTION ================= */
  const confirmAction = async () => {
    try {
      const sipId = currentEngine?.sip_id;

      if (!sipId) {
        alert("SIP id missing");
        setAlertConfig({ ...alertConfig, visible: false });
        return;
      }

      if (alertConfig.type === "pause") {
        const res = await pausePlatinumSipApi(sipId);
        console.log("PAUSE", res);
        if (res.success) alert("SIP paused");
      }

      if (alertConfig.type === "stop") {
        const res = await stopPlatinumSipApi(sipId);
        console.log("STOP", res);
        if (res.success) alert("SIP stopped");
      }

      reloadEngine && reloadEngine();
    } catch (e) {
      console.log("RUNNING ERROR", e);
      alert("Server error");
    } finally {
      setAlertConfig({ ...alertConfig, visible: false });
    }
  };

  return (
    <>
      {/* ================= MODAL (TOP LEVEL) ================= */}
      <Modal visible={alertConfig.visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertEmoji}>
              {alertConfig.type === "pause" ? "⏸️" : "⚠️"}
            </Text>

            <Text style={styles.alertTitle}>
              {alertConfig.type === "pause"
                ? "Pause Platinum SIP?"
                : "Stop Platinum SIP?"}
            </Text>

            <Text style={styles.alertDesc}>
              {alertConfig.type === "pause"
                ? "Your Platinum SIP will pause temporarily."
                : "This will permanently stop your SIP."}
            </Text>

            <View style={styles.modalRow}>
              <TouchableOpacity
                onPress={() =>
                  setAlertConfig({ ...alertConfig, visible: false })
                }
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmAction}
                style={[
                  styles.confirmBtn,
                  {
                    backgroundColor:
                      alertConfig.type === "stop"
                        ? COLORS.DANGER
                        : PLATINUM_COLOR,
                  },
                ]}
              >
                <Text style={styles.confirmBtnText}>
                  {alertConfig.type === "pause"
                    ? "Confirm Pause"
                    : "Stop Plan"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================= CARD ================= */}
      <View style={styles.card}>
        <View style={styles.header}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: "rgba(229, 228, 226, 0.1)" },
            ]}
          >
            <View
              style={[styles.pulseDot, { backgroundColor: PLATINUM_COLOR }]}
            />
            <Text style={[styles.statusText, { color: PLATINUM_COLOR }]}>
              PLATINUM ACTIVE
            </Text>
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
            onPress={() => {
              console.log("PAUSE CLICK");
              setAlertConfig({ visible: true, type: "pause" });
            }}
            style={styles.pauseBtn}
          >
            <Text style={styles.pauseText}>Pause Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("STOP CLICK");
              setAlertConfig({ visible: true, type: "stop" });
            }}
            style={styles.stopBtn}
          >
            <Text style={styles.stopText}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}







// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Modal ,StyleSheet} from "react-native";
// import { Bucket } from "../types";
// import { COLORS } from "../constants";
// import StreakCard from "@/features/silver/components/StreakCard";

// import {
//   pausePlatinumSipApi,
//   resumePlatinumSipApi,
//   stopPlatinumSipApi,
// } from "../../../services/platinium";

// interface Props {
//   bucket: Bucket;
//   engine: any;
//   setEngine: any;
//   reloadEngine?: () => void;
// }

// export default function PlatinumRunningEngine({
//   bucket,
//   engine,
//   reloadEngine,
// }: Props) {
//   const currentEngine = engine.engines[bucket];
  
//   // Status flags check karein
//   const isCurrentlyPaused = currentEngine?.status === "PAUSED";
//   const PLATINUM_COLOR = COLORS.PLATINUM_ACCENT || "#00D2FF";

//   const [alertConfig, setAlertConfig] = useState({
//     visible: false,
//     type: "pause" as "pause" | "stop",
//   });

//   /* ================= BACKEND ACTION ================= */
//   const confirmAction = async () => {
//     try {
//       const sipId = currentEngine?.sip_id;

//       if (!sipId) {
//         alert("SIP id missing");
//         setAlertConfig({ ...alertConfig, visible: false });
//         return;
//       }

//       if (alertConfig.type === "pause") {
//         // Toggle logic: Agar pehle se paused hai toh resume call karein
//         if (isCurrentlyPaused) {
//           const res = await resumePlatinumSipApi(sipId);
//           if (res.success) alert("SIP resumed successfully");
//           else alert(res.message || "Failed to resume");
//         } else {
//           const res = await pausePlatinumSipApi(sipId);
//           if (res.success) alert("SIP paused successfully");
//           else alert(res.message || "Failed to pause");
//         }
//       }

//       if (alertConfig.type === "stop") {
//         const res = await stopPlatinumSipApi(sipId);
//         if (res.success) alert("SIP stopped permanently");
//         else alert(res.message || "Failed to stop");
//       }

//       reloadEngine && reloadEngine();
//     } catch (e) {
//       console.log("RUNNING ERROR", e);
//       alert("Server error");
//     } finally {
//       setAlertConfig({ ...alertConfig, visible: false });
//     }
//   };

//   return (
//     <>
//       {/* ================= MODAL ================= */}
//       <Modal visible={alertConfig.visible} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.alertBox}>
//             <Text style={styles.alertEmoji}>
//               {alertConfig.type === "pause" ? (isCurrentlyPaused ? "▶️" : "⏸️") : "🛑"}
//             </Text>

//             <Text style={styles.alertTitle}>
//               {alertConfig.type === "pause"
//                 ? isCurrentlyPaused ? "Resume Platinum SIP?" : "Pause Platinum SIP?"
//                 : "Stop Platinum SIP?"}
//             </Text>

//             <Text style={styles.alertDesc}>
//               {alertConfig.type === "pause"
//                 ? isCurrentlyPaused ? "Your investment will start again." : "Your Platinum SIP will pause temporarily."
//                 : "This will permanently stop your SIP and cannot be undone."}
//             </Text>

//             <View style={styles.modalRow}>
//               <TouchableOpacity
//                 onPress={() => setAlertConfig({ ...alertConfig, visible: false })}
//                 style={styles.cancelBtn}
//               >
//                 <Text style={styles.cancelBtnText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={confirmAction}
//                 style={[
//                   styles.confirmBtn,
//                   {
//                     backgroundColor: alertConfig.type === "stop" ? COLORS.DANGER : PLATINUM_COLOR,
//                   },
//                 ]}
//               >
//                 <Text style={styles.confirmBtnText}>
//                   {alertConfig.type === "pause"
//                     ? isCurrentlyPaused ? "Confirm Resume" : "Confirm Pause"
//                     : "Stop Plan"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* ================= CARD ================= */}
//       <View style={styles.card}>
//         <View style={styles.header}>
//           <View style={[styles.statusBadge, { backgroundColor: "rgba(229, 228, 226, 0.1)" }]}>
//             <View style={[styles.pulseDot, { backgroundColor: isCurrentlyPaused ? "#FF9500" : PLATINUM_COLOR }]} />
//             <Text style={[styles.statusText, { color: isCurrentlyPaused ? "#FF9500" : PLATINUM_COLOR }]}>
//               {isCurrentlyPaused ? "SIP PAUSED" : "PLATINUM ACTIVE"}
//             </Text>
//           </View>
//           <Text style={styles.bucketType}>{bucket.toUpperCase()}</Text>
//         </View>

//         <View style={styles.amountContainer}>
//           <Text style={styles.currencySymbol}>₹</Text>
//           <Text style={styles.amountText}>{currentEngine.amount}</Text>
//           <Text style={styles.perCycle}>/ cycle</Text>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.streakWrapper}>
//           <StreakCard streak={currentEngine.streak || 0} />
//         </View>

//         <View style={styles.row}>
//           <TouchableOpacity
//             onPress={() => setAlertConfig({ visible: true, type: "pause" })}
//             style={styles.pauseBtn}
//           >
//             <Text style={styles.pauseText}>
//                {isCurrentlyPaused ? "Resume Plan" : "Pause Plan"}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => setAlertConfig({ visible: true, type: "stop" })}
//             style={styles.stopBtn}
//           >
//             <Text style={styles.stopText}>Stop</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// }
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.CARD,
    padding: 20,
    borderRadius: 24,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  statusBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  pulseDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusText: { fontSize: 10, fontWeight: "800" },
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertBox: {
    width: '100%',
    backgroundColor: "#1C1C1E",
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
