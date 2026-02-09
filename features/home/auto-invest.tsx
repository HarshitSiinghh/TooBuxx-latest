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
                    
                      router.push("/metals/gold/engine");
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
    backgroundColor: "#104e64",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    // subtle depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
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
    backgroundColor: "rgba(255,255,255,0.12)", // glass feel
    padding: 14,
    borderRadius: 14,
    marginBottom: 4,
  },

  featureText: {
    color: "#c7e4ec",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#facc15", // gold CTA
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  secondaryText: {
    color: "#c7e4ec",
    fontSize: 13,
    fontWeight: "600",
  },

  primaryText: {
    color: "#062530", // dark teal text
    fontSize: 13,
    fontWeight: "800",
  },
});
