


import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { PAYOUT_METHODS } from "../constants/withdraw";
import { PayoutMethod } from "../hooks/useWithdraw";

type Props = {
  value: PayoutMethod | null;
  onChange: (method: PayoutMethod) => void;
  payout?: any; // 🔥 add this
};


export default function PaymentMethod({ value, onChange, payout }: Props)
{
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WHERE SHOULD WE SEND MONEY?</Text>

      {PAYOUT_METHODS.map((item) => {
        const isActive = value === item.key;

        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[
              styles.card,
              isActive && styles.activeCard,
            ]}
          >
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>
                  {item.key === "bank" ? "🏦" : "💸"}
                </Text>
              </View>
              
              <View style={styles.textGroup}>
                <Text
                  style={[
                    styles.label,
                    isActive && styles.activeLabel,
                  ]}
                >
                  {item.label}
                </Text>

                {/* <Text style={styles.subLabel}>
                  {item.subLabel}
                </Text>
                 */}
                 <Text style={styles.subLabel}>
  {item.key === "bank"
    ? payout?.bank
      ? `${payout.bank.bank_name} ••••${payout.bank.account_number?.slice(-4)}`
      : item.subLabel
    : payout?.upi?.upi_id || item.subLabel}
</Text>

              </View>
            </View>

            {/* Custom Radio Button */}
            <View
              style={[
                styles.radio,
                isActive && styles.radioActive,
              ]}
            >
              {isActive && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },

  title: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 12,
    letterSpacing: 1,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(16,78,100,0.3)", // Reference surface color
    borderWidth: 1,
    borderColor: "#104e64",
    marginBottom: 12,
  },

  activeCard: {
    backgroundColor: "rgba(250,204,21,0.18)", // Gold-ish highlight
    borderColor: "#facc15",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(6,37,48,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "rgba(143,186,196,0.1)",
  },

  iconText: {
    fontSize: 20,
  },

  textGroup: {
    justifyContent: "center",
  },

  label: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
    textTransform: "uppercase",
  },

  activeLabel: {
    color: "#ffffff",
  },

  subLabel: {
    fontSize: 11,
    color: "#8fbac4",
    fontWeight: "600",
    marginTop: 2,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#104e64",
    justifyContent: "center",
    alignItems: "center",
  },

  radioActive: {
    borderColor: "#facc15",
  },

  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#facc15",
  },
});