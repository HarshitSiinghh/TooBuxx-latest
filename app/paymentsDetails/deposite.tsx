import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Clipboard ,
  Modal,
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import {
  UploadCloud,
  CheckCircle2,
  ArrowLeft,
  Info,
  Copy,
  Wallet2,
  AlertCircle,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { pickImage } from "@/components/ui/pickImage";
import { depositApi } from "@/services/wallet";

const { width } = Dimensions.get("window");

export default function ManualDepositMobile() {
  const [file, setFile] = useState<any>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  
const [showCopyToast, setShowCopyToast] = useState(false);
const [copyText, setCopyText] = useState("");

  const upiId = "merchant@upi";
  const router = useRouter();


  const handleCopyUpi = () => {
  Clipboard.setString(upiId);
  setCopyText("UPI ID copied successfully");
  setShowCopyToast(true);

  setTimeout(() => {
    setShowCopyToast(false);
  }, 2000);
};


  // ✅ Pick real image
  const handlePickFile = async () => {
    const img = await pickImage();
    if (img) {
      setFile(img);
    }
  };

  // ✅ Real deposit API call
  const handleDepositTrigger = async () => {
    if (!depositAmount || !file) {
      setErrorMessage("Please enter amount and upload screenshot");
      setShowModal(true);
      return;
    }

    try {
      setLoading(true);

      const res = await depositApi(depositAmount, file);
      
console.log("✅ DEPOSIT RESPONSE 👉", res);

      if (res?.success) {
        setErrorMessage("");
        setShowModal(true);
        setDepositAmount("");
        setFile(null);
      } else {
        setErrorMessage(res?.message || "Deposit failed");
        setShowModal(true);
      }
    }  catch (err: any) {
  console.log("❌ DEPOSIT ERROR 👉", err);
  setErrorMessage("Server error. Please try again.");
  setShowModal(true);
} {
      setLoading(false);
    }
 

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#d1d5db" />
        </TouchableOpacity>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.headerTitle}>MANUAL DEPOSIT</Text>
          <Text style={styles.headerSubtitle}>PROOF OF TRANSFER REQUIRED</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* STEP 1 */}
        <View style={styles.glassCard}>
          <Text style={styles.stepLabel}>STEP 1: SCAN & PAY</Text>
          <View style={styles.qrContainer}>
            <Image
              source={{
                uri: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${upiId}`,
              }}
              style={styles.qrImage}
            />
          </View>

          <View style={styles.upiRow}>
            <View>
              <Text style={styles.inputLabelSmall}>MERCHANT UPI ID</Text>
              <Text style={styles.upiText}>{upiId}</Text>
            </View>
            <TouchableOpacity   onPress={handleCopyUpi}>
            <View style={styles.copyButton}>
              <Copy size={20} color="#facc15" />
            </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoBox}>
          <View style={styles.infoIconContainer}>
            <Info size={18} color="#818cf8" />
          </View>
          <Text style={styles.infoText}>
            Verification takes{" "}
            <Text style={{ color: "#fff", fontWeight: "900" }}>2-4 hours</Text>.
            Please do not submit the same UTR twice.
          </Text>
        </View>

        {/* FORM */}
        <View style={[styles.glassCard, { marginTop: 24, borderRadius: 40 }]}>
          <View style={styles.formHeader}>
            <Wallet2 size={24} color="#facc15" />
            <Text style={styles.formTitle}>DEPOSIT FORM</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabelSmall}>DEPOSIT AMOUNT (₹)</Text>
            <View style={styles.amountInputRow}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#374151"
                value={depositAmount}
                onChangeText={setDepositAmount}
                style={styles.textInput}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabelSmall}>PAYMENT RECEIPT</Text>
            <TouchableOpacity
              onPress={handlePickFile}
              style={[styles.uploadBox, file && styles.uploadBoxSuccess]}
            >
              {file ? (
                <>
                  <CheckCircle2 size={32} color="#22c55e" />
                  <Text style={styles.fileName}>
                    {file?.fileName || "payment_screenshot.jpg"}
                  </Text>
                </>
              ) : (
                <>
                  <View style={styles.uploadIconCircle}>
                    <UploadCloud size={24} color="#facc15" />
                  </View>
                  <Text style={styles.uploadText}>UPLOAD SCREENSHOT</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity disabled={loading} onPress={handleDepositTrigger}>
            {/* <LinearGradient
              colors={["#9333ea", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitButton}
            > */}
            <LinearGradient
  colors={["#facc15", "#eab308"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.submitButton}
>

              <Text style={styles.submitButtonText}>
                {loading ? "SUBMITTING..." : "CONFIRM DEPOSIT"}
              </Text>
              <CheckCircle2 size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View
              style={[
                styles.modalGlow,
                {
                  backgroundColor: errorMessage
                    ? "rgba(239, 68, 68, 0.2)"
                    : "rgba(34, 197, 94, 0.2)",
                },
              ]}
            />

            <View
              style={[
                styles.modalIconCircle,
                {
                  borderColor: errorMessage
                    ? "rgba(239, 68, 68, 0.2)"
                    : "rgba(34, 197, 94, 0.2)",
                },
              ]}
            >
              {errorMessage ? (
                <AlertCircle size={32} color="#f87171" />
              ) : (
                <CheckCircle2 size={32} color="#4ade80" />
              )}
            </View>

            <Text style={styles.modalTitle}>
              {errorMessage ? "SYSTEM " : "ENGINE "}
              <Text style={{ color: errorMessage ? "#ef4444" : "#4ade80" }}>
                {errorMessage ? "ERROR" : "ARMED"}
              </Text>
            </Text>

            <Text style={styles.modalMessage}>
              {errorMessage ||
                "Deposit submitted successfully! Processing will begin shortly."}
            </Text>

            {!errorMessage && (
              <View style={styles.modalWindowBox}>
                <Text style={styles.windowLabel}>PROCESSING WINDOW:</Text>
                <Text style={styles.windowTime}>2-4 Working Hours</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={[
                styles.modalButton,
                { backgroundColor: errorMessage ? "#ef4444" : "#22c55e" },
              ]}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  { color: errorMessage ? "#fff" : "#0a001a" },
                ]}
              >
                {errorMessage ? "TRY AGAIN" : "UNDERSTOOD"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showCopyToast && (
  <View style={styles.copyToast}>
    <CheckCircle2 size={18} color="#22c55e" />
    <Text style={styles.copyToastText}>{copyText}</Text>
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

  /* ================= HEADER ================= */
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
    backgroundColor: "#062530",
  },

  backButton: {
    padding: 10,
    backgroundColor: "rgba(16,78,100,0.4)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    fontStyle: "italic",
  },

  headerSubtitle: {
    fontSize: 10,
    color: "#facc15",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  scrollContent: {
    padding: 20,
  },

  /* ================= GLASS CARD ================= */
  glassCard: {
    backgroundColor: "#0b3442",
    borderRadius: 48,
    padding: 32,
    borderWidth: 1,
    borderColor: "#104e64",
    alignItems: "center",
  },

  stepLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#facc15",
    letterSpacing: 3,
    marginBottom: 24,
  },

  qrContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 32,
    marginBottom: 32,
  },
  copyToast: {
  position: "absolute",
  bottom: 100,
  alignSelf: "center",
  backgroundColor: "#020617",
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 30,
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  borderWidth: 1,
  borderColor: "rgba(34,197,94,0.4)",
  elevation: 10,
},

copyToastText: {
  color: "#22c55e",
  fontSize: 14,
  fontWeight: "600",
},


  qrImage: {
    width: 180,
    height: 180,
  },

  upiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(16,78,100,0.35)",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  upiText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
  },

  copyButton: {
    padding: 8,
    backgroundColor: "rgba(250,204,21,0.15)",
    borderRadius: 12,
  },

  /* ================= INFO ================= */
  infoBox: {
    flexDirection: "row",
    backgroundColor: "rgba(250,204,21,0.12)",
    padding: 16,
    borderRadius: 24,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.3)",
  },

  infoIconContainer: {
    padding: 10,
    backgroundColor: "rgba(250,204,21,0.25)",
    borderRadius: 12,
    marginRight: 12,
  },

  infoText: {
    color: "#ffffff",
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },

  /* ================= FORM ================= */
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 32,
  },

  formTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    marginLeft: 12,
    fontStyle: "italic",
  },

  inputGroup: {
    width: "100%",
    marginBottom: 32,
  },

  inputLabelSmall: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8fbac4",
    letterSpacing: 2,
    marginBottom: 8,
  },

  amountInputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#104e64",
    paddingBottom: 8,
  },

  currencySymbol: {
    fontSize: 32,
    fontWeight: "900",
    color: "#facc15",
    marginRight: 16,
    fontStyle: "italic",
  },

  textInput: {
    flex: 1,
    fontSize: 36,
    fontWeight: "900",
    color: "#ffffff",
    fontStyle: "italic",
  },

  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#104e64",
    backgroundColor: "rgba(16,78,100,0.25)",
    borderRadius: 32,
    padding: 40,
    alignItems: "center",
  },

  uploadBoxSuccess: {
    borderColor: "#22c55e",
    backgroundColor: "rgba(34,197,94,0.15)",
  },

  uploadIconCircle: {
    padding: 16,
    backgroundColor: "rgba(250,204,21,0.2)",
    borderRadius: 16,
    marginBottom: 12,
  },

  uploadText: {
    color: "#8fbac4",
    fontWeight: "900",
    fontStyle: "italic",
    fontSize: 14,
  },

  fileName: {
    color: "#22c55e",
    fontWeight: "900",
    fontSize: 12,
    marginTop: 8,
  },

  /* ================= SUBMIT ================= */
  submitButton: {
    width: "100%",
    padding: 20,
    borderRadius: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
     elevation: 6,
  },

  submitButtonText: {
    color: "#062530",
    fontWeight: "900",
    fontSize: 18,
    fontStyle: "italic",
    marginRight: 12,
  },

  /* ================= MODAL ================= */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(6,37,48,0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#0b3442",
    borderRadius: 40,
    padding: 32,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
    overflow: "hidden",
  },

  modalGlow: {
    position: "absolute",
    top: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.4,
  },

  modalIconCircle: {
    padding: 16,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
  },

  modalTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
    fontStyle: "italic",
    marginBottom: 12,
  },

  modalMessage: {
    color: "#8fbac4",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
    fontWeight: "500",
  },

  modalWindowBox: {
    backgroundColor: "rgba(16,78,100,0.35)",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  windowLabel: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 2,
  },

  windowTime: {
    color: "#ffffff",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 4,
    fontWeight: "700",
  },

  modalButton: {
    width: "100%",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  modalButtonText: {
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 2,
  },
});
