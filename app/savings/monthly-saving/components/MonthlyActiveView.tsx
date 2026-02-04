import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Pause, Play, Flame } from "lucide-react-native";

interface ActiveProps {
  sipStatus: "RUNNING" | "PAUSED";
  setSipStatus: (val: "IDLE" | "RUNNING" | "PAUSED") => void;
  activeSipAmount: number;
  monthStreak: number;
}

 const MonthlyActiveView = ({
  sipStatus,
  setSipStatus,
  activeSipAmount,
  monthStreak,
}: ActiveProps) => {
  const isPaused = sipStatus === "PAUSED";

  return (
    <View style={styles.container}>
      {/* Status Header */}
      <View style={styles.statusHeader}>
        <View
          style={[
            styles.statusBadge,
            isPaused ? styles.badgePaused : styles.badgeLive,
          ]}
        >
          <Text style={[styles.statusText, isPaused ? styles.textGray : styles.textGreen]}>
            {isPaused ? "ENGINE PAUSED" : "SYSTEM LIVE"}
          </Text>
        </View>
        <Text style={styles.engineIdText}>ENGINE ID: MS-V1</Text>
      </View>

      {/* Main Glass Card */}
      <View
        style={[
          styles.mainCard,
          isPaused ? styles.cardPaused : styles.cardActive,
        ]}
      >
        <View style={styles.cardContent}>
          <View style={styles.infoSection}>
            <Text style={styles.label}>MONTHLY DISCIPLINE</Text>
            <Text
              style={[
                styles.amountText,
                isPaused ? styles.amountPaused : styles.amountActive,
              ]}
            >
              ₹ {activeSipAmount.toLocaleString()}
            </Text>

            {/* Action Button Group */}
            <View style={styles.buttonGroup}>
              {sipStatus === "RUNNING" ? (
                <TouchableOpacity
                  onPress={() => setSipStatus("PAUSED")}
                  style={styles.pauseButton}
                  activeOpacity={0.8}
                >
                  <Pause size={16} color="#1a003d" fill="#1a003d" />
                  <Text style={styles.pauseButtonText}>PAUSE</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setSipStatus("RUNNING")}
                  style={styles.resumeButton}
                  activeOpacity={0.8}
                >
                  <Play size={16} color="white" fill="white" />
                  <Text style={styles.resumeButtonText}>RESUME</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => setSipStatus("IDLE")}
                style={styles.stopButton}
                activeOpacity={0.7}
              >
                <Text style={styles.stopButtonText}>STOP</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Streak Section */}
          <View style={styles.streakSection}>
            <Text style={styles.streakLabel}>MONTHLY STREAK</Text>
            <View style={styles.streakRow}>
              <Text
                style={[
                  styles.streakValue,
                  isPaused ? styles.streakPaused : styles.streakActive,
                ]}
              >
                {monthStreak}
              </Text>
              <Flame
                size={40}
                color={isPaused ? "#4b5563" : "#f97316"}
                fill={isPaused ? "transparent" : "#f97316"}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
  },

  badgeLive: {
    backgroundColor: "rgba(34,197,94,0.15)",
    borderColor: "rgba(34,197,94,0.35)",
  },

  badgePaused: {
    backgroundColor: "rgba(143,186,196,0.15)",
    borderColor: "rgba(143,186,196,0.35)",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  textGreen: { color: "#4ade80" },
  textGray: { color: "#8fbac4" },

  engineIdText: {
    color: "#8fbac4",
    fontWeight: "800",
    fontSize: 10,
    letterSpacing: 1.5,
    fontStyle: "italic",
  },

  mainCard: {
    backgroundColor: "#0b3442",
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
  },

  cardActive: {
    borderColor: "#104e64",
  },

  cardPaused: {
    borderColor: "rgba(16,78,100,0.5)",
    opacity: 0.75,
  },

  cardContent: {
    gap: 32,
  },

  infoSection: {
    flex: 1,
  },

  label: {
    color: "#facc15",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 3,
    fontStyle: "italic",
    marginBottom: 12,
  },

  amountText: {
    fontSize: 48,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -1,
    marginBottom: 28,
  },

  amountActive: { color: "#ffffff" },
  amountPaused: { color: "#8fbac4" },

  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },

  pauseButton: {
    backgroundColor: "#facc15",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },

  pauseButtonText: {
    color: "#062530",
    fontWeight: "900",
    fontSize: 13,
  },

  resumeButton: {
    backgroundColor: "#22c55e",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },

  resumeButtonText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 13,
  },

  stopButton: {
    backgroundColor: "rgba(239,68,68,0.12)",
    borderColor: "rgba(239,68,68,0.35)",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: "center",
  },

  stopButtonText: {
    color: "#ef4444",
    fontWeight: "900",
    fontSize: 13,
  },

  streakSection: {
    alignItems: "flex-start",
  },

  streakLabel: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "900",
    fontStyle: "italic",
    marginBottom: 6,
  },

  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  streakValue: {
    fontSize: 45,
    fontWeight: "900",
    fontStyle: "italic",
  },

  streakActive: { color: "#facc15" },
  streakPaused: { color: "#8fbac4" },
});
export default MonthlyActiveView