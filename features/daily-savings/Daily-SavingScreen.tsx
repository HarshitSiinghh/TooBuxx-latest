import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AMOUNTS = [10, 30, 40, 100, 200, 500]; // E x t r a   a  m o u n t   a d d e d   f o r   s c r o l l   f e e l 

export default function DailyGoldSavings() {
  const [amount, setAmount] = useState(30);

  return (
    <SafeAreaView style={styles.container}>
      {/* F I X E D   H E A D E R :   A b   y e   s c r o l l   n a h i   h o g a   */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Daily Gold Savings</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Save your money in Gold</Text>
          <View style={styles.features}>
            <Text style={styles.feature}>• Start with just ₹10</Text>
            <Text style={styles.feature}>• Save daily automatically</Text>
            <Text style={styles.feature}>• Pause or Stop anytime</Text>
          </View>
        </View>

        {/* Amount Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Amount to save daily</Text>
          <View style={styles.amountBox}>
            <Text style={styles.currency}>₹</Text>
            <Text style={styles.amountText}>{amount}</Text>
          </View>

          {/* F I X E D   B U T T O N S   R O W :   H o r i z o n t a l   s c r o l l a b l e ,   n o   w r a p p i n g   */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.amountRow}
            contentContainerStyle={styles.amountRowContent}
          >
            {AMOUNTS.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setAmount(item)}
                style={[
                  styles.amountBtn,
                  amount === item && styles.activeBtn,
                ]}
              >
                <Text
                  style={[
                    styles.amountBtnText,
                    amount === item && styles.activeText,
                  ]}
                >
                  ₹{item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>
            🛡️ 1.5 Crore Indians save in Gold and Silver on ABC
          </Text>
        </View>
      </ScrollView>

      {/* F O O T E R :   F i x e d   a t   t h e   b o t t o m   */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerAmount}>₹{amount}</Text>
          <TouchableOpacity>
            <Text style={styles.breakup}>View Breakup</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cta}>
          <Text style={styles.ctaText}>Continue Setup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a003d",
  },

  /* ---------- HEADER ---------- */
  headerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#1a003d",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  headerText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.6,
    textAlign: "center",
  },

  /* ---------- SCROLL ---------- */
  scrollContent: {
    padding: 20,
    paddingBottom: 140,
  },

  /* ---------- BANNER ---------- */
  banner: {
    backgroundColor: "#240056",
    borderRadius: 24,
    padding: 22,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  bannerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },

  features: {
    gap: 6,
  },

  feature: {
    color: "#c7d2fe",
    fontSize: 13,
    fontWeight: "600",
  },

  /* ---------- INPUT ---------- */
  inputSection: {
    marginBottom: 28,
  },

  label: {
    color: "#9ca3af",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 12,
  },

  amountBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.35)",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 18,
  },

  currency: {
    color: "#e9d5ff",
    fontSize: 24,
    fontWeight: "900",
    marginRight: 6,
  },

  amountText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  /* ---------- A M O U N T     R O W   ---------- */
  amountRow: {
    marginHorizontal: -4,
  },

  amountRowContent: {
    paddingRight: 20,
    gap: 12,
  },

  amountBtn: {
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.45)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    minWidth: 72,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },

  activeBtn: {
    backgroundColor: "#7c 3aed",
    borderColor: "#7 c3aed",
  },

  amountBtnText: {
    color: "#c4b5fd",
    fontWeight: "800",
    fontSize: 13,
  },

  activeText: {
    color: "#ffffff",
  },

  /* ---------- I N F O ---------- */
  infoBanner: {
    backgroundColor: "rgba(34,197,94,0.12)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.25)",
  },

  infoText: {
    color: "#86efac",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  /* ---------- FOOTER ---------- */
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#1a003d",
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },

  footerAmount: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
  },

  breakup: {
    color: "#c4b5fd",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
    textDecorationLine: "underline",
  },

  cta: {
    backgroundColor: "#facc15",
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 18,
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },

  ctaText: {
    color: "#1a003d",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
