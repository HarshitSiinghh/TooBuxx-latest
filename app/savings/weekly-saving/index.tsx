import React, { useLayoutEffect, useState,useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native";
import { ArrowLeft, TrendingUp, Shield, Zap, Clock } from "lucide-react-native";
import { useRouter,useFocusEffect } from "expo-router";

// Hooks & API
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
import WeeklyIdleView from "./components/WeeklyIdleView";
import WeeklyActiveView from "./components/WeeklyActiveView";
import StopConfirmationModal from "./components/StopConfirmationMationModal";
import PauseConfirmationModal from "./components/PauseConfirmation";
import SipSuccessModal from "./components/SipSuccessModel";
import MonthlyAlert from "../monthly-saving/components/MonthlyAlert";

const { width } = Dimensions.get("window");

export default function WeeklySaving() {
  const canRender = useAuthGuard();
  const router = useRouter();

  const [weeklyGold, setWeeklyGold] = useState(0);
  const [weeklyValue, setWeeklyValue] = useState(0);
  const [liveGoldRate, setLiveGoldRate] = useState(0);
  const [depositWallet, setDepositWallet] = useState(0);

  const [sipStatus, setSipStatus] =
    useState<"IDLE" | "ACTIVE" | "PAUSED" | "STOPPED">("IDLE");

  const [localPrice, setLocalPrice] = useState<number | "">("");
  const [activeSipId, setActiveSipId] = useState<number | null>(null);

  // ✅ REAL BACKEND STREAK
  const [weekStreak, setWeekStreak] = useState(0);

  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
const [pageLoading, setPageLoading] = useState(true);
  // 🔥 Alerts
  const [emptyVisible, setEmptyVisible] = useState(false);
  const [errorAlert, setErrorAlert] = useState<{
    title: string;
    message: string;
    goDeposit?: boolean;
  } | null>(null);

  /* ================= LOAD WEEKLY SIP ================= */

  const refreshWeeklySip = async () => {
    try {
      const sipRes = await getMySipsApi();

      console.log("📦 ALL SIPS 👉", sipRes);

      const weeklySip = sipRes?.data?.weekly?.[0];

      if (!weeklySip || weeklySip.status === "STOPPED") {
        setActiveSipId(null);
        setLocalPrice("");
        setSipStatus("IDLE");
        setWeekStreak(0); // ✅ stop = 0
      } else {
        setActiveSipId(weeklySip.sip_id);
        setLocalPrice(Number(weeklySip.amount_per_cycle));
        setSipStatus(
          weeklySip.status === "RUNNING" ? "ACTIVE" : weeklySip.status
        );

        // ✅ BACKEND STREAK
        setWeekStreak(
          Number(
            weeklySip.week_streak ||
              weeklySip.day_streak ||
              weeklySip.streak ||
              0
          )
        );
      }
    } catch (e) {
      console.log("❌ WEEKLY SIP ERROR:", e);
    }
  };

  /* ================= LOAD DATA ================= */

  // useLayoutEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const profileRes = await getProfileApi();
  //       const goldRes = await getGoldPriceApi();
  //       const wallet = profileRes?.data?.wallet;
  //       if (!wallet) return;

  //       const grams = Number(wallet.weekly_gold_grams || 0);
  //       const deposit = Number(wallet.deposit_balance || 0);
  //       const sellPrice = Number(goldRes?.data?.market_sell_price || 0);

  //       setWeeklyGold(grams);
  //       setDepositWallet(deposit);
  //       setLiveGoldRate(sellPrice);
  //       setWeeklyValue(grams * sellPrice);

  //       await refreshWeeklySip();
  //     } catch (e) {
  //       console.log("❌ WEEKLY LOAD ERROR:", e);
  //     }
  //   };

  //   loadData();
  // }, []);

  const loadWeeklyData = async () => {
  try {
    setPageLoading(true); // ✅ loader ON
    const profileRes = await getProfileApi();
    const goldRes = await getGoldPriceApi();
    const wallet = profileRes?.data?.wallet;
    if (!wallet) return;

    const grams = Number(wallet.weekly_gold_grams || 0);
    const deposit = Number(wallet.deposit_balance || 0);
    const sellPrice = Number(goldRes?.data?.market_sell_price || 0);

    setWeeklyGold(grams);
    setDepositWallet(deposit);
    setLiveGoldRate(sellPrice);
    setWeeklyValue(grams * sellPrice);

    await refreshWeeklySip();
  } catch (e) {
    console.log("❌ WEEKLY LOAD ERROR:", e);
  } finally {
    setPageLoading(false); // ✅ loader OFF
  }

};

useFocusEffect(
  useCallback(() => {
    loadWeeklyData();

    // optional: live gold rate auto refresh
    const interval = setInterval(() => {
      getGoldPriceApi().then((res) => {
        if (res?.success) {
          setLiveGoldRate(Number(res.data?.market_sell_price || 0));
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [])
);
  /* ================= ACTIONS ================= */

  const handleStatusUpdate = async (
    newStatus: "IDLE" | "ACTIVE" | "PAUSED"
  ) => {
    if (!activeSipId) return;
    if (newStatus === "PAUSED") setIsPauseModalOpen(true);
    if (newStatus === "ACTIVE") {
      await resumeSipApi(activeSipId);
      await refreshWeeklySip(); // ✅ backend refresh
    }
    if (newStatus === "IDLE") setIsStopModalOpen(true);
  };

  const confirmPause = async () => {
    if (!activeSipId) return;
    await pauseSipApi(activeSipId);
    await refreshWeeklySip(); // ✅ backend refresh
    setIsPauseModalOpen(false);
  };

  const confirmStop = async () => {
    if (activeSipId) await stopSipApi(activeSipId);
    await refreshWeeklySip(); // ✅ backend refresh (streak = 0)
    setIsStopModalOpen(false);
    setLocalPrice("");
  };

  const handleActivate = async () => {
    if (!localPrice || Number(localPrice) <= 0) {
      setEmptyVisible(true);
      return;
    }

    try {
      const res = await createSipApi("WEEKLY", Number(localPrice));
      if (!res?.success) {
        if (res?.message === "MINIMUM_SIP_AMOUNT_10") {
          setErrorAlert({
            title: "Minimum Amount",
            message: "Weekly SIP amount must be at least ₹10.",
          });
          return;
        }
        if (res?.message === "INSUFFICIENT_BALANCE") {
          setErrorAlert({
            title: "Insufficient Balance",
            message:
              "Your wallet balance is insufficient. Please deposit first.",
            goDeposit: true,
          });
          return;
        }
        setErrorAlert({
          title: "Something went wrong",
          message: "Unable to start Weekly SIP. Please try again.",
        });
        return;
      }
      await refreshWeeklySip(); // ✅ backend se fresh streak
      setIsSuccessModalOpen(true);
    } catch (e) {
      setErrorAlert({
        title: "Server Error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  if (!canRender) return null;
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
      <Text style={{ marginTop: 10, color: "#ffffff", fontWeight: "900" }}>
        Loading...
      </Text>
    </SafeAreaView>
  );
}

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.fixedHeader}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color="white" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>Weekly Saving</Text>
          <Text style={styles.subtitle}>ACCELERATED WEALTH ENGINE</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* LIVE RATE */}
        <View style={styles.liveBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.liveText}>
            GOLD RATE: ₹{liveGoldRate}/gm
          </Text>
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>WALLET</Text>
              <Text style={styles.statValue}>
                ₹{depositWallet.toLocaleString()}
              </Text>
            </View>
            <View style={[styles.statCard, styles.goldCard]}>
              <Text style={styles.goldLabel}>ACCUMULATED</Text>
              <Text style={styles.goldValue}>
                {weeklyGold.toFixed(3)}g
              </Text>
            </View>
          </View>

          <View style={styles.portfolioCard}>
            <View>
              <Text style={styles.portfolioLabel}>PORTFOLIO VALUE</Text>
              <Text style={styles.portfolioValue}>
                ₹{weeklyValue.toLocaleString()}
              </Text>
            </View>
            <TrendingUp size={32} color="#4ade80" />
          </View>
        </View>

        {/* MAIN VIEW */}
        <View style={styles.mainViewContainer}>
          {sipStatus === "IDLE" ? (
            <WeeklyIdleView
              localPrice={localPrice}
              setLocalPrice={setLocalPrice}
              handleActivate={handleActivate}
            />
          ) : (
            <WeeklyActiveView
              sipStatus={sipStatus}
              activeSipAmount={Number(localPrice)}
              weekStreak={weekStreak} // ✅ REAL BACKEND STREAK
              onPause={() => handleStatusUpdate("PAUSED")}
              onResume={() => handleStatusUpdate("ACTIVE")}
              onStop={() => handleStatusUpdate("IDLE")}
            />
          )}
        </View>

        {/* ENGINE INFO */}
        <View style={styles.engineBox}>
          {[
            {
              icon: <Shield size={18} color="#818cf8" />,
              title: "Secure",
              desc: "100% Insured & Bank-grade security.",
            },
            {
              icon: <Zap size={18} color="#818cf8" />,
              title: "Precision",
              desc: "Automated weekly gold acquisition.",
            },
            {
              icon: <Clock size={18} color="#818cf8" />,
              title: "Compounding",
              desc: "Build habits that build empires.",
            },
          ].map((f, i) => (
            <View
              key={i}
              style={[styles.engineRow, i === 2 && { marginBottom: 0 }]}
            >
              <View style={styles.engineIconContainer}>{f.icon}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.engineTitle}>{f.title}</Text>
                <Text style={styles.engineDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* MODALS */}
      <StopConfirmationModal
        isOpen={isStopModalOpen}
        onClose={() => setIsStopModalOpen(false)}
        onConfirm={confirmStop}
      />
      <PauseConfirmationModal
        isOpen={isPauseModalOpen}
        onClose={() => setIsPauseModalOpen(false)}
        onConfirm={confirmPause}
      />
      <SipSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        amount={Number(localPrice)}
      />

      <MonthlyAlert
        visible={emptyVisible}
        title="Amount Required"
        message="Please enter the value to start the Weekly SIP."
        single
        confirmText="Okay"
        onCancel={() => setEmptyVisible(false)}
        onConfirm={() => setEmptyVisible(false)}
      />

      <MonthlyAlert
        visible={!!errorAlert}
        title={errorAlert?.title || ""}
        message={errorAlert?.message || ""}
        single
        confirmText="Okay"
        onCancel={() => {
          if (errorAlert?.goDeposit)
            router.replace("/paymentsDetails/deposite");
          setErrorAlert(null);
        }}
        onConfirm={() => {
          if (errorAlert?.goDeposit)
            router.replace("/paymentsDetails/deposite");
          setErrorAlert(null);
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

  /* HEADER */
  fixedHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 70,
     paddingBottom:20,
    backgroundColor: "#062530",
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
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
    fontWeight: "700",
    letterSpacing: 1.2,
  },

  /* LIVE RATE */
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(250,204,21,0.12)",
    // paddingTop:20,
    // marginTop,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
    marginBottom: 24,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0b3442",
    borderRadius: 24,
    padding: 20,
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
    fontSize: 28,
    fontWeight: "900",
  },

  mainViewContainer: { marginBottom: 20 },

  /* ENGINE INFO */
  engineBox: {
    backgroundColor: "#0b3442",
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  engineRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
    alignItems: "center",
  },

  engineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(16,78,100,0.35)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  engineTitle: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 12,
    textTransform: "uppercase",
  },

  engineDesc: {
    color: "#8fbac4",
    fontSize: 11,
    lineHeight: 16,
  },
});
