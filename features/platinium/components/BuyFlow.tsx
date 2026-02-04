import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Bucket, PlatinumEngineState } from "../types"; // Silver ki jagah Platinum types
import { COLORS, calculateGrams } from "../constants";

interface Props {
  bucket: Bucket;
  engine: PlatinumEngineState; // Changed to PlatinumEngineState
  setEngine: React.Dispatch<React.SetStateAction<PlatinumEngineState>>;
}

type ActionType = "BUY" | "PAUSE" | "STOP";

export default function PlatinumBuyFlow({ bucket, engine, setEngine }: Props) {
  const [amount, setAmount] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>("BUY");

  // Platinum price ke basis par grams calculate honge
  const grams = calculateGrams(Number(amount) || 0, engine.pricePerGram);
  const currentSIP = engine.engines[bucket as keyof typeof engine.engines];

  const onBuyPress = () => {
    if (Number(amount) <= 0) return;
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

  const handleAction = () => {
    let newEngine = { ...engine };

    if (currentAction === "BUY") {
      newEngine.walletBalance -= Number(amount);
      if (bucket === "instant") {
        newEngine.engines.instant.savedGrams += grams;
      } else {
        newEngine.engines[bucket] = {
          isActive: true,
          isPaused: false,
          amount: Number(amount),
          savedGrams: (newEngine.engines[bucket]?.savedGrams || 0) + grams,
          streak: (newEngine.engines[bucket]?.streak || 0) + 1,
        };
      }
      setAmount("");
    } 
    else if (currentAction === "PAUSE") {
      newEngine.engines[bucket].isPaused = !newEngine.engines[bucket].isPaused;
    } 
    else if (currentAction === "STOP") {
      newEngine.engines[bucket].isActive = false;
    }

    setEngine(newEngine);
    setShowConfirm(false);
  };

  const getModalUI = () => {
    switch (currentAction) {
      case "BUY":
        return {
          title: bucket === "instant" ? "Confirm Platinum Buy" : "Start Platinum SIP",
          msg: `Confirm investment of ₹${amount} in Platinum?`,
          btn: COLORS.PLATINUM_ACCENT || "#E5E4E2", // Platinum theme color
          text: "Confirm Buy"
        };
      case "PAUSE":
        const isPaused = currentSIP?.isPaused;
        return {
          title: isPaused ? "Resume SIP" : "Pause SIP",
          msg: `Do you want to ${isPaused ? "resume" : "pause"} your Platinum investment?`,
          btn: "#FF9F0A",
          text: isPaused ? "Resume Now" : "Pause Now"
        };
      case "STOP":
        return {
          title: "Stop Investment",
          msg: "This will permanently deactivate this Platinum SIP. Continue?",
          btn: "#FF453A",
          text: "Stop Permanently"
        };
    }
  };

  const modalUI = getModalUI()!;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>ENTER PLATINUM AMOUNT</Text>
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

      {/* <TouchableOpacity 

      
        style={[styles.buyBtn, { backgroundColor: COLORS.PLATINUM_ACCENT || "#E5E4E2" }]} 
        onPress={onBuyPress}
      >
        <Text style={styles.buyText}>{bucket === "instant" ? "BUY PLATINUM" : "ACTIVATE SIP"}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity 
  style={[styles.buyBtn, { backgroundColor: COLORS.PLATINUM_ACCENT }]} 
  onPress={onBuyPress}
>
  <Text style={styles.buyText}>BUY PLATINUM</Text>
</TouchableOpacity>

      {bucket !== "instant" && currentSIP?.isActive && (
        <View style={styles.manageRow}>
          <TouchableOpacity onPress={onPausePress} style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>
              {currentSIP.isPaused ? "RESUME" : "PAUSE"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onStopPress} style={[styles.secondaryBtn, { borderColor: '#FF453A22' }]}>
            <Text style={[styles.secondaryBtnText, { color: '#FF453A' }]}>STOP</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal remains largely the same but uses modalUI for dynamic styling */}
      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{modalUI.title}</Text>
            <Text style={styles.modalMsg}>{modalUI.msg}</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setShowConfirm(false)}>
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