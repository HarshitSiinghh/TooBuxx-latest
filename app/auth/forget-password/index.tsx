
import { sendResetOtpApi } from "@/services/forget-pass";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
  });

  const showAlert = (title: string, message: string) => {
    setAlert({ visible: true, title, message });
  };

  // const handleSend = async () => {
  //   if (!email) {
  //     return showAlert("Error", "Please enter your email address");
  //   }

  //   try {
  //     setLoading(true);
  //     const res = await sendResetOtpApi(email);

  //     if (!res?.success) {
  //       return showAlert("Error", res?.message || "Failed to send OTP");
  //     }

  //     showAlert("Success", "OTP has been sent to your registered email");

  //     setTimeout(() => {
  //       setAlert({ visible: false, title: "", message: "" });
  //       router.push({
  //         pathname: "/auth/register/VirefyOPT",
  //         params: { email: email, type: "forgot" },
  //       });
  //     }, 2000);
  //   } catch (err) {
  //     showAlert("Error", "Server not reachable. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSend = async () => {
  if (!email) {
    return showAlert("Error", "Please enter your email address");
  }

  try {
    setLoading(true);
    const res = await sendResetOtpApi(email);

    // ❌ Error case → show alert
    if (!res?.success) {
      return showAlert("Error", res?.message || "Failed to send OTP");
    }

    // ✅ Success case → NO ALERT → direct redirect
    router.push({
      pathname: "/auth/register/VirefyOPT",
      params: { email: email, type: "forgot" },
    });

  } catch (err) {
    showAlert("Error", "Server not reachable. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#062530", "#062530"]} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inner}
        >
          {/* Header Navigation */}
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <ArrowLeft color="#facc15" size={22} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* Branding/Icon */}
            <View style={styles.iconWrapper}>
              <View style={styles.iconCircle}>
                <ShieldCheck color="#facc15" size={42} strokeWidth={1.5} />
              </View>
              <View style={styles.glow} />
            </View>

            <View style={styles.headerText}>
              <Text style={styles.title}>FORGET PASSWORD</Text>
              <Text style={styles.subtitle}>
              ENTER YOUR EMAIL TO RECEIVE RECOVERY CODE
              </Text>
            </View>

            {/* Input Section */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputBox}>
                  <Mail color="#facc15" size={18} style={{ opacity: 0.6 }} />
                  <TextInput
                    placeholder="example@vault.com"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor="#facc15"
                  />
                </View>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleSend}
                disabled={loading}
                style={styles.buttonContainer}
              >
                <LinearGradient
                  colors={["#facc15", "#ca8a04"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  {loading ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text style={styles.buttonText}>REQUEST RESET CODE</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.footerLink}
            >
              <Text style={styles.loginText}>
                Remember your password? <Text style={styles.loginLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/* Custom Modern Alert */}
        {alert.visible && (
          <View style={styles.alertOverlay}>
            <View style={styles.alertBox}>
              <View style={styles.alertIndicator} />
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertMsg}>{alert.message}</Text>
              <TouchableOpacity
                style={styles.alertBtn}
                onPress={() => setAlert({ ...alert, visible: false })}
              >
                <Text style={styles.alertBtnText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04141A",
     marginTop:-100,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 28,
  },
  navBar: {
    height: 60,
    justifyContent: "center",
  },
  backBtn: {
    width: 42,
    height: 42,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  iconWrapper: {
    alignSelf: "center",
    marginBottom: 32,
    position: "relative",
  },
  iconCircle: {
    width: 90,
    height: 90,
    backgroundColor: "rgba(250, 204, 21, 0.05)",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.2)",
    zIndex: 2,
  },
  glow: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "#facc15",
    borderRadius: 50,
    opacity: 0.1,
    filter: "blur(20px)",
    top: -5,
    left: -5,
  },
  headerText: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: "#facc15",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    opacity: 0.8,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 64,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 8,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  button: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 1.5,
  },
  footerLink: {
    marginTop: 32,
    alignItems: "center",
  },
  loginText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
  },
  loginLink: {
    color: "#facc15",
    fontWeight: "700",
  },
  // Alert Styles
  alertOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  alertBox: {
    width: "85%",
    backgroundColor: "#082029",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.3)",
    alignItems: "center",
  },
  alertIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#facc15",
    borderRadius: 2,
    marginBottom: 20,
    opacity: 0.5,
  },
  alertTitle: {
    color: "#facc15",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  alertMsg: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  alertBtn: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "rgba(250, 204, 21, 0.1)",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.2)",
  },
  alertBtnText: {
    color: "#facc15",
    fontWeight: "700",
    fontSize: 16,
  },
});