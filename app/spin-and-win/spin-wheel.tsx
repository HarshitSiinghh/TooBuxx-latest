


import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Trophy, X, Lock } from "lucide-react-native";
import Svg, { G, Path, Image as SvgImage, Circle } from "react-native-svg";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { fetchSpinRewardsApi, claimSpinRewardApi, Reward } from "@/services/spin";
import { useAuthGuard } from "@/hooks/useAuthGaurd";
import { BASE_URL } from "@/constants/api";

const { width } = Dimensions.get("window");
const WHEEL_SIZE = width * 0.78;

export default function SpinWheel() {
  const canRender = useAuthGuard();

  const [prizes, setPrizes] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Reward | null>(null);
  const [limitPopup, setLimitPopup] = useState(false);

  const spinAnim = useRef(new Animated.Value(0)).current;
  const currentRotation = useRef(0);

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      const data = await fetchSpinRewardsApi();
      setPrizes(data);
    } catch (e) {
      console.log("❌ SPIN LOAD ERROR:", e);
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();

  // ✅ SAME LOGIC AS WEB
  const spin = async () => {
    if (spinning || prizes.length === 0) return;

    try {
      const res = await claimSpinRewardApi();
      const winningReward = res.data.reward;

      const prizeIndex = prizes.findIndex(p => p.id === winningReward.id);
      if (prizeIndex === -1) throw new Error("Reward mismatch");

      setSpinning(true);
      setWinner(null);

      const degreePerPrize = 360 / prizes.length;
      const totalSpins = 10;

      const sectorCenter = prizeIndex * degreePerPrize + degreePerPrize / 2;
      const finalRotation =
        currentRotation.current +
        totalSpins * 360 +
        (270 - sectorCenter);

      Animated.timing(spinAnim, {
        toValue: finalRotation,
        duration: 5200,
        easing: Easing.bezier(0.15, 0, 0.15, 1),
        useNativeDriver: true,
      }).start(() => {
        currentRotation.current = finalRotation;
        setSpinning(false);
        setWinner(winningReward);
      });

    } catch (e) {
      setLimitPopup(true);
      setSpinning(false);
    }
  };

  if (!canRender) return null;

  if (loading) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#062530",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#a855f7" />
      <Text style={{ marginTop: 10, color: "#ffffff", fontWeight: "bold" }}>
        Loading...
      </Text>
    </SafeAreaView>
  );
}


  const rotate = spinAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
  <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
    <ArrowLeft size={22} color="#fbbf24" />
  </TouchableOpacity>

  <Text style={styles.title}>GOLDEN SPIN</Text>
</View>

      {/* 🌟 WHEEL */}
      <View style={styles.wheelOuterGlow}>
        <View style={styles.outerRing}>

          {/* 🔺 POINTER */}
          <View style={styles.pointer} />

          <Animated.View style={{ transform: [{ rotate }] }}>
            <Svg width={WHEEL_SIZE} height={WHEEL_SIZE} viewBox="0 0 200 200">

              {prizes.map((prize, i) => {
                const degree = 360 / prizes.length;
                const startAngle = degree * i;
                const endAngle = startAngle + degree;
                const radius = 100;

                const x1 = 100 + radius * Math.cos(Math.PI * startAngle / 180);
                const y1 = 100 + radius * Math.sin(Math.PI * startAngle / 180);
                const x2 = 100 + radius * Math.cos(Math.PI * endAngle / 180);
                const y2 = 100 + radius * Math.sin(Math.PI * endAngle / 180);

                const mid = (startAngle + endAngle) / 2;
                const imgR = 62;
                const imgX = 100 + imgR * Math.cos(Math.PI * mid / 180);
                const imgY = 100 + imgR * Math.sin(Math.PI * mid / 180);

                const fixedImage = prize.image.startsWith("http")
                  ? prize.image
                  : `${BASE_URL.replace("/api/v1","")}${prize.image}`;

                return (
                  <G key={prize.id}>
                    <Path
                      d={`M100 100 L${x1} ${y1} A100 100 0 0 1 ${x2} ${y2} Z`}
                    fill={i % 2 === 0 ? "#0b3442" : "#062530"}

                    />

                    {/* ✅ BACKEND ICON */}
                    <SvgImage
                      href={fixedImage}   // IMPORTANT: string, not {uri:}
                      x={imgX - 16}
                      y={imgY - 16}
                      width={32}
                      height={32}
                    />
                  </G>
                );
              })}

              {/* CENTER */}
              <Circle cx="100" cy="100" r="14" fill="#fbbf24" />
              <Circle cx="100" cy="100" r="7" fill="#0f0028" />
            </Svg>
          </Animated.View>
        </View>
      </View>

      {/* 🔘 BUTTON */}
      <TouchableOpacity
        disabled={spinning}
        onPress={spin}
        style={[styles.spinBtn, spinning && { opacity: 0.5 }]}
      >
        <Text style={styles.spinText}>
          {spinning ? "SPINNING..." : "SPIN TO WIN"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.note}>1 SPIN EVERY 24 HOURS</Text>





      {/* 💜 DAILY SAVINGS BOX */}
<View style={styles.dailyBox}>
  <Text style={styles.dailyTitle}>💰 Start Daily Savings</Text>
  <Text style={styles.dailyDesc}>
    Roz thoda-thoda invest karke apna gold badhao.
  </Text>

  <TouchableOpacity
    onPress={() => router.push("/savings/daily-saving")} // 🔴 apna actual route yahan daalna
    style={styles.dailyBtn}
  >
    <Text style={styles.dailyBtnText}>GO TO DAILY SAVINGS</Text>
  </TouchableOpacity>
</View>

      {/* 🏆 WIN MODAL */}
      <Modal visible={!!winner} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={() => setWinner(null)} style={styles.close}>
              <X size={20} color="#9ca3af" />
            </TouchableOpacity>

            <Trophy size={52} color="#fbbf24" />
            <Text style={styles.modalSmall}>YOU WON</Text>
            <Text style={styles.modalTitle}>{winner?.label}</Text>

            <TouchableOpacity onPress={() => setWinner(null)} style={styles.modalBtn}>
              <Text style={styles.modalBtnText}>COLLECT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ⛔ LIMIT MODAL */}
      <Modal visible={limitPopup} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={() => setLimitPopup(false)} style={styles.close}>
              <X size={20} color="#9ca3af" />
            </TouchableOpacity>

            <Lock size={48} color="#ef4444" />
            <Text style={[styles.modalSmall, { color: "#ef4444" }]}>LIMIT REACHED</Text>
            <Text style={styles.modalDesc}>
              Come back tomorrow for another spin.
            </Text>

            <TouchableOpacity
              onPress={() => setLimitPopup(false)}
              style={[styles.modalBtn, { backgroundColor: "#2d3748" }]}
            >
              <Text style={[styles.modalBtnText, { color: "white" }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530",
    alignItems: "center",
    paddingTop: 16,
  },

  /* HEADER */
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 18,
  },

  backBtn: {
    position: "absolute",
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(250,204,21,0.12)",
  },

  title: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1,
  },

  /* LOADER */
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#062530",
  },

  loaderText: {
    color: "#facc15",
    marginTop: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },

  /* WHEEL */
  wheelOuterGlow: {
    shadowColor: "#facc15",
    shadowOpacity: 0.55,
    shadowRadius: 36,
    elevation: 22,
    marginBottom: 6,
  },

  outerRing: {
    width: WHEEL_SIZE + 28,
    height: WHEEL_SIZE + 28,
    borderRadius: 999,
    borderWidth: 6,
    borderColor: "#facc15",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#041d26",
  },

  pointer: {
    position: "absolute",
    top: -16,
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 28,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#facc15",
    zIndex: 50,
  },

  /* SPIN BUTTON */
  spinBtn: {
    marginTop: 28,
    backgroundColor: "#facc15",
    paddingHorizontal: 56,
    paddingVertical: 16,
    borderRadius: 40,
    shadowColor: "#facc15",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  spinText: {
    fontWeight: "900",
    letterSpacing: 2,
    color: "#062530",
    fontSize: 13,
  },

  note: {
    color: "#8fbac4",
    fontSize: 11,
    marginTop: 10,
    letterSpacing: 1.2,
  },

  /* DAILY SAVINGS PROMO */
  dailyBox: {
    marginTop: 28,
    width: "86%",
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 22,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  dailyTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },

  dailyDesc: {
    color: "#8fbac4",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 14,
  },

  dailyBtn: {
    backgroundColor: "#facc15",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: "#facc15",
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 6,
  },

  dailyBtnText: {
    color: "#062530",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 1.6,
  },

  /* MODALS */
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(6,37,48,0.92)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#0b3442",
    padding: 28,
    borderRadius: 26,
    alignItems: "center",
    width: "82%",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  close: {
    position: "absolute",
    right: 14,
    top: 14,
    padding: 6,
  },

  modalSmall: {
    marginTop: 12,
    color: "#facc15",
    fontWeight: "900",
    letterSpacing: 2,
    fontSize: 11,
  },

  modalTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    marginVertical: 12,
    textAlign: "center",
  },

  modalDesc: {
    color: "#8fbac4",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 13,
  },

  modalBtn: {
    marginTop: 16,
    backgroundColor: "#facc15",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 16,
  },

  modalBtnText: {
    fontWeight: "900",
    color: "#062530",
    letterSpacing: 1.2,
    fontSize: 12,
  },
});
