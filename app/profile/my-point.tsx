import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrendingUp, History, ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import { useAuthGuard } from "@/hooks/useAuthGaurd";
// import { getMyPointsApi, RewardNotification } from "@/services/points";
import { getMyPointsApi, RewardNotification } from "@/services/rewards";
;
  

export default function MyPoints() {
  const canRender = useAuthGuard();
  const router = useRouter();

  const [totalPoints, setTotalPoints] = useState(0);
  const [activities, setActivities] = useState<RewardNotification[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ================= */

  useEffect(() => {
    if (canRender) loadPoints();
  }, [canRender]);

  const loadPoints = async () => {
    try {
      setLoading(true);
      const res = await getMyPointsApi();

      if (res?.success) {
        setTotalPoints(res.data.total_points);
        setActivities(res.data.latest_notifications || []);
      }
    } catch (e) {
      console.log("❌ MY POINTS API ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!canRender) return null;

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <ArrowLeft size={20} color="#9ca3af" />
        </TouchableOpacity>

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>My Points</Text>
          <Text style={styles.subtitle}>Reward Wallet</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>

        {/* MAIN CARD */}
        <View style={styles.pointsCard}>
          <Text style={styles.cardLabel}>CURRENT BALANCE</Text>

          <Text style={styles.pointsText}>
            {loading ? "---" : totalPoints.toLocaleString()}
          </Text>

          <View style={styles.pointsBadge}>
            <TrendingUp size={14} color="#4ade80" />
            <Text style={styles.pointsBadgeText}>TOTAL REWARD POINTS</Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => router.push("/profile/reward")}
            style={styles.earnBtn}
          >
            <Text style={styles.actionText}>EARN POINTS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/profile/point-converter")}
            // onPress={() => router.push("/../components/profile/my-points/converter")}
            style={styles.useBtn}
          >
            <Text style={styles.actionText}>USE POINTS</Text>
          </TouchableOpacity>
        </View>

        {/* ACTIVITY */}
        <View style={styles.sectionHeader}>
          <History size={18} color="#c084fc" />
          <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
        </View>

        {loading ? (
          <View style={{ marginTop: 40 }}>
            <ActivityIndicator size="large" color="#a855f7" />
          </View>
        ) : activities.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>NO RECENT ACTIVITY</Text>
          </View>
        ) : (
          activities.map((item) => (
            <HistoryItem
              key={item.id}
              title={item.title}
              message={item.message}
              date={formatDate(item.created_at)}
              points={item.points}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= ITEM ================= */

function HistoryItem({
  title,
  message,
  date,
  points,
}: {
  title: string;
  message: string;
  date: string;
  points: number;
}) {
  return (
    <View style={styles.historyItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.historyTitle}>{title}</Text>
        <Text style={styles.historyMsg}>{message}</Text>
        <Text style={styles.historyDate}>{date}</Text>
      </View>

      <Text style={styles.historyPoints}>+{points}</Text>
    </View>
  );
}

/* ================= HELPERS ================= */

const formatDate = (dateString: string) => {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a003d" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  backBtn: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
  },

  title: { color: "white", fontSize: 20, fontWeight: "900" },
  subtitle: { color: "#facc15", fontSize: 10, fontWeight: "800" },

  body: { padding: 18, paddingBottom: 40 },

  pointsCard: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 30,
    alignItems: "center",
    marginBottom: 24,
  },

  cardLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 6,
  },

  pointsText: {
    fontSize: 64,
    fontWeight: "900",
    color: "white",
  },

  pointsBadge: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(74,222,128,0.1)",
    borderWidth: 1,
    borderColor: "rgba(74,222,128,0.2)",
  },

  pointsBadgeText: {
    color: "#4ade80",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },

  earnBtn: {
    flex: 1,
    backgroundColor: "#7c3aed",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  useBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  actionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  sectionTitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
  },

  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    padding: 16,
    marginBottom: 10,
  },

  historyTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: 13,
  },

  historyMsg: {
    color: "#9ca3af",
    fontSize: 11,
    marginTop: 2,
  },

  historyDate: {
    color: "#6b7280",
    fontSize: 9,
    marginTop: 6,
    fontWeight: "700",
  },

  historyPoints: {
    color: "#4ade80",
    fontWeight: "900",
    fontSize: 18,
  },

  emptyBox: {
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
  },

  emptyText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },
});
