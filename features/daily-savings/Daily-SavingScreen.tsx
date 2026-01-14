import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const AMOUNTS = [10, 30, 40, 100,200];

export default function DailyGoldSavings() {
  const [amount, setAmount] = useState(30);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Daily Gold Savings</Text>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Save your money in Gold</Text>

        <View style={styles.features}>
          <Text style={styles.feature}>Start with just ₹10</Text>
          <Text style={styles.feature}>Save daily automatically</Text>
          <Text style={styles.feature}>Pause or Stop anytime</Text>
        </View>
      </View>

      {/* Amount Input */}
      <Text style={styles.label}>Amount to save daily</Text>
      <View style={styles.amountBox}>
        <Text style={styles.currency}>₹</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>

      {/* Quick Amount Buttons */}
      <View style={styles.amountRow}>
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
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoText}>
          1.5 Crore Indians save in Gold and Silver on ABC
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerAmount}>₹{amount}</Text>
          <Text style={styles.breakup}>View Breakup</Text>
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
    padding: 16,
  },

  header: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  banner: {
    backgroundColor: "#270357ff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  features: {
    gap: 6,
  },

  feature: {
    color: "#B3B3B3",
    fontSize: 13,
  },

  label: {
    color: "#B3B3B3",
    marginBottom: 8,
  },

  amountBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  currency: {
    color: "#fff",
    fontSize: 22,
    marginRight: 6,
  },

  amount: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },

  amountRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  amountBtn: {
    borderWidth: 1,
    borderColor: "#7C3AED",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  activeBtn: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },

  amountBtnText: {
    color: "#7C3AED",
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
  },

  infoBanner: {
    backgroundColor: "#14532D",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  infoText: {
    color: "#A7F3D0",
    fontSize: 13,
  },

  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerAmount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  breakup: {
    color: "#A78BFA",
    fontSize: 12,
    marginTop: 4,
  },

  cta: {
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },

  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
