
import React, { useLayoutEffect, useCallback ,useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ArrowLeft, TrendingUp, Shield, Zap, Clock, Wallet } from "lucide-react-native";
import { useRouter,useFocusEffect } from "expo-router";

// Store & Hooks
import { Price } from "@/store/store";
import { useAuthGuard } from "@/hooks/useAuthGaurd";

// APIs
import { getProfileApi } from "@/services/profile";
import { getGoldPriceApi } from "@/services/goldprice";
import { instantBuyGoldApi } from "@/services/savings";

// Components
import InstantPurchaseView from "./components/InstantPurchaseView";
import PurchaseStatusModal from "./components/PurchaseStatusModal";

export default function InstantSaving() {
  const canRender = useAuthGuard();
  const router = useRouter();
  const { setPrice } = Price();

  const [localPrice, setLocalPrice] = useState<number | "">("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<"SUCCESS" | "ERROR">("SUCCESS");

  const [instantGold, setInstantGold] = useState(0);
  const [instantValue, setInstantValue] = useState(0);
  const [liveGoldRate, setLiveGoldRate] = useState(0);
  const [depositWallet, setDepositWallet] = useState(0);
const [pageLoading, setPageLoading] = useState(true);
  const calculatedGrams = localPrice
    ? (Number(localPrice) / liveGoldRate).toFixed(4)
    : "0.0000";

  // useLayoutEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const profileRes = await getProfileApi();
  //       const goldRes = await getGoldPriceApi();
  //       const wallet = profileRes?.data?.wallet;
  //       const grams = Number(wallet?.instant_gold_grams || 0);
  //       const deposit = Number(wallet?.deposit_balance || 0);
  //       const sellPrice = Number(goldRes?.data?.market_sell_price || 0);

  //       setDepositWallet(deposit);
  //       setInstantGold(grams);
  //       setLiveGoldRate(sellPrice);
  //       setInstantValue(grams * sellPrice);
  //     } catch (e) {
  //       console.log("❌ INSTANT LOAD ERROR:", e);
  //     }
  //   };
  //   loadData();
  // }, []);


  const loadInstantData = async () => {
  try {
      setPageLoading(true);              // ✅ start loader
    const profileRes = await getProfileApi();
    const goldRes = await getGoldPriceApi();

    const wallet = profileRes?.data?.wallet;

    const grams = Number(wallet?.instant_gold_grams || 0);
    const deposit = Number(wallet?.deposit_balance || 0);
    const sellPrice = Number(goldRes?.data?.market_sell_price || 0);

    setDepositWallet(deposit);
    setInstantGold(grams);
    setLiveGoldRate(sellPrice);
    setInstantValue(grams * sellPrice);
  } catch (e) {
    console.log("❌ INSTANT LOAD ERROR:", e);
  }
  finally {
    setPageLoading(false);             // ✅ stop loader
  }
};
useFocusEffect(
  useCallback(() => {
    loadInstantData();

    // optional: live gold rate refresh
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
  const handlePurchase = async () => {
    if (!localPrice) return;
    try {
      setIsProcessing(true);
      await instantBuyGoldApi(Number(localPrice));
      setPrice(Number(localPrice));
      setModalStatus("SUCCESS");
      const profileRes = await getProfileApi();
      const goldRes = await getGoldPriceApi();
      const wallet = profileRes?.data?.wallet;
      const grams = Number(wallet?.instant_gold_grams || 0);
      const sellPrice = Number(goldRes?.data?.market_sell_price || 0);
      setInstantGold(grams);
      setLiveGoldRate(sellPrice);
      setInstantValue(grams * sellPrice);
    } catch (e) {
      setModalStatus("ERROR");
    } finally {
      setIsProcessing(false);
      setModalOpen(true);
    }
  };
if (!canRender) return null;

// ✅ PAGE LOADER YAHAN ADD KARO
if (pageLoading) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#1a003d",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#a855f7" />
      <Text style={{ marginTop: 10, color: "#fff", fontWeight: "bold" }}>
        Loading...
      </Text>
    </SafeAreaView>
  );
}

  return (
    
 
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER FIXED */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color="#FFF" />
        </Pressable>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.title}>Instant Saving</Text>
          <Text style={styles.subtitle}>ONE-TIME PURCHASE</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* LIVE RATE BADGE */}
        <View style={styles.liveBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.liveText}>
            Live Gold Rate: ₹{liveGoldRate.toLocaleString()}/gm
          </Text>
        </View>

        {/* STATS GRID - 2 COLUMN TOP, 1 COLUMN BOTTOM */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Wallet size={16} color="#9ca3af" style={{marginBottom: 8}} />
              <Text style={styles.statLabel}>Deposit Wallet</Text>
              <Text style={styles.statValue}>₹{depositWallet.toFixed(2)}</Text>
            </View>

            <View style={styles.statCard}>
              <TrendingUp size={16} color="#9ca3af" style={{marginBottom: 8}} />
              <Text style={styles.statLabel}>Portfolio Value</Text>
              <Text style={styles.statValue}>₹{instantValue.toFixed(0)}</Text>
            </View>
          </View>

          <View style={[styles.statCard, styles.goldCard]}>
            <View style={styles.goldCardHeader}>
              <Text style={styles.goldLabel}>Accumulated Gold</Text>
              <Zap size={16} color="#eab308" />
            </View>
            <Text style={styles.goldValue}>{instantGold.toFixed(4)} <Text style={{fontSize: 14}}>g</Text></Text>
          </View>
        </View>

        {/* MAIN PURCHASE INPUT SECTION */}
        <View style={styles.purchaseSection}>
           <InstantPurchaseView
            localPrice={localPrice}
            setLocalPrice={setLocalPrice}
            handlePurchase={handlePurchase}
            isProcessing={isProcessing}
          />
        </View>

        {/* TRUST BOX / FEATURES */}
        <View style={styles.engineBox}>
          <Text style={styles.engineHeading}>Why Save with Instant Gold?</Text>
          {[
            { icon: <Shield size={20} color="#6366f1" />, title: "Bank Grade Security", desc: "Your gold is stored in 100% insured account." },
            { icon: <Zap size={20} color="#eab308" />, title: "Instant Reflection", desc: "Gold grams are added to your locker instantly." },
            { icon: <Clock size={20} color="#10b981" />, title: "24/7 Access", desc: "Liquidity at your fingertips, anytime." },
          ].map((f, i) => (
            <View key={i} style={styles.engineRow}>
              <View style={styles.engineIcon}>{f.icon}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.engineTitle}>{f.title}</Text>
                <Text style={styles.engineDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* MODAL */}
      <PurchaseStatusModal
        isOpen={modalOpen}
        status={modalStatus}
        amount={Number(localPrice)}
        goldGrams={calculatedGrams}
        onClose={() => {
          setModalOpen(false);
          if (modalStatus === "SUCCESS") setLocalPrice("");
        }}
        onRetry={() => {
          setModalOpen(false);
          handlePurchase();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0a001a" },
  container: { flex: 1, paddingHorizontal: 16 },

  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 16, 
    paddingTop: 70,
    paddingBottom:15,
    // paddingb 1,
    borderBottomColor: 'rgba(255,255,255,0.05)'
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: { color: "white", fontSize: 18, fontWeight: "900" },
  subtitle: {
    color: "#818cf8",
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1,
    letterSpacing: 1.5,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(234,179,8,0.08)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(234,179,8,0.2)",
  },

  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#eab308",
    marginRight: 8
  },

  liveText: { color: "#eab308", fontSize: 12, fontWeight: "800" },

  statsGrid: { gap: 12, marginTop: 24 },
  statsRow: { flexDirection: 'row', gap: 12 },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },

  statLabel: { color: "#9ca3af", fontSize: 10, fontWeight: '600', marginBottom: 4 },
  statValue: { color: "white", fontSize: 18, fontWeight: "900" },

  goldCard: { 
    backgroundColor: 'rgba(99,102,241,0.05)',
    borderColor: "rgba(99,102,241,0.3)", 
    borderWidth: 1 
  },
  goldCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  goldLabel: { color: "#818cf8", fontSize: 11, fontWeight: '700' },
  goldValue: { color: "#FFF", fontSize: 28, fontWeight: "900" },

  purchaseSection: {
    marginTop: 24,
  },

  engineBox: {
    marginTop: 32,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  engineHeading: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.8
  },

  engineRow: { flexDirection: "row", gap: 16, alignItems: "center", marginBottom: 18 },
  engineIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },

  engineTitle: { color: "white", fontWeight: "700", fontSize: 13, marginBottom: 2 },
  engineDesc: { color: "#6b7280", fontSize: 11, lineHeight: 16 },
});