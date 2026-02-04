import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Dimensions,
  Alert,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MailCheck, RefreshCcw, ArrowRight, CheckCircle2, X } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { verifyOtpApi } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";

const { width } = Dimensions.get("window");

const OTPVerifyPage = () => {
    
    const { email } = useLocalSearchParams();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, key: string) => {
    if (key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };
``
  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) return;

    try {
      setLoading(true);

      const data = await verifyOtpApi(String(email), finalOtp);

      if (!data.success) {
        return Alert.alert("Invalid OTP", data.message || "Try again");
      }

      setUser(data.user);      // ✅ user logged in
      setShowSuccess(true);    // ✅ success modal

    } catch (err) {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <MailCheck color="#a78bfa" size={24} />
            </View>
            <Text style={styles.title}>IDENTITY VERIFICATION</Text>
            <Text style={styles.subtitle}>
              WE SENT A 6 DIGIT CODE TO {email}
            </Text>
          </View>

          {/* OTP inputs */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => {
  inputRefs.current[index] = el;
}}
                style={[styles.input, digit ? styles.inputActive : null]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleChange(index, val)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyDown(index, nativeEvent.key)
                }
              />
            ))}
          </View>

          {/* Verify button */}
          <TouchableOpacity
            disabled={otp.join("").length < 6 || loading}
            onPress={handleVerify}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#9333ea", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.button,
                (otp.join("").length < 6 || loading) && { opacity: 0.2 },
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.buttonText}>AUTHORIZE ACCOUNT</Text>
                  <ArrowRight color="white" size={16} />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Timer */}
          <View style={styles.footer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                REQUEST NEW CODE IN{" "}
                <Text style={{ color: "#a78bfa" }}>{timer}S</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={() => setTimer(59)} style={styles.resendBtn}>
                <RefreshCcw color="#a78bfa" size={12} />
                <Text style={styles.resendText}>RESEND CODE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Success modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable style={styles.closeBtn} onPress={handleClose}>
              <X color="rgba(255,255,255,0.4)" size={20} />
            </Pressable>

            <View style={styles.successIconCircle}>
              <CheckCircle2 color="#4ade80" size={32} />
            </View>

            <Text style={styles.successTitle}>VERIFIED</Text>
            <Text style={styles.successSubtitle}>
              AUTHENTICATION SUCCESSFUL.{"\n"}YOUR ACCOUNT IS READY.
            </Text>

            <TouchableOpacity onPress={handleClose} style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>ENTER APP</Text>
              <ArrowRight color="white" size={14} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OTPVerifyPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530",
    alignItems: "center",
    justifyContent: "center",
  },

  glow: {
    position: "absolute",
    top: -120,
    left: -120,
    width: width * 1.6,
    height: width * 1.6,
    backgroundColor: "rgba(250, 204, 21, 0.08)", // gold glow
    borderRadius: 999,
  },

  innerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },

  /* ================= CARD ================= */
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#0b3442",
    borderRadius: 40,
    padding: 30,
    borderWidth: 1,
    borderColor: "#104e64",
    alignItems: "center",
  },

  /* ================= HEADER ================= */
  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  iconCircle: {
    padding: 16,
    backgroundColor: "rgba(16, 78, 100, 0.4)",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#104e64",
    marginBottom: 16,
  },

  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -0.5,
  },

  subtitle: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 8,
    textAlign: "center",
  },

  /* ================= OTP ================= */
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },

  input: {
    width: (width - 120) / 6,
    aspectRatio: 0.8,
    backgroundColor: "rgba(16, 78, 100, 0.35)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#104e64",
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },

  inputActive: {
    borderColor: "#facc15",
    backgroundColor: "rgba(250, 204, 21, 0.12)",
  },

  /* ================= BUTTON ================= */
  button: {
    width: width - 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
  },

  buttonText: {
    color: "#062530",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 2,
  },

  /* ================= FOOTER ================= */
  footer: {
    marginTop: 30,
  },

  timerText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#6b9aa6",
    letterSpacing: 1.5,
  },

  resendBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  resendText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#facc15",
    letterSpacing: 1.5,
  },

  /* ================= MODAL ================= */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(6, 37, 48, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#0b3442",
    borderRadius: 40,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
  },

  successIconCircle: {
    padding: 16,
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.35)",
    marginBottom: 20,
  },

  successTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 1,
  },

  successSubtitle: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 25,
    lineHeight: 16,
  },

  loginBtn: {
    width: "100%",
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  loginBtnText: {
    color: "#062530",
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 2,
  },
});
