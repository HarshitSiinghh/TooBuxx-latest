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
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  badgePaused: {
    backgroundColor: 'rgba(107, 114, 128, 0.15)',
    borderColor: 'rgba(107, 114, 128, 0.2)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  textGreen: { color: '#4ade80' },
  textGray: { color: '#9ca3af' },
  engineIdText: {
    color: '#6b7280',
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },
  mainCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
  },
  cardActive: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardPaused: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.7,
  },
  cardContent: {
    gap: 32,
  },
  infoSection: {
    flex: 1,
  },
  label: {
    color: '#818cf8',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 3,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  amountText: {
    fontSize: 48,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -1,
    marginBottom: 28,
  },
  amountActive: { color: 'white' },
  amountPaused: { color: '#6b7280' },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  pauseButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  pauseButtonText: {
    color: '#1a003d',
    fontWeight: '900',
    fontSize: 13,
  },
  resumeButton: {
    backgroundColor: '#4f46e5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  resumeButtonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 13,
  },
  stopButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
  },
  stopButtonText: {
    color: '#ef4444',
    fontWeight: '900',
    fontSize: 13,
  },
  streakSection: {
    alignItems: 'flex-start',
  },
  streakLabel: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: '900',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakValue: {
    fontSize: 45,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  streakActive: { color: '#f97316' },
  streakPaused: { color: '#4b5563' },
});

 export default MonthlyActiveView