import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Bucket } from "../types";
import { COLORS, calculateGrams } from "../constants";
import BaseAlert from "@/features/silver/BaseAlert";
 import ManageSipMenu from "./ManageSipMenu";
import {
  buyPlatinumApi,
  createPlatinumSipApi,
  pausePlatinumSipApi,
  resumePlatinumSipApi,
  stopPlatinumSipApi,
} from "../../../services/platinium";

interface Props {
  bucket: Bucket;
  engine: any;
  reloadEngine?: () => void;
}

type ActionType = "BUY" | "PAUSE" | "STOP";

export default function PlatinumBuyFlow({ bucket, engine, reloadEngine }: Props) {
  const [amount, setAmount] = useState<string>("");
  const [showManageMenu, setShowManageMenu] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>("BUY");
  const [processing, setProcessing] = useState(false);

  const [baseAlert, setBaseAlert] = useState({
    visible: false,
    title: "",
    msg: "",
    type: "info" as "success" | "error" | "warning" | "info",
  });
  // 🔥 BREAKDOWN STATE
const [showBreakdown, setShowBreakdown] = useState(false);

const [breakdown, setBreakdown] = useState({
  metalValue: 0,
  gst: 0,
  total: 0,
  grams: 0,
});


  const grams = calculateGrams(Number(amount) || 0, engine?.pricePerGram || 0);
  const currentSIP = engine?.engines?.[bucket];

  /* 🔥 DYNAMIC SIP TYPE */
  const getSipType = (): "DAILY" | "WEEKLY" | "MONTHLY" => {
    if (bucket === "daily") return "DAILY";
    if (bucket === "weekly") return "WEEKLY";
    if (bucket === "monthly") return "MONTHLY";
    return "WEEKLY";
  };

  // const onBuyPress = () => {
  //   if (Number(amount) <= 0) {
  //     setBaseAlert({
  //       visible: true,
  //       title: "Invalid Amount",
  //       msg: "Please enter valid amount",
  //       type: "warning",
  //     });
  //     return;
  //   }

  //   setCurrentAction("BUY");
  //   setShowConfirm(true);
  // };


  const onBuyPress = () => {
  const num = Number(amount);

  if (num <= 0) {
    setBaseAlert({
      visible: true,
      title: "Invalid Amount",
      msg: "Please enter valid amount",
      type: "warning",
    });
    return;
  }

  /* 🔥 FRONTEND BREAKDOWN CALCULATION */
  const gst = num * 0.03;
  const metalValue = num - gst;

  let g = 0;
  if (engine?.pricePerGram) {
    g = metalValue / engine.pricePerGram;
  }

  setBreakdown({
    metalValue,
    gst,
    total: num,
    grams: g,
  });

  setCurrentAction("BUY");

  // 🔥 confirm ke pehle breakdown popup
  setShowBreakdown(true);
};


  const onPausePress = () => {
    setCurrentAction("PAUSE");
    setShowConfirm(true);
  };

  const onStopPress = () => {
    setCurrentAction("STOP");
    setShowConfirm(true);
  };

  /* =====================================================
      🔥 MAIN ACTION HANDLER
  ===================================================== */
  const handleAction = async () => {
    if (processing) return;
    setProcessing(true);

    try {
      /* ================= BUY / SIP ================= */
      if (currentAction === "BUY") {
        if (bucket === "instant") {
          const res = await buyPlatinumApi(Number(amount));

          if (!res?.success) {
            setBaseAlert({
              visible: true,
              title: "Error",
              msg: res?.message || "Buy failed",
              type: "error",
            });
            return;
          }

          setBaseAlert({
            visible: true,
            title: "Success",
            msg: "Platinum purchased successfully",
            type: "success",
          });
        } else {
          const payload = {
            amount_per_cycle: Number(amount),
            sip_type: getSipType(),
          };

          const res = await createPlatinumSipApi(payload);

          if (!res?.success) {
            setBaseAlert({
              visible: true,
              title: "Error",
              msg: res?.message || "SIP failed",
              type: "error",
            });
            return;
          }

          setBaseAlert({
            visible: true,
            title: "Success",
            msg: `${getSipType()} SIP started successfully`,
            type: "success",
          });
        }
      }

      /* ================= PAUSE / RESUME ================= */
      if (currentAction === "PAUSE") {
        const sipId = engine?.engines?.[bucket]?.sip_id;

        if (!sipId) {
          setBaseAlert({
            visible: true,
            title: "Error",
            msg: "SIP not found",
            type: "error",
          });
          return;
        }

        if (currentSIP?.isPaused) {
          const res = await resumePlatinumSipApi(sipId);

          if (!res?.success) {
            setBaseAlert({
              visible: true,
              title: "Error",
              msg: res?.message || "Resume failed",
              type: "error",
            });
            return;
          }

          setBaseAlert({
            visible: true,
            title: "Success",
            msg: "SIP resumed",
            type: "success",
          });
        } else {
          const res = await pausePlatinumSipApi(sipId);

          if (!res?.success) {
            setBaseAlert({
              visible: true,
              title: "Error",
              msg: res?.message || "Pause failed",
              type: "error",
            });
            return;
          }

          setBaseAlert({
            visible: true,
            title: "Success",
            msg: "SIP paused",
            type: "success",
          });
        }
      }

      /* ================= STOP ================= */
      if (currentAction === "STOP") {
        const sipId = engine?.engines?.[bucket]?.sip_id;

        if (!sipId) {
          setBaseAlert({
            visible: true,
            title: "Error",
            msg: "SIP not found",
            type: "error",
          });
          return;
        }

        const res = await stopPlatinumSipApi(sipId);

        if (!res?.success) {
          setBaseAlert({
            visible: true,
            title: "Error",
            msg: res?.message || "Stop failed",
            type: "error",
          });
          return;
        }

        setBaseAlert({
          visible: true,
          title: "Success",
          msg: "SIP stopped successfully",
          type: "success",
        });
      }

      setAmount("");

      setTimeout(() => {
        reloadEngine && reloadEngine();
      }, 900);

    } catch (e) {
      setBaseAlert({
        visible: true,
        title: "Server Error",
        msg: "Something went wrong",
        type: "error",
      });
    } finally {
      setProcessing(false);
      setShowConfirm(false);
    }
  };

  /* ================= MODAL UI ================= */
  const getModalUI = () => {
    switch (currentAction) {
      case "BUY":
        return {
          title: bucket === "instant" ? "Confirm Buy" : "Start SIP",
          msg: `Confirm investment of ₹${amount}?`,
          btn: COLORS.PLATINUM_ACCENT,
          text: "Confirm",
        };

      case "PAUSE":
        return {
          title: currentSIP?.isPaused ? "Resume SIP" : "Pause SIP",
          msg: currentSIP?.isPaused
            ? "Resume your platinum SIP?"
            : "Pause your platinum SIP?",
          btn: "#FF9F0A",
          text: currentSIP?.isPaused ? "Resume" : "Pause",
        };

      case "STOP":
        return {
          title: "Stop SIP",
          msg: "This will permanently stop your SIP. Continue?",
          btn: "#FF453A",
          text: "Stop",
        };
    }
  };

  const modalUI = getModalUI()!;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>ENTER AMOUNT</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>₹</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={COLORS.TEXT_MUTED}
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
      </View>
      {/* 🔥 QUICK AMOUNT BUTTONS */}
<View style={styles.quickRow}>
  {["10", "50", "100", "500"].map((val) => (
    <TouchableOpacity
      key={val}
      style={styles.quickBtn}
      onPress={() => setAmount(val)}
      activeOpacity={0.8}
    >
      <Text style={styles.quickText}>₹{val}</Text>
    </TouchableOpacity>
  ))}
</View>

      {/* 🔥 PLATINUM PREVIEW */}
{Number(amount) > 0 && (
  <View
    style={{
        marginTop: -25,
       marginBottom: 12,
       marginLeft:75,
      paddingVertical: 10,
      borderRadius: 14,
    }}
  >
    <Text
      style={{
        color: "#E5E4E2",
        textAlign: "center",
        fontWeight: "800",
        fontSize: 14,
      }}
    >
      You will get ≈ {grams.toFixed(5)}g platinum
    </Text>
  </View>
)}


      <TouchableOpacity
        style={[styles.buyBtn, { backgroundColor: COLORS.PLATINUM_ACCENT }]}
        onPress={onBuyPress}
        disabled={processing}
      >
        <Text style={styles.buyText}>
          {bucket === "instant" ? "BUY NOW" : "ACTIVATE SIP"}
        </Text>
      </TouchableOpacity>

      {/* {bucket !== "instant" && currentSIP?.isActive && (
        <View style={styles.manageRow}>
          <TouchableOpacity onPress={onPausePress} style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>
              {currentSIP?.isPaused ? "RESUME" : "PAUSE"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onStopPress}
            style={[styles.secondaryBtn, { borderColor: "#FF453A22" }]}
          >
            <Text style={[styles.secondaryBtnText, { color: "#FF453A" }]}>
              STOP
            </Text>
          </TouchableOpacity>
        </View>
      )}*/}


{bucket !== "instant" && currentSIP?.isActive && (
  <TouchableOpacity
    style={styles.manageSipBtn}
    onPress={() => setShowManageMenu(true)}
    activeOpacity={0.8}
  >
    <Text style={styles.manageSipText}>MANAGE SIP</Text>
  </TouchableOpacity>
)}

{/* // breakdown modal */}


{/* ================= BREAKDOWN POPUP ================= */}
<Modal visible={showBreakdown} transparent animationType="slide">
  <View style={styles.overlay}>
    <View style={styles.breakdownCard}>

      {/* Header */}
      <View style={styles.breakHeader}>
        <Text style={styles.breakTitle}>BREAKDOWN</Text>
        <TouchableOpacity 
          onPress={() => setShowBreakdown(false)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Inner Card */}
      <View style={styles.innerCard}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Platinum Value</Text>
          <Text style={styles.rowValue}>
            ₹{breakdown.metalValue.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>GST (3%)</Text>
          <Text style={styles.rowValue}>
            ₹{breakdown.gst.toFixed(2)}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Amount to pay</Text>
          <Text style={styles.totalValue}>
            ₹{breakdown.total}
          </Text>
        </View>

        <View style={styles.qtyBadge}>
          <Text style={styles.qtyText}>
             QUANTITY 💰 ({breakdown.grams.toFixed(5)} g)
          </Text>
        </View>
      </View>

      {/* PAY NOW */}
      <TouchableOpacity
        style={styles.payNowBtn}
        activeOpacity={0.8}
        onPress={() => {
          setShowBreakdown(false);
          setShowConfirm(true);
        }}
      >
        <Text style={styles.payNowText}>PAY NOW</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>



{/* //  confirmation modal for buy/pause/stop actions */}
      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{modalUI.title}</Text>
            <Text style={styles.modalMsg}>{modalUI.msg}</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.backText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: modalUI.btn }]}
                onPress={handleAction}
              >
                <Text style={styles.confirmText}>{modalUI.text}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      <ManageSipMenu
  visible={showManageMenu}
  onClose={() => setShowManageMenu(false)}
  onPausePress={onPausePress}
  onStopPress={onStopPress}
  isPaused={currentSIP?.isPaused}
/>


      <BaseAlert
        visible={baseAlert.visible}
        title={baseAlert.title}
        message={baseAlert.msg}
        type={baseAlert.type}
        confirmText="OK"
        onConfirm={() => setBaseAlert({ ...baseAlert, visible: false })}
        onCancel={() => setBaseAlert({ ...baseAlert, visible: false })}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.CARD, padding: 24, borderRadius: 28, marginTop: 12 },

  overlay: { 
    flex: 1, 
     backgroundColor: "rgba(0, 0, 0, 0.4)", // Thoda zyada dark focus ke liye
    justifyContent: "center", 
    alignItems: "center" 
  },
  breakdownCard: { 
    width: "88%", 
    backgroundColor: COLORS.CARD || "#1C1C1E", // Card background from your theme
    borderRadius: 30, 
    padding: 24, 
    borderWidth: 1, 
    borderColor: "rgba(255,255,255,0.1)" 
  },

  // Header
  breakHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  breakTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  closeIcon: {
    color: "#aaa",
    fontSize: 24,
    fontWeight: "300",
  },

  // Inner Details Card
  innerCard: {
    backgroundColor: COLORS.CARD_DARK || "rgba(0,0,0,0.2)", 
    padding: 20,
    borderRadius: 22,
    width: "100%",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  rowLabel: {
    color: COLORS.TEXT_MUTED || "#8E8E93",
    fontSize: 14,
    fontWeight: "600",
  },
  rowValue: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 12,
    borderStyle: 'dashed', // Premium look ke liye dashed bhi use kar sakte hain
    borderWidth: 0.5,
    borderColor: '#444'
  },
  totalLabel: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

//   manageSipBtn: {
//   backgroundColor: "#1C1C1E",
//   paddingVertical: 14,
//   borderRadius: 14,
//   alignItems: "center",
//   marginTop: 12,
//   borderWidth: 1,
//   borderColor: "#ffffff15",
// },

// manageSipText: {
//   color: "#fff",
//   fontWeight: "700",
//   fontSize: 14,
//   letterSpacing: 1,
// },


manageSipBtn: {
  backgroundColor: "#104e64", // Ultra-transparent white
  paddingVertical: 16, // Thoda extra breathing space
  borderRadius: 18, // Zyada modern rounded corners
  alignItems: "center",
  marginTop: 14,
  borderWidth: 1.5,
  borderColor: "#E5E4E2", // Platinum color
  shadowColor: "#00D2FF", // Light blue glow
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 2,
},

manageSipText: {
  color: "#E5E4E2", // Platinum text
  fontWeight: "800", // Extra bold for premium feel
  fontSize: 13,
  textTransform: "uppercase", // Professional look
  letterSpacing: 1.5, // High-end branding style
},
  totalValue: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 20,
  },

  // Quantity Badge
  qtyBadge: {
    backgroundColor: "rgba(0, 224, 164, 0.12)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  qtyText: {
    color: "#00E0A4",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.5,
  },

  // Pay Button
  payNowBtn: {
    backgroundColor: COLORS.PLATINUM_ACCENT || "#E5E4E2", 
    width: "100%",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  payNowText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 18,
    letterSpacing: 1,
  },
  label: { color: COLORS.TEXT_MUTED, fontSize: 11, fontWeight: "800", letterSpacing: 1, marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.CARD_DARK, borderRadius: 18, paddingHorizontal: 16, height: 60, marginBottom: 16 },
  currencySymbol: { color: COLORS.PLATINUM_ACCENT || "#E5E4E2", fontSize: 22, fontWeight: "700", marginRight: 6 },
  input: { flex: 1, color: "#fff", fontSize: 24, fontWeight: "700" },
  buyBtn: { height: 56, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  buyText: { fontWeight: "900", color: "#000", fontSize: 16 },
  
  manageRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  secondaryBtn: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)' },
  secondaryBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },

  quickRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 15,
},

quickBtn: {
  flex: 1,
  height: 45,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 4,
  backgroundColor: "rgba(255,255,255,0.04)",
},

quickText: {
  color: "#E5E4E2",
  fontWeight: "800",
  fontSize: 14,
},


  // overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.85)", justifyContent: "center", alignItems: "center" },
  modal: { width: "85%", backgroundColor: "#1C1C1E", borderRadius: 30, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  modalTitle: { color: "#fff", fontSize: 20, fontWeight: "800", marginBottom: 8 },
  modalMsg: { color: "#8E8E93", textAlign: 'center', fontSize: 15, marginBottom: 24, lineHeight: 22 },
  modalActions: { flexDirection: "row", gap: 12 },
  backBtn: { flex: 1, height: 54, borderRadius: 16, justifyContent: "center", alignItems: "center", backgroundColor: "#2C2C2E" },
  backText: { color: "#FFF", fontWeight: "700" },
  confirmBtn: { flex: 1, height: 54, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  confirmText: { color: "#000", fontWeight: "900" },
});