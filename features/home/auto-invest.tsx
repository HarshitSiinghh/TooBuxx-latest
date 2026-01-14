import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
 import { useRouter } from "expo-router";

export default function AutoInvestCard() {
   const router = useRouter();
  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>Setup Auto-Invest</Text>

      <View style={styles.content}>
        {/* Features */}
        <View style={styles.features}>
          {/* Feature 1 */}
          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
              <Feather name="refresh-ccw" size={26} color="#818cf8" />
            </View>
            <Text style={styles.featureText}>Spare change auto-invested</Text>
          </View>

          {/* Feature 2 */}
          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
              <Feather name="shield" size={26} color="#818cf8" />
            </View>
            <Text style={styles.featureText}>Supports 13+ banks</Text>
          </View>

          {/* Feature 3 */}
          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
              <Feather name="dollar-sign" size={26} color="#818cf8" />
            </View>
            <Text style={styles.featureText}>100% secure</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.actions}>
          <Pressable style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>How it works?</Text>
          </Pressable>

          {/* <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Setup Now</Text>
          </Pressable> */}

           <Pressable style={styles.primaryBtn}
                    onPress={() => {
                    
                      router.push("/(tabs)/daily-savings");
                    }}
                   
                  >
                 <Text style={styles.primaryText}>Setup Now</Text>
                  </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a003d",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },

  content: {
    gap: 18,
  },

  features: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  featureItem: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },

  iconBox: {
    backgroundColor: "#2a1d61",
    padding: 14,
    borderRadius: 14,
    marginBottom: 4,
  },

  featureText: {
    color: "#d1d5db",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#2a1d61",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#4b26b4",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  secondaryText: {
    color: "#d1d5db",
    fontSize: 13,
    fontWeight: "500",
  },

  primaryText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
  },
});
