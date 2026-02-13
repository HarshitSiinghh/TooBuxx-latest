

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import       LottieView from "lottie-react-native";

import { ActivityIndicator } from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { Bucket } from "./types";
import { COLORS } from "./constants";
import { useRouter } from "expo-router";

import { getMyPlatinumSipApi } from "@/services/platinium";
import { getProfileApi } from "../../services/profile";
import { getPortfolioApi } from "../../services/portfolio";
import BaseAlert from "../silver/BaseAlert";
import PlatinumHeader from "./components/PlatiniumHeader";
import PlatinumTabs from "./components/PlatiniumTabs";
import PlatinumBuyFlow from "./components/BuyFlow";
import PlatinumRunningEngine from "./components/RunningEngine";

export default function PlatinumEngineScreen() {
  const router = useRouter();

  const [engine, setEngine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeBucket, setActiveBucket] = useState<Bucket>("instant");

  const PLATINUM_ACCENT = COLORS.PLATINUM_ACCENT || "#00D2FF";
const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    loadEngine();
  }, []);

  const loadEngine = async () => {
    try {
      setLoading(true);

      /* ================= PROFILE ================= */
      const profileRes = await getProfileApi();
      const walletBalance = Number(
        profileRes?.data?.wallet?.total_money_balance || 0
      );

      /* ================= PORTFOLIO ================= */
      const portfolioRes = await getPortfolioApi();

      const platinumGrams = Number(portfolioRes?.platinum?.grams || 0);
      const platinumValue = Number(portfolioRes?.platinum?.current_value || 0);

      const pricePerGram =
        platinumGrams > 0 ? platinumValue / platinumGrams : 0;

      /* ================= SIP ================= */
      const sipRes = await getMyPlatinumSipApi();
      console.log("🔥 PLATINUM SIP FULL", sipRes);

      const sipObj = sipRes?.data || {};

      /* ===== DAILY ===== */
      const dailySips = sipObj?.daily || [];
      const activeDaily = dailySips.find(
        (s: any) => s?.status?.toUpperCase() !== "STOPPED"
      );

      /* ===== WEEKLY ===== */
      const weeklySips = sipObj?.weekly || [];
      const activeWeekly = weeklySips.find(
        (s: any) => s?.status?.toUpperCase() !== "STOPPED"
      );

      /* ===== MONTHLY ===== */
      const monthlySips = sipObj?.monthly || [];
      const activeMonthly = monthlySips.find(
        (s: any) => s?.status?.toUpperCase() !== "STOPPED"
      );

      /* ================= FINAL ENGINE ================= */
      const formatted = {
        pricePerGram,
        walletBalance,

        engines: {
          instant: {
            savedGrams: platinumGrams,
          },

          daily: {
            isActive: !!activeDaily,
         isPaused:
  activeDaily?.status &&
  activeDaily?.status.toString().toUpperCase() === "PAUSED",

            sip_id: activeDaily?.sip_id,
            amount: activeDaily?.amount_per_cycle || 0,
          
  savedGrams: Number(activeDaily?.total_grams || 0),   // FIX 1
  streak: Number(activeDaily?.current_streak || 0),    // FIX 2
          },

          weekly: {
            isActive: !!activeWeekly,
           isPaused:
  activeWeekly?.status &&
  activeWeekly?.status.toString().toUpperCase() === "PAUSED",

            sip_id: activeWeekly?.sip_id,
            amount: activeWeekly?.amount_per_cycle || 0,
            
  savedGrams: Number(activeWeekly?.total_grams || 0),   // FIX
  streak: Number(activeWeekly?.current_streak || 0),    // FIX
          },

          monthly: {
            isActive: !!activeMonthly,
          isPaused:
  activeMonthly?.status &&
  activeMonthly?.status.toString().toUpperCase() === "PAUSED",

            sip_id: activeMonthly?.sip_id,
            amount: activeMonthly?.amount_per_cycle || 0,
           
  savedGrams: Number(activeMonthly?.total_grams || 0),   // FIX
  streak: Number(activeMonthly?.current_streak || 0),    // FIX
          },
        },
      };

      console.log("🚀 FINAL ENGINE", formatted);
      setEngine(formatted);
    } catch (e) {
      console.log("ENGINE LOAD ERROR ❌", e);
      setErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADER ================= */
if (loading || !engine) {
  return (
<View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#062530",
      }}
    >
      <LottieView
        source={require("../../assets/gold.json")}
        autoPlay
        loop
        style={{ width: 180, height: 180 }}
      />
    </View>
  );
}


  const currentEngine = engine.engines[activeBucket];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* NAV */}
{/* NAV */}
<View style={styles.navBar}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity
      onPress={() => router.back()}
      style={styles.backBtn}
      activeOpacity={0.7}
    >
      <ArrowLeft size={20} color="#9ca3af" />
    </TouchableOpacity>

    <View style={{ marginLeft: 12 }}>
      <Text style={styles.navTitle}>Platinum Engine</Text>
      {/* <Text style={styles.navSubtitle}>Premium Automated Asset</Text> */}
    </View>
  </View>
</View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <PlatinumHeader engine={engine} />
        </View>

        <View style={styles.tabSection}>
          <PlatinumTabs
            active={activeBucket}
            onChange={(bucket) => setActiveBucket(bucket)}
          />
        </View>

        <View style={styles.mainContent}>
          {activeBucket === "instant" ? (
            <PlatinumBuyFlow
              bucket="instant"
              engine={engine}
              // setEngine={setEngine}
              reloadEngine={loadEngine}
            />
          ) : (
            <>
              {currentEngine?.isActive ? (
                <PlatinumRunningEngine
                  bucket={activeBucket}
                  engine={engine}
                  setEngine={setEngine}
                  reloadEngine={loadEngine}
                />
              ) : (
                <PlatinumBuyFlow
                  bucket={activeBucket}
                  engine={engine}
                  // setEngine={setEngine}
                  reloadEngine={loadEngine}
                />
              )}
            </>
          )}
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
      <BaseAlert
  visible={errorAlert}
  title="Error"
  message="Failed to load platinum data"
  type="error"
  confirmText="Retry"
  onConfirm={() => {
    setErrorAlert(false);
    loadEngine();
  }}
  onCancel={() => setErrorAlert(false)}
/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BG, // Fix: Use common BG color here
  },
  navBar: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  loaderContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#062530",
},
navSubtitle: {
    color: "#00D2FF", // Platinum Accent Color
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptySpace: {
    width: 40,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    padding: 10,
    backgroundColor: "#104e64",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  arrowTop: {
    width: 10,
    height: 2,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
    position: 'absolute',
    top: 6,
    left: 4,
  },
  arrowBottom: {
    width: 10,
    height: 2,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    bottom: 6,
    left: 4,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  tabSection: {
    marginBottom: 20,
  },
  mainContent: {
    flex: 1,
  },
});