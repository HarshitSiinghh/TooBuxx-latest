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

import { Bucket, SilverEngineState } from "./types";
import { MOCK_ENGINE } from "./mock";
import { COLORS } from "./constants";
import { useRouter } from "expo-router";
import SilverHeader from "./components/SilverHeader";
import SilverTabs from "./components/SilverTabs";
import BuyFlow from "./components/BuyFlow";
import RunningEngine from "./components/RunningEngine";

export default function SilverEngineScreen() {
  const [engine, setEngine] = useState<SilverEngineState>(MOCK_ENGINE);
  const [activeBucket, setActiveBucket] = useState<Bucket>("instant");

  const currentEngine = engine.engines[activeBucket];
const router = useRouter()
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* CUSTOM TOP NAV BAR */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          onPress={()=> router.back()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          {/* Arrow Icon - Fixed without extra spaces */}
          <View style={styles.arrowIcon}>
             <View style={styles.arrowTop} />
             <View style={styles.arrowBottom} />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.navTitle}>Silver Engine</Text>
        
        <View style={styles.emptySpace} />
      </View>
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <SilverHeader engine={engine} />
        </View>

        <View style={styles.tabSection}>
          <SilverTabs
            active={activeBucket}
            onChange={(bucket) => setActiveBucket(bucket)}
          />
        </View>

        <View style={styles.mainContent}>
          {activeBucket === "instant" && (
            <BuyFlow
              bucket="instant"
              engine={engine}
              setEngine={setEngine}
            />
          )}

          {activeBucket !== "instant" && currentEngine.isActive && (
            <RunningEngine
              bucket={activeBucket}
              engine={engine}
              setEngine={setEngine}
            />
          )}

          {activeBucket !== "instant" && !currentEngine.isActive && (
            <BuyFlow
              bucket={activeBucket}
              engine={engine}
              setEngine={setEngine}
            />
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
  navBar: {
    marginTop:36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    //  paddingTop:0,
    // Subtle separator line
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
    backgroundColor: COLORS.ACCENT,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
    position: 'absolute',
    top: 6,
    left: 4,
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
  mainContent: {
    flex: 1,
  },
});