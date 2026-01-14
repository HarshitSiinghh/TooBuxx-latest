import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import {
  TrendingUp,
  Shield,
  Clock,
  CheckCircle2,
  Coins,
  Zap,
  ArrowLeft,
} from 'lucide-react-native';
 import { useRouter } from 'expo-router';
const { width } = Dimensions.get('window');

export default function WeeklySaving({ navigation }: any) {
  const [localPrice, setLocalPrice] = useState<string>("");
  const progress = 40;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference; 
  const router = useRouter();

  // Yearly calculation logic
  const yearly = (Number(localPrice) || 0) * 52;

  const handleActivate = () => {
    if (localPrice) {
      console.log("Activating Plan for:", localPrice);
      // setPrice(Number(localPrice));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() =>router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="#9ca3af" size={20} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>WEEKLY SAVING</Text>
          <Text style={styles.headerSub}>3X FASTER COMPOUNDING</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- VELOCITY PLAN CARD --- */}
        <View style={styles.velocityCard}>
          <View style={styles.zapIcon}>
            <Zap color="#a855f7" size={16} fill="#a855f7" />
          </View>
          
          <View style={styles.velocityRow}>
            {/* Progress Circle */}
            <View style={styles.progressWrapper}>
              <Svg width="80" height="80" viewBox="0 0 80 80">
                <Circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="5"
                  fill="none"
                />
                <Circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="#a855f7"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </Svg>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>
            </View>

            <View style={styles.velocityInfo}>
              <Text style={styles.velocityTitle}>VELOCITY PLAN</Text>
              <Text style={styles.velocityDesc}>Reach goals faster with weekly micro-deposits.</Text>
            </View>
          </View>
        </View>

        {/* --- INPUT SECTION --- */}
        <View style={styles.inputSection}>
          <View style={styles.inputHeader}>
            <Text style={styles.label}>WEEKLY CONTRIBUTION</Text>
            <Text style={styles.goldLabel}>24K DIGITAL GOLD</Text>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={localPrice}
              placeholder="0"
              placeholderTextColor="#374151"
              onChangeText={setLocalPrice}
            />
          </View>

          {/* Quick Amounts */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickAmounts}>
            {[100, 500, 1000, 2000, 5000].map((amt) => (
              <TouchableOpacity 
                key={amt} 
                onPress={() => setLocalPrice(amt.toString())}
                style={[
                    styles.amtButton, 
                    localPrice === amt.toString() && styles.amtButtonActive
                ]}
              >
                <Text style={[
                    styles.amtButtonText,
                    localPrice === amt.toString() && styles.amtButtonTextActive
                ]}>₹{amt}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- STATS CARD (From Desktop logic) --- */}
        <View style={styles.projectionCard}>
            <Text style={styles.projectionLabel}>YEARLY RESERVE PROJECTION</Text>
            <Text style={styles.projectionValue}>₹{yearly.toLocaleString()}</Text>
            <View style={styles.projectionCheck}>
                <CheckCircle2 color="#4ade80" size={14} />
                <Text style={styles.projectionCheckText}>+ Compound Growth Benefits</Text>
            </View>
        </View>

        {/* --- ACTION BUTTON --- */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={handleActivate}
          style={styles.mainButton}
        >
          <Text style={styles.mainButtonText}>ACTIVATE WEEKLY VAULT</Text>
        </TouchableOpacity>

        {/* --- SECURITY FOOTER --- */}
        <View style={styles.securityBanner}>
            <View style={styles.securityIcon}>
                <Coins color="#eab308" size={20} />
            </View>
            <Text style={styles.securityText}>
                Assets are physically backed and held in secure insured custody.
            </Text>
        </View>

        {/* Features list */}
        <View style={styles.featuresList}>
            {[
                { icon: <TrendingUp color="#a855f7" size={20} />, title: "3X VELOCITY", desc: "Weekly deposits catch dips." },
                { icon: <Shield color="#a855f7" size={20} />, title: "24K PURITY", desc: "LBMA-certified bullion." },
            ].map((item, idx) => (
                <View key={idx} style={styles.featureItem}>
                    <View style={styles.featureIconBox}>{item.icon}</View>
                    <View>
                        <Text style={styles.featureTitle}>{item.title}</Text>
                        <Text style={styles.featureDesc}>{item.desc}</Text>
                    </View>
                </View>
            ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a003d',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(26, 0, 61, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerText: {
    marginLeft: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  headerSub: {
    color: '#a855f7',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
  },
  velocityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 24,
  },
  zapIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  velocityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  velocityInfo: {
    marginLeft: 20,
    flex: 1,
  },
  velocityTitle: {
    color: '#a855f7',
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  velocityDesc: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 4,
    lineHeight: 14,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    color: '#4b5563',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2,
  },
  goldLabel: {
    color: '#eab308',
    fontSize: 9,
    fontWeight: 'bold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '900',
    color: '#4b5563',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 28,
    color: '#fff',
    fontWeight: '900',
  },
  quickAmounts: {
    marginTop: 15,
    flexDirection: 'row',
  },
  amtButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 10,
  },
  amtButtonActive: {
    backgroundColor: '#9333ea',
    borderColor: '#a855f7',
  },
  amtButtonText: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '900',
  },
  amtButtonTextActive: {
    color: '#fff',
  },
  projectionCard: {
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.2)',
    marginBottom: 24,
  },
  projectionLabel: {
    color: '#9ca3af',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  projectionValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    fontStyle: 'italic',
    marginTop: 4,
  },
  projectionCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  projectionCheckText: {
    color: '#4ade80',
    fontSize: 11,
    fontWeight: 'bold',
  },
  mainButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.1)',
  },
  securityIcon: {
    padding: 8,
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: 10,
    marginRight: 12,
  },
  securityText: {
    flex: 1,
    color: 'rgba(254, 240, 138, 0.6)',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  featuresList: {
    marginTop: 30,
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  featureIconBox: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  featureDesc: {
    color: '#6b7280',
    fontSize: 12,
  },
});