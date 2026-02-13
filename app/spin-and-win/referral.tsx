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
                    <Copy color="#facc15" size={20} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Referral Link */}
              <View style={styles.linkBox}>
                <Text numberOfLines={1} style={styles.linkText}>
                  {referralLink || "Loading..."}
                </Text>


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
    backgroundColor: "#062530",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingVertical: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  backButton: {
    marginRight: 14,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  /* SCROLL */
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },

  /* HERO CARD */
  heroCardContainer: {
    position: "relative",
    marginBottom: 28,
  },

  cardGradientBorder: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 36,
    backgroundColor: "#104e64",
    opacity: 0.6,
  },

  heroCard: {
    backgroundColor: "#0b3442",
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "#104e64",
    padding: 30,
    overflow: "hidden",
  },

  heroGlow: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(250,204,21,0.25)",
  },

  limitedTimeBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(250,204,21,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
    marginBottom: 22,
    gap: 6,
  },

  limitedTimeText: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
  },

  heroTitleHighlight: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    color: "#facc15",
    marginBottom: 14,
  },

  heroSubtext: {
    color: "#8fbac4",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 34,
  },

  /* REFERRAL CODE */
  codeContainer: {
    width: "100%",
  },

  codeDashedBox: {
    backgroundColor: "rgba(16,78,100,0.35)",
    borderWidth: 1.5,
    borderColor: "#104e64",
    borderStyle: "dashed",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },

  codeLabel: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
    textAlign: "center",
    marginBottom: 10,
  },

  codeValueBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#062530",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  codeText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1.2,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },

  /* LINK BOX */
  linkBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 18,
    padding: 6,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  linkText: {
    flex: 1,
    color: "#8fbac4",
    fontSize: 12,
    paddingHorizontal: 12,
  },

  copyLinkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#facc15",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 6,
  },

  copyLinkButtonText: {
    color: "#062530",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(6,37,48,0.9)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#0b3442",
    padding: 22,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  modalTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 14,
  },

  modalLinkBox: {
    borderWidth: 1,
    borderColor: "#facc15",
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    backgroundColor: "rgba(250,204,21,0.12)",
  },

  modalLinkText: {
    color: "#ffffff",
    fontSize: 14,
  },

  modalCopyBtn: {
    backgroundColor: "#facc15",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  modalCopyText: {
    color: "#062530",
    fontWeight: "900",
    letterSpacing: 1,
  },

  modalCloseText: {
    color: "#8fbac4",
    textAlign: "center",
    marginTop: 14,
    fontWeight: "700",
  },
});
