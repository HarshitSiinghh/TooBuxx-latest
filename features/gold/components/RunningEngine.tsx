// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
// import { GoldTab, GoldEngineState } from "../types"; 
// import { COLORS } from "../data/constants";
// import StreakCard from "@/features/silver/components/StreakCard"; 

// interface Props {
//   bucket: GoldTab;
//   engine: GoldEngineState;
//   setEngine: React.Dispatch<React.SetStateAction<GoldEngineState>>;
// }

// export default function RunningEngine({ bucket, engine, setEngine }: Props) {
//   const currentEngine = engine.engines[bucket];
  
//   // Safety check
//   if (!currentEngine || !currentEngine.isActive) return null;

//   const [alertConfig, setAlertConfig] = useState<{
//     visible: boolean;
//     type: "stop"; // Pause modal ki zaroorat nahi hai agar hum direct toggle kar rahe hain
//   }>({ visible: false, type: "stop" });

//   const GOLD_ACCENT = "#FFD700";

//   // --- PAUSE / RESUME TOGGLE ---
//   const handlePauseToggle = () => {
//     let newEngine = { ...engine };
//     newEngine.engines[bucket].isPaused = !newEngine.engines[bucket].isPaused;
//     setEngine(newEngine);
//   };

//   // --- STOP SIP LOGIC ---
//   const confirmStop = () => {
//     let newEngine = { ...engine };
//     newEngine.engines[bucket] = {
//       ...newEngine.engines[bucket],
//       isActive: false, // Ise false karte hi Screen BuyFlow par switch ho jayegi
//       isPaused: false,
//       amount: 0,
//       streak: 0,
//     };
//     setEngine(newEngine);
//     setAlertConfig({ visible: false, type: "stop" });
//   };

//   return (
//     <View style={styles.card}>
//       {/* --- STOP CONFIRMATION MODAL --- */}
//       <Modal visible={alertConfig.visible} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.alertBox}>
//             <Text style={styles.alertEmoji}>⚠️</Text>
//             <Text style={styles.alertTitle}>Stop Gold SIP?</Text>
//             <Text style={styles.alertDesc}>
//               Stopping will deactivate this plan permanently and reset your streak. You can start a new SIP anytime.
//             </Text>
            
//             <View style={styles.modalRow}>
//               <TouchableOpacity 
//                 onPress={() => setAlertConfig({ visible: false, type: "stop" })}
//                 style={styles.cancelBtn}
//               >
//                 <Text style={styles.cancelBtnText}>Keep Active</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 onPress={confirmStop}
//                 style={[styles.confirmBtn, { backgroundColor: "#FF453A" }]}
//               >
//                 <Text style={[styles.confirmBtnText, { color: '#fff' }]}>Stop Plan</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* --- HEADER --- */}
//       <View style={styles.header}>
//         <View style={[styles.statusBadge, { backgroundColor: currentEngine.isPaused ? 'rgba(255, 159, 10, 0.1)' : 'rgba(255, 215, 0, 0.1)' }]}>
//           <View style={[styles.pulseDot, { backgroundColor: currentEngine.isPaused ? "#FF9F0A" : GOLD_ACCENT }]} />
//           <Text style={[styles.statusText, { color: currentEngine.isPaused ? "#FF9F0A" : GOLD_ACCENT }]}>
//             {currentEngine.isPaused ? "SIP PAUSED" : "GOLD ENGINE ACTIVE"}
//           </Text>
//         </View>
//         <Text style={styles.bucketType}>{bucket.toUpperCase()}</Text>
//       </View>

//       {/* --- AMOUNT --- */}
//       <View style={styles.amountContainer}>
//         <Text style={styles.currencySymbol}>₹</Text>
//         <Text style={styles.amountText}>{currentEngine.amount}</Text>
//         <Text style={styles.perCycle}>/ cycle</Text>
//       </View>

//       <View style={styles.divider} />
      
//       {/* --- STREAK --- */}
//       <View style={styles.streakWrapper}>
//         <StreakCard streak={currentEngine.streak || 0} />
//       </View>

//       {/* --- BUTTONS --- */}
//       <View style={styles.row}>
//         {/* Toggle Button: Pause ho toh "Start/Resume" dikhaye, Active ho toh "Pause" */}
//         <TouchableOpacity 
//           onPress={handlePauseToggle} 
//           style={[
//             styles.pauseBtn, 
//             currentEngine.isPaused && { backgroundColor: GOLD_ACCENT } 
//           ]}
//         >
//           <Text style={[styles.pauseText, currentEngine.isPaused && { color: "#000" }]}>
//             {currentEngine.isPaused ? "▶ Resume SIP" : "⏸ Pause Plan"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           onPress={() => setAlertConfig({ visible: true, type: "stop" })} 
//           style={styles.stopBtn}
//         >
//           <Text style={styles.stopText}>Stop</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }



import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { GoldTab, GoldEngineState } from "../types"; 
import { COLORS } from "../data/constants";
import StreakCard from "@/features/silver/components/StreakCard"; 

import { 
  pauseGoldSipApi,
  resumeGoldSipApi,
  stopGoldSipApi
} from "@/services/gold";

interface Props {
  bucket: GoldTab;
  engine: GoldEngineState;
  setEngine: React.Dispatch<React.SetStateAction<GoldEngineState>>;
  reloadEngine: ()=>void;
  caret:"18K"|"22K"|"24K";
}

export default function RunningEngine({ 
  bucket, 
  engine, 
  setEngine,
  reloadEngine,
  caret
}: Props) {

  const currentEngine = engine.engines[bucket];

  if (!currentEngine || !currentEngine.isActive) return null;

  const sipId = currentEngine?.data?.sip_id;

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    type: "stop"
  });

  const GOLD_ACCENT = "#FFD700";

  /* ================= PAUSE / RESUME ================= */

  const handlePauseToggle = async () => {
    try{

      if(!sipId) return alert("Sip id missing");

      /* PAUSE */
      if(!currentEngine.isPaused){
        const res = await pauseGoldSipApi(sipId);
        console.log("PAUSE GOLD 👉",res);

        if(!res?.success) return alert(res?.message);
        alert("SIP paused successfully");
      }

      /* RESUME */
      else{
        const res = await resumeGoldSipApi(sipId);
        console.log("RESUME GOLD 👉",res);

        if(!res?.success) return alert(res?.message);
        alert("SIP resumed");
      }

      reloadEngine();

    }catch(e){
      console.log("PAUSE RESUME ERROR",e);
      alert("Server error");
    }
  };

  /* ================= STOP SIP ================= */

  const confirmStop = async () => {
    try{

      if(!sipId) return alert("Sip id missing");

      const res = await stopGoldSipApi(sipId,"BANK");
      console.log("STOP GOLD 👉",res);

      if(!res?.success) return alert(res?.message);

      alert("SIP stopped successfully");

      setAlertConfig({ visible:false, type:"stop" });
      reloadEngine();

    }catch(e){
      console.log("STOP ERROR",e);
      alert("Stop failed");
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
              You can start a new SIP anytime.
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
                style={[styles.confirmBtn, { backgroundColor: "#FF453A" }]}
              >
                <Text style={[styles.confirmBtnText, { color: '#fff' }]}>
                  Stop Plan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: currentEngine.isPaused 
            ? 'rgba(255, 159, 10, 0.1)' 
            : 'rgba(255, 215, 0, 0.1)' }
        ]}>
          <View style={[
            styles.pulseDot, 
            { backgroundColor: currentEngine.isPaused ? "#FF9F0A" : GOLD_ACCENT }
          ]} />
          <Text style={[
            styles.statusText, 
            { color: currentEngine.isPaused ? "#FF9F0A" : GOLD_ACCENT }
          ]}>
            {currentEngine.isPaused ? "SIP PAUSED" : "GOLD ENGINE ACTIVE"}
          </Text>
        </View>

        <Text style={styles.bucketType}>
          {bucket.toUpperCase()} • {caret}
        </Text>
      </View>

      {/* ===== AMOUNT ===== */}
      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>₹</Text>
        <Text style={styles.amountText}>
          {currentEngine?.data?.amount_per_cycle || 0}
        </Text>
        <Text style={styles.perCycle}>/ cycle</Text>
      </View>

      <View style={styles.divider} />
      
      {/* ===== STREAK ===== */}
      <View style={styles.streakWrapper}>
        <StreakCard streak={currentEngine?.data?.streak || 0} />
      </View>

      {/* ===== BUTTONS ===== */}
      <View style={styles.row}>

        {/* PAUSE / RESUME */}
        <TouchableOpacity 
          onPress={handlePauseToggle} 
          style={[
            styles.pauseBtn, 
            currentEngine.isPaused && { backgroundColor: GOLD_ACCENT } 
          ]}
        >
          <Text style={[
            styles.pauseText, 
            currentEngine.isPaused && { color: "#000" }
          ]}>
            {currentEngine.isPaused ? "▶ Resume SIP" : "⏸ Pause Plan"}
          </Text>
        </TouchableOpacity>

        {/* STOP */}
        <TouchableOpacity 
          onPress={() => setAlertConfig({ visible: true, type: "stop" })} 
          style={styles.stopBtn}
        >
          <Text style={styles.stopText}>Stop</Text>
        </TouchableOpacity>
      </View>
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
  pauseBtn: { 
    flex: 2, 
    backgroundColor: "rgba(255,255,255,0.08)", 
    height: 52, 
    borderRadius: 14, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  pauseText: { color: "#fff", fontWeight: "700" },
  stopBtn: { 
    flex: 1, 
    backgroundColor: "rgba(255, 59, 48, 0.15)", 
    height: 52, 
    borderRadius: 14, 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 1, 
    borderColor: "rgba(255, 59, 48, 0.2)" 
  },
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