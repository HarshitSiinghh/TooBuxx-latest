

import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle2 } from "lucide-react-native";

type Props = {
  disabled: boolean;
  onPress: () => Promise<boolean>; // 🔥 must return success status
    onSuccessReset: () => void;
  loading?: boolean;
};

export default function AuthorizeButton({
  disabled,
  onPress,
  onSuccessReset,
  loading = false,
}: Props)
 {
  const [showSuccess, setShowSuccess] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const isInactive = disabled || loading || internalLoading;

  const handlePress = async () => {
    if (isInactive) return;

    try {
      setInternalLoading(true);

const success = await onPress();

if (success) {
  setShowSuccess(true);
} else {
  alert("Withdrawal failed. Please try again.");
}



    } catch (err) {
      console.log("Withdraw failed:", err);
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={isInactive}
        activeOpacity={0.8}
        style={[
          styles.mainBtnWrapper,
          isInactive && styles.disabledWrapper,
        ]}
      >
        <LinearGradient
          colors={
            isInactive
              ? ["#104e64", "#0b3442"]
              : ["#facc15", "#eab308"]
          }
          style={styles.withdrawBtn}
        >
          <Text
            style={[
              styles.withdrawText,
              isInactive && styles.disabledText,
            ]}
          >
            {internalLoading || loading
              ? "PROCESSING..."
              : "AUTHORIZE WITHDRAWAL"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* ✅ SUCCESS MODAL */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <View style={styles.iconCircle}>
              <CheckCircle2 size={50} color="#22c55e" strokeWidth={3} />
            </View>

            <Text style={styles.alertTitle}>
              REQUEST SUBMITTED!
            </Text>

            <Text style={styles.alertMsg}>
              Your withdrawal request is being processed safely.
              The amount will be credited to your account soon.
            </Text>

            <TouchableOpacity
               onPress={() => {
    setShowSuccess(false);
    onSuccessReset();  // 🔥 reset after close
  }}
              style={styles.doneBtnWrapper}
            >
              <LinearGradient
                colors={["#facc15", "#eab308"]}
                style={styles.doneBtn}
              >
                <Text style={styles.doneText}>GOT IT</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  mainBtnWrapper: {
    marginTop: 30,
    width: "100%",
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom:50,
  },
  disabledWrapper: {
    opacity: 0.4,
    shadowOpacity: 0,
  },
  withdrawBtn: {
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.2)",
  },
  withdrawText: {
    color: "#062530",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  disabledText: {
    color: "#8fbac4",
  },

  /* --- ALERT STYLES --- */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(6,37,48,0.95)", // Matches reference dark theme
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  alertBox: {
    width: "90%",
    backgroundColor: "#0b3442",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
    elevation: 20,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(34,197,94,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "rgba(34,197,94,0.2)",
  },
  alertTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 10,
  },
  alertMsg: {
    color: "#8fbac4",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 30,
    fontWeight: "600",
  },
  doneBtnWrapper: {
    width: "100%",
  },
  doneBtn: {
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  doneText: {
    color: "#062530",
    fontWeight: "900",
    letterSpacing: 1,
  }
});