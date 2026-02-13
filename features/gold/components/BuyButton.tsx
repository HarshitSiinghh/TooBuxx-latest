import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../data/constants";
import BaseAlert from "@/features/silver/BaseAlert";

import { GoldEngineState, GoldTab, Karat } from "../types";

import { buyGoldApi, createGoldSipApi } from "@/services/gold";

interface Props {
  bucket: GoldTab;
  engine: GoldEngineState;
  setEngine: React.Dispatch<React.SetStateAction<GoldEngineState>>;
  reloadEngine: () => void; // 🔥 IMPORTANT
  caret: Karat; // 🔥 IMPORTANT
}

type ActionType = "BUY";

export default function GoldBuyFlow({
  bucket,
  engine,
  setEngine,
  reloadEngine,
  caret,
}: Props) {
  const [amount, setAmount] = useState<string>("");
  const [grams, setGrams] = useState(0);

  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
    type: "info", // success | error | info
  });
  // 🔥 breakdown popup state
const [showBreakdown, setShowBreakdown] = useState(false);

const [breakdown, setBreakdown] = useState({
  goldValue: 0,
  gst: 0,
  total: 0,
  grams: 0,
});


  const [showConfirm, setShowConfirm] = useState(false);
  const [processing, setProcessing] = useState(false);

  const showAlert = (
    title: string,
    message: string = "",
    type: string = "info",
  ) => {
    setAlert({
      visible: true,
      title,
      message,
      type,
    });
  };

  const GOLD_ACCENT = "#FFD700";

  // const onBuyPress = () => {
  //   if (Number(amount) <= 0) {
  //     showAlert("Invalid Amount", "Enter valid investment amount", "error");
  //     return;
  //   }

  //   setShowConfirm(true);
  // };



  const onBuyPress = () => {
  const num = Number(amount);

  if (num <= 0) {
    showAlert("Invalid Amount", "Enter valid investment amount", "error");
    return;
  }

  /* ===== FRONTEND CALCULATION ===== */
  const gst = num * 0.03; // 3% GST
  const goldValue = num - gst;

  let pricePerGram = 0;
  if (caret === "18K") pricePerGram = engine?.price18k || 0;
  if (caret === "22K") pricePerGram = engine?.price22k || 0;
  if (caret === "24K") pricePerGram = engine?.price24k || 0;

  let g = 0;
  if (pricePerGram > 0) {
    g = goldValue / pricePerGram;
  }

  setBreakdown({
    goldValue,
    gst,
    total: num,
    grams: g,
  });

  // 🔥 confirm ke jagah breakdown open
  setShowBreakdown(true);
};

  /* ================= MAIN ACTION ================= */

  const handleAction = async () => {
    try {
      if (processing) return;
      setProcessing(true);

      const numAmount = Number(amount);

      /* ===== INSTANT BUY ===== */
      if (bucket === "instant") {
        const res = await buyGoldApi(numAmount, caret);
        console.log("BUY GOLD 👉", res);

        if (!res?.success) {
          setProcessing(false);
          showAlert("Failed", res?.message || "Buy failed", "error");
          return;
        }
        showAlert("Success", "Gold purchased successfully", "success");
      } else {
        /* ===== SIP CREATE ===== */
        let sipType: "DAILY" | "WEEKLY" | "MONTHLY" = "DAILY";
        if (bucket === "weekly") sipType = "WEEKLY";
        if (bucket === "monthly") sipType = "MONTHLY";

        const res = await createGoldSipApi(numAmount, sipType, caret);

        console.log("CREATE GOLD SIP 👉", res);

        if (!res?.success) {
          setProcessing(false);
          showAlert("Failed", res?.message || "SIP failed", "error");
          return;
        }
        showAlert("Success", `${sipType} SIP started successfully`, "success");
      }

      setAmount("");
      setShowConfirm(false);

      // 🔥 backend sync wait
      // setTimeout(() => {
      //   reloadEngine();
      // }, 800);
    } catch (e) {
      console.log("GOLD BUY ERROR", e);
      showAlert("Server Error", "Please try again", "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>ENTER AMOUNT TO INVEST</Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.currencySymbol, { color: GOLD_ACCENT }]}>₹</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor={COLORS.TEXT_MUTED || "#666"}
          value={amount}
          // onChangeTe   xt={setAmount}

  onChangeText={(val) => {
  setAmount(val);

  const num = Number(val);

  if (!num || num <= 0) {
    setGrams(0);
    return;
  }

  // 🔥 price according to karat
  let pricePerGram = 0;

  if (caret === "18K") pricePerGram = engine?.price18k || 0;
  if (caret === "22K") pricePerGram = engine?.price22k || 0;
  if (caret === "24K") pricePerGram = engine?.price24k || 0;

  if (pricePerGram > 0) {
    const calculated = num / pricePerGram;
    setGrams(calculated);
  } else {
    setGrams(0);
  }
}}


          style={styles.input}
        />

{/* 🔥 SHOW GRAMS BELOW INPUT */}


      </View>
      {/* 🔥 QUICK PRICE BUTTONS */}
<View style={styles.quickRow}>
  {["10", "50", "100", "500"].map((val) => (
    <TouchableOpacity
      key={val}
      style={styles.quickBtn}
      activeOpacity={0.8}
      onPress={() => {
        setAmount(val);

        const num = Number(val);

        let pricePerGram = 0;
        if (caret === "18K") pricePerGram = engine?.price18k || 0;
        if (caret === "22K") pricePerGram = engine?.price22k || 0;
        if (caret === "24K") pricePerGram = engine?.price24k || 0;

        if (pricePerGram > 0) {
          setGrams(num / pricePerGram);
        }
      }}
    >
      <Text style={styles.quickText}>₹{val}</Text>
    </TouchableOpacity>
  ))}
</View>

{grams > 0 && (
  <Text
    style={{
      color: "#FFD700",
      textAlign: "center",
      marginTop: -21,
      marginBottom: 22,
      marginLeft:75,
      fontWeight: "800",
      fontSize: 12,
    }}
  >
    You will get ≈ {grams.toFixed(5)}g {caret} gold
  </Text>
)}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.buyBtn, { backgroundColor: GOLD_ACCENT }]}
        onPress={onBuyPress}
      >
        <Text style={styles.buyText}>
          {bucket === "instant" ? "BUY GOLD NOW" : "START GOLD SIP"}
        </Text>
      </TouchableOpacity>





{/* ================= BREAKDOWN POPUP ================= */}
<Modal visible={showBreakdown} transparent animationType="fade">
  <View style={styles.blurOverlay}>
    <View style={styles.breakdownCard}>

      {/* header */}
      <View style={styles.breakHeader}>
        <Text style={styles.breakTitle}>BREAKDOWN</Text>

        <TouchableOpacity onPress={() => setShowBreakdown(false)}>
          <Text style={{ color: "#aaa", fontSize: 22 }}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* inner card */}
      <View style={styles.innerCard}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Gold Value</Text>
          <Text style={styles.rowValue}>
            ₹{breakdown.goldValue.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>GST (3%)</Text>
          <Text style={styles.rowValue}>
            ₹{breakdown.gst.toFixed(2)}
          </Text>
        </View>

        <View style={styles.dashed} />

        <View style={styles.row}>
          <Text style={[styles.rowLabel, { fontWeight: "800" }]}>
            Amount to be paid
          </Text>
          <Text style={[styles.rowValue, { fontSize: 18 }]}>
            ₹{breakdown.total}
          </Text>
        </View>

        <Text style={styles.qty}>
          QUANTITY 💰 ({breakdown.grams.toFixed(5)} g)
        </Text>
      </View>

      {/* PAY NOW */}
      <TouchableOpacity
        style={styles.payBtn}
        activeOpacity={0.9}
        onPress={() => {
          setShowBreakdown(false);

          // 🔥 same old flow continue
          setShowConfirm(true);
        }}
      >
        <Text style={styles.payText}>PAY NOW</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>


      

      {/* ===== CONFIRM MODAL ===== */}
      <Modal visible={showConfirm} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View
              style={[styles.modalIndicator, { backgroundColor: GOLD_ACCENT }]}
            />

            <Text style={styles.modalTitle}>
              {bucket === "instant"
                ? "Confirm Gold Purchase"
                : "Start Gold SIP"}
            </Text>

            <Text style={styles.modalMsg}>
              Invest ₹{amount} in {caret} Gold?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmBtn,
                  {
                    backgroundColor: GOLD_ACCENT,
                    opacity: processing ? 0.6 : 1,
                  },
                ]}
                onPress={handleAction}
                disabled={processing}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>
      {/* ===== PREMIUM GOLD ALERT ===== */}
<BaseAlert
  visible={alert.visible}
  title={alert.title}
  message={alert.message}
  type={alert.type as any}
  confirmText="OK"
  onConfirm={()=>{
    setAlert({ visible:false,title:"",message:"",type:"info" });

    // 🔥 RELOAD ONLY AFTER OK PRESS
    reloadEngine();
  }}
  onCancel={()=>
    setAlert({ visible:false,title:"",message:"",type:"info"})
  }
/>



    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.CARD || "#1A1A1A",
    padding: 24,
    borderRadius: 30,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.05)",
  },
  alertOverlay: {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
},

alertBox: {
  width: "85%",
  backgroundColor: "#1C1C1E",
  borderRadius: 26,
  padding: 26,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "rgba(255,215,0,0.2)",
},

alertIconWrap: {
  width: 70,
  height: 70,
  borderRadius: 40,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 14,
},

alertTitle: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "900",
  marginBottom: 6,
  textAlign: "center",},

blurOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Depth ke liye thoda aur dark
    justifyContent: "center",
    alignItems: "center",
  },

  breakdownCard: {
    width: "92%",
    backgroundColor: "#062B33",
    borderRadius: 28,
    padding: 24,
    // Subtle border premium apps jaisa feel deta hai
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)", 
  },

  breakHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  breakTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  innerCard: {
    backgroundColor: "#0B3A44",
    borderRadius: 22,
    padding: 20,
    marginBottom: 24,
    // Soft shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  rowLabel: {
    color: "#94AAB0", // Readable muted color
    fontSize: 15,
    fontWeight: "500",
  },

  rowValue: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },

  dashed: {
    height: 1,
    borderStyle: "dashed",
    borderWidth: 0.8,
    borderColor: "#2C4A52",
    marginVertical: 14,
    borderRadius: 1,
  },

  qty: {
    color: "#00E0A4",
    marginTop: 8,
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5,
    textAlign: 'center', // Isse layout balanced dikhega
    backgroundColor: "rgba(0, 224, 164, 0.1)", // Subtle highlight
    paddingVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },

  payBtn: {
    height: 62,
    borderRadius: 20,
    backgroundColor: "#FFC107",
    justifyContent: "center",
    alignItems: "center",
    // Shadow for the button
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  payText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

alertMsg: {
  color: "#aaa",
  fontSize: 14,
  textAlign: "center",
  marginBottom: 20,
},

alertBtn: {
  width: "100%",
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: "center",
},

alertBtnText: {
  color: "#000",
  fontWeight: "900",
  fontSize: 15,
},
quickRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
},

quickBtn: {
  flex: 1,
  height: 50,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 5,
  backgroundColor: "rgba(255,255,255,0.03)",
},

quickText: {
  color: "#aaa",
  fontWeight: "800",
  fontSize: 15,
},


  label: {
    color: COLORS.TEXT_MUTED || "#999",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 12,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.CARD_DARK || "#111",
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 70,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  currencySymbol: { fontSize: 26, fontWeight: "700", marginRight: 8 },
  input: { flex: 1, color: "#fff", fontSize: 28, fontWeight: "800" },
  buyBtn: {
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  buyText: {
    fontWeight: "900",
    color: "#000",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  manageRow: { flexDirection: "row", gap: 12, marginTop: 16 },
  secondaryBtn: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  secondaryBtnText: { color: "#FFF", fontWeight: "700", fontSize: 13 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#1C1C1E",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 20,
    opacity: 0.5,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  modalMsg: {
    color: "#A0A0A0",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30,
  },
  modalActions: { flexDirection: "row", gap: 15, width: "100%" },
  cancelBtn: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
  },
  cancelText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  confirmBtn: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: { color: "#000", fontWeight: "900", fontSize: 16 },
});
