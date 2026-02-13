import { resetPasswordApi } from "@/services/forget-pass";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = useLocalSearchParams();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // Eye icon states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
    type: "success", // success | error
  });
  const showAlert = (
    title: string,
    message: string,
    type: string = "error",
  ) => {
    setAlert({
      visible: true,
      title,
      message,
      type,
    });
  };

const handleReset = async () => {
  if (!password || !confirm) {
    return showAlert("Error", "Enter all fields", "error");
  }

  if (password !== confirm) {
    return showAlert("Error", "Passwords do not match", "error");
  }

  try {
    setLoading(true);
    const res = await resetPasswordApi(password, String(token));

    if (!res?.success) {
      return showAlert("Error", res?.message || "Reset failed", "error");
    }

    showAlert("Success", "Password changed successfully", "success");

    setTimeout(() => {
      router.replace("/auth/login");
    }, 1500);

  } catch (err) {
    showAlert("Error", "Server error", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <LinearGradient colors={["#04161D", "#062530"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          {/* HEADER SECTION */}
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons name="lock-open-outline" size={32} color="#facc15" />
            </View>
            <Text style={styles.title}>Set New Password</Text>
            <Text style={styles.subtitle}>
              Create a strong password to protect your assets
            </Text>
          </View>

          {/* FORM SECTION */}
          <View style={styles.card}>
            {/* New Password Input */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="key-outline"
                size={20}
                color="#facc15"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="New password"
                placeholderTextColor="rgba(255,255,255,0.4)"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="rgba(255,255,255,0.6)"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="checkmark-outline"
                size={20}
                color="#facc15"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Confirm new password"
                placeholderTextColor="rgba(255,255,255,0.4)"
                secureTextEntry={!showConfirm}
                style={styles.input}
                value={confirm}
                onChangeText={setConfirm}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons
                  name={showConfirm ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="rgba(255,255,255,0.6)"
                />
              </TouchableOpacity>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnWrapper}
              onPress={handleReset}
              disabled={loading}
            >
              <LinearGradient
                colors={["#facc15", "#eab308", "#ca8a04"]}
                style={styles.btn}
              >
                {loading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.btnText}>RESET PASSWORD</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>Cancel & Go Back</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {/* ===== PREMIUM CENTER ALERT ===== */}
{alert.visible && (
  <View style={styles.alertOverlay}>
    <View style={styles.alertBox}>
      
      {/* Icon */}
      <View style={[
        styles.alertIconCircle,
        { backgroundColor: alert.type === "success" ? "#22c55e20" : "#ef444420" }
      ]}>
        <Ionicons
          name={alert.type === "success" ? "checkmark-circle" : "close-circle"}
          size={42}
          color={alert.type === "success" ? "#22c55e" : "#ef4444"}
        />
      </View>

      <Text style={styles.alertTitle}>{alert.title}</Text>
      <Text style={styles.alertMsg}>{alert.message}</Text>

      <TouchableOpacity
        style={styles.alertBtn}
        onPress={() =>
          setAlert({ visible: false, title: "", message: "", type: "success" })
        }
      >
        <Text style={styles.alertBtnText}>OK</Text>
      </TouchableOpacity>

    </View>
  </View>
)}

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", padding: 24 },

  header: { alignItems: "center", marginBottom: 40 },
  alertOverlay: {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.75)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
},

alertBox: {
  width: "82%",
  backgroundColor: "#04161D",
  borderRadius: 24,
  padding: 26,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "rgba(250,204,21,0.25)",
},

alertIconCircle: {
  width: 70,
  height: 70,
  borderRadius: 40,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
},

alertTitle: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "800",
  marginBottom: 6,
},

alertMsg: {
  color: "rgba(255,255,255,0.6)",
  fontSize: 14,
  textAlign: "center",
  marginBottom: 20,
},

alertBtn: {
  width: "100%",
  backgroundColor: "#facc15",
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: "center",
},

alertBtnText: {
  color: "#000",
  fontWeight: "800",
  fontSize: 15,
},

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(250, 204, 21, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.2)",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  card: { width: "100%" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    paddingVertical: 18,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  btnWrapper: {
    marginTop: 10,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btn: {
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 1,
  },

  backButton: {
    marginTop: 25,
    alignItems: "center",
  },
  backText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
