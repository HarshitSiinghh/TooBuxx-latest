import { Share } from "react-native";
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Modal,
  Pressable,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

import { useProfileStore } from '@/store/profileStore';
import { getReferralApi } from '@/services/profile';

export default function ReferralPage() {
  const router = useRouter();

  const referral = useProfileStore((s) => s.referral);
  const setReferral = useProfileStore((s) => s.setReferral);

  const referralCode = referral?.referral_code;
  const referralLink = referral?.referral_url;

  const [showModal, setShowModal] = useState(false);

  // 🔥 LOAD REFERRAL FROM BACKEND
  useEffect(() => {
    const loadReferral = async () => {
      try {
        const res = await getReferralApi();

        if (res.success) {
          setReferral(res.data);   // ✅ STORE UPDATED
        } else {
          console.log("Referral API failed", res);
        }
      } catch (e) {
        console.log("Referral load error", e);
      }
    };

    loadReferral();
  }, []);
  const copyAndShareLink = async () => {
  if (!referralLink) return;

  try {
    // ✅ clipboard me copy
    Clipboard.setString(referralLink);

    // ✅ system share sheet open (image jaisa)
    await Share.share({
      message: `Join using my referral link 🚀\n${referralLink}`,
      url: referralLink,
      title: "Share referral link",
    });

  } catch (e) {
    console.log("Share error:", e);
  }
};

  console.log("REFERRAL FROM STORE 👉", referral);

  const totalReferred = 8;
  const totalEarned = 1200;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MoveLeft color="#9ca3af" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Earn</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
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

            {/* Referral Code */}
            <View style={styles.codeContainer}>
              <View style={styles.codeDashedBox}>
                <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
                <View style={styles.codeValueBox}>
                  <Text selectable style={styles.codeText}>
                    {referralCode || "Loading..."}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      Clipboard.setString(referralCode || "");
                      Alert.alert("Copied", "Referral code copied");
                    }}
                  >
                    <Copy color="#a855f7" size={20} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Referral Link */}
              <View style={styles.linkBox}>
                <Text numberOfLines={1} style={styles.linkText}>
                  {referralLink || "Loading..."}
                </Text>

                {/* <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  // onPress={copyAndShareLink}}
                  style={styles.copyLinkButton}
                >
                  <LinkIcon color="#fff" size={16} />
                  <Text style={styles.copyLinkButtonText}>Copy Link</Text>
                </TouchableOpacity> */}


                <TouchableOpacity
  onPress={copyAndShareLink}
  style={styles.copyLinkButton}
>
  <LinkIcon color="#fff" size={16} />
  <Text style={styles.copyLinkButtonText}>Share Link</Text>
</TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* MODAL */}
      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Your Referral Link</Text>

            <View style={styles.modalLinkBox}>
              <Text selectable style={styles.modalLinkText}>
                {referralLink}
              </Text>
            </View>

            <Pressable
              style={styles.modalCopyBtn}
              onPress={() => {
                Clipboard.setString(referralLink || "");
                Alert.alert("Copied", "Referral link copied");
              }}
            >
              <Text style={styles.modalCopyText}>Copy Link</Text>
            </Pressable>

            <Pressable onPress={() => setShowModal(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
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















  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "flex-end",
},

modalCard: {
  backgroundColor: "#0f172a",
  padding: 20,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
},

modalTitle: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 12,
},

modalLinkBox: {
  borderWidth: 1,
  borderColor: "#7c3aed",
  borderRadius: 12,
  padding: 12,
  marginBottom: 16,
},

modalLinkText: {
  color: "#e5e7eb",
  fontSize: 14,
},

modalCopyBtn: {
  backgroundColor: "#7c3aed",
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: "center",
},

modalCopyText: {
  color: "#fff",
  fontWeight: "700",
},

modalCloseText: {
  color: "#9ca3af",
  textAlign: "center",
  marginTop: 12,
},

});