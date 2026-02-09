
// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
// import { Bucket, SilverEngineState } from "../types";
// import { COLORS, calculateGrams } from "../constants";
// import { buySilverApi, createSilverSipApi } from "@/services/silver";

// // import { buySilverApi } from "@/services/silver";
// interface Props {
//   bucket: Bucket;
//   engine: SilverEngineState;
//   setEngine: React.Dispatch<React.SetStateAction<SilverEngineState>>;
  
//   reloadEngine?: () => void;   // 🔥 ADD THIS
// }

// // Actions ke liye types define kiye hain
// type ActionType = "BUY" | "PAUSE" | "STOP";

// export default function BuyFlow({ bucket, engine, setEngine,
//   reloadEngine
//  }: Props) {
//   const [amount, setAmount] = useState<string>("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [currentAction, setCurrentAction] = useState<ActionType>("BUY");

//   const grams = calculateGrams(Number(amount) || 0, engine.pricePerGram);
//   const currentSIP = engine.engines[bucket as keyof typeof engine.engines];

//   // --- Modal Open karne wale functions ---
//   const onBuyPress = () => {
//     if (Number(amount) <= 0) return;
//     setCurrentAction("BUY");
//     setShowConfirm(true);
//   };

//   const onPausePress = () => {
//     setCurrentAction("PAUSE");
//     setShowConfirm(true);
//   };

//   const onStopPress = () => {
//     setCurrentAction("STOP");
//     setShowConfirm(true);
//   };


// // const handleAction = async () => {
// //   try {
// //     if (currentAction === "BUY") {
// //       // 🔥 instant buy call
// //       const res = await buySilverApi(Number(amount));
// //       console.log("BUY RES", res);

// //       if (!res.success) {
// //         alert(res.message || "Buy failed");
// //         return;
// //       }

// //       alert("Silver purchased successfully");
// //     }

// //     setShowConfirm(false);
// //     setAmount("");

// //     // 🔥 wait for backend update
// //     setTimeout(() => {
// //       reloadEngine && reloadEngine();
// //     }, 1200);

// //   } catch (e) {
// //     console.log("BUY ERROR", e);
// //     alert("Server error");
// //   }
// // };

// const handleAction = async () => {
//   try {

//     if (currentAction === "BUY") {

//       /* ===== INSTANT BUY ===== */
//       if (bucket === "instant") {
//         const res = await buySilverApi(Number(amount));
//         console.log("BUY RES 👉", res);

//         if (!res?.success) {
//           alert(res?.message || "Buy failed");
//           return;
//         }

//         alert("Silver purchased successfully");
//       }

//       /* ===== CREATE SIP ===== */
//       if (bucket !== "instant") {
//         const res = await createSilverSipApi(Number(amount));
//         console.log("CREATE SIP 👉", res);

//         if (!res?.success) {
//           alert(res?.message || "SIP failed");
//           return;
//         }

//         alert("SIP started successfully");
//       }
//     }

//     setShowConfirm(false);
//     setAmount("");

//     // 🔥 backend ko time do update ka
//     setTimeout(() => {
//       reloadEngine && reloadEngine();
//     }, 1500);

//   } catch (e) {
//     console.log("BUY/SIP ERROR ❌", e);
//     alert("Server error");
//   }
// };


//   // --- UI Content based on Action ---
//   const getModalUI = () => {
//     switch (currentAction) {
//       case "BUY":
//         return {
//           title: bucket === "instant" ? "Confirm Purchase" : "Start SIP",
//           msg: `Confirm investment of ₹${amount}?`,
//           btn: COLORS.ACCENT,
//           text: "Confirm Buy"
//         };
//       case "PAUSE":
//         const isPaused = currentSIP?.isPaused;
//         return {
//           title: isPaused ? "Resume SIP" : "Pause SIP",
//           msg: `Are you sure you want to ${isPaused ? "resume" : "pause"} your investment?`,
//           btn: "#E5E7EB",
//           text: isPaused ? "Resume Now" : "Pause Now"
//         };
//       case "STOP":
//         return {
//           title: "Stop Investment",
//           msg: "This will permanently deactivate this SIP. Continue?",
//           btn: "#FF453A",
//           text: "Stop Permanently"
//         };
//     }
//   };

//   const modalUI = getModalUI();

//   return (
//     <View style={styles.card}>
//       <Text style={styles.label}>ENTER AMOUNT</Text>
//       <View style={styles.inputContainer}>
//         <Text style={styles.currencySymbol}>₹</Text>
//         <TextInput
//           keyboardType="numeric"
//           placeholder="0.00"
//           placeholderTextColor={COLORS.TEXT_MUTED}
//           value={amount}
//           onChangeText={setAmount}
//           style={styles.input}
//         />
//       </View>

//       <TouchableOpacity style={styles.buyBtn} onPress={onBuyPress}>
//         <Text style={styles.buyText}>{bucket === "instant" ? "BUY NOW" : "ACTIVATE SIP"}</Text>
//       </TouchableOpacity>

//       {/* SIP Management Buttons (Sirf tab dikhenge jab SIP active ho) */}
// {bucket !== "instant" && (currentSIP?.status === "ACTIVE" || currentSIP?.status === "PAUSED") && (
//   <View style={styles.manageRow}>
//     <TouchableOpacity onPress={onPausePress} style={styles.secondaryBtn}>
//       <Text style={styles.secondaryBtnText}>
//         {currentSIP?.status === "PAUSED" ? "RESUME" : "PAUSE"}
//       </Text>
//     </TouchableOpacity>

//     <TouchableOpacity
//       onPress={onStopPress}
//       style={[styles.secondaryBtn, { borderColor: "#FF453A22" }]}
//     >
//       <Text style={[styles.secondaryBtnText, { color: "#FF453A" }]}>
//         STOP
//       </Text>
//     </TouchableOpacity>
//   </View>
// )}


//       {/* ================= MODAL ================= */}
//       <Modal visible={showConfirm} transparent animationType="fade">
//         <View style={styles.overlay}>
//           <View style={styles.modal}>
//             <Text style={styles.modalTitle}>{modalUI.title}</Text>
//             <Text style={styles.modalMsg}>{modalUI.msg}</Text>

//             <View style={styles.modalActions}>
//               <TouchableOpacity style={styles.backBtn} onPress={() => setShowConfirm(false)}>
//                 <Text style={styles.backText}>Go Back</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.confirmBtn, { backgroundColor: modalUI.btn }]} 
//                 onPress={handleAction}
//               >
//                 <Text style={styles.confirmText}>{modalUI.text}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }





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
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>("BUY");

  const grams = calculateGrams(Number(amount) || 0, engine.pricePerGram);
  const currentSIP = engine.engines[bucket as keyof typeof engine.engines];

  /* =====================================================
        🔥 GET SIP TYPE DYNAMIC
  ===================================================== */
  const getSipType = () => {
    if (bucket === "daily") return "DAILY";
    if (bucket === "weekly") return "WEEKLY";
    if (bucket === "monthly") return "MONTHLY";
    return "DAILY";
  };

  /* =====================================================
        🔥 BUTTON ACTIONS
  ===================================================== */
  const onBuyPress = () => {
    if (Number(amount) <= 0) return alert("Enter valid amount");
    setCurrentAction("BUY");
    setShowConfirm(true);
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
            alert(res?.message || "Buy failed");
            return;
          }

          alert("Silver purchased successfully");
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
    } catch (e) {
      console.log("BUY/SIP ERROR ❌", e);
      alert("Server error");
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

      <TouchableOpacity style={styles.buyBtn} onPress={onBuyPress}>
        <Text style={styles.buyText}>
          {bucket === "instant" ? "BUY NOW" : "ACTIVATE SIP"}
        </Text>
      </TouchableOpacity>

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
    </View>
  );
}
// Yahan aapki purani StyleSheet as it is rahegi...
const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.CARD, padding: 24, borderRadius: 28, marginTop: 12 },
  label: { color: COLORS.TEXT_MUTED, fontSize: 11, fontWeight: "800", letterSpacing: 1, marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.CARD_DARK, borderRadius: 18, paddingHorizontal: 16, height: 60, marginBottom: 16 },
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
  confirmText: { color: "#000", fontWeight: "900" },
});