



import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AMOUNTS = [10, 30, 40, 100, 200, 500]; // Extra amount added for scroll feel

export default function DailyGoldSavings() {
  const [amount, setAmount] = useState(30);

  return (
    <SafeAreaView style={styles.container}>
      {/* FIXED HEADER: Ab ye scroll nahi hoga */}
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

          {/* FIXED BUTTONS ROW: Horizontal scrollable, no wrapping */}
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

      {/* FOOTER: Fixed at the bottom */}
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
  headerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#1a003d",
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, // Space for footer
  },
  banner: {
    backgroundColor: "#2d0b5a",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  features: {
    gap: 5,
  },
  feature: {
    color: "#ccc",
    fontSize: 13,
  },
  inputSection: {
    marginBottom: 25,
  },
  label: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 10,
  },
  amountBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "#4c1d95",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  currency: {
    color: "#fff",
    fontSize: 24,
    marginRight: 5,
  },
  amountText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  amountRow: {
    flexDirection: "row",
    marginHorizontal: -5, // Negative margin to align with content
  },
  amountRowContent: {
    paddingRight: 20, // Extra padding for last button
    gap: 10,
  },
  amountBtn: {
    borderWidth: 1,
    borderColor: "#7C3AED",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    minWidth: 70,
    alignItems: "center",
  },
  activeBtn: {
    backgroundColor: "#7C3AED",
  },
  amountBtnText: {
    color: "#a78bfa",
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
  infoBanner: {
    backgroundColor: "rgba(20, 83, 45, 0.3)",
    padding: 12,
    borderRadius: 10,
  },
  infoText: {
    color: "#6ee7b7",
    fontSize: 12,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#1a003d",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  footerAmount: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  breakup: {
    color: "#a78bfa",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  cta: {
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});