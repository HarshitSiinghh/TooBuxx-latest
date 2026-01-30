import React, { useEffect, useState,useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter,useFocusEffect } from "expo-router";

// import { Sparkles } from "lucide-react-native"; // ❌ not used, can cause warnings

import { getMyPointsApi } from "@/services/rewards";

export default function EarnReward() {
  const router = useRouter();

  // ❌ useState<number>(0) breaks if file is .js
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD POINTS ================= */

  // useEffect(() => {
  //   loadPoints();
  // }, []);


  useFocusEffect(
  useCallback(() => {
    loadPoints();
  }, [])
);
  const loadPoints = async () => {
    try {
      const res = await getMyPointsApi();

      if (res?.success) {
        setPoints(Number(res?.data?.total_points || 0));
      }
    } catch (e) {
      console.log("❌ FETCH POINTS ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Glow */}
        <View style={styles.glow} />

        <View style={styles.inner}>
          {/* LEFT */}
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Earn Rewards</Text>
            <Text style={styles.subTitle}>Spin to Win Gold</Text>

            <View style={{ marginTop: 14 }}>
              <Text style={styles.bigText}>Your Reward Points</Text>

              {loading ? (
                <ActivityIndicator color="#facc15" style={{ marginTop: 6 }} />
              ) : (
                <Text style={styles.pointsText}>
                  {Number(points).toLocaleString()}
                </Text>
              )}

              <Text style={styles.tagLine}>Spin • Win • Celebrate</Text>
            </View>

            <View style={{ marginTop: 18 }}>
              <Text style={styles.note}>
                Unlock your financial freedom with every spin
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/spin-and-win/spin-wheel")}
                style={styles.btn}
              >
                <Text style={styles.btnText}>PLAY & WIN MORE</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* RIGHT IMAGE */}
          <Image
            // source={require("../assets/wheel.png")}
            source={require("../../../images/wheel.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}
/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    padding: 14,
  },

  card: {
    backgroundColor: "#2f2360",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    padding: 22,
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: "rgba(168,85,247,0.15)",
  },

  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "900",
  },

  subTitle: {
    marginTop: 2,
    color: "#c084fc",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
  },

  bigText: {
    marginTop: 12,
    color: "#e9d5ff",
    fontSize: 16,
    fontWeight: "900",
  },

  pointsText: {
    color: "#facc15",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 2,
  },

  tagLine: {
    marginTop: 4,
    color: "rgba(192,132,252,0.7)",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  note: {
    color: "rgba(250,204,21,0.85)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 16,
  },

  btnText: {
    color: "#1a003d",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  image: {
    width: 90,
    height: 90,
    opacity: 0.9,
  },
});
