import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Coins,
  Wallet,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react-native";
import { useRouter } from "expo-router";

import { useAuthGuard } from "@/hooks/useAuthGaurd";
import {
  getPointsBalanceApi,
  convertPointsToWalletApi,
} from "@/services/points";

export default function PointConverter() {
  const canRender = useAuthGuard();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [totalPoints, setTotalPoints] = useState(0);
  const [conversionRate, setConversionRate] = useState(0); // rupee_per_point
  const [pointsPerRupee, setPointsPerRupee] = useState(0);

  const [inputPoints, setInputPoints] = useState("");
  const [popup, setPopup] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  /* ================= LOAD ================= */

  useEffect(() => {
    if (canRender) loadData();
  }, [canRender]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getPointsBalanceApi();

      if (res?.success) {
        setTotalPoints(res.data.points.total);
        setConversionRate(res.data.conversion.rupee_per_point);
        setPointsPerRupee(res.data.conversion.points_per_rupee);
      }
    } catch (e) {
      console.log("❌ POINTS BALANCE ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTION ================= */

  const estimatedMoney = (Number(inputPoints) || 0) * conversionRate;

  const handleConvert = async () => {
    const pts = Number(inputPoints);

    if (!pts || pts <= 0) return;

    if (pts > totalPoints) {
      setPopup({ type: "error", message: "Insufficient points balance." });
      return;
    }

    try {
      setSubmitting(true);
      const res = await convertPointsToWalletApi(pts);

      if (res?.success) {
        setPopup({
          type: "success",
          message: `₹${res.data.credited_rupees.toFixed(
            2
          )} added to wallet`,
        });

        setTotalPoints(res.data.remaining_points);
        setInputPoints("");
      } else {
        setPopup({ type: "error", message: res.message || "Failed" });
      }
    } catch (e) {
      setPopup({ type: "error", message: "Conversion failed" });
    } finally {
      setSubmitting(false);
    }
  };

  if (!canRender || loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#a855f7" />
        <Text style={styles.loadingText}>Fetching exchange rates...</Text>
      </SafeAreaView>
    );
  }

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <ArrowLeft size={20} color="#9ca3af" />
        </TouchableOpacity>

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>Converter</Text>
          <Text style={styles.subtitle}>Reward Exchange</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>

        {/* POINTS CARD */}
        <View style={styles.pointsCard}>
          <View>
            <Text style={styles.cardLabel}>CURRENT POINTS</Text>
            <Text style={styles.pointsText}>
              {totalPoints.toLocaleString()}
            </Text>
          </View>

          <View style={styles.coinBox}>
            <Coins size={24} color="#facc15" />
          </View>
        </View>

        {/* FORM */}
        <View style={styles.formCard}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>POINTS TO USE</Text>
            <TouchableOpacity
              onPress={() => setInputPoints(totalPoints.toString())}
            >
              <Text style={styles.maxBtn}>MAX</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              value={inputPoints}
              onChangeText={setInputPoints}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.2)"
              style={styles.input}
            />
            <Text style={styles.inputSuffix}>PTS</Text>
          </View>

          <View style={styles.arrowWrap}>
            <ArrowRightLeft size={18} color="#a855f7" />
          </View>

          <View style={styles.walletBox}>
            <View>
              <Text style={styles.walletLabel}>WALLET CREDIT</Text>
              <Text style={styles.walletValue}>
                ₹{estimatedMoney.toFixed(2)}
              </Text>
            </View>
            <Wallet size={26} color="#22c55e" />
          </View>

          <View style={styles.rateBox}>
            <Info size={14} color="#c084fc" />
            <Text style={styles.rateText}>
              Rate: {pointsPerRupee} Points = ₹1
            </Text>
          </View>

          <TouchableOpacity
            disabled={!inputPoints || submitting}
            onPress={handleConvert}
            style={[styles.submitBtn, submitting && { opacity: 0.4 }]}
          >
            {submitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitText}>CONVERT NOW</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* POPUP */}
      <Modal visible={!!popup} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            {popup?.type === "success" ? (
              <CheckCircle2 size={60} color="#4ade80" />
            ) : (
              <XCircle size={60} color="#f87171" />
            )}

            <Text style={styles.popupTitle}>
              {popup?.type === "success" ? "Success" : "Error"}
            </Text>

            <Text style={styles.popupMsg}>{popup?.message}</Text>

            <TouchableOpacity
              onPress={() => setPopup(null)}
              style={styles.popupBtn}
            >
              <Text style={styles.popupBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a003d" },

  center: {
    flex: 1,
    backgroundColor: "#1a003d",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  backBtn: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
  },

  title: { color: "white", fontSize: 20, fontWeight: "900" },
  subtitle: { color: "#facc15", fontSize: 10, fontWeight: "800" },

  body: { padding: 18, paddingBottom: 40 },

  pointsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 22,
    marginBottom: 20,
  },

  cardLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  pointsText: {
    color: "white",
    fontSize: 44,
    fontWeight: "900",
  },

  coinBox: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: "rgba(250,204,21,0.1)",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.2)",
  },

  formCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 22,
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  maxBtn: {
    color: "#c084fc",
    fontSize: 10,
    fontWeight: "900",
  },

  inputWrap: {
    backgroundColor: "#0f0225",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  input: {
    flex: 1,
    color: "white",
    fontSize: 28,
    fontWeight: "900",
  },

  inputSuffix: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 10,
    fontWeight: "900",
  },

  arrowWrap: {
    alignItems: "center",
    marginVertical: 12,
  },

  walletBox: {
    backgroundColor: "#0f0225",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  walletLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  walletValue: {
    color: "#4ade80",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 2,
  },

  rateBox: {
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 10,
    borderRadius: 12,
  },

  rateText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    fontWeight: "800",
  },

  submitBtn: {
    marginTop: 16,
    backgroundColor: "#7c3aed",
    borderRadius: 22,
    paddingVertical: 18,
    alignItems: "center",
  },

  submitText: {
    color: "white",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  popupBox: {
    width: "100%",
    backgroundColor: "#1a0b2e",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    padding: 28,
    alignItems: "center",
  },

  popupTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 10,
  },

  popupMsg: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },

  popupBtn: {
    marginTop: 18,
    backgroundColor: "#7c3aed",
    paddingVertical: 14,
    borderRadius: 18,
    width: "100%",
    alignItems: "center",
  },

  popupBtnText: {
    color: "white",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
  },
});
