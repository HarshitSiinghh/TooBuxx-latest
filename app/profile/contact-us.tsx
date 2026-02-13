import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
//   ActivityProvider,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  ArrowLeft,
  Headset,
  Send,
  CreditCard,
  Wallet,
  RefreshCcw,
  User,
  Fingerprint,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
} from "lucide-react-native";
import { router } from "expo-router";

// Colors Mapping based on your theme
const COLORS = {
  BG: "#062530",
  CARD: "rgba(16, 78, 100, 0.4)",
  ACCENT: "#1e96c2",
  PLATINUM: "#E5E4E2",
  TEXT_MUTED: "#8E8E93",
  DANGER: "#FF453A",
  SUCCESS: "#4ADE80",
};

const issues = [
  { icon: CreditCard, title: "UPI ID", category: "UPI" },
  { icon: Wallet, title: "Wallet", category: "WALLET" },
  { icon: RefreshCcw, title: "Refund", category: "REFUND" },
  { icon: User, title: "Account", category: "ACCOUNT" },
  { icon: Fingerprint, title: "Identity", category: "IDENTITY" },
  { icon: MoreHorizontal, title: "Other", category: "OTHER" },
];

export default function ContactUs() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedIssue || !message.trim()) return;

    try {
      setLoading(true);
      // Simulate API Call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert("Received", "Your support ticket has been logged.");
      setMessage("");
      setSelectedIssue(null);
    } catch (err) {
      Alert.alert("Error", "System transmission error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => {router.back()}}>
            <ArrowLeft size={20} color={COLORS.PLATINUM} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.navTitle}>SUPPORT CENTER</Text>
            <Text style={styles.navSubtitle}>Help & Documentation</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Intro Section */}
          <View style={styles.introRow}>
            <View>
              <Text style={styles.greetingText}>Hi there! </Text>
              <Text style={styles.subGreeting}>How can we help today?</Text>
            </View>
            <View style={styles.headsetCircle}>
              <Headset size={28} color={COLORS.ACCENT} />
            </View>
          </View>

          {/* Issue Grid */}
          <Text style={styles.sectionLabel}>SELECT CATEGORY</Text>
          <View style={styles.grid}>
            {issues.map((issue, index) => {
              const Icon = issue.icon;
              const isSelected = selectedIssue === issue.title;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.gridItem,
                    isSelected && styles.gridItemSelected,
                  ]}
                  onPress={() => setSelectedIssue(issue.title)}
                >
                  <View style={[styles.iconBox, isSelected && styles.iconBoxActive]}>
                    <Icon
                      size={24}
                      color={isSelected ? "#fff" : COLORS.ACCENT}
                    />
                  </View>
                  <Text style={[styles.gridText, isSelected && styles.gridTextActive]}>
                    {issue.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Message Input */}
          <Text style={styles.sectionLabel}>MESSAGE DETAILS</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your issue in detail..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            multiline
            numberOfLines={5}
            value={message}
            onChangeText={setMessage}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitBtn,
              (!selectedIssue || !message.trim()) && { opacity: 0.5 },
            ]}
            onPress={handleSubmit}
            disabled={loading || !selectedIssue || !message.trim()}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Text style={styles.submitBtnText}>SUBMIT TICKET</Text>
                <Send size={18} color="#000" />
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.BG },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
     paddingTop:30,
      // padding:20,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  navTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
    fontStyle: "italic",
  },
  navSubtitle: {
    color: COLORS.ACCENT,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  scrollContent: { padding: 20, paddingBottom: 40 },
  introRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  greetingText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    fontStyle: "italic",
  },
  subGreeting: {
    color: COLORS.ACCENT,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 4,
  },
  headsetCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.CARD,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  sectionLabel: {
    color: COLORS.TEXT_MUTED,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  gridItem: {
    width: "48%",
    backgroundColor: COLORS.CARD,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  gridItemSelected: {
    borderColor: COLORS.ACCENT,
    backgroundColor: "rgba(30, 150, 194, 0.15)",
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBoxActive: { backgroundColor: COLORS.ACCENT },
  gridText: {
    color: COLORS.TEXT_MUTED,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  gridTextActive: { color: "#fff" },
  textArea: {
    backgroundColor: COLORS.CARD,
    borderRadius: 24,
    padding: 20,
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    minHeight: 120,
    marginBottom: 30,
  },
  submitBtn: {
    backgroundColor: COLORS.PLATINUM,
    height: 65,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    shadowColor: COLORS.ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitBtnText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 2,
  },
});