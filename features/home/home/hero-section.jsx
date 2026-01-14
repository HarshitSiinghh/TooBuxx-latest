import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Navigation } from "@/store/store";
  import { useRouter } from "expo-router";
export const HeroSection = () => {
  const { setOpen } = Navigation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ========== Header ========== */}
      <View style={styles.header}>
        <Text style={styles.hello}>
          Hello, <Text style={styles.bold}>xyz</Text>
        </Text>

        <View style={styles.giftBox}>
          <Feather name="gift" size={16} color="#e26a75" />
          <Text style={styles.giftText}>You got</Text>
          <Text style={styles.giftCount}>0/5 cards</Text>
        </View>
      </View>

      {/* ========== Card Section ========== */}
      <View style={styles.card}>
        <View style={styles.firstGold}>
          <Text style={styles.firstGoldText}>Your first gold coin</Text>
          <MaterialCommunityIcons name="hand-coin-outline" size={18} color="#facc15" />
        </View>

        <View style={styles.savingsRow}>
          <View style={styles.savingsLeft}>
            <FontAwesome5 name="landmark" size={16} color="#b0a8e3" />
            <Text style={styles.savingsText}>
              Your Savings{"\n"}in 24K Gold
            </Text>
          </View>

          <View style={styles.amountBox}>
            <Text style={styles.amount}>₹45433</Text>
            <Text style={styles.grams}>1838.0gm</Text>
          </View>
        </View>
      </View>

      {/* ========== Buttons ========== */}
      <View style={styles.buttons}>
        <Pressable style={styles.outlineBtn}  onPress={()=>router.push("/savings/withdrawalFrom")}>
          <Text style={styles.btnText}>Withdraw</Text>
        </Pressable>

        <Pressable style={styles.primaryBtn}  onPress={() => router.push("/savings/daily-savings")}>
          <Text style={styles.btnText}>Start saving</Text>
        </Pressable>
      </View>
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a003d",
    padding: 14,
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  hello: {
    color: "white",
    fontSize: 14,
  },
  bold: {
    fontWeight: "700",
  },
  giftBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(47,33,95,0.4)",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  giftText: {
    color: "white",
    fontSize: 12,
  },
  giftCount: {
    color: "#EFCC56",
    fontSize: 12,
  },

  /* Card */
  card: {
    backgroundColor: "#473b74",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  firstGold: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#221943",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  firstGoldText: {
    color: "#EEE",
    fontSize: 12,
  },
  savingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  savingsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  savingsText: {
    color: "#b0a8e3",
    fontSize: 12,
    lineHeight: 16,
  },
  amountBox: {
    borderLeftWidth: 1,
    borderLeftColor: "#6e5fcf",
    paddingLeft: 14,
  },
  amount: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  grams: {
    color: "white",
    fontSize: 12,
  },

  /* Buttons */
  buttons: {
    flexDirection: "row",
    gap: 14,
    marginTop: 18,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6e5fcf",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#6e5fcf",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "600",
  },
});
