


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
    // return (
    //   <View style={styles.loader}>
    //     <ActivityIndicator size="large" color="#fbbf24" />
    //     <Text style={styles.loaderText}>LOADING GOLDEN REWARDS...</Text>
    //   </View>
    // );


      return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#1a003d",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#a855f7" />
      <Text style={{ marginTop: 10, color: "#fff", fontWeight: "bold" }}>
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
                      fill={i % 2 === 0 ? "#1a003d" : "#240056"}
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
    backgroundColor: "#0f0028",
    alignItems: "center",
    paddingTop: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0028",
  },
  loaderText: {
    color: "#fbbf24",
    marginTop: 12,
    fontWeight: "700",
  },

  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 18,
  },

  wheelOuterGlow: {
    shadowColor: "#fbbf24",
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
  },
  header: {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 16,
  marginBottom: 18,
},

/* ===== DAILY SAVINGS PROMO BOX ===== */

dailyBox: {
  marginTop: 26,
  width: "86%",
  backgroundColor: "#1a003d",
  borderRadius: 20,
  padding: 18,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "rgba(124,58,237,0.6)",
},

dailyTitle: {
  color: "white",
  fontSize: 16,
  fontWeight: "900",
  marginBottom: 6,
},

dailyDesc: {
  color: "#c4b5fd",
  fontSize: 12,
  textAlign: "center",
  marginBottom: 14,
},

dailyBtn: {
  backgroundColor: "#7c3aed",
  paddingHorizontal: 22,
  paddingVertical: 12,
  borderRadius: 14,
},

dailyBtnText: {
  color: "white",
  fontWeight: "900",
  fontSize: 11,
  letterSpacing: 1.5,
},
backBtn: {
  position: "absolute",
  left: 16,
  width: 42,
  height: 42,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "rgba(251,191,36,0.3)",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(251,191,36,0.08)",
},

// title: {
//   color: "white",
//   fontSize: 26,
//   fontWeight: "900",
//   letterSpacing: 1,
// },

  outerRing: {
    width: WHEEL_SIZE + 26,
    height: WHEEL_SIZE + 26,
    borderRadius: 999,
    borderWidth: 6,
    borderColor: "#fbbf24",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#12002e",
  },

  pointer: {
    position: "absolute",
    top: -14,
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 26,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#fbbf24",
    zIndex: 50,
  },

  spinBtn: {
    marginTop: 30,
    backgroundColor: "#facc15",
    paddingHorizontal: 54,
    paddingVertical: 16,
    borderRadius: 40,
  },
  spinText: {
    fontWeight: "900",
    letterSpacing: 2,
    color: "#1a003d",
  },

  note: {
    color: "#9ca3af",
    fontSize: 11,
    marginTop: 10,
    letterSpacing: 1,
  },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#1a003d",
    padding: 28,
    borderRadius: 22,
    alignItems: "center",
    width: "80%",
  },
  close: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  modalSmall: {
    marginTop: 10,
    color: "#fbbf24",
    fontWeight: "800",
    letterSpacing: 2,
  },
  modalTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    marginVertical: 10,
    textAlign: "center",
  },
  modalDesc: {
    color: "#9ca3af",
    textAlign: "center",
    marginVertical: 10,
  },
  modalBtn: {
    marginTop: 14,
    backgroundColor: "#facc15",
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 14,
  },
  modalBtnText: {
    fontWeight: "900",
    color: "#1a003d",
    letterSpacing: 1,
  },
});