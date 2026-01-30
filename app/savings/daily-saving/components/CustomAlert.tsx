import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

export default function CustomAlertModal({
  isOpen,
  title,
  message,
  onConfirm,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}) {
  return (
    <Modal transparent visible={isOpen} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.msg}>{message}</Text>

          <Pressable style={styles.btn} onPress={onConfirm}>
            <Text style={styles.btnText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#130025",
    width: "80%",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  title: { color: "white", fontSize: 18, fontWeight: "900", marginBottom: 6 },
  msg: { color: "#9ca3af", fontSize: 13, lineHeight: 18, marginBottom: 18 },
  btn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "900" },
});