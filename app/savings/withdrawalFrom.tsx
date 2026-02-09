


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  getProfile,
  getLiveGoldPrice,
  processWithdrawal,
  getPayoutMethods,
} from "@/services/withdrawal";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

/* ================= TYPES ================= */
type Bucket = "instant" | "daily" | "weekly" | "monthly";
type Method = "bank" | "upi";

/* ================= CONSTANTS ================= */
const TABS: { key: Bucket; label: string }[] = [
  { key: "instant", label: "Instant" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

export default function WithdrawScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Bucket>("instant");
  const [profile, setProfile] = useState<any>(null);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [payouts, setPayouts] = useState<any>(null);
  const [method, setMethod] = useState<Method | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rupees, setRupees] = useState("");
  const [showBankAlert, setShowBankAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔥 new states
  const [showZeroGoldAlert, setShowZeroGoldAlert] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  /* ========== LOAD DATA (Same Logic) ========== */
  useEffect(() => {
    (async () => {
      try {
        const profileRes = await getProfile();
        const priceRes = await getLiveGoldPrice();
        const payoutRes = await getPayoutMethods();

        setProfile(profileRes.data);
        setSellPrice(Number(priceRes.data.market_sell_price || 0));
        setPayouts(payoutRes.data);

        const payoutData = payoutRes.data;
        const hasBank =
          payoutData?.bank ||
          (Array.isArray(payoutData?.banks) && payoutData.banks.length > 0);
        const hasUpi = !!payoutData?.upi;

        if (!hasBank && !hasUpi) {
          setShowBankAlert(true);
        }
      } catch (e: any) {
        Alert.alert("Error", e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ========== HELPERS ========== */
  const hasBank =
    payouts?.bank ||
    (Array.isArray(payouts?.banks) && payouts.banks.length > 0);
  const hasUpi = !!payouts?.upi;
  const hasAnyPayoutMethod = hasBank || hasUpi;

  /* ========== CALCULATIONS ========== */
  const availableGrams: number =
    activeTab === "instant"
      ? Number(profile?.wallet?.instant_gold_grams || 0)
      : activeTab === "daily"
      ? Number(profile?.wallet?.daily_gold_grams || 0)
      : activeTab === "weekly"
      ? Number(profile?.wallet?.weekly_gold_grams || 0)
      : Number(profile?.wallet?.monthly_gold_grams || 0);

  const availableValue = availableGrams * sellPrice;
  const withdrawGrams =
    sellPrice > 0 ? (Number(rupees) || 0) / sellPrice : 0;

  /* ========== ACTION ========== */
  const handleWithdraw = async () => {
    // ❌ amount empty
    if (!rupees || Number(rupees) <= 0) {
      Alert.alert("Alert", "Please enter the amount before withdrawal");
      return;
    }

    // ❌ gold zero
    if (availableGrams <= 0) {
      setShowZeroGoldAlert(true);
      return;
    }

    // ❌ no payout method
    if (!hasAnyPayoutMethod) {
      setShowBankAlert(true);
      return;
    }

    if (!method || !selectedId) {
      Alert.alert("Select payout method");
      return;
    }

    try {
      setSubmitting(true);
      await processWithdrawal(activeTab, withdrawGrams, method, selectedId);
      setRupees("");
      setShowSuccessPopup(true); // ✅ success popup
    } catch (e: any) {
      Alert.alert("Failed", e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color="#a78bfa" />
        <Text style={styles.loaderText}>Loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={22} color="#fbbf24" />
          </TouchableOpacity>
          <Text style={styles.title}>Withdraw</Text>
          <View style={{ width: 42 }} />
        </View>

        {/* LIVE PRICE */}
        <View style={styles.priceChip}>
          <Text style={styles.priceText}>LIVE SELL PRICE</Text>
          <Text style={styles.priceValue}>₹ {sellPrice} / g</Text>
        </View>

        {/* TABS */}
        <View style={styles.tabsRow}>
          {TABS.map((tab) => {
            const active = tab.key === activeTab;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => {
                  setActiveTab(tab.key);
                  setRupees("");
                }}
                style={[styles.tabBtn, active && styles.activeTab]}
              >
                <Text
                  style={[styles.tabText, active && styles.activeTabText]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* AVAILABLE CARD */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>AVAILABLE GOLD</Text>
          <Text style={styles.infoValue}>
            {availableGrams.toFixed(6)} g
          </Text>
          <Text style={styles.infoLabelSmall}>TOTAL VALUE</Text>
          <Text style={styles.infoValueSmall}>
            ₹ {availableValue.toLocaleString()}
          </Text>
        </View>

        {/* ₹ INPUT */}
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>ENTER AMOUNT (₹)</Text>
          <TextInput
            value={rupees}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#6b7280"
            onChangeText={(t) => {
              const v = Number(t);
              if (v > availableValue)
                setRupees(String(Math.floor(availableValue)));
              else setRupees(t);
            }}
            style={styles.input}
          />
        </View>

        {/* PAYOUT PREVIEW */}
        <View style={styles.estimateBox}>
          <View>
            <Text style={styles.estimateLabel}>YOU WILL SELL</Text>
            <Text style={styles.estimateValueSmall}>
              {withdrawGrams.toFixed(6)} g
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.estimateLabel}>PAYOUT</Text>
            <Text style={styles.estimateValue}>
              ₹ {Number(rupees || 0).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* PAYOUT METHOD */}
        <Text style={styles.inputLabel}>WHERE SHOULD WE SEND MONEY?</Text>

        {payouts?.banks?.map((b: any) => (
          <TouchableOpacity
            key={b.id}
            onPress={() => {
              setMethod("bank");
              setSelectedId(b.id);
            }}
            style={[
              styles.payoutCard,
              method === "bank" &&
                selectedId === b.id &&
                styles.payoutActive,
            ]}
          >
            <Text style={styles.payoutTitle}>🏦 {b.bank_name}</Text>
            <Text style={styles.payoutSub}>**** {b.last4}</Text>
          </TouchableOpacity>
        ))}

        {payouts?.bank && (
          <TouchableOpacity
            onPress={() => {
              setMethod("bank");
              setSelectedId(1);
            }}
            style={[
              styles.payoutCard,
              method === "bank" && styles.payoutActive,
            ]}
          >
            <Text style={styles.payoutTitle}>
              🏦 {payouts.bank.bank_name}
            </Text>
            <Text style={styles.payoutSub}>
              **** {payouts.bank.account_number.slice(-4)}
            </Text>
          </TouchableOpacity>
        )}

        {payouts?.upi && (
          <TouchableOpacity
            onPress={() => {
              setMethod("upi");
              setSelectedId(1);
            }}
            style={[
              styles.payoutCard,
              method === "upi" && styles.payoutActive,
            ]}
          >
            <Text style={styles.payoutTitle}>💸 {payouts.upi.upi_id}</Text>
            <Text style={styles.payoutSub}>UPI</Text>
          </TouchableOpacity>
        )}

        {/* BUTTON */}
        <TouchableOpacity
          disabled={!rupees || !method || !selectedId || submitting}
          onPress={handleWithdraw}
          activeOpacity={0.8}
          style={[
            styles.mainBtnWrapper,
            (!rupees || !method || !selectedId || submitting) && {
              opacity: 0.4,
            },
          ]}
        >
       <LinearGradient
  colors={["#facc15", "#eab308"]}
  style={styles.withdrawBtn}
>

            <Text style={styles.withdrawText}>
              {submitting ? "PROCESSING..." : "AUTHORIZE WITHDRAWAL"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* BANK ALERT */}
      {showBankAlert && (
        <View style={styles.alertOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertIcon}>🏦</Text>
            <Text style={styles.alertTitle}>Bank details required</Text>
            <Text style={styles.alertMsg}>
              Withdrawal se pehle apni bank ya UPI details add karna zaroori hai.
            </Text>
            <View style={styles.alertBtnRow}>
              <TouchableOpacity
                onPress={() => setShowBankAlert(false)}
                style={styles.alertCancelBtn}
              >
                <Text style={styles.alertCancelText}>Later</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowBankAlert(false);
                  router.push("/profile/paymentdetails");
                }}
                style={styles.alertAddBtn}
              >
                <Text style={styles.alertAddText}>Add Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* ZERO GOLD ALERT */}
      {showZeroGoldAlert && (
        <View style={styles.alertOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <Text style={styles.alertTitle}>No Gold Available</Text>
            <Text style={styles.alertMsg}>
              Please invest in gold before withdrawal.
            </Text>

            <TouchableOpacity
              onPress={() => setShowZeroGoldAlert(false)}
              style={styles.alertAddBtn}
            >
              <Text style={styles.alertAddText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
        <View style={styles.alertOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertIcon}>🎉</Text>
            <Text style={styles.alertTitle}>Withdrawal Successful</Text>
            <Text style={styles.alertMsg}>
              Your withdrawal request has been submitted successfully.

            </Text>

            <TouchableOpacity
              onPress={() => {
                setShowSuccessPopup(false);
                router.back();
              }}
              style={styles.alertAddBtn}
            >
              <Text style={styles.alertAddText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#062530" },
  container: { flex: 1 },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 140,
    paddingBottom: 60,
  },

  loaderWrap: {
    flex: 1,
    backgroundColor: "#062530",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: { marginTop: 10, color: "#8fbac4", fontWeight: "700" },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 65 : 55,
    paddingBottom: 15,
    backgroundColor: "#062530",
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(250,204,21,0.12)",
  },

  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    textTransform: "uppercase",
  },

  priceChip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(16,78,100,0.35)",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  priceText: { color: "#facc15", fontSize: 10, fontWeight: "800" },
  priceValue: { color: "#22c55e", fontSize: 14, fontWeight: "900" },

  tabsRow: { flexDirection: "row", gap: 8, marginBottom: 20 },

  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(16,78,100,0.25)",
    borderWidth: 1,
    borderColor: "#104e64",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "rgba(250,204,21,0.18)",
    borderColor: "#facc15",
  },

  tabText: { color: "#8fbac4", fontWeight: "800", fontSize: 10 },
  activeTabText: { color: "#ffffff" },

  infoCard: {
    backgroundColor: "#0b3442",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  infoLabel: { fontSize: 10, color: "#8fbac4", fontWeight: "800" },
  infoValue: { color: "#ffffff", fontSize: 26, fontWeight: "900", marginTop: 4 },
  infoLabelSmall: { marginTop: 15, fontSize: 10, color: "#8fbac4", fontWeight: "800" },
  infoValueSmall: { marginTop: 4, fontSize: 18, color: "#22c55e", fontWeight: "900" },

  inputBox: { marginBottom: 20 },

  inputLabel: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#104e64",
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "900",
  },

  estimateBox: {
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  estimateLabel: { fontSize: 9, color: "#8fbac4", fontWeight: "800" },
  estimateValue: { color: "#22c55e", fontSize: 18, fontWeight: "900" },
  estimateValueSmall: {
    marginTop: 4,
    color: "#facc15",
    fontSize: 16,
    fontWeight: "900",
  },

  payoutCard: {
    backgroundColor: "rgba(16,78,100,0.3)",
    borderWidth: 1,
    borderColor: "#104e64",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },

  payoutActive: {
    borderColor: "#facc15",
    backgroundColor: "rgba(250,204,21,0.18)",
  },

  payoutTitle: { color: "#ffffff", fontWeight: "800", fontSize: 14 },
  payoutSub: { color: "#8fbac4", marginTop: 4, fontSize: 11, fontWeight: "600" },

  mainBtnWrapper: { marginTop: 30 },

  withdrawBtn: {
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  withdrawText: {
    color: "#062530",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 2,
  },

  alertOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(6,37,48,0.92)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  alertBox: {
    width: "85%",
    backgroundColor: "#0b3442",
    borderRadius: 28,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  alertIcon: { fontSize: 44, marginBottom: 10 },

  alertTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
  },

  alertMsg: {
    fontSize: 13,
    color: "#8fbac4",
    textAlign: "center",
    marginBottom: 25,
  },

  alertBtnRow: { flexDirection: "row", gap: 12 },

  alertCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#104e64",
    alignItems: "center",
  },

  alertCancelText: { color: "#8fbac4", fontSize: 12, fontWeight: "800" },

  alertAddBtn: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: "#facc15",
    alignItems: "center",
  },

  alertAddText: {
    color: "#062530",
    fontSize: 12,
    fontWeight: "900",
  },
});
