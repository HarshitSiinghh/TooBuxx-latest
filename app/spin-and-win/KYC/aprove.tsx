

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, SafeAreaView, StatusBar } from "react-native";
import { BadgeCheck, ShieldCheck } from "lucide-react-native";
import { MotiView } from "moti";
import { getKycStatusApi } from "@/services/kyc";
import { useRouter, Href } from "expo-router";

const { width, height } = Dimensions.get("window");

const KYCVerified12 = () => {
  const router = useRouter();
  const [kyc, setKyc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadKyc = async () => {
      try {
        const res = await getKycStatusApi();

        if (res?.success && res?.kyc) {
          setKyc(res.kyc);

          // 🔁 safety redirect
          if (res.kyc.status === "pending") {
            router.replace("/spin-and-win/KYC/pending" as Href);
          }
          if (res.kyc.status === "rejected") {
            router.replace("/spin-and-win/KYC/rejected" as Href);
          }
        }
      } catch (e) {
        console.log("❌ KYC verified API error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadKyc();
  }, []);

  if (loading) {
    return (
      <View style={[styles.mainWrapper, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#a855f7" />
      </View>
    );
  }

  if (!kyc) return null;

  const details = [
    { label: "Full Name", value: kyc.full_name },
    { label: "Email Address", value: kyc.email },
    { label: "Phone Number", value: kyc.phone },
    { label: "Document Type", value: kyc.document_type },
    { label: "ID Number", value: kyc.document_number },
  ];

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Decorative Glows */}
      <View style={[styles.glow, styles.topGlow]} />

      <View style={styles.wrapper}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={styles.container}
        >
          {/* Subtle Top Inner Glow Line */}
          <View style={styles.topInnerGlow} />

          <View style={styles.content}>
            {/* Status Icon with Theme Circle */}
            <View style={styles.iconWrapper}>
              <View style={styles.iconCircle}>
                <BadgeCheck color="#4ade80" size={40} />
              </View>
              <View style={styles.badgeOverlay}>
                <ShieldCheck color="white" size={12} />
              </View>
            </View>

            <Text style={styles.title}>KYC VERIFIED</Text>
            <Text style={styles.subtitle}>IDENTITY CONFIRMED SECURELY</Text>

            {/* Details List with Glassmorphism */}
            <View style={styles.detailsList}>
              {details.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.detailRow,
                    index === details.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <View>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.value}>{item.value || "N/A"}</Text>
                  </View>
                  <BadgeCheck color="rgba(74, 222, 128, 0.2)" size={16} />
                </View>
              ))}
            </View>
          </View>
        </MotiView>

        {/* Footer info */}
        <Text style={styles.bankGradeText}>BANK GRADE SECURITY VERIFIED</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#1a003d',
  },
  glow: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  topGlow: {
    top: -50,
    right: -50,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#22c55e', // Green glow for verified status
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#2f2360', // Card Color from Theme
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
    overflow: 'hidden',
  },
  topInnerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(74, 222, 128, 0.4)',
  },
  content: {
    alignItems: 'center',
  },
  iconWrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(26, 0, 61, 0.5)',
    borderWidth: 2,
    borderColor: 'rgba(74, 222, 128, 0.3)',
    justifyContent: "center",
    alignItems: "center",
  },
  badgeOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#22c55e',
    padding: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2f2360',
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "white",
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#4ade80",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 6,
  },
  detailsList: {
    width: '100%',
    marginTop: 40,
    backgroundColor: 'rgba(26, 0, 61, 0.3)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  label: {
    color: "#6b7280",
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  bankGradeText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 4,
    marginTop: 40,
  },
});

export default KYCVerified12;