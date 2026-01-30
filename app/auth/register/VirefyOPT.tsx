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
    backgroundColor: "#1a003d",
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    top: -100,
    left: -100,
    width: width * 1.5,
    height: width * 1.5,
    backgroundColor: "rgba(147, 51, 234, 0.1)",
    borderRadius: 999,
  },
  innerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 40,
    padding: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconCircle: {
    padding: 16,
    backgroundColor: "rgba(168, 85, 247, 0.1)",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.2)",
    marginBottom: 16,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#6b7280",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 8,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  input: {
    width: (width - 120) / 6,
    aspectRatio: 0.8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  inputActive: {
    borderColor: "#8b5cf6",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
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
    color: "white",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 2,
  },
  footer: {
    marginTop: 30,
  },
  timerText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#4b5563",
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
    color: "#a78bfa",
    letterSpacing: 1.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "rgba(30, 30, 30, 0.95)",
    borderRadius: 40,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
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
    borderColor: "rgba(34, 197, 94, 0.3)",
    marginBottom: 20,
  },
  successTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 1,
  },
  successSubtitle: {
    color: "#9ca3af",
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
    backgroundColor: "#16a34a",
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  loginBtnText: {
    color: "white",
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 2,
  },
});
