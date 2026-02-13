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
            <Text style={styles.actionText1}>USE POINTS</Text>
          </TouchableOpacity>
        </View>

        {/* ACTIVITY */}
        <View style={styles.sectionHeader}>
          <History size={18} color="#facc15" />
          <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
        </View>

        {loading ? (
          <View style={{ marginTop: 40 }}>
            <ActivityIndicator size="large" color="#facc15" />
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





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530",
  },

  /* ================= HEADER ================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
   paddingHorizontal:18,
  paddingBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(16,78,100,0.6)",
  },

  backBtn: {
    padding: 10,
    backgroundColor: "#104e64",
    borderRadius: 12,
  },

  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  subtitle: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "800",
  },

  body: {
    padding: 18,
    paddingBottom: 40,
  },

  /* ================= MAIN POINTS CARD ================= */

  pointsCard: {
    backgroundColor: "#0b2f3a",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#104e64",
    padding: 30,
    alignItems: "center",
    marginBottom: 24,
  },

  cardLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 6,
  },

  pointsText: {
    fontSize: 64,
    fontWeight: "900",
    color: "#ffffff",
  },

  pointsBadge: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(34,197,94,0.12)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.3)",
  },

  pointsBadgeText: {
    color: "#22c55e",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  /* ================= ACTION BUTTONS ================= */

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },

  earnBtn: {
    flex: 1,
    backgroundColor: "#facc15",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  useBtn: {
    flex: 1,
    backgroundColor: "#041e27",
    borderWidth: 1,
    borderColor: "#104e64",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  actionText: {
    color: "#062530",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },

   actionText1: {
    color: "white",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },
  /* ================= SECTION ================= */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  sectionTitle: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
  },

  /* ================= HISTORY ITEMS ================= */

  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#041e27",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#104e64",
    padding: 16,
    marginBottom: 10,
  },

  historyTitle: {
    color: "#ffffff",
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
    color: "#22c55e",
    fontWeight: "900",
    fontSize: 18,
  },

  /* ================= EMPTY STATE ================= */

  emptyBox: {
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#104e64",
    alignItems: "center",
  },

  emptyText: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },
});
