import React, { useState } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  Text 
} from "react-native";

import { Bucket, PlatinumEngineState } from "./types";
import { MOCK_PLATINUM_ENGINE } from "./mock"; // Hamara naya mock data
import { COLORS } from "./constants";
import { useRouter } from "expo-router";

// Platinum Components
// import PlatinumHeader from "./components/PlatinumHeader";
import PlatinumHeader from "./components/PlatiniumHeader";
// import PlatinumTabs from "./components/PlatinumTabs";
import PlatinumTabs from "./components/PlatiniumTabs";
// import PlatinumBuyFlow from "./components/PlatinumBuyFlow";
 import PlatinumBuyFlow from "./components/BuyFlow";

// import PlatinumRunningEngine from "./components/PlatinumRunningEngine";
 import PlatinumRunningEngine from "./components/RunningEngine";

export default function PlatinumEngineScreen() {
  const [engine, setEngine] = useState<PlatinumEngineState>(MOCK_PLATINUM_ENGINE);
  const [activeBucket, setActiveBucket] = useState<Bucket>("instant");

  const currentEngine = engine.engines[activeBucket];
  const router = useRouter();

//   // Platinum Accent Color
// const PLATINUM_ACCENT = COLORS.ACCENT;
  const PLATINUM_ACCENT = COLORS.PLATINUM_ACCENT || "#00D2FF";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* CUSTOM TOP NAV BAR */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <View style={styles.arrowIcon}>
             <View style={[styles.arrowTop, { backgroundColor: PLATINUM_ACCENT }]} />
             <View style={[styles.arrowBottom, { backgroundColor: PLATINUM_ACCENT }]} />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.navTitle}>Platinum Engine</Text>
        
        <View style={styles.emptySpace} />
      </View>
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.section}>
          <PlatinumHeader engine={engine} />
        </View>

        {/* Tabs Section */}
        <View style={styles.tabSection}>
          <PlatinumTabs
            active={activeBucket}
            onChange={(bucket) => setActiveBucket(bucket)}
          />
        </View>

        {/* Content Area - Logic for switching between Buy and Running state */}
        <View style={styles.mainContent}>
          {activeBucket === "instant" ? (
            <PlatinumBuyFlow
              bucket="instant"
              engine={engine}
              setEngine={setEngine}
            />
          ) : (
            <>
              {currentEngine.isActive ? (
                <PlatinumRunningEngine
                  bucket={activeBucket}
                  engine={engine}
                  setEngine={setEngine}
                />
              ) : (
                <PlatinumBuyFlow
                  bucket={activeBucket}
                  engine={engine}
                  setEngine={setEngine}
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
    backgroundColor: COLORS.BG, // Fix: Use common BG color here
  },
  navBar: {
    marginTop: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
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