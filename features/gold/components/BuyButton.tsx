

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
// import { GoldTab, GoldEngineState } from "../types"; 
// // import { COLORS } from "../constants";
//  import { COLORS } from "../data/constants";

// interface Props {
//   bucket: GoldTab; // Humne types mein GoldTab define kiya tha
//   engine: GoldEngineState;
//   setEngine: React.Dispatch<React.SetStateAction<GoldEngineState>>;
// }

// type ActionType = "BUY" | "PAUSE" | "STOP";

// export default function GoldBuyFlow({ bucket, engine, setEngine }: Props) {
//   const [amount, setAmount] = useState<string>("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [currentAction, setCurrentAction] = useState<ActionType>("BUY");

//   // Gold specific accent
//   const GOLD_ACCENT = "#FFD700";

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

// // GoldBuyFlow (BuyButton.tsx) ke handleAction function mein:
// const handleAction = () => {
//   let newEngine = { ...engine };
//   const numAmount = Number(amount);
//   const grams = numAmount / engine.pricePerGram;

//   if (currentAction === "BUY") {
//     newEngine.walletBalance -= numAmount;
    
//     // Grams update karo
//     newEngine.engines[bucket].savedGrams += grams;

//     // AGAR SIP HAI (not instant), TOH ISE ACTIVE KARO
//     if (bucket !== "instant") {
//       newEngine.engines[bucket].isActive = true;
//       newEngine.engines[bucket].isPaused = false;
//       newEngine.engines[bucket].amount = numAmount;
//     }
//     setAmount("");
//   }
//   // ... Pause/Stop logic as before
  
//   setEngine(newEngine);
//   setShowConfirm(false);
// };
//   const getModalUI = () => {
//     switch (currentAction) {
//       case "BUY":
//         return {
//           title: bucket === "instant" ? "Confirm Gold Purchase" : "Start Gold SIP",
//           msg: `Invest ₹${amount} in 24K Pure Gold?`,
//           btn: GOLD_ACCENT,
//           text: "Confirm Purchase"
//         };
//       case "PAUSE":
//         return {
//           title: "Pause Gold SIP",
//           msg: "Do you want to pause your recurring gold investment?",
//           btn: "#FF9F0A",
//           text: "Pause Now"
//         };
//       case "STOP":
//         return {
//           title: "Stop Gold SIP",
//           msg: "This will permanently stop this SIP. Are you sure?",
//           btn: "#FF453A",
//           text: "Stop SIP"
//         };
//     }
//   };

//   const modalUI = getModalUI();

//   return (
//     <View style={styles.card}>
//       <Text style={styles.label}>ENTER AMOUNT TO INVEST</Text>
      
//       <View style={styles.inputContainer}>
//         <Text style={[styles.currencySymbol, { color: GOLD_ACCENT }]}>₹</Text>
//         <TextInput
//           keyboardType="numeric"
//           placeholder="0.00"
//           placeholderTextColor={COLORS.TEXT_MUTED || "#666"}
//           value={amount}
//           onChangeText={setAmount}
//           style={styles.input}
//         />
//       </View>

//       <TouchableOpacity 
//         activeOpacity={0.8}
//         style={[styles.buyBtn, { backgroundColor: GOLD_ACCENT }]} 
//         onPress={onBuyPress}
//       >
//         <Text style={styles.buyText}>
//           {bucket === "instant" ? "BUY GOLD NOW" : "START GOLD SIP"}
//         </Text>
//       </TouchableOpacity>

//       {bucket !== "instant" && (
//         <View style={styles.manageRow}>
//           <TouchableOpacity onPress={onPausePress} style={styles.secondaryBtn}>
//             <Text style={styles.secondaryBtnText}>PAUSE</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={onStopPress} style={[styles.secondaryBtn, { borderColor: 'rgba(255, 69, 58, 0.2)' }]}>
//             <Text style={[styles.secondaryBtnText, { color: '#FF453A' }]}>STOP</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Confirmation Modal */}
//       <Modal visible={showConfirm} transparent animationType="slide">
//         <View style={styles.overlay}>
//           <View style={styles.modal}>
//             <View style={[styles.modalIndicator, { backgroundColor: modalUI?.btn }]} />
//             <Text style={styles.modalTitle}>{modalUI?.title}</Text>
//             <Text style={styles.modalMsg}>{modalUI?.msg}</Text>

//             <View style={styles.modalActions}>
//               <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowConfirm(false)}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.confirmBtn, { backgroundColor: modalUI?.btn }]} 
//                 onPress={handleAction}
//               >
//                 <Text style={styles.confirmText}>{modalUI?.text}</Text>
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
import { GoldTab, GoldEngineState, Karat } from "../types";
import { COLORS } from "../data/constants";

import { 
  buyGoldApi,
  createGoldSipApi
} from "@/services/gold";

interface Props {
  bucket: GoldTab;
  engine: GoldEngineState;
  setEngine: React.Dispatch<React.SetStateAction<GoldEngineState>>;
  reloadEngine: ()=>void;     // 🔥 IMPORTANT
  caret: Karat;               // 🔥 IMPORTANT
}

type ActionType = "BUY";

export default function GoldBuyFlow({ 
  bucket, 
  engine, 
  setEngine,
  reloadEngine,
  caret
}: Props) {

  const [amount, setAmount] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState(false);

  const GOLD_ACCENT = "#FFD700";

  const onBuyPress = () => {
    if (Number(amount) <= 0) return alert("Enter valid amount");
    setShowConfirm(true);
  };

  /* ================= MAIN ACTION ================= */

  const handleAction = async () => {
    try{

      const numAmount = Number(amount);

      /* ===== INSTANT BUY ===== */
      if(bucket==="instant"){
        const res = await buyGoldApi(numAmount,caret);
        console.log("BUY GOLD 👉",res);

        if(!res?.success) return alert(res?.message || "Buy failed");

        alert("Gold purchased successfully");
      }

      /* ===== SIP CREATE ===== */
      else{

        let sipType:"DAILY"|"WEEKLY"|"MONTHLY"="DAILY";
        if(bucket==="weekly") sipType="WEEKLY";
        if(bucket==="monthly") sipType="MONTHLY";

        const res = await createGoldSipApi(
          numAmount,
          sipType,
          caret
        );

        console.log("CREATE GOLD SIP 👉",res);

        if(!res?.success) return alert(res?.message || "SIP failed");

        alert(`${sipType} SIP started`);
      }

      setAmount("");
      setShowConfirm(false);

      reloadEngine(); // 🔥 refresh UI

    }catch(e){
      console.log("GOLD BUY ERROR",e);
      alert("Server error");
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
          onChangeText={setAmount}
          style={styles.input}
        />
      </View>

      <TouchableOpacity 
        activeOpacity={0.8}
        style={[styles.buyBtn, { backgroundColor: GOLD_ACCENT }]} 
        onPress={onBuyPress}
      >
        <Text style={styles.buyText}>
          {bucket === "instant" ? "BUY GOLD NOW" : "START GOLD SIP"}
        </Text>
      </TouchableOpacity>

      {/* ===== CONFIRM MODAL ===== */}
      <Modal visible={showConfirm} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={[styles.modalIndicator, { backgroundColor: GOLD_ACCENT }]} />
            
            <Text style={styles.modalTitle}>
              {bucket==="instant" ? "Confirm Gold Purchase" : "Start Gold SIP"}
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
                style={[styles.confirmBtn, { backgroundColor: GOLD_ACCENT }]} 
                onPress={handleAction}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
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
    borderColor: 'rgba(255, 215, 0, 0.05)'
  },
  label: { 
    color: COLORS.TEXT_MUTED || "#999", 
    fontSize: 10, 
    fontWeight: "800", 
    letterSpacing: 1.5, 
    marginBottom: 12,
    textAlign: 'center'
  },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.CARD_DARK || "#111", 
    borderRadius: 20, 
    paddingHorizontal: 20, 
    height: 70, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
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
    elevation: 6
  },
  buyText: { fontWeight: "900", color: "#000", fontSize: 16, letterSpacing: 0.5 },
  manageRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  secondaryBtn: { 
    flex: 1, 
    height: 50, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.02)' 
  },
  secondaryBtnText: { color: '#FFF', fontWeight: "700", fontSize: 13 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "flex-end" },
  modal: { 
    backgroundColor: "#1C1C1E", 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    padding: 30, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  modalIndicator: { width: 40, height: 4, borderRadius: 2, marginBottom: 20, opacity: 0.5 },
  modalTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 10 },
  modalMsg: { color: "#A0A0A0", textAlign: 'center', fontSize: 16, marginBottom: 30 },
  modalActions: { flexDirection: "row", gap: 15, width: '100%' },
  cancelBtn: { flex: 1, height: 60, borderRadius: 20, justifyContent: "center", alignItems: "center", backgroundColor: "#2C2C2E" },
  cancelText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  confirmBtn: { flex: 1, height: 60, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  confirmText: { color: "#000", fontWeight: "900", fontSize: 16 }
});