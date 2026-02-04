

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
      <ActivityIndicator size="large" color="#facc15" />

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



export default KYCVerified12;




const styles = StyleSheet.create({
  /* ================= ROOT ================= */
  mainWrapper: {
    flex: 1,
    backgroundColor: "#062530",
  },

  /* ================= GLOWS ================= */
  glow: {
    position: "absolute",
    borderRadius: 1000,
    opacity: 0.12,
  },
  topGlow: {
    top: -60,
    right: -60,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: "#22c55e",
  },

  /* ================= WRAPPER ================= */
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  /* ================= CARD ================= */
  container: {
    backgroundColor: "#0b3442",
    borderWidth: 1,
    borderColor: "#104e64",
    borderRadius: 40,
    padding: 32,
    shadowColor: "#041d26",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 10,
    overflow: "hidden",
  },

  topInnerGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(34,197,94,0.45)",
  },

  /* ================= CONTENT ================= */
  content: {
    alignItems: "center",
  },

  /* ================= ICON ================= */
  iconWrapper: {
    marginBottom: 24,
    position: "relative",
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(34,197,94,0.12)",
    borderWidth: 2,
    borderColor: "rgba(34,197,94,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeOverlay: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "#22c55e",
    padding: 6,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#062530",
  },

  /* ================= TEXT ================= */
  title: {
    fontSize: 26,
    fontWeight: "900",
    fontStyle: "italic",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#4ade80",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 6,
  },

  /* ================= DETAILS LIST ================= */
  detailsList: {
    width: "100%",
    marginTop: 36,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(16,78,100,0.4)",
  },

  label: {
    color: "#8fbac4",
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 4,
  },

  value: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  /* ================= FOOTER ================= */
  bankGradeText: {
    textAlign: "center",
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 36,
  },
});
