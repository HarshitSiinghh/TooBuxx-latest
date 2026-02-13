


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Bucket, SilverEngineState } from "../types";
import { COLORS, calculateGrams } from "../constants";
import { buySilverApi, createSilverSipApi } from "@/services/silver";
 import BaseAlert from "../BaseAlert";

interface Props {
  bucket: Bucket;
  engine: SilverEngineState;
  setEngine: React.Dispatch<React.SetStateAction<SilverEngineState>>;
  reloadEngine?: () => void;
}

type ActionType = "BUY" | "PAUSE" | "STOP";

export default function BuyFlow({
  bucket,
  engine,
  setEngine,
  reloadEngine,
}: Props) {
  const [amount, setAmount] = useState<string>("");
  // 🔥 BREAKDOWN POPUP STATE
const [showBreakdown, setShowBreakdown] = useState(false);

const [breakdown, setBreakdown] = useState({
  metalValue: 0,
  gst: 0,
  total: 0,
  grams: 0,
});

  const [showConfirm, setShowConfirm] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>("BUY");
const [alertVisible, setAlertVisible] = useState(false);
const [alertData, setAlertData] = useState({
  title: "",
  msg: "",
  type: "info" as "success" | "error" | "warning" | "info",
});

  const grams = calculateGrams(Number(amount) || 0, engine.pricePerGram);
  const currentSIP = engine.engines[bucket as keyof typeof engine.engines];

  /* 
  
   //show alert function //
    


   
   // 
   
   
   =====================================================
        🔥 GET SIP TYPE DYNAMIC
  ===================================================== */

const showAlert = (
  title: string,
  msg: string,
  type: "success" | "error" | "warning" | "info" = "info"
) => {
  setAlertData({ title, msg, type });
  setAlertVisible(true);
};


  const getSipType = () => {
    if (bucket === "daily") return "DAILY";
    if (bucket === "weekly") return "WEEKLY";
    if (bucket === "monthly") return "MONTHLY";
    return "DAILY";
  };

  /* =====================================================
        🔥 BUTTON ACTIONS
  ===================================================== */
//   const onBuyPress = () => {
// if (Number(amount) <= 0) {
//   showAlert("Invalid Amount", "Please enter valid amount", "warning");
//   return;
// }

//     setCurrentAction("BUY");
//     setShowConfirm(true);
//   };
const onBuyPress = () => {
  const num = Number(amount);

  if (num <= 0) {
    showAlert("Invalid Amount", "Please enter valid amount", "warning");
    return;
  }

  // 🔥 FRONTEND BREAKDOWN CALC
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

  // 🔥 confirm se pehle breakdown
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
    try {
      console.log("🟢 CURRENT TAB 👉", bucket);

      if (currentAction === "BUY") {
        /* ================= INSTANT BUY ================= */
        if (bucket === "instant") {
          console.log("🔥 INSTANT BUY AMOUNT", amount);

          const res = await buySilverApi(Number(amount));
          console.log("BUY RES 👉", res);

      if (!res?.success) {
  showAlert("Error", res?.message || "Buy failed", "error");
  return;
}


         showAlert("Success", "Silver purchased successfully", "success");

        }

        /* ================= CREATE SIP ================= */
        if (bucket !== "instant") {
      const payload = {
  amount_per_cycle: Number(amount),
  sip_type: getSipType() as "DAILY" | "WEEKLY" | "MONTHLY",
};


          console.log("🚀 CREATING SIP PAYLOAD", payload);

          const res = await createSilverSipApi(payload);
          console.log("CREATE SIP RESPONSE 👉", res);

          if (!res?.success) {
            alert(res?.message || "SIP failed");
            return;
          }

          alert(`${getSipType()} SIP started successfully`);
        }
      }

      setShowConfirm(false);
      setAmount("");

      // 🔥 backend update wait
      setTimeout(() => {
        reloadEngine && reloadEngine();
      }, 1500);
    } catch(e){
 showAlert("Server Error","Something went wrong","error")
}

  };

  /* =====================================================
        🔥 MODAL UI
  ===================================================== */
  const getModalUI = () => {
    switch (currentAction) {
      case "BUY":
        return {
          title: bucket === "instant" ? "Confirm Purchase" : "Start SIP",
          msg: `Confirm investment of ₹${amount}?`,
          btn: COLORS.ACCENT,
          text: "Confirm",
        };
      case "PAUSE":
        const isPaused = currentSIP?.isPaused;
        return {
          title: isPaused ? "Resume SIP" : "Pause SIP",
          msg: `Are you sure you want to ${
            isPaused ? "resume" : "pause"
          } your SIP?`,
          btn: "#E5E7EB",
          text: isPaused ? "Resume" : "Pause",
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

  const modalUI = getModalUI();

  return (
    <View style={styles.card}>
      <Text style={styles.label}>ENTER AMOUNT</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>₹</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="0.00"
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

{/* 🔥 SILVER GRAMS PREVIEW */}
{Number(amount) > 0 && (
  <View
    style={{
      // backgroundColor: "rgba(192,192,192,0.08)",
      marginTop: -25,
       marginBottom: 12,
       marginLeft:75,
      paddingVertical: 10,
      borderRadius: 14,
    }}
  >
    <Text
      style={{
        color: "#C0C0C0",
        textAlign: "center",
        fontWeight: "800",
        fontSize: 14,
      }}
    >
      You will get ≈ {grams.toFixed(3)}g silver
    </Text>
  </View>
)}

      <TouchableOpacity style={styles.buyBtn} onPress={onBuyPress}>
        <Text style={styles.buyText}>
          {bucket === "instant" ? "BUY NOW" : "ACTIVATE SIP"}
        </Text>
      </TouchableOpacity>




{/* ================= BREAKDOWN POPUP ================= */}
<Modal visible={showBreakdown} transparent animationType="fade">
  <View style={styles.breakOverlay}>
    <View style={styles.breakCard}>

      <View style={styles.breakHeader}>
        <Text style={styles.breakTitle}>BREAKDOWN</Text>

        <TouchableOpacity onPress={()=>setShowBreakdown(false)}>
          <Text style={styles.breakClose}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.breakInner}>
        <View style={styles.breakRow}>
          <Text style={styles.breakLabel}>Silver Value</Text>
          <Text style={styles.breakValue}>
            ₹{breakdown.metalValue.toFixed(2)}
          </Text>
        </View>

        <View style={styles.breakRow}>
          <Text style={styles.breakLabel}>GST (3%)</Text>
          <Text style={styles.breakValue}>
            ₹{breakdown.gst.toFixed(2)}
          </Text>
        </View>

        <View style={styles.breakDivider} />

        <View style={styles.breakRow}>
          <Text style={styles.breakPayLabel}>Amount to pay</Text>
          <Text style={styles.breakPayValue}>
            ₹{breakdown.total}
          </Text>
        </View>

        <Text style={styles.breakQty}>
          QUANTITY ({breakdown.grams.toFixed(3)} g)
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.payBtnFull,{backgroundColor:COLORS.ACCENT}]}
        onPress={()=>{
          setShowBreakdown(false);
          setShowConfirm(true);
        }}
      >
        <Text style={styles.confirmText}>PAY NOW</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

      {/* ================= MODAL ================= */}
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
      <BaseAlert
  visible={alertVisible}
  title={alertData.title}
  message={alertData.msg}
  type={alertData.type}
  confirmText="OK"
  onConfirm={() => setAlertVisible(false)}
  onCancel={() => setAlertVisible(false)}
/>

    </View>
  );
}
// Yahan aapki purani StyleSheet as it is rahegi...
const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.CARD, padding: 24, borderRadius: 28, marginTop: 12 },
  label: { color: COLORS.TEXT_MUTED, fontSize: 11, fontWeight: "800", letterSpacing: 1, marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.CARD_DARK, borderRadius: 18, paddingHorizontal: 16, height: 60, marginBottom: 16 },
  quickRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
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
  color: "#C0C0C0",
  fontWeight: "800",
  fontSize: 14,
},
breakOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // Darker for focus
    justifyContent: "center",
    alignItems: "center"
  },

  breakCard: {
    width: "90%",
    backgroundColor: "#062B33", // Your theme card color
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },

  breakHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  breakTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.5
  },

  breakClose: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 20,
    fontWeight: "300"
  },

  breakInner: {
    backgroundColor: "rgba(255,255,255,0.03)", // Subtle depth
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 16
  },

  breakRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },

  breakLabel: {
    color: "#8E8E93", // Muted text
    fontSize: 15,
    fontWeight: "500"
  },

  breakValue: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15
  },

  breakDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 14,
    borderStyle: 'dashed', // Adds a premium receipt feel
    borderRadius: 1,
  },

  breakPayLabel: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16
  },

  breakPayValue: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 22, // Pop out the final price
  },

  qtyBadge: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: "rgba(0, 224, 164, 0.08)",
    paddingVertical: 8,
    borderRadius: 12,
  },

  breakQty: {
    color: "#00E0A4", // Green accent for quantity
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.3
  },

  payBtnFull: {
    width: "100%",
    height: 64, // Slightly taller for better ergonomics
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // Shadow for the action button
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  confirmText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 18,
    letterSpacing: 1
  },
  currencySymbol: { color: COLORS.ACCENT, fontSize: 22, fontWeight: "700", marginRight: 6 },
  input: { flex: 1, color: "#fff", fontSize: 24, fontWeight: "700" },
  buyBtn: { backgroundColor: COLORS.ACCENT, height: 56, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  buyText: { fontWeight: "900", color: "#000", fontSize: 16 },
  
  manageRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  secondaryBtn: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)' },
  secondaryBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },

  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.85)", justifyContent: "center", alignItems: "center" },
  modal: { width: "85%", backgroundColor: "#1C1C1E", borderRadius: 30, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  modalTitle: { color: "#fff", fontSize: 20, fontWeight: "800", marginBottom: 8 },
  modalMsg: { color: "#8E8E93", textAlign: 'center', fontSize: 15, marginBottom: 24, lineHeight: 22 },
  modalActions: { flexDirection: "row", gap: 12 },
  backBtn: { flex: 1, height: 54, borderRadius: 16, justifyContent: "center", alignItems: "center", backgroundColor: "#2C2C2E" },
  backText: { color: "#FFF", fontWeight: "700" },
  confirmBtn: { flex: 1, height: 54, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  // confirmText: { color: "#000", fontWeight: "900" },
});

