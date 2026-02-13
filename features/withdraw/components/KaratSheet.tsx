


import React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { GOLD_KARATS } from "../constants/withdraw";
import { Karat } from "../hooks/useWithdraw";

type Props = {
  visible: boolean;
  onSelect: (karat: Karat) => void;
};

const { height } = Dimensions.get("window");

export default function KaratSheet({ visible, onSelect }: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent
    >
      {/* Dark Blur Overlay (Matched with Alert Backdrop) */}
      <View style={styles.alertOverlay}>
        
        {/* The Sheet Container */}
        <View style={styles.sheet}>
          
          {/* Handle bar for bottom sheet look */}
          <View style={styles.handle} />

          <Text style={styles.title}>SELECT GOLD PURITY</Text>

          {GOLD_KARATS.map((item) => (
            <Pressable
              key={item.value}
              onPress={() => onSelect(item.value)}
              style={({ pressed }) => [
                styles.option,
                pressed && styles.optionPressed
              ]}
            >
              <View>
                <Text style={styles.label}>
                  ✨ {item.label}
                </Text>
               {/* <Text style={styles.purity}>
                  Purity: <Text style={{ color: "#22c55e" }}>{item.purity}</Text>
                </Text> */}
              </View>

              <View style={styles.arrowCircle}>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </Pressable>
          ))}

          {/* Spacer for bottom safe area */}
          <View style={{ height: 20 }} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  alertOverlay: {
    flex: 1,
    backgroundColor: "#123946", // Reference alert overlay color
    justifyContent: "flex-end", // Align to bottom
  },

  sheet: {
    backgroundColor: "#0b3442", // Reference secondary surface
    padding: 25,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#104e64",
    maxHeight: height * 0.5,
  },
image:{
  height:40,
  width:40,

},
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#104e64",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 14,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 20,
    letterSpacing: 1.5,
    textAlign: "center",
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "rgba(16,78,100,0.3)",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  optionPressed: {
    backgroundColor: "rgba(250,204,21,0.1)",
    borderColor: "#facc15",
  },

  label: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
  },

  purity: {
    fontSize: 12,
    color: "#8fbac4",
    fontWeight: "600",
    marginTop: 4,
  },

  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(250,204,21,0.12)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
  },

  arrowText: {
    fontSize: 20,
    color: "#facc15",
    fontWeight: "bold",
    marginTop: -2, // Optical alignment
  },
});