








import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Pause, Play, Flame, Plus } from "lucide-react-native";

interface ActiveProps {
  sipStatus: "ACTIVE" | "PAUSED" | "STOPPED";
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  // onInvestMore: () => any; // ✅ NEW
  activeSipAmount: number;
  dayStreak: number; // ✅ REAL STREAK FROM BACKEND
}

const SipActiveView = ({
  sipStatus,
  onPause,
  onResume,
  onStop,
  // onInvestMore,
  activeSipAmount,
  dayStreak,
}: ActiveProps) => {
  const isPaused = sipStatus === "PAUSED";
  const isStopped = sipStatus === "STOPPED";

  return (
    <View style={styles.container}>
      {/* Status Badges */}
      <View style={styles.headerRow}>
        <View
          style={[
            styles.statusBadge,
            isPaused ? styles.statusBadgePaused : styles.statusBadgeLive,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isPaused ? styles.textGray : styles.textGreen,
            ]}
          >
            {isPaused ? "ENGINE PAUSED" : "SYSTEM LIVE"}
          </Text>
        </View>

        <Text style={styles.engineId}>ENGINE ID: DS-V1</Text>
      </View>

      {/* Main Card */}
      <View
        style={[styles.card, isPaused ? styles.cardPaused : styles.cardActive]}
      >
        <View style={styles.cardContent}>
          {/* LEFT */}
          <View style={styles.mainInfo}>
            <Text style={styles.label}>DAILY DISCIPLINE</Text>

            <Text
              style={[
                styles.amountText,
                isPaused ? styles.amountPaused : styles.amountActive,
              ]}
            >
              ₹ {activeSipAmount.toLocaleString()}
            </Text>

            {/* PRIMARY ACTIONS */}
            <View style={styles.buttonGroup}>
              {sipStatus === "ACTIVE" ? (
                <TouchableOpacity
                  onPress={onPause}
                  style={styles.pauseButton}
                >
                  <Pause size={16} color="#030031" />
                  <Text style={styles.pauseButtonText}>PAUSE</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={onResume}
                  disabled={isStopped}
                  style={[
                    styles.resumeButton,
                    isStopped && styles.disabledOpacity,
                  ]}
                >
                  <Play size={16} color="white" />
                  <Text style={styles.resumeButtonText}>
                    {isStopped ? "STOPPING..." : "RESUME"}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={onStop}
                disabled={isStopped}
                style={[styles.stopButton, isStopped && styles.disabledStop]}
              >
                <Text style={styles.stopButtonText}>STOP</Text>
              </TouchableOpacity>
            </View>

            {/* ✅ INVEST MORE (no pause / no stop) */}
            {/* <TouchableOpacity
              onPress={onInvestMore}
              style={styles.investMoreBtn}
            >
              <Plus size={16} color="#a78bfa" />
              <Text style={styles.investMoreText}>INVEST MORE</Text>
            </TouchableOpacity> */}
          </View>

          {/* RIGHT - STREAK */}
          <View style={styles.streakSection}>
            <Text style={styles.streakLabel}>CURRENT STREAK</Text>

            <View style={styles.streakRow}>
              <Text
                style={[
                  styles.streakValue,
                  isPaused ? styles.textGray600 : styles.textOrange,
                ]}
              >
                {dayStreak}
              </Text>

              <Flame
                size={48}
                color={isPaused ? "#4b5563" : "#f97316"}
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
    paddingVertical: 24,
    gap: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  investMoreBtn: {
marginTop: 14,
borderWidth: 1,
borderColor: "#a78bfa",
borderRadius: 12,
paddingVertical: 12,
flexDirection: "row",
justifyContent: "center",
alignItems: "center",
gap: 6,
},


investMoreText: {
color: "#a78bfa",
fontWeight: "800",
letterSpacing: 1,
},
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
  },
  statusBadgeLive: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  statusBadgePaused: {
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
    borderColor: 'rgba(107, 114, 128, 0.2)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
  },
  textGreen: { color: '#4ade80' },
  textGray: { color: '#9ca3af' },
  engineId: {
    color: '#6b7280',
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 40,
    padding: 32,
    borderWidth: 1,
  },
  cardActive: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardPaused: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.7, // Visual representation of grayscale
  },
  cardContent: {
    flexDirection: 'column',
    gap: 32,
  },
  mainInfo: {
    flex: 1,
  },
  label: {
    color: '#818cf8',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 3,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  amountText: {
    fontSize: 56,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -2,
    marginBottom: 24,
  },
  amountActive: { color: '#ffffff' },
  amountPaused: { color: '#6b7280' },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  pauseButton: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pauseButtonText: {
    color: '#030031',
    fontWeight: '900',
    fontSize: 12,
  },
  resumeButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resumeButtonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 12,
  },
  stopButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: 'center',
  },
  stopButtonText: {
    color: '#ef4444',
    fontWeight: '900',
    fontSize: 12,
  },
  streakSection: {
    alignItems: 'flex-start',
  },
  streakLabel: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: '900',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakValue: {
    fontSize: 64,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  textOrange: { color: '#f97316' },
  textGray600: { color: '#4b5563' },
  disabledOpacity: { opacity: 0.5 },
  disabledStop: { opacity: 0.3 },
});
 export default SipActiveView