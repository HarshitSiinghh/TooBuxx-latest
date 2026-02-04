import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import {
  MoveLeft,
  Bell,
  Wallet,
  TrendingUp,
  Target,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Install: npx expo install expo-linear-gradient

const { width } = Dimensions.get('window');

export default function GoldPortfolio() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <MoveLeft color="#d1d5db" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gold Portfolio</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Bell color="#facc15" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- MAIN HOLDINGS CARD (GOLD GRADIENT) --- */}
        <LinearGradient
          colors={['#facc15', '#eab308', '#d4af37']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mainCard}
        >
          <Text style={styles.cardLabel}>TOTAL GOLD VALUE</Text>
          <Text style={styles.mainAmount}>₹ 4,52,308.90</Text>
          
          <View style={styles.cardDivider} />
          
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.footerLabel}>TOTAL GRAMS</Text>
              <Text style={styles.footerValue}>65.234 g</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.footerLabel}>LIVE BUY RATE</Text>
              <Text style={styles.footerValue}>₹ 6,934 /g</Text>
            </View>
          </View>
        </LinearGradient>

        {/* --- STATS GRID --- */}
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(250, 204, 21, 0.1)' }]}>
              <TrendingUp color="#facc15" size={20} />
            </View>
            <Text style={styles.gridLabel}>Total SIPs</Text>
            <Text style={styles.gridValue}>04 Active</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(34, 197, 94, 0.1)' }]}>
              <Wallet color="#22c55e" size={20} />
            </View>
            <Text style={styles.gridLabel}>Wallet</Text>
            <Text style={styles.gridValue}>₹ 1,500</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(96, 165, 250, 0.1)' }]}>
              <TrendingUp color="#60a5fa" size={20} />
            </View>
            <Text style={styles.gridLabel}>Total Profit</Text>
            <Text style={[styles.gridValue, { color: '#22c55e' }]}>+18.5%</Text>
          </View>
        </View>

       

        {/* --- ACTION BUTTONS --- */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryAction}>
            <Zap color="#062530" size={20} fill="#062530" />
            <Text style={styles.primaryActionText}>SAVE NOW</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>SELL GOLD</Text>
          </TouchableOpacity>
        </View>

        {/* --- TRUST BADGE --- */}
        <View style={styles.trustBadge}>
           <ShieldCheck color="#22c55e" size={18} />
           <Text style={styles.trustText}>100% SECURE & INSURED STORAGE</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#062530' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  iconButton: {
    padding: 8,
    backgroundColor: '#104e64',
    borderRadius: 12,
  },
  scrollContent: { padding: 20 },
  
  /* Main Card */
  mainCard: {
    borderRadius: 28,
    padding: 24,
    elevation: 10,
    shadowColor: '#facc15',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  cardLabel: { color: '#062530', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  mainAmount: { color: '#062530', fontSize: 34, fontWeight: '900', marginVertical: 8 },
  cardDivider: { height: 1, backgroundColor: 'rgba(6, 37, 48, 0.1)', marginVertical: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerLabel: { color: '#062530', fontSize: 10, fontWeight: 'bold', opacity: 0.7 },
  footerValue: { color: '#062530', fontSize: 16, fontWeight: '800' },

  /* Grid */
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  gridItem: {
    backgroundColor: '#0b2f3a',
    width: (width - 60) / 3,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#104e64',
  },
  iconCircle: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  gridLabel: { color: '#9ca3af', fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  gridValue: { color: '#fff', fontSize: 13, fontWeight: 'bold' },

  /* Goal Section */
  goalCard: {
    backgroundColor: '#0b2f3a',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#104e64',
  },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  row: { flexDirection: 'row', alignItems: 'center' },
  goalTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  goalPercent: { color: '#facc15', fontWeight: '900' },
  progressBg: { height: 8, backgroundColor: '#062530', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#facc15', borderRadius: 4 },
  goalDesc: { color: '#9ca3af', fontSize: 12, marginTop: 12, lineHeight: 18 },

  /* Actions */
 actionRow: { 
  flexDirection: 'row', 
  marginTop: 25, 
  gap: 12,              // Space between the buttons
  paddingHorizontal: 4, // Optional: fine-tuning side alignment
},
primaryAction: {
  flex: 1,              // Changed from 2 to 1 to make it equal
  backgroundColor: '#facc15',
  height: 56,           // Keep height consistent
  borderRadius: 18,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
primaryActionText: { 
  color: '#062530', 
  fontWeight: '900', 
  fontSize: 15,         // Adjusted slightly for better fit
  marginLeft: 8 
},
  secondaryAction: {
  flex: 1,              // Changed from 1 to 1 (now equal to primary)
  height: 56,           // Set height to match primary exactly
  borderWidth: 1.5,     // Slightly thicker border for better visibility
  borderColor: '#104e64',
  borderRadius: 18,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent', // Ensures it looks like an outline button
},
secondaryActionText: { 
  color: '#fff', 
  fontWeight: '900',    // Matched weight with primary text
  fontSize: 15 
},

  /* Trust */
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    opacity: 0.6,
  },
  trustText: { color: '#9ca3af', fontSize: 10, fontWeight: 'bold', marginLeft: 8, letterSpacing: 0.5 },
});
