

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
// import { Bucket } from "../types";
// import { COLORS, calculateGrams } from "../constants";

// // 🔥 BACKEND APIs
// import {
//   buyPlatinumApi,
//   createPlatinumSipApi,
//   pausePlatinumSipApi,
//   resumePlatinumSipApi,
//   stopPlatinumSipApi,
// } from "../../../services/platinium";

// /* =====================================================
//     🔥 PROPS UPDATE
// ===================================================== */
// interface Props {
//   bucket: Bucket;
//   engine: any;
//   setEngine: any;
//   reloadEngine?: () => void;
// }

// type ActionType = "BUY" | "PAUSE" | "STOP";

// export default function PlatinumBuyFlow({ bucket, engine, setEngine, reloadEngine }: Props) {
//   const [amount, setAmount] = useState<string>("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [currentAction, setCurrentAction] = useState<ActionType>("BUY");

//   const grams = calculateGrams(Number(amount) || 0, engine?.pricePerGram || 0);
//   const currentSIP = engine?.engines?.[bucket];

//   const onBuyPress = () => {
//     if (Number(amount) <= 0) return alert("Enter valid amount");
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

//   /* =====================================================
//       🔥 FULL BACKEND ACTION HANDLER
//   ===================================================== */
//   const handleAction = async () => {
//     try {
//       /* ================= BUY ================= */
//       if (currentAction === "BUY") {
//         if (bucket === "instant") {
//           // 🔥 BUY INSTANT
//           const res = await buyPlatinumApi(Number(amount));
//           console.log("BUY RES", res);

//           if (res.success) {
//             alert("Platinum bought successfully 🔥");
//             setAmount("");
//             reloadEngine && reloadEngine();
//           } else {
//             alert(res.message || "Buy failed");
//           }
//         } else {
//           // 🔥 CREATE SIP
//           const res = await createPlatinumSipApi(Number(amount));
//           console.log("SIP CREATE", res);

//           if (res.success) {
//             alert("SIP started 🚀");
//             setAmount("");
//             reloadEngine && reloadEngine();
//           } else {
//             alert(res.message || "SIP failed");
//           }
//         }
//       }

//       /* ================= PAUSE / RESUME ================= */
//       else if (currentAction === "PAUSE") {
//         const sipId = engine?.engines?.[bucket]?.sip_id;
//         if (!sipId) return alert("SIP id missing");

//         const isPaused = engine?.engines?.[bucket]?.isPaused;

//         if (isPaused) {
//           const res = await resumePlatinumSipApi(sipId);
//           if (res.success) alert("SIP resumed");
//         } else {
//           const res = await pausePlatinumSipApi(sipId);
//           if (res.success) alert("SIP paused");
//         }

//         reloadEngine && reloadEngine();
//       }

//       /* ================= STOP ================= */
//       else if (currentAction === "STOP") {
//         const sipId = engine?.engines?.[bucket]?.sip_id;
//         if (!sipId) return alert("SIP id missing");

//         const res = await stopPlatinumSipApi(sipId);

//         if (res.success) {
//           alert("SIP stopped");
//           reloadEngine && reloadEngine();
//         } else {
//           alert(res.message || "Stop failed");
//         }
//       }
//     } catch (e) {
//       console.log("ACTION ERROR", e);
//       alert("Server error");
//     } finally {
//       setShowConfirm(false);
//     }
//   };

//   /* =====================================================
//       MODAL UI
//   ===================================================== */
//   const getModalUI = () => {
//     switch (currentAction) {
//       case "BUY":
//         return {
//           title: bucket === "instant" ? "Confirm Platinum Buy" : "Start Platinum SIP",
//           msg: `Confirm investment of ₹${amount} in Platinum?`,
//           btn: COLORS.PLATINUM_ACCENT,
//           text: "Confirm"
//         };

//       case "PAUSE":
//         const isPaused = currentSIP?.isPaused;
//         return {
//           title: isPaused ? "Resume SIP" : "Pause SIP",
//           msg: `Do you want to ${isPaused ? "resume" : "pause"} SIP?`,
//           btn: "#FF9F0A",
//           text: isPaused ? "Resume" : "Pause"
//         };

//       case "STOP":
//         return {
//           title: "Stop SIP",
//           msg: "This will permanently stop your SIP. Continue?",
//           btn: "#FF453A",
//           text: "Stop"
//         };
//     }
//   };

//   const modalUI = getModalUI()!;

//   return (
//     <View style={styles.card}>
//       <Text style={styles.label}>ENTER PLATINUM AMOUNT</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.currencySymbol}>₹</Text>
//         <TextInput
//           keyboardType="numeric"
//           placeholder="0"
//           placeholderTextColor={COLORS.TEXT_MUTED}
//           value={amount}
//           onChangeText={setAmount}
//           style={styles.input}
//         />
//       </View>

//       {/* BUY BTN */}
//       <TouchableOpacity 
//         style={[styles.buyBtn, { backgroundColor: COLORS.PLATINUM_ACCENT }]} 
//         onPress={onBuyPress}
//       >
//         <Text style={styles.buyText}>
//           {bucket === "instant" ? "BUY NOW" : "ACTIVATE SIP"}
//         </Text>
//       </TouchableOpacity>

//       {/* MANAGE SIP */}
//       {bucket !== "instant" && currentSIP?.isActive && (
//         <View style={styles.manageRow}>
//           <TouchableOpacity onPress={onPausePress} style={styles.secondaryBtn}>
//             <Text style={styles.secondaryBtnText}>
//               {currentSIP?.isPaused ? "RESUME" : "PAUSE"}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             onPress={onStopPress} 
//             style={[styles.secondaryBtn, { borderColor: '#FF453A22' }]}
//           >
//             <Text style={[styles.secondaryBtnText, { color: '#FF453A' }]}>STOP</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* CONFIRM MODAL */}
//       <Modal visible={showConfirm} transparent animationType="fade">
//         <View style={styles.overlay}>
//           <View style={styles.modal}>
//             <Text style={styles.modalTitle}>{modalUI.title}</Text>
//             <Text style={styles.modalMsg}>{modalUI.msg}</Text>

//             <View style={styles.modalActions}>
//               <TouchableOpacity 
//                 style={styles.backBtn} 
//                 onPress={() => setShowConfirm(false)}
//               >
//                 <Text style={styles.backText}>Cancel</Text>
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




// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
// import { Bucket } from "../types";
// import { COLORS, calculateGrams } from "../constants";

// import {
//   buyPlatinumApi,
//   createPlatinumSipApi,
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

// type ActionType = "BUY" | "PAUSE" | "STOP";

// export default function PlatinumBuyFlow({ bucket, engine, reloadEngine }: Props) {
//   const [amount, setAmount] = useState<string>("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [currentAction, setCurrentAction] = useState<ActionType>("BUY");
// const [processing,setProcessing] = useState(false);

//   const grams = calculateGrams(Number(amount) || 0, engine?.pricePerGram || 0);
//   const currentSIP = engine?.engines?.[bucket];

//   // /* 🔥 DYNAMIC SIP TYPE */
//   // const getSipType = () => {
//   //   if (bucket === "daily") return "DAILY";
//   //   if (bucket === "weekly") return "WEEKLY";
//   //   if (bucket === "monthly") return "MONTHLY";
//   //   return "WEEKLY";
//   // };


//   const getSipType = (): "DAILY" | "WEEKLY" | "MONTHLY" => {
//   if (bucket === "daily") return "DAILY";
//   if (bucket === "weekly") return "WEEKLY";
//   if (bucket === "monthly") return "MONTHLY";
//   return "WEEKLY";
// };


//   const onBuyPress = () => {
//     if (Number(amount) <= 0) return alert("Enter valid amount");
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

//   /* =====================================================
//       🔥 MAIN ACTION HANDLER
//   ===================================================== */
//   const handleAction = async () => {
//     try {
//       console.log("🟢 CURRENT BUCKET 👉", bucket);

//       /* ================= BUY / SIP ================= */
//       if (currentAction === "BUY") {
//         if (bucket === "instant") {
//           const res = await buyPlatinumApi(Number(amount));
//           console.log("BUY RES", res);

//           if (!res?.success) return alert(res?.message || "Buy failed");

//           alert("Platinum purchased successfully");
//         } else {
//     const payload = {
//   amount_per_cycle: Number(amount),
//   sip_type: getSipType() as "DAILY" | "WEEKLY" | "MONTHLY",
// };


//           console.log("🚀 PLATINUM SIP PAYLOAD", payload);

//           const res = await createPlatinumSipApi(payload);
//           console.log("SIP CREATE RES", res);

//           if (!res?.success) return alert(res?.message || "SIP failed");

//           alert(`${getSipType()} SIP started successfully`);
//         }
//       }

//       /* ================= PAUSE / RESUME ================= */
//       if (currentAction === "PAUSE") {
//         const sipId = engine?.engines?.[bucket]?.sip_id;
//         if (!sipId) return alert("SIP not found");

//         if (currentSIP?.isPaused) {
//           const res = await resumePlatinumSipApi(sipId);
//           if (!res?.success) return alert(res?.message);
//           alert("SIP resumed");
//         } else {
//           const res = await pausePlatinumSipApi(sipId);
//           if (!res?.success) return alert(res?.message);
//           alert("SIP paused");
//         }
//       }

//       /* ================= STOP ================= */
//       if (currentAction === "STOP") {
//         const sipId = engine?.engines?.[bucket]?.sip_id;
//         if (!sipId) return alert("SIP not found");

//         const res = await stopPlatinumSipApi(sipId);
//         console.log("STOP RES", res);

//         if (!res?.success) return alert(res?.message || "Stop failed");

//         alert("SIP stopped successfully");
//       }

//       setAmount("");
//    setTimeout(() => {
//   reloadEngine && reloadEngine();
// }, 800);
//     } catch (e) {
//       console.log("ACTION ERROR", e);
//       alert("Server error");
//     } finally {
//       setShowConfirm(false);
//     }
//   };

//   /* ================= MODAL UI ================= */
//   const getModalUI = () => {
//     switch (currentAction) {
//       case "BUY":
//         return {
//           title: bucket === "instant" ? "Confirm Buy" : "Start SIP",
//           msg: `Confirm investment of ₹${amount}?`,
//           btn: COLORS.PLATINUM_ACCENT,
//           text: "Confirm",
//         };

//       case "PAUSE":
//         return {
//           title: currentSIP?.isPaused ? "Resume SIP" : "Pause SIP",
//           msg: currentSIP?.isPaused
//             ? "Resume your platinum SIP?"
//             : "Pause your platinum SIP?",
//           btn: "#FF9F0A",
//           text: currentSIP?.isPaused ? "Resume" : "Pause",
//         };

//       case "STOP":
//         return {
//           title: "Stop SIP",
//           msg: "This will permanently stop your SIP. Continue?",
//           btn: "#FF453A",
//           text: "Stop",
//         };
//     }
//   };

//   const modalUI = getModalUI()!;

//   return (
//     <View style={styles.card}>
//       <Text style={styles.label}>ENTER AMOUNT</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.currencySymbol}>₹</Text>
//         <TextInput
//           keyboardType="numeric"
//           placeholder="0"
//           placeholderTextColor={COLORS.TEXT_MUTED}
//           value={amount}
//           onChangeText={setAmount}
//           style={styles.input}
//         />
//       </View>

//       <TouchableOpacity
//         style={[styles.buyBtn, { backgroundColor: COLORS.PLATINUM_ACCENT }]}
//         onPress={onBuyPress}
//       >
//         <Text style={styles.buyText}>
//           {bucket === "instant" ? "BUY NOW" : "ACTIVATE SIP"}
//         </Text>
//       </TouchableOpacity>

//       {bucket !== "instant" && currentSIP?.isActive && (
//         <View style={styles.manageRow}>
//           <TouchableOpacity onPress={onPausePress} style={styles.secondaryBtn}>
//             <Text style={styles.secondaryBtnText}>
//               {currentSIP?.isPaused ? "RESUME" : "PAUSE"}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={onStopPress}
//             style={[styles.secondaryBtn, { borderColor: "#FF453A22" }]}
//           >
//             <Text style={[styles.secondaryBtnText, { color: "#FF453A" }]}>
//               STOP
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* MODAL */}
//       <Modal visible={showConfirm} transparent animationType="fade">
//         <View style={styles.overlay}>
//           <View style={styles.modal}>
//             <Text style={styles.modalTitle}>{modalUI.title}</Text>
//             <Text style={styles.modalMsg}>{modalUI.msg}</Text>

//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={styles.backBtn}
//                 onPress={() => setShowConfirm(false)}
//               >
//                 <Text style={styles.backText}>Cancel</Text>
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
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Bucket } from "../types";
import { COLORS, calculateGrams } from "../constants";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>("BUY");
  const [processing, setProcessing] = useState(false);

  const grams = calculateGrams(Number(amount) || 0, engine?.pricePerGram || 0);
  const currentSIP = engine?.engines?.[bucket];

  /* 🔥 DYNAMIC SIP TYPE */
  const getSipType = (): "DAILY" | "WEEKLY" | "MONTHLY" => {
    if (bucket === "daily") return "DAILY";
    if (bucket === "weekly") return "WEEKLY";
    if (bucket === "monthly") return "MONTHLY";
    return "WEEKLY";
  };

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
    if (processing) return;
    setProcessing(true);

    try {
      console.log("🟢 CURRENT BUCKET 👉", bucket);

      /* ================= BUY / SIP ================= */
      if (currentAction === "BUY") {
        if (bucket === "instant") {
          const res = await buyPlatinumApi(Number(amount));
          console.log("BUY RES", res);

          if (!res?.success) {
            alert(res?.message || "Buy failed");
            return;
          }

          alert("Platinum purchased successfully");
        } else {
          const payload = {
            amount_per_cycle: Number(amount),
            sip_type: getSipType(),
          };

          console.log("🚀 SIP PAYLOAD", payload);

          const res = await createPlatinumSipApi(payload);
          console.log("SIP CREATE RES", res);

          if (!res?.success) {
            alert(res?.message || "SIP failed");
            return;
          }

          alert(`${getSipType()} SIP started successfully`);
        }
      }

      /* ================= PAUSE / RESUME ================= */
      if (currentAction === "PAUSE") {
        const sipId = engine?.engines?.[bucket]?.sip_id;
        console.log("⏸ SIP ID", sipId);

        if (!sipId) {
          alert("SIP not found");
          return;
        }

        if (currentSIP?.isPaused) {
          const res = await resumePlatinumSipApi(sipId);
          console.log("RESUME", res);

          if (!res?.success) return alert(res?.message);
          alert("SIP resumed");
        } else {
          const res = await pausePlatinumSipApi(sipId);
          console.log("PAUSE", res);

          if (!res?.success) return alert(res?.message);
          alert("SIP paused");
        }
      }

      /* ================= STOP ================= */
      if (currentAction === "STOP") {
        const sipId = engine?.engines?.[bucket]?.sip_id;
        console.log("🛑 STOP SIP ID", sipId);

        if (!sipId) {
          alert("SIP not found");
          return;
        }

        const res = await stopPlatinumSipApi(sipId);
        console.log("STOP RES", res);

        if (!res?.success) {
          alert(res?.message || "Stop failed");
          return;
        }

        alert("SIP stopped successfully");
      }

      setAmount("");

      /* 🔥 reload after backend update */
      setTimeout(() => {
        reloadEngine && reloadEngine();
      }, 900);

    } catch (e) {
      console.log("ACTION ERROR", e);
      alert("Server error");
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

      <TouchableOpacity
        style={[styles.buyBtn, { backgroundColor: COLORS.PLATINUM_ACCENT }]}
        onPress={onBuyPress}
        disabled={processing}
      >
        <Text style={styles.buyText}>
          {bucket === "instant" ? "BUY NOW" : "ACTIVATE SIP"}
        </Text>
      </TouchableOpacity>

      {/* SIP manage */}
      {bucket !== "instant" && currentSIP?.isActive && (
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
      )}

      {/* MODAL */}
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

// Styles mostly same, bas color accents switch kar sakte ho agar specific Platinum theme hai
const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.CARD, padding: 24, borderRadius: 28, marginTop: 12 },
  label: { color: COLORS.TEXT_MUTED, fontSize: 11, fontWeight: "800", letterSpacing: 1, marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.CARD_DARK, borderRadius: 18, paddingHorizontal: 16, height: 60, marginBottom: 16 },
  currencySymbol: { color: COLORS.PLATINUM_ACCENT || "#E5E4E2", fontSize: 22, fontWeight: "700", marginRight: 6 },
  input: { flex: 1, color: "#fff", fontSize: 24, fontWeight: "700" },
  buyBtn: { height: 56, borderRadius: 16, justifyContent: "center", alignItems: "center" },
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