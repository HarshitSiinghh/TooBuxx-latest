// import




// React from "react";
// import { 
//   ScrollView, 
//   StyleSheet, 
//   View, 
//   SafeAreaView, 
//   StatusBar, 
//   TouchableOpacity, 
//   Text 
// } from "react-native";
// import { useRouter } from "expo-router";

// // Hooks & Context
// import { useGoldEngine } from "../hooks/useGoldEngine";
// import { COLORS } from "../data/constants";

// // Gold Components
// import GoldHeader from "../components/Header";
// import GoldTabs from "../components/Tabs";
// import GoldBuyFlow from "../components/BuyButton"; // Ensure this is your Buy/SIP flow component
// import RunningEngine from "../components/RunningEngine";
// import KaratSelector from "../components/KaratSelector";

// export default function GoldEngineScreen() {
//   const router = useRouter();
  
//   // Hook se saara data extract kiya
//   const { 
//     tab, 
//     setTab, 
//     karat, 
//     setKarat, 
//     engine, 
//     setEngine 
//   } = useGoldEngine();

//   // Logic: Current selected tab ka engine state nikalne ke liye
//   const currentEngine = engine.engines[tab];
  
//   // Gold Accent Color from constants
//   const GOLD_ACCENT = COLORS.GOLD_ACCENT || "#FFD700";

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" />

//       {/* --- CUSTOM TOP NAV BAR (Platinum Style) --- */}
//       <View style={styles.navBar}>
//         <TouchableOpacity 
//           onPress={() => router.back()} 
//           style={styles.backButton}
//           activeOpacity={0.7}
//         >
//           <View style={styles.arrowIcon}>
//              <View style={[styles.arrowTop, { backgroundColor: GOLD_ACCENT }]} />
//              <View style={[styles.arrowBottom, { backgroundColor: GOLD_ACCENT }]} />
//           </View>
//         </TouchableOpacity>
        
//         <Text style={styles.navTitle}>Gold Engine</Text>
        
//         <View style={styles.emptySpace} />
//       </View>
      
//       <ScrollView 
//         style={styles.container} 
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* 1. Header Section (Portfolio Value) */}
//         <View style={styles.section}>
//           <GoldHeader engine={engine} />
//         </View>

//         {/* 2. Karat Selector */}
//         <View style={styles.section}>
//           <KaratSelector value={karat} onChange={setKarat} />
//         </View>

//         {/* 3. Tabs Section (Instant/Daily/etc) */}
//         <View style={styles.tabSection}>
//           <GoldTabs
//             value={tab}
//             onChange={(t) => setTab(t)}
//           />
//         </View>





//         {/* 4. Main Content Area - Logic for switching between Buy and Running state */}
        
// {/* gold/screens/GoldEngineScreen.tsx ke andar */}

// {/* gold/screens/GoldEngineScreen.tsx ke andar mainContent */}

// <View style={styles.mainContent}>
//   {tab === "instant" ? (
//     // Instant hamesha Buy Flow dikhayega
//     <GoldBuyFlow bucket="instant" engine={engine} setEngine={setEngine} />
//   ) : (
//     <>
//       {/* Strict Check: Agar SIP Active hai toh sirf Management (RunningEngine) */}
//       {engine.engines[tab].isActive ? (
//         <RunningEngine
//           bucket={tab}
//           engine={engine}
//           setEngine={setEngine}
//         />
//       ) : (
//         // Agar Active nahi hai (ya Stop kar di gayi hai), toh Buy Flow
//         <GoldBuyFlow
//           bucket={tab}
//           engine={engine}
//           setEngine={setEngine}
//         />
//       )}
//     </>
//   )}
// </View>




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
    loadEngine   // 🔥 IMPORTANT ADD
  } = useGoldEngine();

  const GOLD_ACCENT = COLORS.GOLD_ACCENT || "#FFD700";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* ===== TOP NAV ===== */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <View style={styles.arrowIcon}>
             <View style={[styles.arrowTop, { backgroundColor: GOLD_ACCENT }]} />
             <View style={[styles.arrowBottom, { backgroundColor: GOLD_ACCENT }]} />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.navTitle}>Gold Engine</Text>
        <View style={styles.emptySpace} />
      </View>
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== HEADER ===== */}
        <View style={styles.section}>
          <GoldHeader engine={engine} />
        </View>

        {/* ===== KARAT SELECTOR ===== */}
        <View style={styles.section}>
          <KaratSelector 
            value={karat} 
            onChange={(k)=>{
              setKarat(k);
              // 🔥 caret change → reload SIP
              setTimeout(loadEngine,200);
            }} 
          />
        </View>

        {/* ===== TABS ===== */}
        <View style={styles.tabSection}>
          <GoldTabs
            value={tab}
             onChange={(t)=>{
    setTab(t);
    loadEngine(); // 🔥 tab change → reload
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
    backgroundColor: COLORS.BG || "#050505", 
  },
  navBar: {
    marginTop: StatusBar.currentHeight ? 40 : 0, // Handling different devices
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 
    'space-between',
    // marginStart:30,
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.06)',
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
    width: 42,
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
    paddingHorizontal: 16,
    paddingTop: 16,
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
});