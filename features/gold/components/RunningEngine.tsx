
import StreakCard from "@/features/silver/components/StreakCard";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../data/constants";
 import BaseAlert from "@/features/silver/BaseAlert";
import { GoldEngineState, GoldTab } from "../types";

import {
  pauseGoldSipApi,
  resumeGoldSipApi,
  stopGoldSipApi,
} from "@/services/gold";
import ManageSipMenu from "./ManageSipMenu";

interface Props {
  bucket: GoldTab;
  engine: GoldEngineState;
  setEngine: React.Dispatch<React.SetStateAction<GoldEngineState>>;
  reloadEngine: () => void;
  caret: "18K" | "22K" | "24K";
}

export default function RunningEngine({
  bucket,
  engine,
  setEngine,
  reloadEngine,
  caret,
}: Props) {
  const currentEngine = engine.engines[bucket];

  if (!currentEngine || !currentEngine.isActive) return null;

  const sipId = currentEngine?.data?.sip_id;

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    type: "stop",
  });
const [showManageMenu, setShowManageMenu] = useState(false);

  const [processing, setProcessing] = useState(false);
const [baseAlert, setBaseAlert] = useState({
  visible: false,
  title: "",
  msg: "",
  type: "info" as "success" | "error" | "warning" | "info",
});

  const GOLD_ACCENT = "#FFD700";


  const showAlert = (
  title: string,
  msg: string,
  type: "success" | "error" | "warning" | "info" = "info"
) => {
  setBaseAlert({
    visible: true,
    title,
    msg,
    type,
  });
};

  /* ================= PAUSE / RESUME ================= */

  const handlePauseToggle = async () => {
    try {
      if (processing) return;
      setProcessing(true);

      if (!sipId) {
        setProcessing(false);
      showAlert("Error", "Sip id missing", "error");
return;

      }

      /* PAUSE */
      if (!currentEngine.isPaused) {
        const res = await pauseGoldSipApi(sipId);
        console.log("PAUSE GOLD 👉", res);

        if (!res?.success) {
          setProcessing(false);
     showAlert("Error", res?.message || "Failed", "error");
return;


        }
      showAlert("Success", "SIP paused", "success");

      } else {
        /* RESUME */
        const res = await resumeGoldSipApi(sipId);
        console.log("RESUME GOLD 👉", res);

        if (!res?.success) {
          setProcessing(false);
        showAlert("Error", res?.message || "Failed", "error");
return;

        }
showAlert("Success", "SIP resumed", "success");


      }

      // 🔥 WAIT backend sync
      // setTimeout(() => {
      //   reloadEngine();
      // }, 800);
    } catch (e) {
      console.log("PAUSE RESUME ERROR", e);
  showAlert("Server Error", "Something went wrong", "error");

    } finally {
      setProcessing(false);
    }
  };

  /* ================= STOP SIP ================= */

  const confirmStop = async () => {
    try {
      if (processing) return;
      setProcessing(true);

      if (!sipId) {
        setProcessing(false);
  showAlert("Error", "Sip id missing", "error");
return;

      }

      const res = await stopGoldSipApi(sipId, "BANK");
      console.log("STOP GOLD 👉", res);

      if (!res?.success) {
        setProcessing(false);
      showAlert("Error", res?.message || "Failed", "error");
return;

      }

  showAlert("Success", "SIP stopped successfully", "success");
//   setEngine((prev:any)=>({
//   ...prev,
//   engines:{
//     ...prev.engines,
//     [bucket]:{
//       ...prev.engines[bucket],
//       isActive:false
//     }
//   }
// }));

//       setAlertConfig({ visible: false, type: "stop" });



showAlert("Success", "SIP stopped successfully", "success");

// UI instant remove
setEngine((prev:any)=>({
  ...prev,
  engines:{
    ...prev.engines,
    [bucket]:{
      ...prev.engines[bucket],
      isActive:false,
      isPaused:false,
      data:null
    }
  }
}));

setAlertConfig({ visible:false, type:"stop" });


      // 🔥 WAIT backend sync
      // setTimeout(() => {
      //   reloadEngine();
      // }, 900);
    } catch (e) {
      console.log("STOP ERROR", e);
  showAlert("Error", "Stop failed", "error");

    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.card}>
      {/* ===== STOP MODAL ===== */}
      <Modal visible={alertConfig.visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertEmoji}>⚠️</Text>
            <Text style={styles.alertTitle}>Stop Gold SIP?</Text>
            <Text style={styles.alertDesc}>
              Stopping will deactivate this plan permanently.
            </Text>

            <View style={styles.modalRow}>
              <TouchableOpacity
                onPress={() => setAlertConfig({ visible: false, type: "stop" })}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelBtnText}>Keep Active</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmStop}
                disabled={processing}
                style={[
                  styles.confirmBtn,
                  { backgroundColor: "#FF453A", opacity: processing ? 0.6 : 1 },
                ]}
              >
                <Text style={[styles.confirmBtnText, { color: "#fff" }]}>
                  Stop Plan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* HEADER */}
      <View style={styles.header}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: currentEngine.isPaused
                ? "rgba(255, 159, 10, 0.1)"
                : "rgba(255, 215, 0, 0.1)",
            },
          ]}
        >
          <View
            style={[
              styles.pulseDot,
              {
                backgroundColor: currentEngine.isPaused
                  ? "#FF9F0A"
                  : GOLD_ACCENT,
              },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              { color: currentEngine.isPaused ? "#FF9F0A" : GOLD_ACCENT },
            ]}
          >
            {currentEngine.isPaused ? "SIP PAUSED" : "GOLD SIP ACTIVE"}
          </Text>
        </View>

        <Text style={styles.bucketType}>
          {bucket.toUpperCase()} • {caret}
        </Text>
      </View>

      {/* AMOUNT */}
      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>₹</Text>
        <Text style={styles.amountText}>
          {currentEngine?.data?.amount_per_cycle || 0}
        </Text>
        <Text style={styles.perCycle}>/ cycle</Text>
      </View>

      <View style={styles.divider} />

      {/* STREAK */}
      <View style={styles.streakWrapper}>
    <StreakCard streak={currentEngine?.streak || 0} />

      </View>


    

    <View style={{ marginTop: 14 }}>
  <TouchableOpacity
    style={styles.manageBtn}
    onPress={() => setShowManageMenu(true)}
    activeOpacity={0.8}
  >
    <Text style={styles.manageText}>MANAGE SIP</Text>
  </TouchableOpacity>
</View>


<ManageSipMenu
  visible={showManageMenu}
  onClose={() => setShowManageMenu(false)}
  onPausePress={handlePauseToggle}
  onStopPress={() => setAlertConfig({ visible: true, type: "stop" })}
  isPaused={currentEngine?.isPaused}
/>



  <BaseAlert
  visible={baseAlert.visible}
  title={baseAlert.title}
  message={baseAlert.msg}
  type={baseAlert.type}
  confirmText="OK"
  onConfirm={() => {
    setBaseAlert({ ...baseAlert, visible: false });
    reloadEngine(); // ONLY HERE
    //  setBaseAlert({ ...baseAlert, visible: false });
  }}
  onCancel={() =>
    setBaseAlert({ ...baseAlert, visible: false })
  }
/>



    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.CARD,
    padding: 20,
    borderRadius: 24,
    marginHorizontal: 16,
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pulseDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusText: { fontSize: 10, fontWeight: "800" },
  manageBtn: {
  backgroundColor: "#FFD700",
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ffffff15",
  marginTop: 12,
},

manageText: {
  color: "#0d0f0f",
  fontWeight: "700",
  fontSize: 14,
  letterSpacing: 1,
},

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
    backgroundColor:"#FFD700",
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  pauseText: { color: "#141212", fontWeight: "700" },
  stopBtn: {
    flex: 1,
    backgroundColor: "#ef4444",
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    color:"#fff",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 59, 48, 0.2)",
  },
  stopText: { color: "#fff", fontWeight: "700" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  alertBox: {
    width: "100%",
    backgroundColor: "#1C1C1E",
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
