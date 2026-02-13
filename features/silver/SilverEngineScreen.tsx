


import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
 import { ArrowLeft } from "lucide-react-native";
import { Bucket } from "./types";
import { COLORS } from "./constants";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";

import SilverHeader from "./components/SilverHeader";
import SilverTabs from "./components/SilverTabs";
import BuyFlow from "./components/BuyFlow";
import RunningEngine from "./components/RunningEngine";
 import LottieView from "lottie-react-native";

import { getProfileApi } from "@/services/profile";
import { getPortfolioApi } from "@/services/portfolio";
import { getMySilverSipApi } from "@/services/silver";
import { getLivePriceApi } from "@/services/liveprice";

export default function SilverEngineScreen() {
  const router = useRouter();

  const [engine, setEngine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeBucket, setActiveBucket] = useState<Bucket>("instant");

  useEffect(() => {
    loadEngine();
  }, []);

  /* =====================================================
        🔥 LOAD ENGINE
  ===================================================== */
  const loadEngine = async () => {
    try {
      setLoading(true);

      /* ========= WALLET ========= */
      const profileRes = await getProfileApi();
      const walletBalance = Number(
        profileRes?.data?.wallet?.total_money_balance || 0
      );

      /* ========= PORTFOLIO ========= */
      const portfolioRes = await getPortfolioApi();
      console.log("SILVER PORTFOLIO 👉", portfolioRes);

      const silverGrams = Number(portfolioRes?.silver?.grams || 0);
      const silverValue = Number(portfolioRes?.silver?.current_value || 0);

      /* ========= LIVE PRICE ========= */
      const liveRes = await getLivePriceApi();
      console.log("LIVE PRICE 👉", liveRes);

      let pricePerGram = 0;

      if (liveRes?.data?.SILVER?.["999"]?.buy) {
        pricePerGram = Number(liveRes.data.SILVER["999"].buy);
      }

      if (!pricePerGram && silverGrams > 0) {
        pricePerGram = silverValue / silverGrams;
      }

      console.log("SILVER PRICE PER GRAM 👉", pricePerGram);

      /* ========= SIP ========= */
      const sipRes = await getMySilverSipApi();
      console.log("SILVER SIP 👉", sipRes);

      const sipObj = sipRes?.data || {};

      /* ===== DAILY ===== */
      // const dailySips = sipObj?.daily || [];
      // const activeDaily = dailySips.find((s: any) => s.status?.toUpperCase() !== "STOPPED");

      const dailySips = sipObj?.daily || [];

const activeDaily = dailySips
  .filter((s:any)=> s.status?.toUpperCase() !== "STOPPED")
  .sort(
    (a:any,b:any)=>
      new Date(b.created_at || b.sip_start_date).getTime() -
      new Date(a.created_at || a.sip_start_date).getTime()
  )[0];


      /* ===== WEEKLY ===== */
      // const weeklySips = sipObj?.weekly || [];
      // const activeWeekly = weeklySips.find((s: any) => s.status?.toUpperCase() !== "STOPPED");

      const weeklySips = sipObj?.weekly || [];

const activeWeekly = weeklySips
  .filter((s:any)=> s.status?.toUpperCase() !== "STOPPED")
  .sort(
    (a:any,b:any)=>
      new Date(b.created_at || b.sip_start_date).getTime() -
      new Date(a.created_at || a.sip_start_date).getTime()
  )[0];


      /* ===== MONTHLY ===== */
      // const monthlySips = sipObj?.monthly || [];
      // const activeMonthly = monthlySips.find((s: any) => s.status?.toUpperCase() !== "STOPPED");


      const monthlySips = sipObj?.monthly || [];

const activeMonthly = monthlySips
  .filter((s:any)=> s.status?.toUpperCase() !== "STOPPED")
  .sort(
    (a:any,b:any)=>
      new Date(b.created_at || b.sip_start_date).getTime() -
      new Date(a.created_at || a.sip_start_date).getTime()
  )[0];


      /* ========= FINAL ENGINE ========= */
      const formatted = {
        pricePerGram,
        walletBalance,

        engines: {
          instant: {
            savedGrams: silverGrams,
          },

          daily: {
            isActive: !!activeDaily,
            isPaused: activeDaily?.status?.toUpperCase() === "PAUSED",

            sip_id: activeDaily?.sip_id,
            amount: activeDaily?.amount_per_cycle || 0,
            savedGrams: activeDaily?.silver_grams || 0,
       streak: Number(activeDaily?.current_streak || 0),

          },

          weekly: {
            isActive: !!activeWeekly,
        isPaused: activeWeekly?.status?.toUpperCase() === "PAUSED",

            sip_id: activeWeekly?.sip_id,
            amount: activeWeekly?.amount_per_cycle || 0,
            savedGrams: activeWeekly?.silver_grams || 0,
        streak: Number(activeWeekly?.current_streak || 0),

          },

          monthly: {
            isActive: !!activeMonthly,
            isPaused: activeMonthly?.status?.toUpperCase() === "PAUSED",

            sip_id: activeMonthly?.sip_id,
            amount: activeMonthly?.amount_per_cycle || 0,
            savedGrams: activeMonthly?.silver_grams || 0,
            streak: Number(activeMonthly?.current_streak || 0),

          },
        },
      };

      console.log("FINAL SILVER ENGINE 🚀", formatted);
      setEngine(formatted);
    } catch (e) {
      console.log("SILVER ENGINE ERROR ❌", e);
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
      <Text style={styles.navTitle}>Silver Engine</Text>
      <Text style={styles.navSubtitle}>Automated Investing</Text>
    </View>
  </View>
</View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.section}>
          <SilverHeader engine={engine} />
        </View>

        {/* TABS */}
        <View style={styles.tabSection}>
          <SilverTabs
            active={activeBucket}
            onChange={(bucket) => setActiveBucket(bucket)}
          />
        </View>

        {/* CONTENT */}
        <View style={styles.mainContent}>
          {activeBucket === "instant" ? (
            <BuyFlow
              bucket="instant"
              engine={engine}
              setEngine={setEngine}
              reloadEngine={loadEngine}
            />
          ) : (
            <>
              {currentEngine.isActive ? (
                <RunningEngine
                  bucket={activeBucket}
                  engine={engine}
                  setEngine={setEngine}
                  reloadEngine={loadEngine}
                />
              ) : (
                <BuyFlow
                  bucket={activeBucket}
                  engine={engine}
                  setEngine={setEngine}
                  reloadEngine={loadEngine}
                />
              )}
            </>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}















const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#062530",
  },
  loaderContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#062530",
},

 navBar: {
    marginTop: 30, // Safe Area padding ke liye
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(16,78,100,0.6)",
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
  
  arrowTop: {
    width: 10,
    height: 2,
    backgroundColor: COLORS.ACCENT,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
    position: 'absolute',
    top: 6,
    left: 4,
  },
  backBtn: {
    padding: 10,
    backgroundColor: "#104e64",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowBottom: {
    width: 10,
    height: 2,
    backgroundColor: COLORS.ACCENT,
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
  navSubtitle: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  mainContent: {
    flex: 1,
  },
});


