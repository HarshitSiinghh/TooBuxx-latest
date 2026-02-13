

import React from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  Text 
} from "react-native";
import { ActivityIndicator } from "react-native";
 import LottieView from "lottie-react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

// Hooks & Context
import { useGoldEngine } from "../hooks/useGoldEngine";
import { COLORS } from "../data/constants";

// Gold Components
import GoldHeader from "../components/Header";
import GoldTabs from "../components/Tabs";
import GoldBuyFlow from "../components/BuyButton";
import RunningEngine from "../components/RunningEngine";
import KaratSelector from "../components/KaratSelector";




export default function GoldEngineScreen() {
  const router = useRouter();
  
  // 🔥 UPDATED HOOK
  const { 
    tab, 
    setTab, 
    karat, 
    setKarat, 
    engine, 
    setEngine,
    loading,
    loadEngine   // 🔥 IMPORTANT ADD
  } = useGoldEngine();

  const GOLD_ACCENT = COLORS.GOLD_ACCENT || "#FFD700";

  if (loading) {
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
        source={require("../../../assets/gold.json")}
        autoPlay
        loop
        style={{ width: 180, height: 180 }}
      />
    </View>
  );
}


  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* ===== TOP NAV ===== */}
      {/* ===== TOP NAV ===== */}
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
      <Text style={styles.navTitle}>Gold Engine</Text>
      <Text style={styles.navSubtitle}>Smart Bullion Saver</Text>
    </View>
  </View>
</View>
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== HEADER ===== */}
        <View style={styles.section}>
          <GoldHeader engine={engine}  karat={karat}/>
        </View>

        {/* ===== KARAT SELECTOR ===== */}
        <View style={styles.section}>
     <KaratSelector 
  value={karat} 
  onChange={(k)=>{
    setKarat(k);
  }} 
/>

        </View>

        {/* ===== TABS ===== */}
        <View style={styles.tabSection}>
<GoldTabs
 value={tab}
 onChange={(t)=>{
   setTab(t);
 }}
/>

        </View>

        {/* ===== MAIN CONTENT ===== */}
        <View style={styles.mainContent}>

          {/* ===== INSTANT ===== */}
          {tab === "instant" ? (
            <GoldBuyFlow 
              bucket="instant" 
              engine={engine} 
              setEngine={setEngine}
              reloadEngine={loadEngine}   // 🔥 ADD
              caret={karat}               // 🔥 ADD
            />
          ) : (
            <>
              {/* ===== RUNNING SIP ===== */}
              {engine.engines?.[tab]?.isActive ? (
                <RunningEngine
                  bucket={tab}
                  engine={engine}
                  setEngine={setEngine}
                  reloadEngine={loadEngine}  // 🔥 ADD
                  caret={karat}              // 🔥 ADD
                />
              ) : (
                /* ===== START SIP ===== */
                <GoldBuyFlow
                  bucket={tab}
                  engine={engine}
                  setEngine={setEngine}
                  reloadEngine={loadEngine}  // 🔥 ADD
                  caret={karat}              // 🔥 ADD
                />
              )}
            </>
          )}
        </View>


        
        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#062530", // Consistent dark theme
  },
  
  /* ================= TOP NAV BAR ================= */
  navBar: {
    // Platform.OS check import karna na bhoolein (react-native se)
    paddingTop:   35,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(16,78,100,0.6)",
  },

  backBtn: {
    padding: 10,
    backgroundColor: "#104e64", // Professional Teal-ish background
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900', // Premium look
  },

  navSubtitle: {
    color: "#FFD700", // Gold Accent
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  /* ================= CONTENT LAYOUT ================= */
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },

  section: {
    marginBottom: 20,
  },

  tabSection: {
    marginBottom: 20,
  },

  mainContent: {
    flex: 1,
  },

  /* ================= LOADER ================= */
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#062530",
  },
});