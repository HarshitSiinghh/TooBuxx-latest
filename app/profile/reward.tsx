import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  // SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Gift,
  Coins,
  Star,
  Trophy,
  MoveLeft,
  Sparkles,
  Zap,
  ChevronRight,
  Clock,
} from 'lucide-react-native'; 
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
 
     const router = useRouter();
const rewards = [
  {
    title: "₹50 Gold Bonus",
    desc: "On completing your first saving",
    img: require('../../images/gold-coin.png'), 
    points: 500,
    route :"/savings/daily-savings",
    accent: "#eab308",
  },
  {
    title: "Spin & Win",
    desc: "Get a free spin every week",
    img: require('../../images/spins.png'),
    points: 300,
    accent: "#a855f7",
      route :"/spin-and-win/spin-wheel",
  },
  {
    title: "Refer & Earn",
    desc: "Invite friends & earn rewards",
    img: require('../../images/refer-earn.png'),
    points: 800,
    accent: "#fb923c",
      route :"/spin-and-win/referral",
  },
  {
    title: "Premium Saver",
    desc: "Save daily for 30 days",
    img: require('../../images/box.webp'),
    points: 1000,
    accent: "#4ade80",
      route :"/savings/daily-savings",
  },
];

export default function RewardsHub() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MoveLeft color="#d1d5db" size={20} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Rewards Hub</Text>
          <Text style={styles.headerSub}>EARN POINTS FOR 24K GOLD</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- POINTS BALANCE CARD --- */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View style={styles.coinIconContainer}>
              <Coins color="#eab308" size={32} />
            </View>
            <View>
              <Text style={styles.pointsText}>2,450</Text>
              <Text style={styles.pointsSub}>AVAILABLE POINTS</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressInfo}>
              <Text style={styles.tierText}>Gold Tier</Text>
              <Text style={styles.tierText}>65% to Platinum</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
          </View>
        </View>

        {/* --- REWARDS LIST --- */}
        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>REDEEM REWARDS</Text>
          
          {rewards.map((reward, i) => (
            <TouchableOpacity 
            onPress={()=> router.push(reward.route as any )}
              key={i} 
              activeOpacity={0.7}
              style={[styles.rewardItem, { borderColor: reward.accent + '33' }]}
            >
              <View style={styles.rewardImgContainer}>
                {/* Fallback to icon if image fails */}
                <Image source={reward.img} style={styles.rewardImg} />
              </View>
              
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDesc}>{reward.desc}</Text>
              </View>

              <View style={styles.rewardAction}>
                <Text style={[styles.rewardPoints, { color: reward.accent }]}>
                  {reward.points}
                </Text>
                <ChevronRight color="#374151" size={16} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- FOOTER CTA (From Desktop) --- */}
        <TouchableOpacity style={styles.convertButton} activeOpacity={0.8}>
          <Text style={styles.convertButtonText}>CONVERT POINTS TO GOLD</Text>
          <Zap color="#fff" size={18} fill="#fff" />
        </TouchableOpacity>

        <Text style={styles.poweredBy}>POWERED BY XYZ GOLD</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  headerTextContainer: {
    marginLeft: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
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
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 30,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  coinIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
  },
  pointsSub: {
    color: '#a855f7',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  progressSection: {
    marginTop: 24,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tierText: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#9333ea',
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  rewardsSection: {
    gap: 12,
  },
  sectionTitle: {
    color: '#4b5563',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
    marginLeft: 4,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    gap: 16,
  },
  rewardImgContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
  rewardDesc: {
    color: '#6b7280',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
  },
  rewardAction: {
    alignItems: 'flex-end',
    gap: 4,
  },
  rewardPoints: {
    fontSize: 13,
    fontWeight: '900',
  },
  convertButton: {
    marginTop: 30,
    backgroundColor: '#7c3aed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 24,
    gap: 12,
  },
  convertButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  poweredBy: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 3,
    marginTop: 40,
  },
});