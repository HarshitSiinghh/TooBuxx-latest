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
  ShieldCheck,
  Zap,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function PortfolioScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <MoveLeft color="#cbd5e1" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Platinium Portfolio</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Bell color="#94a3b8" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- PREMIUM PLATINUM CARD --- */}
        <LinearGradient
          // Platinum color palette: icy white to deep slate blue
          colors={['#F8FAFC', '#E2E8F0', '#94A3B8', '#475569']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mainCard}
        >
          {/* Shine Effect */}
          <View style={styles.platinumShine} />
          
          <Text style={styles.cardLabel}>TOTAL PLATINUM VALUE</Text>
          <Text style={styles.mainAmount}>₹ 1,12,050.00</Text>
          
          <View style={styles.cardDivider} />
          
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.footerLabel}>HOLDING</Text>
              <Text style={styles.footerValue}>28.50 g</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.footerLabel}>LIVE RATE (1g)</Text>
              <Text style={styles.footerValue}>₹ 3,931.00</Text>
            </View>
          </View>
        </LinearGradient>

        {/* --- STATS GRID --- */}
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(148, 163, 184, 0.15)' }]}>
              <TrendingUp color="#94a3b8" size={18} />
            </View>
            <Text style={styles.gridLabel}>Active SIPs</Text>
            <Text style={styles.gridValue}>06 Active</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(148, 163, 184, 0.15)' }]}>
              <Wallet color="#94a3b8" size={18} />
            </View>
            <Text style={styles.gridLabel}>Wallet</Text>
            <Text style={styles.gridValue}>₹ 1,500</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]}>
              <TrendingUp color="#4ade80" size={18} />
            </View>
            <Text style={styles.gridLabel}>Net Profit</Text>
            <Text style={[styles.gridValue, { color: '#4ade80' }]}>+21.2%</Text>
          </View>
        </View>

        {/* --- ACTION BUTTONS --- */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryAction}>
            <LinearGradient
              colors={['#CBD5E1', '#64748B']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Zap color="#062530" size={18} fill="#062530" />
              <Text style={styles.primaryActionText}>BUY ASSET</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>SELL ASSET</Text>
          </TouchableOpacity>
        </View>

        {/* --- TRUST BADGE --- */}
        <View style={styles.trustBadge}>
           <ShieldCheck color="#64748B" size={16} />
           <Text style={styles.trustText}>CERTIFIED & BANK-GRADE SECURITY</Text>
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
  headerTitle: { color: '#F8FAFC', fontSize: 20, fontWeight: '900', letterSpacing: 0.5 },
  iconButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scrollContent: { padding: 20 },
  
  /* Platinum Card Styles */
  mainCard: {
    borderRadius: 32,
    padding: 24,
    marginTop: 10,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#94a3b8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  platinumShine: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 200,
    height: 400,
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: [{ rotate: '25deg' }],
  },
  cardLabel: { color: '#334155', fontSize: 11, fontWeight: 'bold', letterSpacing: 1.5 },
  mainAmount: { color: '#0f172a', fontSize: 34, fontWeight: '900', marginVertical: 8 },
  cardDivider: { height: 1.5, backgroundColor: 'rgba(15, 23, 42, 0.06)', marginVertical: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerLabel: { color: '#475569', fontSize: 10, fontWeight: 'bold', opacity: 0.8 },
  footerValue: { color: '#0f172a', fontSize: 18, fontWeight: '800' },

  /* Grid */
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  gridItem: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    width: (width - 64) / 3,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  iconCircle: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  gridLabel: { color: '#94a3b8', fontSize: 10, fontWeight: '600', marginBottom: 4 },
  gridValue: { color: '#f8fafc', fontSize: 13, fontWeight: '800' },

  /* Actions */
  actionRow: { 
    flexDirection: 'row', 
    marginTop: 30, 
    gap: 15, 
  },
  primaryAction: {
    flex: 1,
    height: 60,
    borderRadius: 22,
    overflow: 'hidden',
    elevation: 5,
  },
  gradientButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryActionText: { 
    color: '#062530', 
    fontWeight: '900', 
    fontSize: 15, 
    marginLeft: 8,
  },
  secondaryAction: {
    flex: 1,
    height: 60,
    borderWidth: 2,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryActionText: { 
    color: '#CBD5E1', 
    fontWeight: '800', 
    fontSize: 15 
  },

  /* Trust */
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  trustText: { color: '#64748B', fontSize: 9, fontWeight: 'bold', marginLeft: 8, letterSpacing: 1 },
});