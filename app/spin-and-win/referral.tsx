import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';

import {
  MoveLeft,
  Share2,
  Copy,
  Trophy,
  Wallet,
  Link as LinkIcon,
  UserPlus,
  Gift,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
export default function ReferralPage( ) {
  const referralCode = "XYZ123";
  const router = useRouter();
  const referralLink = `https://yourapp.com/ref/${referralCode}`;
  const totalReferred = 8;
  const totalEarned = 1200;

  // ✅ Clipboard-free handler
  const handleCopyPress = (text: string) => {
    Alert.alert("Copy", "Long press the text to copy 📋");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={()=>router.back()}
          style={styles.backButton}
        >
          <MoveLeft color="#9ca3af" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Earn</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Hero Card */}
        <View style={styles.heroCardContainer}>
          <View style={styles.cardGradientBorder} />
          
          <View style={styles.heroCard}>
            <View style={styles.heroGlow} />

            <View style={styles.limitedTimeBadge}>
              <Trophy color="#facc15" size={14} />
              <Text style={styles.limitedTimeText}>LIMITED TIME: DOUBLE REWARDS</Text>
            </View>

            <Text style={styles.heroTitle}>Invite Friends,</Text>
            <Text style={styles.heroTitleHighlight}>Earn Gold Together</Text>
            
            <Text style={styles.heroSubtext}>
              Share the wealth! When your friends start saving, both of you unlock premium bonuses.
            </Text>

            {/* Referral Code Box */}
            <View style={styles.codeContainer}>
              <View style={styles.codeDashedBox}>
                <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
                <View style={styles.codeValueBox}>
                  <Text selectable style={styles.codeText}>{referralCode}</Text>
                  <TouchableOpacity onPress={() => handleCopyPress(referralCode)}>
                    <Copy color="#a855f7" size={20} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Link Box */}
              <View style={styles.linkBox}>
                <Text selectable numberOfLines={1} style={styles.linkText}>
                  {referralLink}
                </Text>
                <TouchableOpacity 
                  onPress={() => handleCopyPress(referralLink)}
                  style={styles.copyLinkButton}
                >
                  <LinkIcon color="#fff" size={16} />
                  <Text style={styles.copyLinkButtonText}>Copy Link</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconLeft}>
               <UserPlus color="#fff" size={40} opacity={0.2} />
            </View>
            <View>
              <Text style={styles.statValue}>{totalReferred}</Text>
              <Text style={styles.statLabel}>SUCCESSFUL REFERRALS</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconLeft}>
               <Wallet color="#fff" size={40} opacity={0.2} />
            </View>
            <View>
              <Text style={[styles.statValue, { color: '#4ade80' }]}>₹{totalEarned}</Text>
              <Text style={styles.statLabel}>BONUS WITHDRAWN</Text>
            </View>
          </View>
        </View>

        {/* How it Works */}
        <View style={styles.howItWorks}>
          <Text style={styles.sectionTitle}>How it works</Text>
          
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={[styles.stepIconBox, { borderColor: 'rgba(168, 85, 247, 0.4)', backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
                <Share2 color="#a855f7" size={24} />
              </View>
              <Text style={styles.stepTitle}>1. Share Code</Text>
              <Text style={styles.stepDesc}>Send your link or code to your friends.</Text>
            </View>

            <View style={styles.stepItem}>
              <View style={[styles.stepIconBox, { borderColor: 'rgba(37, 99, 235, 0.4)', backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
                <UserPlus color="#3b82f6" size={24} />
              </View>
              <Text style={styles.stepTitle}>2. Friend Joins</Text>
              <Text style={styles.stepDesc}>They sign up and start their first saving goal.</Text>
            </View>

            <View style={styles.stepItem}>
              <View style={[styles.stepIconBox, { borderColor: 'rgba(234, 179, 8, 0.4)', backgroundColor: 'rgba(234, 179, 8, 0.1)' }]}>
                <Gift color="#eab308" size={24} />
              </View>
              <Text style={styles.stepTitle}>3. Get Rewards</Text>
              <Text style={styles.stepDesc}>Both of you receive ₹150 Gold bonus instantly!</Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heroCardContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  cardGradientBorder: {
    position: 'absolute',
    top: -2, left: -2, right: -2, bottom: -2,
    borderRadius: 32,
    backgroundColor: '#7c3aed', // fallback for gradient border
    opacity: 0.2,
  },
  heroCard: {
    backgroundColor: '#1a003d',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 30,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
  },
  limitedTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  limitedTimeText: {
    color: '#facc15',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 6,
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  heroTitleHighlight: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    color: '#facc15', // Yellow gradient fallback
    marginBottom: 10,
  },
  heroSubtext: {
    color: '#9ca3af',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 30,
    lineHeight: 20,
  },
  codeContainer: {
    width: '100%',
  },
  codeDashedBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  codeLabel: {
    color: '#d8b4fe',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 10,
  },
  codeValueBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f0025',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  codeText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  linkText: {
    flex: 1,
    color: '#9ca3af',
    fontSize: 12,
    paddingHorizontal: 12,
  },
  copyLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  copyLinkButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    overflow: 'hidden',
  },
  statIconLeft: {
    position: 'absolute',
    right: -10,
    top: -5,
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 4,
  },
  howItWorks: {
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  stepsContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 24,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDesc: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },
});