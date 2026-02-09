import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { WITHDRAW_RULES } from "../constants/withdraw";

type Props = {
  amount: number;
  onChange: (amount: number) => void;
};

export default function AmountInput({ amount, onChange }: Props) {
  const handleChange = (value: string) => {
    // Sirf numbers allow
    const numericValue = value.replace(/[^0-9]/g, "");
    const num = Number(numericValue);

    if (num > WITHDRAW_RULES.MAX_AMOUNT) return;

    onChange(num);
  };

  return (
    <View style={styles.container}>
      {/* Label styled as per reference screen */}
      <Text style={styles.label}>ENTER AMOUNT (₹)</Text>

      <View style={styles.inputBox}>
        <Text style={styles.currency}>₹</Text>

        <TextInput
          value={amount ? String(amount) : ""}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#6b7280"
          style={styles.input}
        />
      </View>

      {/* Hint text styled with the muted blue color from reference */}
      {/* <View style={styles.hintContainer}>
        <Text style={styles.hint}>
          Min <Text style={styles.hintValue}>₹{WITHDRAW_RULES.MIN_AMOUNT}</Text>
        </Text>
        <Text style={styles.hintSeparator}> • </Text>
        <Text style={styles.hint}>
          Max <Text style={styles.hintValue}>₹{WITHDRAW_RULES.MAX_AMOUNT.toLocaleString()}</Text>
        </Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
  },

  label: {
    color: "#8fbac4", // Reference text color
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16,78,100,0.35)", // Reference background
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#104e64", // Reference border color
  },

  currency: {
    fontSize: 24,
    fontWeight: "900",
    color: "#facc15", // Reference gold color
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },

  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingLeft: 4,
  },

  hint: {
    fontSize: 11,
    color: "#8fbac4", // Muted teal-blue
    fontWeight: "600",
  },

  hintValue: {
    color: "#facc15", // Gold highlights for numbers
    fontWeight: "800",
  },

  hintSeparator: {
    color: "#104e64",
    marginHorizontal: 5,
    fontWeight: "900",
  },
});