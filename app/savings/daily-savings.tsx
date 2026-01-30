import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  // SafeAreaView,
  Dimensions,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Shield, 
  Clock, 
  Star, 
  Zap, 
  CheckCircle2 
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Or 'react-native-linear-gradient'
import Svg, { Circle, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DailySaving() {
    const router = useRouter();
  // Mocking the store logic
  const [price, setPrice] = React.useState(100);
  const progress = 65;
  const monthly = price * 30;

  // Constants for Circular Progress
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const quickAmounts = [50, 100, 200, 500, 1000];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
   <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#D1D5DB" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Daily Saving</Text>
            <Text style={styles.headerSubtitle}>AUTO-INVEST DIGITAL GOLD</Text>
          </View>
        </View>

        {/* PROGRESS CARD */}
        <View style={styles.progressCard}>
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
                stroke="#A855F7"
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
            <Text style={styles.growthTitle}>3x Faster Growth</Text>
            <Text style={styles.growthDesc}>Keep saving daily to hit your gold target sooner.</Text>
          </View>
        </View>

        {/* INPUT SECTION */}
        <View style={styles.inputSection}>
          <View style={styles.inputHeader}>
            <Text style={styles.sectionLabel}>SELECT AMOUNT</Text>
            <Text style={styles.goldPurity}>Gold: 24K Pure</Text>
          </View>
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={price.toString()}
              onChangeText={(val) => setPrice(Number(val.replace(/[^0-9]/g, '')))}
              keyboardType="numeric"
              placeholderTextColor="#4B5563"
              placeholder="Enter amount"
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
                  ₹{amt}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ACTION BUTTON */}
        <TouchableOpacity activeOpacity={0.8} style={styles.mainButtonContainer}>
          <LinearGradient
            colors={['#9333EA', '#4F46E5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.mainButton}
          >
            <Text style={styles.buttonText}>SETUP DAILY SAVING</Text>
            <Zap size={20} color="white" fill="white" />
          </LinearGradient>
        </TouchableOpacity>

        {/* PROJECTION CARD */}
        <View style={styles.projectionCard}>
          <Text style={styles.projectionLabel}>MONTHLY GOLD GROWTH</Text>
          <Text style={styles.projectionValue}>₹{monthly.toLocaleString()}</Text>
          <View style={styles.projectionFooter}>
            <CheckCircle2 size={16} color="#22C55E" />
            <Text style={styles.projectionSubtext}>
              Approx. {(monthly / 7500).toFixed(3)}g Pure Gold
            </Text>
          </View>
        </View>

        {/* SECURITY INFO */}
        <View style={styles.securityBox}>
          <View style={styles.securityIcon}>
            <Shield size={20} color="#EAB308" />
          </View>
          <Text style={styles.securityText}>
            Your money is 100% secured in 24k digital gold with bank-grade encryption.
          </Text>
        </View>

        <Text style={styles.footerBrand}>POWERED BY XYZ GOLD</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a003d',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerTextContainer: {
    marginLeft: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  headerSubtitle: {
    color: '#A855F7',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  progressCard: {
    margin: 20,
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircleContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLabel: {
    position: 'absolute',
  },
  progressText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 14,
  },
  progressInfo: {
    marginLeft: 20,
    flex: 1,
  },
  growthTitle: {
    color: '#A855F7',
    fontSize: 18,
    fontWeight: '900',
  },
  growthDesc: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  inputSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  sectionLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  goldPurity: {
    color: '#EAB308',
    fontSize: 12,
    fontWeight: '700',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
  },
  currencySymbol: {
    position: 'absolute',
    right: 24,
    top: 18,
    color: '#6B7280',
    fontSize: 20,
    fontWeight: '700',
  },
  chipScroll: {
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: '#9333EA',
    borderColor: '#A855F7',
  },
  chipInactive: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chipText: {
    color: '#9CA3AF',
    fontWeight: '700',
  },
  chipTextActive: {
    color: 'white',
  },
  mainButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mainButton: {
    borderRadius: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    letterSpacing: 1.5,
    fontSize: 14,
    marginRight: 8,
  },
  projectionCard: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 32,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  projectionLabel: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  projectionValue: {
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
    marginVertical: 8,
  },
  projectionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  projectionSubtext: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '700',
  },
  securityBox: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(234, 179, 8, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  securityIcon: {
    padding: 8,
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: 10,
  },
  securityText: {
    flex: 1,
    color: '#FEF08A',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  footerBrand: {
    textAlign: 'center',
    color: '#4B5563',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 24,
  }
});