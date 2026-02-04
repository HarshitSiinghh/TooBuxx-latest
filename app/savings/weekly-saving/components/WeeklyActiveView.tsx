import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Pause, Play, Flame } from "lucide-react-native";

interface WeeklyActiveProps {
  sipStatus: "ACTIVE" | "PAUSED" | "STOPPED";
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  activeSipAmount: number;
  weekStreak: number;
}

 const WeeklyActiveView = ({
  sipStatus,
  onPause,
  onResume,
  onStop,
  activeSipAmount,
  weekStreak,
}: WeeklyActiveProps) => {
  const isPaused = sipStatus === "PAUSED";
  const isStopped = sipStatus === "STOPPED";

  return (
    <View style={styles.container}>
      {/* Header Badges */}
      <View style={styles.badgeRow}>
        <View style={[
          styles.statusBadge, 
          isPaused ? styles.badgePaused : styles.badgeActive
        ]}>
          <Text style={[
            styles.badgeText, 
            isPaused ? styles.badgeTextPaused : styles.badgeTextActive
          ]}>
            {isPaused ? "ENGINE PAUSED" : "SYSTEM LIVE"}
          </Text>
        </View>
        <Text style={styles.engineId}>ENGINE ID: WS-V1</Text>
      </View>

      {/* Main Card */}
      <View style={[
        styles.card, 
        isPaused && styles.cardPaused
      ]}>
        <View style={styles.cardContent}>
          <View style={styles.infoSection}>
            <Text style={styles.label}>WEEKLY CONTRIBUTION</Text>
            <Text style={[
              styles.amountText, 
              isPaused && styles.textMuted
            ]}>
              ₹ {activeSipAmount.toLocaleString()}
            </Text>

            {/* Buttons Row */}
            <View style={styles.buttonGroup}>
              {sipStatus === "ACTIVE" ? (
                <TouchableOpacity
                  onPress={onPause}
                  style={styles.btnPrimary}
                >
                  <Pause size={16} color="#1e1b4b" />
                  <Text style={styles.btnPrimaryText}>PAUSE</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={onResume}
                  disabled={isStopped}
                  style={[styles.btnResume, isStopped && styles.disabled]}
                >
                  <Play size={16} color="#FFFFFF" />
                  <Text style={styles.btnResumeText}>
                    {isStopped ? "STOPPING..." : "RESUME"}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={onStop}
                disabled={isStopped}
                style={[styles.btnStop, isStopped && styles.disabledStop]}
              >
                <Text style={styles.btnStopText}>STOP</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Streak Section */}
          <View style={styles.streakSection}>
            <Text style={styles.streakLabel}>WEEKLY STREAK</Text>
            <View style={styles.streakValueRow}>
              <Text style={[
                styles.streakNumber, 
                isPaused ? styles.textMuted : styles.streakActive
              ]}>
                {weekStreak}
              </Text>
              <Flame
                size={40}
                color={isPaused ? "#4b5563" : "#f97316"}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
 export default WeeklyActiveView

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 24,
//     gap: 24,
//   },
//   badgeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 99,
//     borderWidth: 1,
//   },
//   badgeActive: {
//     backgroundColor: 'rgba(34, 197, 94, 0.2)',
//     borderColor: 'rgba(34, 197, 94, 0.2)',
//   },
//   badgePaused: {
//     backgroundColor: 'rgba(107, 114, 128, 0.2)',
//     borderColor: 'rgba(107, 114, 128, 0.2)',
//   },
//   badgeText: {
//     fontSize: 10,
//     fontWeight: '900',
//   },
//   badgeTextActive: { color: '#4ade80' },
//   badgeTextPaused: { color: '#9ca3af' },
//   engineId: {
//     color: '#6b7280',
//     fontWeight: '700',
//     fontSize: 10,
//     fontStyle: 'italic',
//     letterSpacing: 1,
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 40,
//     padding: 32,
//     overflow: 'hidden',
//   },
//   cardPaused: {
//     opacity: 0.6,
//     borderColor: 'rgba(255, 255, 255, 0.05)',
//   },
//   cardContent: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     gap: 32,
//   },
//   infoSection: {
//     flex: 1,
//   },
//   label: {
//     color: '#818cf8',
//     fontSize: 12,
//     fontWeight: '900',
//     fontStyle: 'italic',
//     letterSpacing: 2,
//     marginBottom: 8,
//   },
//   amountText: {
//     fontSize: 56,
//     fontWeight: '900',
//     fontStyle: 'italic',
//     color: '#FFFFFF',
//     marginBottom: 24,
//     letterSpacing: -2,
//   },
//   textMuted: {
//     color: '#6b7280',
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   btnPrimary: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 24,
//     height: 48,
//     borderRadius: 16,
//     gap: 8,
//   },
//   btnPrimaryText: {
//     color: '#1e1b4b',
//     fontWeight: '900',
//     fontSize: 12,
//   },
//   btnResume: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4f46e5',
//     paddingHorizontal: 24,
//     height: 48,
//     borderRadius: 16,
//     gap: 8,
//   },
//   btnResumeText: {
//     color: '#FFFFFF',
//     fontWeight: '900',
//     fontSize: 12,
//   },
//   btnStop: {
//     justifyContent: 'center',
//     backgroundColor: 'rgba(239, 68, 68, 0.1)',
//     borderWidth: 1,
//     borderColor: 'rgba(239, 68, 68, 0.2)',
//     paddingHorizontal: 24,
//     height: 48,
//     borderRadius: 16,
//   },
//   btnStopText: {
//     color: '#ef4444',
//     fontWeight: '900',
//     fontSize: 12,
//   },
//   disabled: { opacity: 0.5 },
//   disabledStop: { opacity: 0.3 },
//   streakSection: {
//     alignItems: 'flex-start',
//   },
//   streakLabel: {
//     color: '#6b7280',
//     fontSize: 10,
//     fontWeight: '900',
//     fontStyle: 'italic',
//     marginBottom: 4,
//   },
//   streakValueRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   streakNumber: {
//     fontSize: 64,
//     fontWeight: '900',
//     fontStyle: 'italic',
//     lineHeight: 64,
//   },
//   streakActive: {
//     color: '#f97316',
//   },
// });





const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    gap: 24,
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
  },

  badgeActive: {
    backgroundColor: "rgba(34,197,94,0.15)",
    borderColor: "rgba(34,197,94,0.25)",
  },

  badgePaused: {
    backgroundColor: "rgba(143,186,196,0.15)",
    borderColor: "rgba(143,186,196,0.25)",
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "900",
  },

  badgeTextActive: { color: "#4ade80" },
  badgeTextPaused: { color: "#8fbac4" },

  engineId: {
    color: "#8fbac4",
    fontWeight: "700",
    fontSize: 10,
    fontStyle: "italic",
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "#0b3442",
    borderWidth: 1,
    borderColor: "#104e64",
    borderRadius: 40,
    padding: 32,
    overflow: "hidden",
  },

  cardPaused: {
    opacity: 0.6,
    borderColor: "rgba(16,78,100,0.6)",
  },

  cardContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 32,
  },

  infoSection: {
    flex: 1,
  },

  label: {
    color: "#60a5fa",
    fontSize: 12,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 2,
    marginBottom: 8,
  },

  amountText: {
    fontSize: 56,
    fontWeight: "900",
    fontStyle: "italic",
    color: "#ffffff",
    marginBottom: 24,
    letterSpacing: -2,
  },

  textMuted: {
    color: "#8fbac4",
  },

  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },

  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 16,
    gap: 8,
  },

  btnPrimaryText: {
    color: "#062530",
    fontWeight: "900",
    fontSize: 12,
  },

  btnResume: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 16,
    gap: 8,
  },

  btnResumeText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 12,
  },

  btnStop: {
    justifyContent: "center",
    backgroundColor: "rgba(239,68,68,0.1)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.25)",
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 16,
  },

  btnStopText: {
    color: "#ef4444",
    fontWeight: "900",
    fontSize: 12,
  },

  disabled: { opacity: 0.5 },
  disabledStop: { opacity: 0.3 },

  streakSection: {
    alignItems: "flex-start",
  },

  streakLabel: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "900",
    fontStyle: "italic",
    marginBottom: 4,
  },

  streakValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  streakNumber: {
    fontSize: 64,
    fontWeight: "900",
    fontStyle: "italic",
    lineHeight: 64,
  },

  streakActive: {
    color: "#f97316",
  },
});
