import React, { useLayoutEffect, useState,useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  // SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
 import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, TrendingUp, Shield, Zap } from "lucide-react-native";
import { useRouter,useFocusEffect } from "expo-router";


import { useAuthGuard } from "@/hooks/useAuthGaurd";
import { getProfileApi } from "@/services/profile";
import { getGoldPriceApi } from "@/services/goldprice";
import {
  createSipApi,
  getMySipsApi,
  pauseSipApi,
  resumeSipApi,
  stopSipApi,
} from "@/services/sip";

// Components 
 import CustomAlertModal from "./components/CustomAlert";
import SipActiveView from "./components/SipActiveView";
import StopConfirmationModal from "./components/StopConfirmationModel";
import PauseConfirmationModal from "./components/PauseConfirmationModel";
import SipSuccessModal from "./components/SipSuccessModel";


const PRESETS = [10, 50, 100, 500, 1000];

export default function DailySaving() {
  const canRender = useAuthGuard();
  const router = useRouter();

  const [dailyGold, setDailyGold] = useState(0);
  const [dailyValue, setDailyValue] = useState(0);
  const [liveGoldRate, setLiveGoldRate] = useState(0);
  const [depositWallet, setDepositWallet] = useState(0);

  const [sipStatus, setSipStatus] = useState<"IDLE" | "ACTIVE" | "PAUSED" | "STOPPED">("IDLE");
  const [localPrice, setLocalPrice] = useState<number | "">("");
  const [activeSipId, setActiveSipId] = useState<number | null>(null);

  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
const [pageLoading, setPageLoading] = useState(true);
  const [alertData, setAlertData] = useState<{
    title: string;
    message: string;
    action?: () => void;
  } | null>(null);

  const [dayStreak, setDayStreak] = useState(0);




  const refreshDailySip = async () => {
  try {
    const sipRes = await getMySipsApi();
    const dailySip = sipRes?.data?.daily?.[0];

    if (!dailySip || dailySip.status === "STOPPED") {
      setActiveSipId(null);
      setLocalPrice("");
      setSipStatus("IDLE");
      setDayStreak(0); // ✅ stop hone par 0
    } else {
      setActiveSipId(dailySip.sip_id);
      setLocalPrice(Number(dailySip.amount_per_cycle));
      setSipStatus(dailySip.status === "RUNNING" ? "ACTIVE" : dailySip.status);

      // ✅ BACKEND STREAK
      setDayStreak(Number(dailySip.day_streak || 0));
    }
  } catch (e) {
    console.log("❌ DAILY SIP ERROR:", e);
  }
};
  // }, []);
const loadDailyData = async () => {
  try {
     setPageLoading(true); 
    const profileRes = await getProfileApi();
    const goldRes = await getGoldPriceApi();
    const wallet = profileRes?.data?.wallet;

    if (!wallet) return;

    const grams = Number(wallet.daily_gold_grams || 0);
    const deposit = Number(wallet.deposit_balance || 0);
    const sellPrice = Number(goldRes?.data?.market_sell_price || 0);

    setDailyGold(grams);
    setDepositWallet(deposit);
    setLiveGoldRate(sellPrice);
    setDailyValue(grams * sellPrice);

    await refreshDailySip();
  } catch (e) {
    console.log("❌ DAILY LOAD ERROR:", e);
  }
    finally {
    setPageLoading(false);   // ✅ loader OFF
  }
};
useFocusEffect(
  useCallback(() => {
    loadDailyData();

    // live gold rate refresh (optional but good)
    const interval = setInterval(() => {
      getGoldPriceApi().then((res) => {
        if (res?.success) {
          setLiveGoldRate(Number(res.data?.market_sell_price || 0));
        }
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [])
);
  const handleStatusUpdate = async (newStatus: "IDLE" | "ACTIVE" | "PAUSED") => {
    if (!activeSipId) return;
    if (newStatus === "PAUSED") setIsPauseModalOpen(true);
    if (newStatus === "ACTIVE") {
      await resumeSipApi(activeSipId);
      setSipStatus("ACTIVE");
    }
    if (newStatus === "IDLE") setIsStopModalOpen(true);
  };



  const confirmPause = async () => {
  if (!activeSipId) return;
  await pauseSipApi(activeSipId);
  await refreshDailySip(); // ✅ backend se naya data
  setIsPauseModalOpen(false);
};



  const confirmStop = async () => {
  if (activeSipId) await stopSipApi(activeSipId);
  await refreshDailySip(); // ✅ backend se 0 aayega
  setIsStopModalOpen(false);
  setLocalPrice("");
};
  // ✅ UPDATED ACTIVATE
  const handleActivate = async () => {
  try {
    // 🛑 Frontend level block
    if (Number(depositWallet) <= 0) {
      setAlertData({
        title: "Wallet Empty",
        message: "Your wallet value is zero. Please deposit first.",
        action: () => router.replace("/paymentsDetails/deposite"),
      });
      return;
    }

    if (!localPrice || Number(localPrice) <= 0) {
      setAlertData({
        title: "Invalid Amount",
        message: "Please enter or select a daily amount.",
      });
      return;
    }

    // ✅ CALL API
    const res = await createSipApi("DAILY", Number(localPrice));
    console.log("📦 SIP CREATE RESPONSE 👉", res);

    // ❌ BACKEND FAILURE HANDLE
    if (!res?.success) {
      if (res?.message === "MINIMUM_SIP_AMOUNT_10") {
        setAlertData({
          title: "Minimum Amount",
          message: "Daily SIP amount must be at least ₹10.",
        });
        return;
      }

      if (res?.message === "INSUFFICIENT_BALANCE") {
        setAlertData({
          title: "Insufficient Balance",
          message: "Your wallet balance is insufficient. Please deposit first.",
          action: () => router.replace("/paymentsDetails/deposite"),
        });
        return;
      }

      // fallback
      setAlertData({
        title: "Something went wrong",
        message: "Unable to start SIP. Please try again.",
      });
      return;
    }

    // ✅ ONLY TRUE SUCCESS COMES HERE
    await refreshDailySip();
    setIsSuccessModalOpen(true);

  } catch (e) {
    console.log("❌ ACTIVATE SIP ERROR:", e);
    setAlertData({
      title: "Server Error",
      message: "Something went wrong. Please try again later.",
    });
  }
};

if (!canRender) return null;

// ✅ PAGE LOADER YAHAN ADD KARO
if (pageLoading) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#062530",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#facc15" />
      <Text style={{ marginTop: 10, color: "#fff", fontWeight: "bold" }}>
        Loading...
      </Text>
    </SafeAreaView>
  );
}

  return (
    // <SafeAreaView style={styles.safe}  >
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.fixedHeader}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color="white" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>Daily Saving</Text>
          <Text style={styles.subtitle}>AUTOMATED WEALTH ENGINE</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* LIVE RATE */}
        <View style={styles.liveBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.liveText}>GOLD RATE: ₹{liveGoldRate}/gm</Text>
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>WALLET</Text>
              <Text style={styles.statValue}>₹{depositWallet.toFixed(2)}</Text>
            </View>
            <View style={[styles.statCard, styles.goldCard]}>
              <Text style={styles.goldLabel}>SAVED GOLD</Text>
              <Text style={styles.goldValue}>{dailyGold.toFixed(3)}g</Text>
            </View>
          </View>

          <View style={styles.portfolioCard}>
            <View>
              <Text style={styles.portfolioLabel}>PORTFOLIO VALUE</Text>
              <Text style={styles.portfolioValue}>₹{dailyValue.toLocaleString()}</Text>
            </View>
            <TrendingUp size={32} color="#4ade80" />
          </View>
        </View>

        {/* CONTENT */}
        {sipStatus === "IDLE" ? (
          <View style={styles.idleCard}>
            <Text style={styles.labelCaps}>SELECT DAILY INVESTMENT</Text>

            <View style={styles.amountDisplay}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                value={localPrice ? String(localPrice) : ""}
                onChangeText={(t) => {
                  const num = t.replace(/[^0-9]/g, "");
                  setLocalPrice(num ? Number(num) : "");
                }}
                placeholder="0"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                style={styles.amountInput}
                maxLength={6}
              />
            </View>

            <View style={styles.horizontalDivider} />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.presetScroll}>
              {PRESETS.map((val) => (
                <TouchableOpacity
                  key={val}
                  onPress={() => setLocalPrice(val)}
                  style={[styles.presetBtn, localPrice === val && styles.activePresetBtn]}
                >
                  <Text style={[styles.presetText, localPrice === val && styles.activePresetText]}>
                    ₹{val >= 1000 ? `${val / 1000}k` : val}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.activateBtn} onPress={handleActivate}>
              <Text style={styles.activateBtnText}>ACTIVATE ENGINE ⚡</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <SipActiveView
            sipStatus={sipStatus}
            activeSipAmount={Number(localPrice)}
            dayStreak={dayStreak}
            onPause={() => handleStatusUpdate("PAUSED")}
            onResume={() => handleStatusUpdate("ACTIVE")}
            onStop={() => handleStatusUpdate("IDLE")}
          />
        )}
      </ScrollView>

      {/* MODALS */}
      <StopConfirmationModal isOpen={isStopModalOpen} onClose={() => setIsStopModalOpen(false)} onConfirm={confirmStop} />
      <PauseConfirmationModal isOpen={isPauseModalOpen} onClose={() => setIsPauseModalOpen(false)} onConfirm={confirmPause} />
      <SipSuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} amount={Number(localPrice)} />

      <CustomAlertModal
        isOpen={!!alertData}
        title={alertData?.title || ""}
        message={alertData?.message || ""}
        onConfirm={() => {
          alertData?.action?.();
          setAlertData(null);
        }}
      />
    </SafeAreaView>
  );
}











const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#062530",
  },

  fixedHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
     paddingBottom:20,
    backgroundColor: "#062530",
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 0,
    flexGrow: 1,
  },

  backBtn: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(16,78,100,0.4)",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  headerTitleContainer: { marginLeft: 16 },

  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    fontStyle: "italic",
  },

  subtitle: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  /* LIVE RATE */
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(250,204,21,0.12)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
  },

  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#facc15",
    marginRight: 8,
  },

  liveText: {
    color: "#facc15",
    fontSize: 11,
    fontWeight: "900",
  },

  /* STATS */
  statsContainer: { gap: 12, marginBottom: 24 },
  statsRow: { flexDirection: "row", gap: 12 },

  statCard: {
    flex: 1,
    backgroundColor: "#0b3442",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  statLabel: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 4,
  },

  statValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  goldCard: {
    backgroundColor: "rgba(250,204,21,0.08)",
    borderColor: "rgba(250,204,21,0.35)",
  },

  goldLabel: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "900",
    marginBottom: 4,
  },

  goldValue: {
    color: "#facc15",
    fontSize: 18,
    fontWeight: "900",
  },

  portfolioCard: {
    backgroundColor: "#0b3442",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  portfolioLabel: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 4,
  },

  portfolioValue: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
  },

  /* IDLE CARD */
  idleCard: {
    backgroundColor: "#0b3442",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  labelCaps: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  amountDisplay: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  currencySymbol: {
    color: "#facc15",
    fontSize: 28,
    fontWeight: "700",
    marginRight: 8,
  },

  amountInput: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "900",
    minWidth: 80,
  },

  horizontalDivider: {
    height: 1,
    backgroundColor: "#104e64",
    marginVertical: 15,
  },

  presetScroll: {
    gap: 10,
    paddingVertical: 5,
  },

  presetBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(16,78,100,0.25)",
    borderWidth: 1,
    borderColor: "#104e64",
    minWidth: 65,
    alignItems: "center",
  },

  activePresetBtn: {
    backgroundColor: "rgba(250,204,21,0.25)",
    borderColor: "#facc15",
  },

  presetText: {
    color: "#8fbac4",
    fontWeight: "700",
    fontSize: 13,
  },

  activePresetText: {
    color: "#ffffff",
  },

  activateBtn: {
    backgroundColor: "#facc15",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },

  activateBtnText: {
    color: "#062530",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 1,
    fontStyle: "italic",
  },
});
