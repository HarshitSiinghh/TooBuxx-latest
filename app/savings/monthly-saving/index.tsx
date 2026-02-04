import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";

import { ArrowLeft, TrendingUp, Shield, Zap, Clock } from "lucide-react-native";
import { useRouter, useFocusEffect } from "expo-router";

// Hooks & API
import { useAuthGuard } from "@/hooks/useAuthGaurd";
import { getProfileApi } from "@/services/profile";
import { getGoldPriceApi } from "@/services/goldprice";
import { createSipApi, getMySipsApi, stopSipApi } from "@/services/sip";

// Components
import MonthlyIdleView from "./components/MonthlyIdleView";
import MonthlyActiveView from "./components/MonthlyActiveView";
import StopConfirmationModal from "../daily-saving/components/StopConfirmationModel";
import MonthlyAlert from "./components/MonthlyAlert";

type SipStatus = "IDLE" | "RUNNING" | "PAUSED";

export default function MonthlySaving() {
  const canRender = useAuthGuard();
  const router = useRouter();

  const [sipStatus, setSipStatus] = useState<SipStatus>("IDLE");
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  const [localPrice, setLocalPrice] = useState<number | "">("");

  const [monthlyGold, setMonthlyGold] = useState(0);
  const [monthlyValue, setMonthlyValue] = useState(0);
  const [liveGoldRate, setLiveGoldRate] = useState(0);
  const [monthStreak, setMonthStreak] = useState(0);

  // ✅ VERY IMPORTANT
  const [monthlySipId, setMonthlySipId] = useState<number | null>(null);

  const [activating, setActivating] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Alerts
  const [emptyVisible, setEmptyVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errorAlert, setErrorAlert] = useState<{
    title: string;
    message: string;
    goDeposit?: boolean;
  } | null>(null);

  /* ================= LOAD DATA ================= */

  const loadData = async () => {
    try {
       setPageLoading(true)
      const profileRes = await getProfileApi();
      const goldRes = await getGoldPriceApi();

      const wallet = profileRes?.data?.wallet;
      if (!wallet) return;

      const grams = Number(wallet.monthly_gold_grams || 0);
      const sellPrice = Number(goldRes?.data?.market_sell_price || 0);

      setMonthlyGold(grams);
      setLiveGoldRate(sellPrice);
      setMonthlyValue(grams * sellPrice);

      // ✅ SIP list se monthly SIP uthao
      const sipRes = await getMySipsApi();
      console.log("📦 ALL SIPS 👉", sipRes);

      const allSips = [
        ...(sipRes?.data?.daily || []),
        ...(sipRes?.data?.weekly || []),
        ...(sipRes?.data?.monthly || []),
      ];

      const monthlySip = allSips.find((s: any) => s.sip_type === "MONTHLY");

      if (!monthlySip || monthlySip.status === "STOPPED") {
        setSipStatus("IDLE");
        setMonthStreak(0);
        setMonthlySipId(null);
      } else {
        setSipStatus(monthlySip.status);
        setMonthStreak(
          Number(
            monthlySip.month_streak ||
              monthlySip.day_streak ||
              monthlySip.streak ||
              0
          )
        );
        setMonthlySipId(monthlySip.sip_id);
      }
    } catch (e) {
      console.log("❌ Monthly SIP load error:", e);
    }
    finally {
    setPageLoading(false); // ✅ loader OFF
  }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  /* ================= ACTIONS ================= */

  const handleStatusUpdate = (newStatus: SipStatus) => {
    if (newStatus === "IDLE") {
      setIsStopModalOpen(true);
      return;
    }
    setSipStatus(newStatus);
  };

  // ✅ STOP MONTHLY SIP (REAL BACKEND)
  const confirmStop = async () => {
    try {
      if (!monthlySipId) return;

      setIsStopModalOpen(false);

      await stopSipApi(monthlySipId); // 🔥 MAIN LINE

      await loadData(); // backend se fresh streak = 0
      setLocalPrice("");
    } catch (e) {
      console.log("❌ MONTHLY STOP ERROR:", e);
    }
  };

  // 👉 First click on Activate
  const handleActivate = () => {
    if (!localPrice || Number(localPrice) <= 0) {
      setEmptyVisible(true);
      return;
    }
    setConfirmVisible(true);
  };

  // 👉 Final SIP start
  const startSip = async () => {
    try {
      setConfirmVisible(false);
      setActivating(true);

      const res = await createSipApi("MONTHLY", Number(localPrice));
      console.log("📦 SIP CREATE RESPONSE 👉", res);

      if (!res?.success) {
        if (res?.message === "MINIMUM_SIP_AMOUNT_10") {
          setErrorAlert({
            title: "Minimum Amount",
            message: "Monthly SIP amount must be at least ₹10.",
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
          message: "Unable to start Monthly SIP. Please try again.",
        });
        return;
      }

      // ✅ SUCCESS
      setLocalPrice("");
      await loadData();
    } catch (e) {
      console.log("❌ SIP start error:", e);
      setErrorAlert({
        title: "Server Error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setActivating(false);
    }
  };

  if (!canRender) return null;
//   if (pageLoading) {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: "#1a003d",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <ActivityIndicator size="large" color="#a855f7" />
//       <Text style={{ marginTop: 10, color: "#fff", fontWeight: "bold" }}>
//         Loading...
//       </Text>
//     </SafeAreaView>
//   );
// }





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

      {/* FIXED HEADER */}
      <View style={styles.fixedHeader}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color="white" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>Monthly Saving</Text>
          <Text style={styles.subtitle}>DISCIPLINED WEALTH ENGINE</Text>
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
            <View style={[styles.statCard, styles.goldCard]}>
              <Text style={styles.goldLabel}>SAVED GOLD</Text>
              <Text style={styles.goldValue}>
                {monthlyGold.toFixed(3)}g
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>STREAK</Text>
              <Text style={styles.statValue}>{monthStreak} Months</Text>
            </View>
          </View>

          <View style={styles.portfolioCard}>
            <View>
              <Text style={styles.portfolioLabel}>PORTFOLIO VALUE</Text>
              <Text style={styles.portfolioValue}>
                ₹{monthlyValue.toLocaleString()}
              </Text>
            </View>
            <TrendingUp size={32} color="#4ade80" />
          </View>
        </View>

        {/* MAIN VIEW */}
        <View style={styles.mainViewContainer}>
          {sipStatus === "IDLE" ? (
            <MonthlyIdleView
              localPrice={localPrice}
              setLocalPrice={setLocalPrice}
              handleActivate={handleActivate}
              activating={activating}
            />
          ) : (
            <MonthlyActiveView
              sipStatus={sipStatus}
              setSipStatus={handleStatusUpdate}
              activeSipAmount={Number(localPrice)}
              monthStreak={monthStreak}
            />
          )}
        </View>

        {/* INFO BOX */}
        <View style={styles.engineBox}>
          {[
            {
              icon: <Shield size={18} color="#818cf8" />,
              title: "Secure",
              desc: "Stored in physical .",
            },
            {
              icon: <Zap size={18} color="#818cf8" />,
              title: "Liquid",
              desc: "Sell anytime instantly.",
            },
            {
              icon: <Clock size={18} color="#818cf8" />,
              title: "Steady",
              desc: "Full monthly automation.",
            },
          ].map((f, i) => (
            <View
              key={i}
              style={[styles.engineRow, i === 2 && { marginBottom: 0 }]}
            >
              <View style={styles.engineIconContainer}>{f.icon}</View>
              <View style={styles.engineTextContainer}>
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

      <MonthlyAlert
        visible={emptyVisible}
        title="Amount Required"
        message="Please enter the value to start the Monthly SIP."
        confirmText="Okay"
        single
        onCancel={() => setEmptyVisible(false)}
        onConfirm={() => setEmptyVisible(false)}
      />

      <MonthlyAlert
        visible={confirmVisible}
        title="Start Monthly Saving"
        message="Do you want to start saving monthly?"
        confirmText="Start SIP"
        cancelText="Not Now"
        onCancel={() => setConfirmVisible(false)}
        onConfirm={startSip}
      />

      <MonthlyAlert
        visible={!!errorAlert}
        title={errorAlert?.title || ""}
        message={errorAlert?.message || ""}
        confirmText="Okay"
        single
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
/* ================= STYLES (UNCHANGED) ================= */

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#0a001a" },

//   fixedHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 70,
//     paddingBottom: 15,
//     backgroundColor: "#0a001a",
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(255,255,255,0.05)",
//   },

//   scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

//   backBtn: {
//     padding: 12,
//     backgroundColor: "rgba(255,255,255,0.06)",
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },

//   headerTitleContainer: { marginLeft: 16 },
//   title: { color: "white", fontSize: 22, fontWeight: "900" },
//   subtitle: { color: "#818cf8", fontSize: 10, fontWeight: "800", letterSpacing: 1.5, marginTop: 2 },

//   liveBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "flex-start",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 12,
//     backgroundColor: "rgba(234,179,8,0.08)",
//     borderWidth: 1,
//     borderColor: "rgba(234,179,8,0.2)",
//     marginBottom: 24,
//   },

//   pulseDot: { width: 6, height: 6, borderRadius: 6, backgroundColor: "#eab308", marginRight: 8 },
//   liveText: { color: "#eab308", fontSize: 11, fontWeight: "900", letterSpacing: 0.5 },

//   statsContainer: { gap: 12, marginBottom: 24 },
//   statsRow: { flexDirection: "row", gap: 12 },

//   statCard: {
//     flex: 1,
//     backgroundColor: "rgba(255,255,255,0.04)",
//     borderRadius: 20,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.05)",
//   },

//   statLabel: { color: "#6b7280", fontSize: 10, fontWeight: "800", marginBottom: 4 },
//   statValue: { color: "white", fontSize: 18, fontWeight: "900" },

//   goldCard: { backgroundColor: "rgba(99,102,241,0.05)", borderColor: "rgba(99,102,241,0.2)" },
//   goldLabel: { color: "#818cf8", fontSize: 10, fontWeight: "900", marginBottom: 4 },
//   goldValue: { color: "#818cf8", fontSize: 18, fontWeight: "900" },

//   portfolioCard: {
//     backgroundColor: "#130030",
//     borderRadius: 24,
//     padding: 24,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },

//   portfolioLabel: { color: "#9ca3af", fontSize: 11, fontWeight: "800", marginBottom: 4 },
//   portfolioValue: { color: "white", fontSize: 32, fontWeight: "900" },

//   mainViewContainer: { marginBottom: 10 },

//   engineBox: {
//     backgroundColor: "rgba(255,255,255,0.02)",
//     borderRadius: 30,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.05)",
//   },

//   engineRow: { flexDirection: "row", gap: 16, marginBottom: 20, alignItems: "center" },
//   engineIconContainer: {
//     width: 44,
//     height: 44,
//     borderRadius: 14,
//     backgroundColor: "rgba(129,140,248,0.1)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   engineTextContainer: { flex: 1 },
//   engineTitle: { color: "white", fontWeight: "900", fontSize: 12, textTransform: "uppercase" },
//   engineDesc: { color: "#9ca3af", fontSize: 12, lineHeight: 18 },
// });





const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#062530",
  },

  fixedHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 15,
    backgroundColor: "#062530",
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  backBtn: {
    padding: 12,
    backgroundColor: "rgba(16,78,100,0.4)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  headerTitleContainer: { marginLeft: 16 },

  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    fontStyle: "italic",
  },

  subtitle: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 2,
  },

  /* LIVE RATE */
  liveBadge: {
     marginTop:15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "rgba(250,204,21,0.12)",
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
    letterSpacing: 0.5,
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
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  portfolioLabel: {
    color: "#8fbac4",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 4,
  },

  portfolioValue: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
  },

  mainViewContainer: {
    marginBottom: 10,
  },

  /* INFO / ENGINE BOX */
  engineBox: {
    backgroundColor: "#0b3442",
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  engineRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
    alignItems: "center",
  },

  engineIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(16,78,100,0.35)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  engineTextContainer: { flex: 1 },

  engineTitle: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 12,
    textTransform: "uppercase",
  },

  engineDesc: {
    color: "#8fbac4",
    fontSize: 12,
    lineHeight: 18,
  },
});
