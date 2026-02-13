import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "success" | "error" | "warning" | "info";
}

export default function BaseAlert({
  visible,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = "info",
}: Props) {
  const getColor = () => {
    if (type === "success") return "#22c55e";
    if (type === "error") return "#ef4444";
    if (type === "warning") return "#f59e0b";
    return "#FFD700";
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.msg}>{message}</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.cancel} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirm, { backgroundColor: getColor() }]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#1C1C1E",
    borderRadius: 26,
    padding: 24,
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "800", marginBottom: 8 },
  msg: { color: "#8E8E93", marginBottom: 20 },
  row: { flexDirection: "row", gap: 12 },
  cancel: {
    flex: 1,
    backgroundColor: "#2C2C2E",
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: { color: "#fff", fontWeight: "700" },
  confirm: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: { fontWeight: "900", color: "#000" },
});
