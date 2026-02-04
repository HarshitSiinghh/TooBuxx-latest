import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { CheckCircle2, AlertCircle } from "lucide-react-native";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: "success" | "error";
};

const CustomAlert = ({ visible, title, message, onClose, type = "error" }: Props) => {
  const isSuccess = type === "success";

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          {/* ---------- ICON HEADER ---------- */}
          <View style={[styles.iconContainer, isSuccess ? styles.successBg : styles.errorBg]}>
            {isSuccess ? (
              <CheckCircle2 size={32} color="#10b981" />
            ) : (
              <AlertCircle size={32} color="#f43f5e" />
            )}
          </View>

          {/* ---------- CONTENT ---------- */}
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          {/* ---------- BUTTON ---------- */}
          <TouchableOpacity
            style={[
              styles.button,
              isSuccess ? styles.successBtn : styles.errorBtn,
            ]}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(2, 6, 23, 0.95)", // Super deep blur effect
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 30,
//   },

//   box: {
//     width: "100%",
//     backgroundColor: "#0f172a",
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#1e293b",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 20 },
//     shadowOpacity: 0.5,
//     shadowRadius: 30,
//     elevation: 15,
//   },

//   iconContainer: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//   },

//   successBg: {
//     backgroundColor: "rgba(16, 185, 129, 0.1)",
//     borderWidth: 1,
//     borderColor: "rgba(16, 185, 129, 0.2)",
//   },

//   errorBg: {
//     backgroundColor: "rgba(244, 63, 94, 0.1)",
//     borderWidth: 1,
//     borderColor: "rgba(244, 63, 94, 0.2)",
//   },

//   content: {
//     alignItems: "center",
//     marginBottom: 24,
//   },

//   title: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "800",
//     marginBottom: 8,
//     textAlign: "center",
//   },

//   message: {
//     color: "#94a3b8",
//     fontSize: 14,
//     lineHeight: 20,
//     textAlign: "center",
//     paddingHorizontal: 10,
//   },

//   button: {
//     width: "100%",
//     borderRadius: 16,
//     height: 52,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },

//   successBtn: {
//     backgroundColor: "#10b981",
//   },

//   errorBtn: {
//     backgroundColor: "#7c3aed", // Theme-consistent purple for errors/standard
//   },

//   buttonText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 15,
//     letterSpacing: 0.5,
//   },
// });









const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(6, 37, 48, 0.95)", // 🔥 teal overlay
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  box: {
    width: "100%",
    backgroundColor: "#0b2f3a", // 🔥 card teal
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 30,
    elevation: 15,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  /* ===== SUCCESS ===== */
  successBg: {
    backgroundColor: "rgba(250, 204, 21, 0.15)", // 🟡 gold glow
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.35)",
  },

  /* ===== ERROR ===== */
  errorBg: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.35)",
  },

  content: {
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },

  message: {
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  button: {
    width: "100%",
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  /* 🟡 SUCCESS BUTTON */
  successBtn: {
    backgroundColor: "#facc15", // gold
  },

  /* 🔴 ERROR BUTTON */
  errorBtn: {
    backgroundColor: "#ef4444",
  },

  buttonText: {
    color: "#062530", // dark teal text on gold
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
