

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
} from "react-native";
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, Loader2 } from "lucide-react-native";
import { MotiView, AnimatePresence } from "moti";

import { BankDetailForm, UpiDetailForm } from "./componets/Paymentdetails";
import { PayoutDetails } from "@/services/payout";
import { usePayoutStore } from "@/store/payoutStore";
// import { router } from "expo-router";
 import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function PaymentDetailsPage() {
  const { bank, upi, fetchPayout, updatePayout } = usePayoutStore();

  const [activeTab, setActiveTab] = useState<"BANK" | "UPI">("BANK");
  const [formData, setFormData] = useState<PayoutDetails>({
    method: "BANK",
    account_holder_name: "",
    upi_id: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
  });

  const [initialData, setInitialData] = useState<PayoutDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modal, setModal] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });
   const router = useRouter()

  // 🔥 Fetch from backend via Zustand
  useEffect(() => {
    const load = async () => {
      try {
        await fetchPayout();
      } catch (e) {
        console.log("No existing details found in DB", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 🔥 Fill local form when store updates
  useEffect(() => {
    if (!bank && !upi) return;

    const method: "BANK" | "UPI" = bank?.account_number ? "BANK" : "UPI";
    setActiveTab(method);

    const fetchedData: PayoutDetails = {
      method,
      account_holder_name: bank?.account_holder_name || "",
      bank_name: bank?.bank_name || "",
      account_number: bank?.account_number || "",
      ifsc_code: bank?.ifsc_code || "",
      upi_id: upi?.upi_id || "",
    };

    setFormData(fetchedData);
    setInitialData(fetchedData);
  }, [bank, upi]);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  // 🔥 Update via Zustand
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const payload = { ...formData, method: activeTab };

      await updatePayout(payload);

      setInitialData({ ...formData });
      setModal({
        show: true,
        type: "success",
        message: `Payout details for ${activeTab} have been updated successfully.`,
      });
    } catch (err) {
      setModal({
        show: true,
        type: "error",
        message: "Failed to update database. Please verify your details and try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <MotiView
          from={{ rotate: "0deg" }}
          animate={{ rotate: "360deg" }}
          transition={{ loop: true, duration: 1000, type: "timing" }}
        >
          <Loader2 color="#a855f7" size={48} opacity={0.5} />
        </MotiView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft color="#9ca3af" size={20} onPress={()=> router.back()} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>PAYOUT DETAILS</Text>
          <Text style={styles.headerSubtitle}>SETTLEMENT IDENTITY</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(["BANK", "UPI"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tabButton}
            >
              {activeTab === tab && (
                // <MotiView layoutId="activeTab" style={styles.activeTabBackground} />
                // <MotiView layout style={styles.activeTabBackground} />
                <MotiView style={styles.activeTabBackground} />


              )}
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab === "BANK" ? "BANK ACCOUNT" : "UPI ID"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Form Card */}
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={activeTab}
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -15 }}
            style={styles.formCard}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Sparkles color="#c084fc" size={20} />
              </View>
              <View>
                <Text style={styles.cardTitle}>Settlement Destination</Text>
                <Text style={styles.cardSubtitle}>
                  {hasChanges ? "UNSAVED CHANGES" : "SAVED DETAILS LOADED"}
                </Text>
              </View>
            </View>

            {activeTab === "BANK" ? (
              <BankDetailForm data={formData} setData={setFormData} />
            ) : (
              <UpiDetailForm data={formData} setData={setFormData} />
            )}

            <TouchableOpacity
              disabled={isUpdating || !hasChanges}
              onPress={handleUpdate}
              style={[
                styles.updateButton,
                (isUpdating || !hasChanges) && styles.disabledButton,
              ]}
            >
              {isUpdating ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.updateButtonText}>UPDATE</Text>
              )}
            </TouchableOpacity>
          </MotiView>
        </AnimatePresence>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modal.show} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <MotiView
            from={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={styles.modalContent}
          >
            <View
              style={[
                styles.modalIconBox,
                {
                  backgroundColor:
                    modal.type === "success"
                      ? "rgba(34, 197, 94, 0.1)"
                      : "rgba(239, 44, 44, 0.1)",
                },
              ]}
            >
              {modal.type === "success" ? (
                <CheckCircle2 color="#4ade80" size={40} />
              ) : (
                <XCircle color="#f87171" size={40} />
              )}
            </View>

            <Text style={styles.modalTitle}>
              {modal.type === "success" ? "RECORDS UPDATED" : "SYSTEM ERROR"}
            </Text>
            <Text style={styles.modalMessage}>{modal.message}</Text>

            <TouchableOpacity
              onPress={() => setModal({ ...modal, show: false })}
              style={[
                styles.modalButton,
                modal.type === "success"
                  ? styles.modalButtonSuccess
                  : styles.modalButtonError,
              ]}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  modal.type === "success" ? { color: "#000" } : { color: "#fff" },
                ]}
              >
                {modal.type === "success" ? "CONFIRM" : "RETRY"}
              </Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* 🔽 STYLES (UNCHANGED) */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a003d" },
  loadingContainer: { flex: 1, backgroundColor: "#1a003d", justifyContent: "center", alignItems: "center" },
  glowTop: { position: "absolute", top: -height * 0.1, right: -width * 0.1, width: width * 0.8, height: width * 0.8, backgroundColor: "rgba(147, 51, 234, 0.1)", borderRadius: 1000 },
  glowBottom: { position: "absolute", bottom: height * 0.1, left: -width * 0.1, width: width * 0.7, height: width * 0.7, backgroundColor: "rgba(79, 70, 229, 0.1)", borderRadius: 1000 },
  header: { flexDirection: "row", alignItems: "center", padding: 20,  borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.05)" },
  backButton: { padding: 10, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  headerTextContainer: { marginLeft: 16 },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "900", fontStyle: "italic" },
  headerSubtitle: { color: "#a855f7", fontSize: 10, fontWeight: "bold", letterSpacing: 1 },
  scrollContent: { padding: 20 },
  tabContainer: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.05)", padding: 6, borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", marginBottom: 24 },
  tabButton: { flex: 1, height: 45, justifyContent: "center", alignItems: "center" },
  activeTabBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: "#9333ea", borderRadius: 15 },
  tabText: { color: "#6b7280", fontSize: 12, fontWeight: "900", letterSpacing: 1 },
  activeTabText: { color: "white" },
  formCard: { backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 40, padding: 32, borderWidth: 1, borderColor: "rgba(255,255,255,0.05)" },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 32 },
  iconBox: { padding: 12, backgroundColor: "rgba(147, 51, 234, 0.2)", borderRadius: 12, marginRight: 16 },
  cardTitle: { color: "white", fontWeight: "bold", fontSize: 14 },
  cardSubtitle: { color: "#6b7280", fontSize: 10, fontWeight: "bold", letterSpacing: 1 },
  updateButton: { backgroundColor: "#9333ea", padding: 20, borderRadius: 16, alignItems: "center", marginTop: 20 },
  updateButtonText: { color: "white", fontWeight: "900", fontStyle: "italic", letterSpacing: 2 },
  disabledButton: { opacity: 0.3 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: 24 },
  modalContent: { backgroundColor: "#1a003d", width: "100%", borderRadius: 48, padding: 40, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  modalIconBox: { width: 80, height: 80, borderRadius: 24, justifyContent: "center", alignItems: "center", marginBottom: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  modalTitle: { color: "white", fontSize: 24, fontWeight: "900", fontStyle: "italic", marginBottom: 8 },
  modalMessage: { color: "#9ca3af", textAlign: "center", fontSize: 14, lineHeight: 20, marginBottom: 32 },
  modalButton: { width: "100%", padding: 16, borderRadius: 16, alignItems: "center" },
  modalButtonSuccess: { backgroundColor: "white" },
  modalButtonError: { backgroundColor: "#ef4444" },
  modalButtonText: { fontWeight: "900", fontSize: 12, letterSpacing: 2 },
});
