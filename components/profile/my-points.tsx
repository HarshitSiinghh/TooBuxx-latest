import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ArrowLeft  } from "lucide-react-native";
import { Navigation } from "@/store/store";
import { useRouter } from "expo-router";

const MyPoints = () => { 
  const router = useRouter();
  const { setOpen } = Navigation();

  return (
    <ScrollView style={styles.container}>
      {/* ===== HEADER SECTION ===== */}
      <ImageBackground
        source={require("../../images/light.webp")}
        style={styles.headerBg}
        imageStyle={styles.headerImage}
      >
        <View style={styles.overlay} />

        {/* Header */}
        <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()}>
                  <ArrowLeft size={24} color="#9CA3AF" />
                </Pressable>

          <Text style={styles.headerTitle}>My Points</Text>
        </View>

        {/* Points */}
        <View style={styles.pointsBox}>
          <Text style={styles.points}>1,250</Text>
          <Text style={styles.subText}>Keep earning rewards!</Text>
        </View>
      </ImageBackground>

      {/* ===== BUTTONS ===== */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryText}>Earn Points</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Use Points</Text>
        </TouchableOpacity>
      </View>

      {/* ===== HISTORY ===== */}
      <Text style={styles.historyTitle}>History</Text>

      <View style={styles.historyBox}>
        <HistoryItem title="Saved 24K Gold" date="Oct 10, 2023" points={500} />
        <HistoryItem title="Referred a Friend" date="Oct 9, 2023" points={300} />
        <HistoryItem title="Daily Login" date="Oct 7, 2023" points={50} />
        <HistoryItem
          title="Completed Profile"
          date="Oct 6, 2023"
          points={100}
        />
      </View>
    </ScrollView>
  );
};

export default MyPoints;
const HistoryItem = ({
  title,
  date,
  points,
}: {
  title: string;
  date: string;
  points: number;
}) => {
  return (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyText}>{title}</Text>
        <Text style={styles.historyDate}>{date}</Text>
      </View>

      <Text
        style={[
          styles.pointsText,
          { color: points > 0 ? "#4ade80" : "#f87171" },
        ]}
      >
        +{points}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a003d",
  },

  headerBg: {
    height: 280,
    justifyContent: "space-between",
  },

  headerImage: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },

  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  pointsBox: {
    alignItems: "center",
    paddingBottom: 30,
  },

  points: {
    fontSize: 52,
    fontWeight: "900",
    color: "#facc15",
  },

  subText: {
    color: "#e5e7eb",
    marginTop: 6,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 12,
    marginTop: 18,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#6d28d9",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryText: {
    color: "white",
    fontWeight: "700",
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  secondaryText: {
    color: "black",
    fontWeight: "700",
  },

  historyTitle: {
    textAlign: "center",
    marginTop: 26,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "800",
    color: "#facc15",
  },

  historyBox: {
    backgroundColor: "#1a003d",
    borderRadius: 16,
    marginHorizontal: 12,
    overflow: "hidden",
  },

  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },

  historyText: {
    color: "#e5e7eb",
    fontWeight: "600",
  },

  historyDate: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 2,
  },

  pointsText: {
    fontWeight: "700",
  },
});
