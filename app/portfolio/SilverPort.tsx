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
          <MoveLeft color="#E5E7EB" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Silver Portfolio</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Bell color="#E5E7EB" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- PREMIUM SILVER CARD --- */}
        <LinearGradient
          // Is gradient se metallic/silver finish aata hai
          colors={['#F3F4F6', '#D1D5DB', '#9CA3AF', '#D1D5DB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mainCard}
        >
          {/* Subtle Shimmer Overlay Effect */}
          <View style={styles.cardShimmer} />
          
          <Text style={styles.cardLabel}>TOTAL SILVER HOLDING</Text>
          <Text style={styles.mainAmount}>₹ 85,420.50</Text>
          
          <View style={styles.cardDivider} />
          
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.footerLabel}>WEIGHT</Text>
              <Text style={styles.footerValue}>1.250 kg</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.footerLabel}>LIVE RATE (1g)</Text>
              <Text style={styles.footerValue}>₹ 92.40</Text>
            </View>
          </View>
        </LinearGradient>

        {/* --- STATS GRID --- */}
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(229, 231, 235, 0.15)' }]}>
              <TrendingUp color="#E5E7EB" size={18} />
            </View>
            <Text style={styles.gridLabel}>Total SIPs</Text>
            <Text style={styles.gridValue}>04 Active</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(229, 231, 235, 0.15)' }]}>
              <Wallet color="#E5E7EB" size={18} />
            </View>
            <Text style={styles.gridLabel}>Wallet balance</Text>
            <Text style={styles.gridValue}>₹ 1,500</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]}>
              <TrendingUp color="#4ade80" size={18} />
            </View>
            <Text style={styles.gridLabel}>Profit</Text>
            <Text style={[styles.gridValue, { color: '#4ade80' }]}>+18.5%</Text>
          </View>
        </View>

        {/* --- ACTION BUTTONS --- */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryAction}>
            <LinearGradient
              colors={['#E5E7EB', '#9CA3AF']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Zap color="#062530" size={20} fill="#062530" />
              <Text style={styles.primaryActionText}>BUY SILVER</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>SELL ASSET</Text>
          </TouchableOpacity>
        </View>

        {/* --- TRUST BADGE --- */}
        <View style={styles.trustBadge}>
           <ShieldCheck color="#9CA3AF" size={16} />
           <Text style={styles.trustText}>SECURED BY 24K DIGITAL VAULTS</Text>
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
  headerTitle: { color: '#E5E7EB', fontSize: 20, fontWeight: '900', letterSpacing: 0.5 },
  iconButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scrollContent: { padding: 20 },
  
  /* Silver Card */
  mainCard: {
    borderRadius: 30,
    padding: 24,
    marginTop: 10,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardShimmer: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    bottom: -50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ rotate: '45deg' }],
  },
  cardLabel: { color: '#374151', fontSize: 11, fontWeight: 'bold', letterSpacing: 1.5 },
  mainAmount: { color: '#111827', fontSize: 36, fontWeight: '900', marginVertical: 8 },
  cardDivider: { height: 1.5, backgroundColor: 'rgba(0, 0, 0, 0.05)', marginVertical: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerLabel: { color: '#4B5563', fontSize: 10, fontWeight: 'bold', opacity: 0.8 },
  footerValue: { color: '#111827', fontSize: 18, fontWeight: '800' },

  /* Grid */
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  gridItem: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    width: (width - 60) / 3,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  iconCircle: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  gridLabel: { color: '#9ca3af', fontSize: 10, fontWeight: '600', marginBottom: 4 },
  gridValue: { color: '#F3F4F6', fontSize: 13, fontWeight: '800' },

  /* Actions */
  actionRow: { 
    flexDirection: 'row', 
    marginTop: 30, 
    gap: 15, 
  },
  primaryAction: {
    flex: 1,
    height: 58,
    borderRadius: 20,
    overflow: 'hidden',
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
    letterSpacing: 0.5
  },
  secondaryAction: {
    flex: 1,
    height: 58,
    borderWidth: 2,
    borderColor: 'rgba(229, 231, 235, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryActionText: { 
    color: '#E5E7EB', 
    fontWeight: '800', 
    fontSize: 15 
  },

  /* Trust */
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  trustText: { color: '#6B7280', fontSize: 9, fontWeight: 'bold', marginLeft: 8, letterSpacing: 1 },
});