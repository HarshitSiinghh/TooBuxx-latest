import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { 
  ArrowLeft, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';

// Importing exactly as per your store setup
import { Price } from "@/store/store"; 

const { width } = Dimensions.get('window');

export default function MonthlySaving() {
  const router = useRouter();
  
  // Using your exact store hook and variables
  const { price, setPrice } = Price();
  
  const progress = 25;
  const yearly = (price || 0) * 12;

  // SVG Circular Progress Logic
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- PREMIUM HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#D1D5DB" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>MONTHLY SAVING</Text>
          <Text style={styles.headerSubtitle}>DISCIPLINED WEALTH CREATION</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- GOAL PROGRESS CARD --- */}
        <View style={styles.glassCard}>
          <View style={styles.progressCircleContainer}>
            <Svg width="80" height="80" viewBox="0 0 40 40">
              <Circle
                cx="20"
                cy="20"
                r={radius}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="3"
                fill="none"
              />
              <Circle
                cx="20"
                cy="20"
                r={radius}
                stroke="#6366F1"
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                transform="rotate(-90 20 20)"
              />
            </Svg>
            <View style={styles.progressLabel}>
              <Text style={styles.progressText}>{progress}%</Text>
            </View>
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.growthTitle}>Compound Interest</Text>
            <Text style={styles.growthDesc}>
              Monthly consistency outperforms market timing every time.
            </Text>
          </View>
        </View>

        {/* --- AMOUNT INPUT SECTION --- */}
        <View style={styles.inputSection}>
          <View style={styles.inputHeader}>
            <Text style={styles.sectionLabel}>MONTHLY DEPOSIT</Text>
            <Text style={styles.goldPurity}>24K Digital Gold</Text>
          </View>
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={price?.toString()}
              onChangeText={(val) => setPrice(Number(val.replace(/[^0-9]/g, '')))}
              keyboardType="numeric"
              placeholderTextColor="#4B5563"
              placeholder="0"
            />
            <Text style={styles.currencySymbol}>₹</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
            {quickAmounts.map((amt) => (
              <TouchableOpacity
                key={amt}
                onPress={() => setPrice(amt)}
                style={[
                  styles.chip,
                  price === amt ? styles.chipActive : styles.chipInactive
                ]}
              >
                <Text style={[styles.chipText, price === amt && styles.chipTextActive]}>
                  ₹{amt.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- PRIMARY CTA BUTTON --- */}
        <TouchableOpacity activeOpacity={0.8} style={styles.ctaContainer}>
          <LinearGradient
            colors={['#4F46E5', '#2563EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.mainButton}
          >
            <Text style={styles.buttonText}>ACTIVATE WEALTH PLAN</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* --- PROJECTION SUMMARY --- */}
        <View style={styles.projectionCard}>
          <Text style={styles.projectionLabel}>ESTIMATED YEARLY SAVINGS</Text>
          <Text style={styles.projectionValue}>₹{yearly.toLocaleString()}</Text>
          <View style={styles.row}>
            <CheckCircle2 size={16} color="#4ADE80" />
            <Text style={styles.projectionSubtext}>+ Gold Appreciation (Avg 12%)</Text>
          </View>
        </View>

        {/* --- KEY FEATURES --- */}
        <View style={styles.featureSection}>
          <FeatureItem 
            icon={<TrendingUp size={22} color="#818CF8" />}
            title="Market Outperformance"
            desc="Gold has consistently beaten inflation over the last decade."
          />
          <FeatureItem 
            icon={<Shield size={22} color="#818CF8" />}
            title="Full Insurance"
            desc="Every gram you buy is insured by global underwriters."
          />
          <FeatureItem 
            icon={<Clock size={22} color="#818CF8" />}
            title="Zero Lock-in"
            desc="Withdraw your funds or sell your gold at any time."
          />
        </View>

        {/* --- TRUST FOOTER --- */}
        <View style={styles.securityFooter}>
          <View style={styles.securityBadge}>
            <Shield size={18} color="#22C55E" />
          </View>
          <Text style={styles.securityText}>
            ASSETS ARE PHYSICALLY BACKED AND INSURED IN BANK-GRADE VAULTS.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-component for clean rendering
const FeatureItem = ({ icon, title, desc }: any) => (
  <View style={styles.featureRow}>
    <View style={styles.featureIconContainer}>{icon}</View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a003d' },
  scrollContent: { paddingBottom: 60 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerTextContainer: { marginLeft: 16 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '900', letterSpacing: -0.5 },
  headerSubtitle: { color: '#818CF8', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  
  glassCard: {
    margin: 20,
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircleContainer: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  progressLabel: { position: 'absolute' },
  progressText: { color: 'white', fontWeight: '900', fontSize: 14 },
  progressInfo: { marginLeft: 20, flex: 1 },
  growthTitle: { color: '#818CF8', fontSize: 18, fontWeight: '900' },
  growthDesc: { color: '#9CA3AF', fontSize: 12, lineHeight: 16 },

  inputSection: { paddingHorizontal: 20, marginBottom: 24 },
  inputHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionLabel: { color: '#9CA3AF', fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  goldPurity: { color: '#EAB308', fontSize: 12, fontWeight: '700' },
  inputWrapper: { position: 'relative', marginBottom: 16 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  currencySymbol: { position: 'absolute', right: 24, top: 22, color: '#4B5563', fontSize: 24, fontWeight: '900' },
  
  chipScroll: { flexDirection: 'row' },
  chip: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 15, marginRight: 10, borderWidth: 1 },
  chipActive: { backgroundColor: '#4F46E5', borderColor: '#818CF8' },
  chipInactive: { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' },
  chipText: { color: '#9CA3AF', fontWeight: '800' },
  chipTextActive: { color: 'white' },

  ctaContainer: { paddingHorizontal: 20, marginBottom: 24 },
  mainButton: { borderRadius: 24, paddingVertical: 22, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '900', letterSpacing: 2, fontSize: 14 },

  projectionCard: {
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 35,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 30,
  },
  projectionLabel: { color: '#6B7280', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  projectionValue: { color: 'white', fontSize: 44, fontWeight: '900', marginVertical: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  projectionSubtext: { color: '#4ADE80', fontSize: 14, fontWeight: '700', marginLeft: 8 },

  featureSection: { paddingHorizontal: 20, marginBottom: 20 },
  featureRow: { flexDirection: 'row', marginBottom: 25 },
  featureIconContainer: { width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  featureContent: { marginLeft: 15, flex: 1 },
  featureTitle: { color: 'white', fontSize: 16, fontWeight: '900', marginBottom: 4, letterSpacing: 0.5 },
  featureDesc: { color: '#9CA3AF', fontSize: 14, lineHeight: 20 },

  securityFooter: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  securityBadge: { padding: 8, backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: 10 },
  securityText: { color: '#BBF7D0', fontSize: 10, fontWeight: '800', marginLeft: 12, flex: 1, letterSpacing: 0.5 },
});