
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Bucket } from "../types";
import { COLORS } from "../constants";
import StreakCard from "@/features/silver/components/StreakCard";
import BaseAlert from "@/features/silver/BaseAlert";
 import ManageSipMenu from "./ManageSipMenu";


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
  const [showManageMenu, setShowManageMenu] = useState(false);


  const [baseAlert, setBaseAlert] = useState({
    visible: false,
    title: "",
    msg: "",
    type: "info" as "success" | "error" | "warning" | "info",
  });

  const PLATINUM_COLOR = COLORS.PLATINUM_ACCENT || "#00D2FF";

  /* ================= BACKEND ACTION ================= */
  const confirmAction = async () => {
    try {
      const sipId = currentEngine?.sip_id;

      if (!sipId) {
        setBaseAlert({
          visible: true,
          title: "Error",
          msg: "SIP id missing",
          type: "error",
        });

        setAlertConfig({ ...alertConfig, visible: false });
        return;
      }

      if (alertConfig.type === "pause") {
        if (currentEngine?.isPaused) {
          const res = await resumePlatinumSipApi(sipId);

          if (res?.success) {
            setBaseAlert({
              visible: true,
              title: "Success",
              msg: "SIP resumed",
              type: "success",
            });
          } else {
            setBaseAlert({
              visible: true,
              title: "Error",
              msg: res?.message || "Resume failed",
              type: "error",
            });
          }
        } else {
          const res = await pausePlatinumSipApi(sipId);

          if (res?.success) {
            setBaseAlert({
              visible: true,
              title: "Success",
              msg: "SIP paused",
              type: "success",
            });
          } else {
            setBaseAlert({
              visible: true,
              title: "Error",
              msg: res?.message || "Pause failed",
              type: "error",
            });
          }
        }
      }

      if (alertConfig.type === "stop") {
        const res = await stopPlatinumSipApi(sipId);

        if (res?.success) {
          setBaseAlert({
            visible: true,
            title: "Success",
            msg: "SIP stopped",
            type: "success",
          });
        } else {
          setBaseAlert({
            visible: true,
            title: "Error",
            msg: res?.message || "Stop failed",
            type: "error",
          });
        }
      }

      reloadEngine && reloadEngine();
    } catch (e) {
      setBaseAlert({
        visible: true,
        title: "Server Error",
        msg: "Something went wrong",
        type: "error",
      });
    } finally {
      setAlertConfig({ ...alertConfig, visible: false });
    }
  };

  return (
    <>
      {/* ================= MODAL ================= */}
      <Modal visible={alertConfig.visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertEmoji}>
              {alertConfig.type === "pause" ? "⏸️" : "⚠️"}
            </Text>

            <Text style={styles.alertTitle}>
              {alertConfig.type === "pause"
                ? currentEngine?.isPaused
                  ? "Resume Platinum SIP?"
                  : "Pause Platinum SIP?"
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
                    ? currentEngine?.isPaused
                      ? "Resume"
                      : "Pause"
                    : "Stop"}
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

        {/* <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setAlertConfig({ visible: true, type: "pause" })}
            style={styles.pauseBtn}
          >
            <Text style={styles.pauseText}>
              {currentEngine?.isPaused ? "Resume Plan" : "Pause Plan"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAlertConfig({ visible: true, type: "stop" })}
            style={styles.stopBtn}
          >
            <Text style={styles.stopText}>Stop</Text>
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
  pauseBtn: { flex: 2, backgroundColor: "#E5E4E2", height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  pauseText: { color: "#111111", fontWeight: "600" },
  stopBtn: { flex: 1, backgroundColor: "#ef4444", height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255, 59, 48, 0.2)" },
  stopText: { color: "#111010", fontWeight: "700" },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
