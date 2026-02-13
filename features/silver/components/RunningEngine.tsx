import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import { Bucket } from "../types";
import StreakCard from "./StreakCard";
 import BaseAlert from "../BaseAlert";
 import ManageSipMenu from "./ManageSipMenu";
/* 🔥 SILVER APIs */
import {
  pauseSilverSipApi,
  resumeSilverSipApi,
  stopSilverSipApi,
} from "@/services/silver";
``
interface Props {
  bucket: Bucket;
  engine: any;
  setEngine: any;
  reloadEngine?: () => void;
}


export default function RunningEngine({ bucket, engine, reloadEngine }: Props) {
  const currentEngine = engine.engines[bucket];
  console.log("🚀 RUNNING ENGINE DATA:", currentEngine);
console.log("🚀 SIP ID IN RUNNING:", currentEngine?.sip_id);

const sipId = currentEngine?.sip_id;
console.log("🔥 BUTTON PRESSED SIP ID:", sipId);

  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    type: "pause" | "stop";
  }>({ visible: false, type: "pause" });
const [baseAlert, setBaseAlert] = useState({
  visible: false,
  title: "",
  msg: "",
  type: "info" as "success" | "error" | "warning" | "info",
});
const [showManageMenu, setShowManageMenu] = useState(false);


const showAlert = (
  title: string,
  msg: string,
  type: "success" | "error" | "warning" | "info" = "info"
) => {
  setBaseAlert({ visible: true, title, msg, type });
};
  /* ================= BACKEND ACTION ================= */
  const confirmAction = async () => {
    try {
      const sipId = currentEngine?.sip_id;

    if (!sipId) {
  showAlert("Error", "SIP not found", "error");

        setAlertConfig({ ...alertConfig, visible: false });
        return;
      }


      /* ===== PAUSE / RESUME ===== */
      if (alertConfig.type === "pause") {
        if (currentEngine?.isPaused) {
          const res = await resumeSilverSipApi(sipId);
          console.log(" your SIP is ", sipId);

          console.log("RESUME", res);
         if (!res.success) {
  showAlert("Error", res.message, "error");
  return;
}

          showAlert("SIP resumed,successfully", "success");
        } else {
          console.log("your sip id is", sipId);
          const res = await pauseSilverSipApi(sipId);
          console.log("PAUSE", res);
         if (!res.success) {
  showAlert("Error", res.message, "error");
  return;
}

       showAlert("Success", "SIP resumed", "success");
;
        }
      }

      /* ===== STOP ===== */
      if (alertConfig.type === "stop") {
        console.log("tour si p id for paused is ",sipId)
        const res = await stopSilverSipApi(sipId);
        console.log("STOP", res);
        if (!res.success) return alert(res.message);
      showAlert("Success", "SIP stopped", "success");

      }

      reloadEngine && reloadEngine();
    } catch (e) {
      console.log("RUNNING ENGINE ERROR", e);
 showAlert("Server Error","Something went wrong","error")
    } finally {
      setAlertConfig({ ...alertConfig, visible: false });
    }
  };

  
  console.log("CURRENT ENGINE 👉", currentEngine);

  return (
    <>
      {/* ================= MODAL ================= */}
      <Modal visible={alertConfig.visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertEmoji}>
              {alertConfig.type === "pause" ? "⏸️" : "🛑"}
            </Text>

          <Text style={styles.alertTitle}>
  {alertConfig.type === "pause"
    ? currentEngine?.isPaused
      ? "Resume SIP?"
      : "Pause SIP?"
    : "Stop SIP?"}
</Text>


            <Text style={styles.alertDesc}>
              {alertConfig.type === "pause"
                ? "Silver SIP will pause temporarily."
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
                        : COLORS.ACCENT,
                  },
                ]}
              >
                <Text style={styles.confirmBtnText}>
                  {alertConfig.type === "pause" ? "Confirm" : "Stop"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================= CARD ================= */}
      <View style={styles.card}>
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

        {/* <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setAlertConfig({ visible: true, type: "pause" })}
            style={styles.pauseBtn}
          >
            <Text style={styles.pauseText}>
              {currentEngine?.isPaused ? "RESUME" : "PAUSE"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAlertConfig({ visible: true, type: "stop" })}
            style={styles.stopBtn}
          >
            <Text style={styles.stopText}>STOP</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{ marginTop: 14 }}>
  <TouchableOpacity
    style={styles.manageBtn}
    onPress={() => setShowManageMenu(true)}
    activeOpacity={0.8}
  >
    <Text style={styles.manageText}>MANAGE SIP</Text>
  </TouchableOpacity>
</View>

        <BaseAlert
  visible={baseAlert.visible}
  title={baseAlert.title}
  message={baseAlert.msg}
  type={baseAlert.type}
  confirmText="OK"
  onConfirm={() => setBaseAlert({ ...baseAlert, visible: false })}
  onCancel={() => setBaseAlert({ ...baseAlert, visible: false })}
/>
<ManageSipMenu
  visible={showManageMenu}
  onClose={() => setShowManageMenu(false)}
  onPausePress={() => setAlertConfig({ visible: true, type: "pause" })}
  onStopPress={() => setAlertConfig({ visible: true, type: "stop" })}
  isPaused={currentEngine?.isPaused}
/>


      </View>
    </>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 200, 150, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.SUCCESS,
    marginRight: 6,
  },
  statusText: { color: COLORS.SUCCESS, fontSize: 10, fontWeight: "800" },
  bucketType: { color: COLORS.TEXT_MUTED, fontSize: 10, fontWeight: "700" },
  amountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  currencySymbol: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: "600",
    marginRight: 4,
  },

  manageBtn: {
  backgroundColor: "#E5E4E2",
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ffffff15",
  marginTop: 10,
},

manageText: {
  color: "#104e64",
  fontWeight: "700",
  fontSize: 14,
  letterSpacing: 1,
},

  amountText: { color: COLORS.TEXT_PRIMARY, fontSize: 36, fontWeight: "800" },
  perCycle: { color: COLORS.TEXT_MUTED, fontSize: 14, marginLeft: 6 },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 20,
  },
  streakWrapper: { marginBottom: 20 },
  row: { flexDirection: "row", gap: 12 },
  pauseBtn: {
    flex: 2,
    backgroundColor: "#E5E7EB",
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  pauseText: { color: "#141313", fontWeight: "600" },
  stopBtn: {
    flex: 1,
    backgroundColor: "#ef4444",
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 59, 48, 0.2)",
  },
  stopText: { color: "#1b1919", fontWeight: "700" },

  // --- NEW MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  alertBox: {
    width: "100%",
    backgroundColor: COLORS.CARD,
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  alertEmoji: { fontSize: 40, marginBottom: 16 },
  alertTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  alertDesc: {
    color: COLORS.TEXT_MUTED,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  modalRow: { flexDirection: "row", gap: 12 },
  cancelBtn: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  cancelBtnText: { color: "#fff", fontWeight: "600" },
  confirmBtn: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  confirmBtnText: { fontWeight: "700" },
});
