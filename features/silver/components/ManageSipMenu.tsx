
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";


const COLORS = {
  BG_DARK: "#062530",
  CARD: "#1C1C1E",
  CARD_DARK: "rgba(0,0,0,0.2)",
  PLATINUM: "#E5E4E2",
  ACCENT: "#00D2FF",
  DANGER: "#FF453A",
  TEXT_MUTED: "#8E8E93",
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onPausePress: () => void;
  onStopPress: () => void;
  isPaused?: boolean;
}

export default function ManageSipMenu({
  visible,
  onClose,
  onPausePress,
  onStopPress,
  isPaused,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.card}>
          {/* Indicator bar for bottom sheet look */}
          <View style={styles.indicator} />

          <Text style={styles.headerTitle}>Manage Investment</Text>

          <View style={styles.menuContainer}>
            {/* Pause / Resume Action */}
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.7}
              onPress={() => {
                onClose();
                onPausePress();
              }}
            >
              <View style={[styles.iconDot, { backgroundColor: isPaused ? COLORS.ACCENT : "#FF9500" }]} />
              <Text style={styles.text}>
                {isPaused ? "Resume SIP" : "Pause SIP"}
              </Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Stop Action */}
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.7}
              onPress={() => {
                onClose();
                onStopPress();
              }}
            >
              <View style={[styles.iconDot, { backgroundColor: COLORS.DANGER }]} />
              <Text style={[styles.text, { color: COLORS.DANGER }]}>
                Stop SIP
              </Text>
              <Text style={[styles.arrow, { color: COLORS.DANGER }]}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Cancel Button */}
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Darker overlay for focus
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#132d35", // Deep Teal tone from your theme
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: 0.5,
  },
  menuContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  iconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 15,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  arrow: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 18,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 20,
  },
  cancelBtn: {
    marginTop: 20,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  cancelText: {
    color: COLORS.TEXT_MUTED,
    fontWeight: "700",
    fontSize: 15,
  },
});