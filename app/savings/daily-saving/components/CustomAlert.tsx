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
    backgroundColor: "rgba(6,37,48,0.9)", // #062530 overlay
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    backgroundColor: "#0b3442", // glass card feel (same family)
    width: "80%",
    borderRadius: 22,
    padding: 20,
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

  msg: {
    color: "#8fbac4", // secondary text (reference se match)
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 18,
  },

  btn: {
    backgroundColor: "#facc15", // gold CTA (theme consistent)
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#062530", // dark text on gold
    fontWeight: "900",
    fontStyle: "italic",
  },
});
