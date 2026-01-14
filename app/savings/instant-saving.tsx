import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import {
  MoveLeft,
  Shield,
  Clock,
  Star,
  Zap,
  CheckCircle2,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Price } from "@/store/store";

export default function InstantSaving() {
  const router = useRouter();
  const { setPrice, price } = Price();

  const progress = 65;

  const monthlyEstimate = price * 30;
  const yearlySaving = price * 365;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <MoveLeft size={22} color="#d1d5db" />
        </Pressable>

        <View>
          <Text style={styles.title}>Instant Saving</Text>
          <Text style={styles.subtitle}>ONE-TIME GOLD PURCHASE</Text>
        </View>
      </View>

      {/* PROGRESS CARD */}
      <View style={styles.progressCard}>
        <View style={styles.progressRow}>
          <View style={styles.circleWrap}>
            <Svg width={80} height={80} viewBox="0 0 36 36">
              <Path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke="#ffffff10"
                strokeWidth={3}
                fill="none"
              />
              <Path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke="#a855f7"
                strokeWidth={3}
                strokeDasharray={`${progress},100`}
                strokeLinecap="round"
                fill="none"
              />
            </Svg>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.fastTitle}>3x Faster Growth</Text>
            <Text style={styles.fastDesc}>
              Saving instantly boosts your target progress.
            </Text>
          </View>
        </View>
      </View>

      {/* INPUT */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>AMOUNT TO SAVE</Text>
          <Text style={styles.goldText}>24K PURE GOLD</Text>
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            keyboardType="number-pad"
            value={price === 0 ? "" : String(price)}
            placeholder="0"
            placeholderTextColor="#6b7280"
            onChangeText={(t) => {
              if (t === "") {
                setPrice(0);
              } else {
                const cleaned = t.replace(/[^0-9]/g, "");
                setPrice(Number(cleaned));
              }
            }}
            style={styles.input}
          />
          <Text style={styles.currency}>₹</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[20, 50, 100, 200, 500, 1000].map((amt) => (
            <Pressable
              key={amt}
              onPress={() => setPrice(amt)}
              style={[
                styles.amountBtn,
                price === amt && styles.amountBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.amountText,
                  price === amt && styles.amountTextActive,
                ]}
              >
                ₹{amt}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* CONFIRM */}
      <LinearGradient
        colors={["#7c3aed", "#4f46e5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.confirmBtn}
      >
        <Pressable style={styles.confirmRow}>
          <Text style={styles.confirmText}>SETUP INSTANT SAVING</Text>
          <Zap color="white" size={22} />
        </Pressable>
      </LinearGradient>

      {/* FORECAST */}
      <View style={styles.forecastCard}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.forecastLabel}>MONTHLY FORECAST</Text>
            <Text style={styles.forecastValue}>
              ₹{monthlyEstimate.toLocaleString()}
            </Text>
          </View>

          <View>
            <Text style={styles.forecastLabel}>YEARLY OUTLOOK</Text>
            <Text style={[styles.forecastValue, { color: "#4ade80" }]}>
              ₹{yearlySaving.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.goldRow}>
          <CheckCircle2 size={18} color="#22c55e" />
          <Text style={styles.goldInfo}>
            Purchasing approx. {(price / 7500).toFixed(4)}g of 24K Gold
          </Text>
        </View>
      </View>

      {/* FEATURES */}
      <View style={styles.featureCard}>
        {[
          {
            icon: <Shield color="#9ca3af" />,
            title: "Bank-Grade Protection",
            desc: "Your gold is stored in secure, insured vaults.",
          },
          {
            icon: <Clock color="#9ca3af" />,
            title: "Instant Liquidity",
            desc: "Sell your gold and withdraw cash anytime.",
          },
          {
            icon: <Star color="#9ca3af" />,
            title: "99.9% Purity",
            desc: "Assured hallmark 24K digital gold.",
          },
        ].map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <View style={styles.iconBox}>{f.icon}</View>
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a003d",
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ffffff10",
  },

  backBtn: {
    backgroundColor: "#ffffff10",
    padding: 10,
    borderRadius: 14,
    marginRight: 14,
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "900",
  },

  subtitle: {
    fontSize: 10,
    color: "#a78bfa",
    letterSpacing: 2,
    marginTop: 2,
    fontWeight: "700",
  },

  progressCard: {
    margin: 20,
    backgroundColor: "#ffffff08",
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ffffff15",
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  circleWrap: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  progressText: {
    position: "absolute",
    color: "white",
    fontWeight: "900",
  },

  fastTitle: {
    color: "#c084fc",
    fontSize: 18,
    fontWeight: "900",
  },

  fastDesc: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 4,
  },

  section: {
    paddingHorizontal: 20,
    gap: 14,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  label: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "800",
    letterSpacing: 2,
  },

  goldText: {
    fontSize: 10,
    color: "#facc15",
    fontWeight: "800",
  },

  inputWrap: {
    position: "relative",
  },

  input: {
    backgroundColor: "#ffffff10",
    borderRadius: 20,
    padding: 18,
    fontSize: 22,
    color: "white",
    fontWeight: "900",
    borderWidth: 1,
    borderColor: "#ffffff20",
  },

  currency: {
    position: "absolute",
    right: 20,
    top: 18,
    fontSize: 20,
    color: "#9ca3af",
    fontWeight: "900",
  },

  amountBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ffffff20",
    marginRight: 10,
    backgroundColor: "#ffffff08",
  },

  amountBtnActive: {
    backgroundColor: "#7c3aed",
    borderColor: "#a78bfa",
  },

  amountText: {
    color: "#9ca3af",
    fontWeight: "800",
  },

  amountTextActive: {
    color: "white",
  },

  confirmBtn: {
    margin: 20,
    borderRadius: 22,
  },

  confirmRow: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  confirmText: {
    color: "white",
    fontWeight: "900",
    letterSpacing: 2,
  },

  forecastCard: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#ffffff08",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ffffff15",
  },

  forecastLabel: {
    fontSize: 10,
    color: "#9ca3af",
    letterSpacing: 2,
    fontWeight: "800",
  },

  forecastValue: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 2,
  },

  goldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },

  goldInfo: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "700",
  },

  featureCard: {
    margin: 20,
    backgroundColor: "#ffffff08",
    borderRadius: 26,
    padding: 20,
    gap: 18,
  },

  featureRow: {
    flexDirection: "row",
    gap: 14,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#ffffff10",
    justifyContent: "center",
    alignItems: "center",
  },

  featureTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  featureDesc: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 4,
  },
});
