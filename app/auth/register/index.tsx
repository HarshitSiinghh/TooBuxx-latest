import { useRouter } from "expo-router";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Ticket,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { colors } from '@/constants/theme';
import { registerApi } from "@/services/auth";

const { width } = Dimensions.get("window");

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    referral: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
    type: "error", // error | success
  });

  const showAlert = (
    title: string,
    message: string,
    type: "error" | "success" = "error",
  ) => {
    setAlert({
      visible: true,
      title,
      message,
      type,
    });
  };

  const handleChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

const handleSignUp = async () => {
  const { username, email, phone, password, confirmPassword, referral } = formData;

  if (!username || !email || !phone || !password) {
    return showAlert("Missing fields", "Please fill all required fields", "error");
  }

  if (password !== confirmPassword) {
    return showAlert("Password mismatch", "Passwords do not match", "error");
  }

  try {
    setLoading(true);
    const data = await registerApi({
      username,
      email,
      password,
      mobile: phone,
      referral,
    });

    if (!data.success) {
      return showAlert("Register failed", data.message || "Try again", "error");
    }

    showAlert("Success", "Account created successfully", "success");

    setTimeout(() => {
      router.push({ pathname: "/auth/register/VirefyOPT", params: { email } });
    }, 1400);

  } catch (err) {
    showAlert("Error", "Server not reachable", "error");
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <ShieldCheck color="#facc15" size={28} />
              </View>
              <Text style={styles.title}>CREATE ACCOUNT</Text>
              <Text style={styles.subtitle}>
                START YOUR 24K GOLD JOURNEY TODAY
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.grid}>
              {/* Username */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>USERNAME</Text>
                <View style={styles.inputWrapper}>
                  <User color="#9ca3af" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="johndoe"
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange("username", val)}
                  />
                </View>
              </View>

              {/* Referral */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>REFERRAL</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    { borderColor: "rgba(234, 179, 8, 0.3)" },
                  ]}
                >
                  <Ticket color="#eab308" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="GOLD2026"
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange("referral", val)}
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <View style={styles.inputWrapper}>
                  <Mail color="#9ca3af" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="john@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange("email", val)}
                  />
                </View>
              </View>

              {/* Phone */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>PHONE NUMBER</Text>
                <View style={styles.inputWrapper}>
                  <Phone color="#9ca3af" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="+91 00000 00000"
                    keyboardType="phone-pad"
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange("phone", val)}
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <LockKeyhole
                    color="#9ca3af"
                    size={16}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    secureTextEntry
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange("password", val)}
                  />
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>CONFIRM PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <LockKeyhole
                    color="#9ca3af"
                    size={16}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    secureTextEntry
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange("confirmPassword", val)}
                  />
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              activeOpacity={0.8}
              style={styles.button}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.buttonText}>CREATE YOUR ACCOUNT</Text>
                  <ArrowRight color="#fff" size={18} />
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity
              style={styles.footerLink}
              onPress={() => router.push("/auth/login")}
            >
              <Text style={styles.footerText}>
                Already an investor? <Text style={styles.linkText}>LOG IN</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.copyright}>© 2026 TOOBUX</Text>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* ===== PREMIUM ALERT ===== */}
{alert.visible && (
  <View style={styles.alertOverlay}>
    <View style={styles.alertBox}>

      {/* ICON */}
      <View style={[
        styles.alertIconWrap,
        { backgroundColor: alert.type === "success" ? "#22c55e20" : "#ef444420" }
      ]}>
        {alert.type === "success" ? (
          <ShieldCheck size={42} color="#22c55e" />
        ) : (
          <LockKeyhole size={42} color="#ef4444" />
        )}
      </View>

      <Text style={styles.alertTitle}>{alert.title}</Text>
      <Text style={styles.alertMsg}>{alert.message}</Text>

      <TouchableOpacity
        style={styles.alertBtn}
        onPress={() =>
          setAlert({ visible: false, title: "", message: "", type: "error" })
        }
      >
        <Text style={styles.alertBtnText}>OK</Text>
      </TouchableOpacity>

    </View>
  </View>
)}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexGrow: 1,
    justifyContent: "center",
  },

  /* ================= CARD ================= */
  card: {
    backgroundColor: "#0b3442",
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: "#104e64",
  },
alertOverlay: {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
},

alertBox: {
  width: "84%",
  backgroundColor: "#062530",
  borderRadius: 28,
  padding: 26,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#0ea5b720",
},

alertIconWrap: {
  width: 72,
  height: 72,
  borderRadius: 40,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
},

alertTitle: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "900",
  marginBottom: 6,
},

alertMsg: {
  color: "#9cc7d1",
  fontSize: 14,
  textAlign: "center",
  marginBottom: 20,
  lineHeight: 20,
},

alertBtn: {
  width: "100%",
  backgroundColor: "#facc15",
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: "center",
},

alertBtnText: {
  color: "#062530",
  fontWeight: "900",
  fontSize: 15,
  letterSpacing: 1,
},

  /* ================= HEADER ================= */
  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  iconCircle: {
    width: 56,
    height: 56,
    backgroundColor: "rgba(16, 78, 100, 0.4)",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -0.5,
  },

  subtitle: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginTop: 4,
    textAlign: "center",
  },

  /* ================= FORM ================= */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  inputGroup: {
    width: "48%",
    marginBottom: 16,
  },

  inputGroupFull: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 6,
    marginLeft: 4,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 78, 100, 0.35)",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 52,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  /* ================= BUTTON ================= */
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#facc15",
    height: 58,
    borderRadius: 16,
    marginTop: 10,
    gap: 10,
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    color: "#062530",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },

  /* ================= FOOTER ================= */
  footerLink: {
    marginTop: 24,
    alignItems: "center",
  },

  footerText: {
    color: "#8fbac4",
    fontSize: 13,
  },

  linkText: {
    color: "#facc15",
    fontWeight: "900",
  },

  copyright: {
    textAlign: "center",
    color: "#6b9aa6",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 30,
  },
});
