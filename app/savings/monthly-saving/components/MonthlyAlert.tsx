import React from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  single?: boolean;
};

export default function MonthlyAlert({
  visible,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  single = false,
}: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.row}>
            {!single && (
              <Pressable style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelText}>{cancelText}</Text>
              </Pressable>
            )}

            <Pressable style={{ flex: 1 }} onPress={onConfirm}>
              <LinearGradient
                colors={["#facc15", "#eab308"]
}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.okBtn}
              >
                <Text style={styles.okText}>{confirmText}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.7)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },

//   card: {
//     width: "100%",
//     borderRadius: 28,
//     padding: 22,
//     backgroundColor: "#12002b",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.06)",
//   },

//   title: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "900",
//     marginBottom: 6,
//   },

//   message: {
//     color: "#9ca3af",
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 22,
//   },

//   row: {
//     flexDirection: "row",
//     gap: 12,
//   },

//   cancelBtn: {
//     flex: 1,
//     height: 48,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.08)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   cancelText: {
//     color: "#9ca3af",
//     fontWeight: "800",
//   },

//   okBtn: {
//     height: 48,
//     borderRadius: 14,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   okText: {
//     color: "white",
//     fontWeight: "900",
//   },
// });






const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(6,37,48,0.9)", // #062530 overlay
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    borderRadius: 28,
    padding: 22,
    backgroundColor: "#0b3442",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
    fontStyle: "italic",
  },

  message: {
    color: "#8fbac4",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 22,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#104e64",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(16,78,100,0.35)",
  },

  cancelText: {
    color: "#ffffff",
    fontWeight: "800",
  },

  okBtn: {
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  okText: {
    color: "#062530",
    fontWeight: "900",
    fontStyle: "italic",
  },
});
